# Portal GLF

`index.html` mantiene el centro público de accesos existente.

La rama `feat/portal-accesos-centralizados` inicia la administración institucional única. Diseño y secuencia: [Arquitectura](docs/ARQUITECTURA_PORTAL_Y_ACCESOS.md).

`access/` contiene un catálogo inicial y decisiones puras de permisos; `tests/` comprueba aislamiento de módulos, fases y ámbitos, MFA, delegación temporal y límites de administración. Ejecutar `npm test` con Node 22 o posterior. Sin dependencias externas.

## Estado real

Esta entrega no crea cuentas, no concede permisos y no sustituye la autorización de ninguna aplicación. Los adaptadores de servidor, la administración conectada, el alojamiento Vercel y el inicio de sesión único siguen por implementar según el plan. La biblioteca no valida JWT ni admite que un navegador se atribuya permisos; debe ejecutarse con contexto verificado por el servidor. No usarla por sí sola como barrera de acceso.

El portal público main y los enlaces enviados al personal permanecen intactos. Los permisos del catálogo son un contrato de desarrollo, no una asignación a personas reales.
