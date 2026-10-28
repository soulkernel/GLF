# Integración: estado de la primera entrega

28 de octubre de 2026.

## Implementado en esta rama

- Catálogo de recursos/acciones ES/EN con fase, ámbito y estado del adaptador.
- Evaluación explícita de permisos, dependencias de acceso/lectura, MFA, vigencia, asignación por expediente y versión de política.
- Delegaciones temporales limitadas por el permiso fuente, sin redelegación.
- Validación de cambios concurrentes y alcance administrativo para añadir y retirar permisos. Protege permisos ajenos al área y bloquea autoasignación.
- Trece pruebas automatizadas de los límites anteriores.
- Arquitectura, secuencia de migración y pruebas de aceptación.

No hay todavía pantalla administrativa conectada ni servidor central de autorización desplegado. No se cambió main, index.html, Supabase, Vercel, identidades ni permisos de usuarios. Las pruebas son de las reglas puras; no son una auditoría de RLS de los sistemas existentes.

## Contratos reales que debe integrar el siguiente lote

| Origen | Operación existente | Trabajo necesario |
|---|---|---|
| Identidad central | `list_managed_accounts` | Obtener cuentas sin exponer las externas a administradores no autorizados; mantener ámbitos projects/sustainability. |
| Identidad central | `prepare_staff_invitation` | Reutilizar cuenta/invitación, controlar versión y no duplicar por reintento. |
| Identidad central | `staff-access-links`, operación prepare | Mantener activaciones de quince días. Hoy devuelve URLs bajo Postulaciones y restringe CORS a ese origen; invocar desde backend autorizado o ampliar solo el origen definitivo, nunca wildcard. |
| Identidad central | `assign_staff_role`, `set_user_admin_scope` | Mapear el estado heredado a permisos centrales sin ampliar facultades. Mantener el histórico. |
| Operaciones | `glf_admin_users`, `glf_admin_save_user` | Importar perfil/versión, mantener rol KYC y permisos por ámbito; mover escrituras a un adaptador de confianza. |
| Operaciones | `glf_admin_invite_user`, `glf_admin_cancel_invite` | Coordinar autorización local con alta central y caducidad. Aceptada, revocada y vencida son estados diferentes. |
| Operaciones | `glf_kyc_delegate` | Unificar delegación y reloj del servidor; respetar el vencimiento incluso con sesión abierta. |

Los roles actuales son de mayor amplitud que algunas casillas propuestas: antes de habilitar permisos como «solo invitar KYC» deben adaptarse TODAS las funciones que ahora autorizan con `kyc_role=manager`. Traducir cualquier casilla a manager concedería demasiado acceso y está prohibido.

## Estado de una alta

`borrador → identidad resuelta → permisos preparados por aplicación → enlace listo → entregado manualmente/enviado → activado → accesos aplicados`.

- El proceso guarda una operación idempotente antes de iniciar efectos remotos.
- Cuenta existente: no emite una activación nueva y conserva contraseña y MFA.
- Cuenta nueva: el enlace privado se entrega solo cuando las autorizaciones necesarias están preparadas. Si una aplicación falla, la pantalla identifica el destino y permite reintentar ese paso.
- Nunca registrar el token de activación en auditorías, HTML público, código, logs ni almacenamiento del navegador.
- Los enlaces emitidos previamente no se regeneran para migrar el portal. Sus rutas antiguas deben seguir siendo válidas hasta vencimiento.
- La activación central es distinta de la sincronización de permisos. El usuario puede haber activado la identidad y tener una aplicación todavía pendiente; la interfaz debe decirlo.

## Alojamiento y dependencias externas

Se propone crear `glf-portal` en Vercel desde esta rama para vista previa autenticada. Todavía no existe ese despliegue. Requiere asociar el repositorio, configurar las variables del origen central y las redirecciones exactas. Las vistas previas no deben usar cuentas reales ni aceptar retornos comodín. La configuración del proveedor OAuth y su compatibilidad MFA deben comprobarse antes de sustituir el ingreso actual.

No se necesita autorización de Google Workspace para construir altas con enlace manual. El envío automático institucional es una integración posterior y separada. El dominio personalizado portal.glf.org.ec requiere coordinación DNS.

## Próximo resultado verificable

Una persona administradora crea una cuenta sintética una sola vez desde el portal, asigna lectura de Proveedores sin KYC, obtiene un enlace y puede seguir su activación. El acceso resulta igual entrando por el portal o por las URLs directas. La misma prueba deberá demostrar retirada de permisos y rechazo desde API, no solo botones deshabilitados. Solo después se traslada la administración del personal ya invitado.
