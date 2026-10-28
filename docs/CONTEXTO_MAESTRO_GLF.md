# Contexto maestro de aplicaciones GLF

Última revisión: 28 de octubre de 2026. Responsable de mantenimiento: quien realice cada cambio compartido, con revisión del consultor.

## Punto de entrada para continuar el trabajo

Este documento reúne el mapa de repositorios y las decisiones que afectan a más de una aplicación. Los detalles funcionales permanecen en el contexto de cada proyecto. No copiar este documento completo a otros repositorios: mantener un enlace y un registro local de los cambios que les afectan.

**Ubicación vigente:** repositorio `soulkernel/GLF`, rama `feat/portal-accesos-centralizados`, archivo `docs/CONTEXTO_MAESTRO_GLF.md`.

[Abrir la versión vigente](https://github.com/soulkernel/GLF/blob/feat/portal-accesos-centralizados/docs/CONTEXTO_MAESTRO_GLF.md). Esta documentación todavía no está en `main`. Al integrar la rama, actualizar todos los enlaces y dejar una referencia desde la ubicación anterior.

## Mapa de sistemas y repositorios

| Componente | Repositorio | Rama de referencia | Acceso y estado |
|---|---|---|---|
| Portal público GLF | [soulkernel/GLF](https://github.com/soulkernel/GLF) | `main` | [Portal público](https://soulkernel.github.io/GLF/). Centro de enlaces existente. |
| Portal interno y administración central | Mismo repositorio `soulkernel/GLF` | `feat/portal-accesos-centralizados` | Arquitectura y reglas iniciales; administración conectada y despliegue pendientes. |
| Proveedores, KYC y futuro archivo operativo | [soulkernel/Prototipo.Proveedores.KYC](https://github.com/soulkernel/Prototipo.Proveedores.KYC) | `main`; aplicación en `aplicacion-proveedores-kyc/` | [Aplicación](https://glf-operaciones-kyc-archivo.vercel.app/). El [demostrativo institucional](https://soulkernel.github.io/Prototipo.Proveedores.KYC/) es una referencia visual separada. |
| Postulaciones y Salvaguardas | [soulkernel/Prototipo.Postulacion.Salvaguardas](https://github.com/soulkernel/Prototipo.Postulacion.Salvaguardas) | `feat/full-grants-platform`; aplicación en `web/` | [Aplicación](https://glf-postulaciones.vercel.app/). Aloja actualmente la identidad central reutilizada por Operaciones. |
| Producto 1 | [soulkernel/GLF.P1](https://github.com/soulkernel/GLF.P1) | Pendiente de inventario técnico | [Recurso documental](https://soulkernel.github.io/GLF.P1/); no implica integración de cuentas. |
| Producto 2 | [soulkernel/GLF.P2](https://github.com/soulkernel/GLF.P2) | Pendiente de inventario técnico | Recurso documental; confirmar publicación y rama antes de modificar. |
| Biblioteca | [soulkernel/BibliotecaGLF](https://github.com/soulkernel/BibliotecaGLF) | Pendiente de inventario técnico | [Biblioteca](https://soulkernel.github.io/BibliotecaGLF/); no implica integración de cuentas. |

Los enlaces de aplicaciones corresponden al contexto de trabajo registrado; esta revisión de documentación no constituye una nueva prueba funcional de esos despliegues. Compras, contratos, recepción, archivo y seguimiento institucional son ampliaciones previstas: no presentarlas como implementadas. No confundir seguimiento institucional con herramientas de seguimiento de la consultoría.

### Versiones verificadas en GitHub en esta revisión

| Repositorio / rama | Commit observado | Alcance de la evidencia |
|---|---|---|
| GLF / main | `774caad85e5bf76e4131456f7b2f94ce49badad0` | Punta remota consultada; portal público preservado. |
| Prototipo.Proveedores.KYC / main | `369eee0ccb4f1d93c786a24636e064052ff27d56` | Punta remota consultada. |
| Prototipo.Postulacion.Salvaguardas / feat/full-grants-platform | `de7d18bf7be13d0facd02003a251c40708949720` | Punta remota consultada. |
| GLF / feat/portal-accesos-centralizados | `ce8c8063ab529b3167e003150fb965a69843c700` | Base técnica anterior a este registro: arquitectura, catálogo, evaluador y trece pruebas. Para la última revisión documental consultar el historial de este archivo. |

Estos valores son una fotografía fechada, no una garantía de que la rama no haya avanzado. Antes de implementar, verificar nuevamente el remoto y las evidencias del despliegue; un commit publicado no demuestra por sí solo que Vercel esté ejecutándolo.

## Decisiones compartidas vigentes

| ID | Acuerdo | Estado / implicación |
|---|---|---|
| GLF-001 | Un portal y una administración de usuarios para las aplicaciones internas. | Aprobado como objetivo. Construcción gradual desde ahora; no esperar a terminar todos los prototipos. |
| GLF-002 | Reutilizar la identidad central existente y el doble factor; una cuenta interna, permisos por aplicación. | Identidad compartida existente. Administración única y sesión única entre sitios todavía pendientes; son capacidades distintas. |
| GLF-003 | Mantener separados los datos de negocio de cada aplicación. | El portal administra accesos, no reúne documentos ni respuestas sensibles KYC. |
| GLF-004 | Autorizar por aplicación, módulo, fase, acción y ámbito. | Catálogo inicial diseñado. Aplicar controles en servidor, API, RPC y almacenamiento; deshabilitar un botón no es control suficiente. |
| GLF-005 | Consultar proveedores no concede acceso al expediente KYC. | Conservar los permisos acordados. Administrar usuarios tampoco concede automáticamente lectura de información reservada. |
| GLF-006 | Mantener las cuentas y los enlaces ya entregados durante la transición. | No pedir otra contraseña ni regenerar invitaciones existentes por el cambio de portal. Activación interna: 15 días; formulario externo KYC: 7 días. |
| GLF-007 | Cuentas institucionales para uso interno; cuentas personales separadas para probar como aplicante externo. | El formulario de invitación KYC conserva su acceso propio mediante enlace; no exigirle una cuenta interna. |
| GLF-008 | Menú principal completo para usuarios internos, con accesos no autorizados visibles pero deshabilitados. | No mostrar datos reservados en indicadores, respuestas o herramientas de previsualización. |
| GLF-009 | Conservar diseño gráfico GLF y español/inglés. | Los cambios compartidos deben revisar textos, accesibilidad y consistencia entre aplicaciones. |
| GLF-010 | Cada alta y cambio de permisos debe mostrar su estado por aplicación. | Pendiente de integración central. Fallo parcial debe ser visible y reintentable; no informar éxito total prematuro. |

Arquitectura y límites: [ARQUITECTURA_PORTAL_Y_ACCESOS.md](ARQUITECTURA_PORTAL_Y_ACCESOS.md). Contratos existentes y siguiente resultado verificable: [INTEGRACION_Y_ESTADO.md](INTEGRACION_Y_ESTADO.md). Este registro no sustituye esas especificaciones ni autoriza ampliar permisos reales.

## Ramas y publicación

- Portal: trabajar en `feat/portal-accesos-centralizados`; preservar `main` y el catálogo público mientras se valida la transición.
- Adaptador de Salvaguardas: rama propuesta `feat/accesos-centralizados`, desde `feat/full-grants-platform`; comprobar si existe antes de crearla. No se considera creada por estar documentada aquí.
- Adaptador de Operaciones/KYC: rama propuesta `feat/accesos-centralizados`, desde `main`; misma comprobación.
- Alojamiento interno propuesto: proyecto Vercel `glf-portal`. No está creado ni publicada su URL. Dominio institucional sujeto a configuración posterior.
- No reemplazar el ingreso actual por SSO antes de verificar MFA, sesiones, cierre de sesión y denegación de permisos con los proveedores reales. No transportar tokens de sesión en enlaces.
- Fusionar y desplegar cada componente con evidencia propia; registrar compatibilidad de los cambios de identidad y permisos antes de activar sus consumidores.

## Protocolo entre proyectos y chats

### Al comenzar

1. Leer este registro y el contexto local del proyecto; respetar sus `AGENTS.md`.
2. Confirmar repositorio, carpeta, rama y cambios locales. No asumir que una carpeta es un checkout Git.
3. Revisar las decisiones compartidas y las dependencias que afectará la tarea.
4. Si hay contradicción, documentarla y resolverla con evidencia actual y las instrucciones del usuario; no reemplazar silenciosamente acuerdos ajenos.

### Al terminar un cambio compartido

1. Actualizar este registro o la especificación central pertinente y el contexto local.
2. Registrar: fecha, decisión, repositorios afectados, rama/commit, migraciones, pruebas, despliegue comprobado o pendiente y próximo paso.
3. Comunicar a los chats afectados un enlace al cambio y su impacto. Leer la fuente antes de modificar el proyecto receptor; un aviso no es una migración ni un permiso nuevo.
4. Distinguir propuesta, código local, commit remoto, despliegue y validación funcional. No convertir pendientes en hechos por copiar un resumen.

No existe sincronización automática de historiales entre chats. La continuidad se obtiene mediante este archivo versionado, referencias locales e instrucciones de lectura. Los avisos facilitan el traspaso, pero el archivo es la referencia durable.

### Plantilla breve para registrar una integración

```text
Fecha y decisión:
Aplicaciones afectadas:
Repositorio / rama / commit:
Contrato o migración y compatibilidad:
Pruebas y evidencia:
Despliegue: comprobado / pendiente
Acción requerida en el otro proyecto:
```

## Información pública y reservada

Este repositorio es público. Registrar arquitectura, decisiones y referencias técnicas; excluir contraseñas, claves, enlaces privados de activación, tokens, expedientes KYC, documentos personales y listados de permisos identificados por persona. Las matrices nominales y evidencias sensibles permanecen en ubicaciones autorizadas. No publicar carpetas de trabajo completas para compartir contexto.

## Bitácora

- 2026-10-28: base técnica del portal en `ce8c806`; administración conectada pendiente.
- 2026-10-28: a solicitud del usuario se establece este registro maestro, con referencias desde los proyectos y protocolo de actualización para continuar entre chats sin duplicar acuerdos.
