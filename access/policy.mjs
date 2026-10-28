import { isCapability, requiredActions } from './catalog.mjs';

// Pure decision logic, NOT authentication middleware. A future server adapter must
// obtain identity, MFA, grants, assignments and versions from trusted storage.
// Never authorize a network request using JSON supplied by the requesting browser.
const deny = reason => ({ allowed: false, reason });
const same = (a, b) => a.resource === b.resource && a.phase === b.phase && a.scope === b.scope && a.action === b.action;
const timestamp = value => typeof value === 'string' ? Date.parse(value) : NaN;
function active(grant, now) {
  return grant.active === true && Number.isFinite(timestamp(grant.startsAt)) &&
    timestamp(grant.startsAt) <= now &&
    (grant.endsAt === null || (Number.isFinite(timestamp(grant.endsAt)) && now < timestamp(grant.endsAt)));
}

export function evaluateAccess({ subject, request, grants = [], assignments = [], now, policyVersion, available }) {
  if (!Number.isFinite(now)) return deny('INVALID_TIME');
  if (available !== true) return deny('AUTHORIZATION_UNAVAILABLE');
  if (!subject || typeof subject.id !== 'string' || !subject.id || subject.active !== true || subject.kind !== 'internal') return deny('INACTIVE_OR_EXTERNAL');
  if (!Array.isArray(grants) || !Array.isArray(assignments)) return deny('INVALID_POLICY');
  if (subject.aal !== 'aal2') return deny('MFA_REQUIRED');
  if (!Number.isSafeInteger(policyVersion) || policyVersion < 1 || subject.policyVersion !== policyVersion) return deny('STALE_POLICY');
  if (!isCapability(request)) return deny('UNKNOWN_CAPABILITY');
  if (request.scope === 'assigned' && (!request.recordId || !assignments.some(a =>
    a.subjectId === subject.id && a.resource === request.resource && a.phase === request.phase &&
    a.recordId === request.recordId && active(a, now)))) return deny('OUTSIDE_ASSIGNMENT');

  function usable(g) {
    if (g.subjectId !== subject.id || !active(g, now) || !isCapability(g)) return false;
    if (!g.delegatedFrom) return true;
    // A temporary delegation never outlives its source or survives revocation.
    // Redelegation is not supported; the source must be directly held.
    if (g.endsAt === null) return false;
    const source = grants.find(s => s.id === g.delegatedFrom);
    return Boolean(source && source.subjectId !== subject.id && !source.delegatedFrom &&
      source.delegable === true && active(source, now) && same(source, g) &&
      timestamp(g.startsAt) >= timestamp(source.startsAt) &&
      (source.endsAt === null || timestamp(g.endsAt) <= timestamp(source.endsAt)));
  }
  const allowed = requiredActions(request.action).every(action => grants.some(g => usable(g) && same(g, {...request, action})));
  return allowed ? { allowed: true, reason: 'EXPLICIT_GRANT' } : deny('MISSING_PERMISSION');
}

export function validateChange({ actorId, targetId, targetProtected, current, proposed, grantable, expectedVersion, actualVersion, reason }) {
  if (!actorId || !targetId || actorId === targetId) return deny('SELF_OR_INVALID_TARGET');
  if (targetProtected !== false) return deny('PROTECTED_ACCOUNT');
  if (!Number.isSafeInteger(actualVersion) || actualVersion < 1 || expectedVersion !== actualVersion) return deny('VERSION_CONFLICT');
  if (typeof reason !== 'string' || reason.trim().length < 5) return deny('REASON_REQUIRED');
  if (!Array.isArray(current) || !Array.isArray(proposed) || !Array.isArray(grantable) || ![...current, ...proposed, ...grantable].every(isCapability)) return deny('INVALID_CAPABILITY');
  // Protect both additions and removals. An area administrator must preserve
  // unrelated permissions, even if its screen never displayed those rows.
  const changed = [...proposed.filter(p => !current.some(c => same(c, p))), ...current.filter(c => !proposed.some(p => same(p, c)))];
  if (!changed.every(p => grantable.some(g => same(p, g)))) return deny('OUTSIDE_ADMIN_SCOPE');
  if (!proposed.every(p => requiredActions(p.action).every(action => proposed.some(g => same(g, {...p, action}))))) return deny('MISSING_DEPENDENCY');
  return { allowed: true, reason: 'VALID_CHANGE' };
}
