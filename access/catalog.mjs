// Contract catalog. Integration readiness is independent of a listed capability.
export const resources = Object.freeze({
  'operations.suppliers': { label: ['Proveedores', 'Suppliers'], phases: ['directory'], scopes: ['government', 'glf'], actions: ['access', 'read', 'create', 'edit', 'export', 'archive'], adapter: 'pending' },
  'operations.specialties': { label: ['Especialidades', 'Specialties'], phases: ['directory'], scopes: ['institution'], actions: ['access', 'read', 'create', 'edit'], adapter: 'pending' },
  'operations.kyc': { label: ['Expedientes KYC', 'KYC cases'], phases: ['assessment'], scopes: ['institution'], actions: ['access', 'read', 'invite', 'assist', 'screen', 'decide', 'export'], adapter: 'pending', confidential: true },
  'grants.applications': { label: ['Postulaciones', 'Applications'], phases: ['concept', 'proposal'], scopes: ['assigned'], actions: ['access', 'read', 'comment', 'edit', 'export', 'decide'], adapter: 'pending' },
  'grants.safeguards': { label: ['Salvaguardas', 'Safeguards'], phases: ['concept', 'proposal'], scopes: ['assigned'], actions: ['access', 'read', 'review', 'export'], adapter: 'pending' },
  'portal.users': { label: ['Usuarios y permisos', 'Users and permissions'], phases: ['administration'], scopes: ['institution', 'projects', 'sustainability', 'operations'], actions: ['access', 'read', 'invite', 'grant', 'suspend', 'audit'], adapter: 'pending' },
});

export const actionLabels = Object.freeze({
  access: ['Acceder', 'Access'], read: ['Consultar', 'Read'], create: ['Crear', 'Create'], edit: ['Editar', 'Edit'],
  export: ['Descargar', 'Download'], archive: ['Desactivar/reactivar', 'Deactivate/reactivate'], invite: ['Invitar', 'Invite'],
  assist: ['Asistir llenado', 'Assist completion'], screen: ['Registrar screening', 'Record screening'], decide: ['Decidir/cerrar', 'Decide/close'],
  comment: ['Formular observaciones', 'Comment'], review: ['Revisar', 'Review'], grant: ['Asignar permisos', 'Assign permissions'],
  suspend: ['Suspender acceso', 'Suspend access'], audit: ['Consultar auditoría', 'Read audit'],
});

export function isCapability(value) {
  const r = value && Object.hasOwn(resources, value.resource) && resources[value.resource];
  return Boolean(r && r.phases.includes(value.phase) && r.scopes.includes(value.scope) && r.actions.includes(value.action));
}

export function requiredActions(action) {
  return action === 'access' ? ['access'] : action === 'read' ? ['access', 'read'] : ['access', 'read', action];
}

export function grantFromActions(resource, phase, scope, actions) {
  const result = [...new Set(actions.flatMap(requiredActions))].map(action => ({resource, phase, scope, action}));
  if (!result.every(isCapability)) throw new Error('INVALID_CAPABILITY');
  return result;
}
