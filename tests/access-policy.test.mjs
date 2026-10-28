import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAccess, validateChange } from '../access/policy.mjs';
import { grantFromActions } from '../access/catalog.mjs';

const now = Date.parse('2026-10-28T18:00:00Z');
const subject = { id: 'test-reader', active: true, kind: 'internal', aal: 'aal2', policyVersion: 4 };
const capability = { resource: 'operations.suppliers', phase: 'directory', scope: 'government', action: 'read' };
const granted = (caps, id = subject.id) => caps.map((c, i) => ({...c, id: `${id}-${i}`, subjectId: id, active: true, startsAt: '2026-10-28T17:00:00Z', endsAt: null}));
const caps = grantFromActions(capability.resource, capability.phase, capability.scope, ['read']);
const base = { subject, request: capability, grants: granted(caps), now, policyVersion: 4, available: true };
const access = patch => evaluateAccess({...base, ...patch});

test('explicit commercial read does not grant KYC, export, editing, other scope or future module', () => {
  assert.equal(access({}).allowed, true);
  for (const request of [{...capability, action: 'edit'}, {...capability, action: 'export'}, {...capability, scope: 'glf'},
    {resource: 'operations.kyc', phase: 'assessment', scope: 'institution', action: 'read'}, {...capability, resource: 'future.contracts'}]) {
    assert.equal(access({request}).allowed, false);
  }
});
test('MFA, inactive identity, external account and stale policy fail closed', () => {
  for (const patch of [{aal:'aal1'}, {active:false}, {kind:'external'}, {policyVersion:3}])
    assert.equal(access({subject:{...subject,...patch}}).allowed,false);
  assert.equal(access({available:false}).reason,'AUTHORIZATION_UNAVAILABLE');
  assert.equal(access({now:NaN}).allowed,false);
});
test('phase and record assignment are checked separately', () => {
  const request = {resource:'grants.applications',phase:'concept',scope:'assigned',action:'read',recordId:'case-a'};
  const grants = granted(grantFromActions(request.resource,request.phase,request.scope,['read']));
  const assignments = [{subjectId:subject.id,resource:request.resource,phase:'concept',recordId:'case-a',active:true,startsAt:'2026-10-01T00:00:00Z',endsAt:null}];
  assert.equal(access({request,grants,assignments}).allowed,true);
  for(const r of [{...request,recordId:'case-b'}, {...request,phase:'proposal'}, {...request,recordId:null}])
    assert.equal(access({request:r,grants,assignments}).allowed,false);
});
test('edit is not a substitute for read and access, or for deciding', () => {
  const all = grantFromActions(capability.resource,capability.phase,capability.scope,['edit']);
  assert.equal(access({request:{...capability,action:'edit'},grants:granted(all)}).allowed,true);
  assert.equal(access({request:{...capability,action:'edit'},grants:granted(all.filter(g=>g.action!=='read'))}).allowed,false);
});
test('expiry at boundary, future grant and malformed dates deny', () => {
  for (const p of [{endsAt:'2026-10-28T18:00:00Z'}, {startsAt:'2026-10-29T00:00:00Z'}, {endsAt:'bad-date'}, {startsAt:null}])
    assert.equal(access({grants:base.grants.map(g=>({...g,...p}))}).allowed,false);
});
test('temporary delegation cannot outlive, broaden, or survive revoked source', () => {
  const source = granted(caps,'test-owner').map(g=>({...g,delegable:true,endsAt:'2026-10-29T00:00:00Z'}));
  const delegated = base.grants.map((g,i)=>({...g,endsAt:'2026-10-28T20:00:00Z',delegatedFrom:source[i].id}));
  assert.equal(access({grants:[...source,...delegated]}).allowed,true);
  assert.equal(access({grants:[...source.map(g=>({...g,active:false})),...delegated]}).allowed,false);
  assert.equal(access({grants:[...source,...delegated.map(g=>({...g,endsAt:null}))]}).allowed,false);
  assert.equal(access({grants:[...source,...delegated.map(g=>({...g,endsAt:'2026-10-30T00:00:00Z'}))]}).allowed,false);
  assert.equal(access({grants:[...source.map(g=>({...g,scope:'glf'})),...delegated]}).allowed,false);
});
test('administration permissions do not expose confidential business records', () => {
  const grants = granted(grantFromActions('portal.users','administration','institution',['grant']));
  assert.equal(access({grants,request:{resource:'operations.kyc',phase:'assessment',scope:'institution',action:'read'}}).allowed,false);
});
const change = {actorId:'test-admin', targetId:'test-reader', targetProtected:false, current:[],proposed:caps,grantable:caps,expectedVersion:2,actualVersion:2,reason:'Prueba de alcance'};
test('limited admin cannot self-escalate, alter protected account or widen scope', () => {
  assert.equal(validateChange(change).allowed,true);
  for(const patch of [{targetId:'test-admin'}, {targetProtected:true}, {proposed:grantFromActions('operations.kyc','assessment','institution',['read'])}, {proposed:[{...capability,scope:'*'}]}])
    assert.equal(validateChange({...change,...patch}).allowed,false);
});
test('concurrent change and missing explanation cannot overwrite access', () => {
  assert.equal(validateChange({...change,actualVersion:3}).reason,'VERSION_CONFLICT');
  assert.equal(validateChange({...change,reason:''}).reason,'REASON_REQUIRED');
});
test('incomplete permission sets cannot be stored', () => {
  assert.equal(validateChange({...change,proposed:[capability]}).reason,'MISSING_DEPENDENCY');
});
test('catalog rejects unimplemented combinations instead of granting broadly', () => {
  assert.throws(()=>grantFromActions('operations.suppliers','directory','government',['decide']),/INVALID_CAPABILITY/);
});
test('limited administrator cannot strip permissions owned by another area', () => {
  const foreign = grantFromActions('operations.kyc','assessment','institution',['read']);
  assert.equal(validateChange({...change,current:foreign,proposed:caps}).reason,'OUTSIDE_ADMIN_SCOPE');
  assert.equal(validateChange({...change,current:foreign,proposed:[...foreign,...caps]}).allowed,true);
});
test('malformed resource or missing identity cannot reach an allow decision', () => {
  assert.equal(access({request:{...capability,resource:'__proto__'}}).allowed,false);
  assert.equal(access({request:null}).allowed,false);
  assert.equal(access({subject:{...subject,id:''}}).allowed,false);
  assert.equal(access({grants:null}).allowed,false);
});
