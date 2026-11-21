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
| GLF-011 | En Operaciones/KYC hay un solo manual interno completo para todos los usuarios internos y otro independiente para destinatarios externos. | Implementado y publicado. La lectura del manual interno no se restringe por rol ni concede facultades operativas. Mantener esta distinción al integrar el portal. |

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

- 2026-10-28: Operaciones/KYC optimiza la apertura en `soulkernel/Prototipo.Proveedores.KYC`, `main`, commits `fb8020c` y `f5d6510`. Vercel satisfactorio y CI `40812351396` aprobado. Carga diferida de KYC/Usuarios/Manual, división de dependencias y caché de JS/CSS públicos con hash; HTML mantiene no-store. Entrada de aproximadamente 843 KB a 422 KB de JavaScript; reapertura sin nueva transferencia de scripts en las mediciones. Se verifican módulos, permisos, cambios sin guardar aun ante falla de red y descargas. Detalle en `aplicacion-proveedores-kyc/RENDIMIENTO.md` del repositorio de Operaciones. No cambia identidad, MFA, permisos, migraciones ni contratos entre aplicaciones; ninguna acción requerida en los otros sistemas.

- 2026-10-28: base técnica del portal en `ce8c806`; administración conectada pendiente.
- 2026-10-28: a solicitud del usuario se establece este registro maestro, con referencias desde los proyectos y protocolo de actualización para continuar entre chats sin duplicar acuerdos.
- 2026-10-28: Operaciones/KYC publica manuales ES/EN en `soulkernel/Prototipo.Proveedores.KYC`, `main`, commit `0d37fe72aecf036702ce44b944e5567f16d8c948`. Vercel confirma despliegue satisfactorio y CI termina correctamente (run `40808471075`). Manual interno: menú **Manual interno**, 15 capítulos para todos los perfiles internos; externo: [Manual del formulario KYC](https://glf-operaciones-kyc-archivo.vercel.app/manual-externo.html), 10 capítulos sin procedimientos internos. Ambos incluyen capturas, búsqueda y Word/PDF completos. Pruebas locales de perfil de consulta, ES/EN, móvil y ocho descargas; verificación pública de acceso externo, cuatro descargas y hashes de las 34 capturas. Documentos de 16 páginas internas y 11 externas en cada idioma. Sin cambios de contratos de identidad, permisos, migraciones o datos. La integración del portal y del correo automático continúa pendiente.

- 2026-11-04: Operaciones/KYC publica 5702bf3caafc752b71c7e31cd064aa01e8f1963f en main de soulkernel/Prototipo.Proveedores.KYC. Vercel satisfactorio y CI 41942739141 aprobado. Arranque autenticado consulta vigencia/perfil/MFA en paralelo tras verificar identidad y muestra progreso, plazo de lectura de 15 segundos por etapa y reintento. No cambia contratos, permisos, MFA ni RLS. Pruebas de fallas/recuperación y acceso con sesión existente aprobadas. Dos proveedores sintéticos adicionales creados y comprobados por interfaz; directorio de 22 activos. Detalle técnico en RENDIMIENTO.md del repositorio de Operaciones. No requiere acciones en otros sistemas ni modifica la administración central pendiente.


- 2026-11-13, Correspondencia y archivo: implementado y probado localmente en Operaciones; rama de integración `feat/correspondencia-archivo` de `soulkernel/Prototipo.Proveedores.KYC`. Tercer módulo ES/EN con instituciones/contactos vinculados a proveedores, oficios de entrada/salida, secuencia anual, PDF/Word, firma externa con revisión humana, despacho manual y código Gmail pendiente de conexión. Administración organiza áreas, sedes y capacidades sobre identidades existentes; no reemplaza la alta central ni modifica contratos de identidad. Migraciones aditivas 024/025: esquema privado, MFA, RPC y Storage; no aplicadas en servidor. 95 pruebas locales y recorrido Edge aprobados. Auditoría local: 17→34 tablas, 179→289 columnas, 25→57 FK; no equivale a inventario de producción. Detalle y límites en `aplicacion-proveedores-kyc/CORRESPONDENCIA.md`. No desplegado en Vercel, sin permisos reales nuevos ni OAuth/Drive activados. Numeración oficial y pruebas OIDC/Storage reales pendientes antes de activar. Las notas anteriores de diseño conservan su valor histórico; este registro actualiza el estado de construcción, no confirma un despliegue.

  Código guardado y hashes verificados: commit `ca570f79f5001129d8414351d749550ebbe14bb3`, [revisión en borrador #2](https://github.com/soulkernel/Prototipo.Proveedores.KYC/pull/2). La rama main y el despliegue de producción no se modificaron. No confundir disponibilidad de código con activación del módulo en Supabase/Vercel.


## Correspondencia activada — 13/11/2026

Operaciones/KYC: PR #2 integrada en main (cef5b835b7a83fb3c2f028a9dfce241e4e099350), corrección posterior 3d63d55b83a69bd32ade1b69a7099dab98d5ea0a. Vercel Production Ready verificado en https://glf-operaciones-kyc-archivo.vercel.app/. Esta nota sustituye los estados anteriores de activación pendiente, conservados como historial.

Migraciones 024/025/026 aplicadas mediante SQL Editor de Supabase, con resultado satisfactorio. Esquema documental: 17 tablas, todas con RLS, 110 columnas; Storage privado, RPC sin ejecución anónima y worker reservado al servidor. Se conservaron proveedores y KYC existentes. Sin cambios en identidad compartida, contraseñas o MFA.

Prueba con sesión administrativa existente: asignación organizativa de configuración, proveedor reutilizado, contraparte independiente, oficio de salida aprobado/numerado/PDF descargado, oficio recibido restringido/PDF cargado/asignado con plazo. Datos sintéticos, sin firmas ni envíos reales. Interfaz ES/EN y módulos anteriores comprobados. Pruebas locales previas: 95; tras la corrección de contactos vacíos: 13 de Correspondencia, 21 de datos y recorrido Edge aprobados. No se probaron sesiones reales del resto del personal ni se concedieron permisos nominales a otras personas.

Administración de áreas, sedes y capacidades se integra en Operaciones sobre cuentas existentes; no es todavía la administración central entre aplicaciones. OAuth Gmail, despliegue de correspondence-send, integración Drive y alta central permanecen pendientes. Numeración de piloto C-GLF-0001-AÑO: conciliar antes de uso oficial; anulación/reemisión formal pendiente. Código y límites: aplicacion-proveedores-kyc/CORRESPONDENCIA.md en soulkernel/Prototipo.Proveedores.KYC. No copiar documentación reservada ni registros del piloto al portal público.


## Correspondencia: bandejas y numeración definitiva acordada — 13/11/2026

Operaciones/KYC publicado en main b653eac7e9ca3114d520be770daa35d7f996a2e8 y ajuste final d00765afa4d8a515ffa26ca0d0c9087b9cc6a495. Vercel satisfactorio para ambos. Migración 027 aplicada y verificada en Supabase. Sustituye el formato de numeración provisional para nuevos documentos; los números ya asignados se conservan.

Dos bandejas y búsquedas independientes en servidor: Oficios recibidos y Oficios de salida. Nuevas entradas GLF-EXT-AÑO-00001; nuevas salidas GLF-AÑO-00001. Secuencias anuales separadas, conservando el contador de salida existente. Número de origen separado del interno. La entrada se numera al completar recepción con PDF confirmado, no al guardar el borrador técnico. Reintento idempotente. Ingresos históricos sin número se completan explícitamente, sin renumeración automática.

Recepción física o electrónica: remitente, fecha, canal, número de origen o Sin número, PDF, ubicación física opcional, asignación y seguimiento. Respuesta relacionada navegable; crearla no cierra ni envía el ingreso. PDF máximo 20 MiB, vista previa, control estructural en navegador y rechazo de cifrado; originales conservados, motivo al reemplazar el PDF principal. No equivale a antivirus ni validación de firma. Servidor verifica autorización, objeto, tamaño y estado, no el contenido binario.

97 pruebas automatizadas aprobadas y recorrido local Edge con ES/EN, móvil, permisos, carga y filtros. Prueba autenticada publicada: recepción sintética cargada y numerada, salida vinculada aprobada y numerada, ambas bandejas comprobadas tras recarga. Sin firmas ni envíos reales. Proveedores y KYC conservados; almacenamiento privado y RLS verificados. Ajuste final: etiqueta del historial de recepción y conservación de búsqueda al volver desde contactos; compilación y 13 pruebas documentales repetidas satisfactoriamente.

No cambia identidad compartida, MFA ni permisos de usuarios. OAuth Gmail, Drive, administración central interaplicaciones y asignaciones definitivas del personal siguen pendientes. Implementación y límites en aplicacion-proveedores-kyc/CORRESPONDENCIA.md; evidencia operativa y registros de prueba en contexto reservado.


## Borradores de correspondencia publicados — 13/11/2026

Operaciones/KYC: a8dfe5d38745a46a79fa0f8267894b313f517193, rama feat/correspondencia-borradores integrada por avance directo en main. Once archivos seleccionados, hashes cotejados. Vercel satisfactorio en producción y migración 028 aplicada en Supabase (Success. No rows returned). Conserva identidad, MFA, permisos y numeración; sin nuevas tablas ni columnas.

Oficios de salida incorpora Borradores con conteo limitado a documentos autorizados, asunto, autor, última modificación y Continuar edición. Guardar borrador exige solo asunto con fecha precargada; destinatario, contenido y firmante se validan antes de remitir a firma, en cliente y servidor. No asigna número ni despacha. Guardado explícito con fecha y hora. Navegación interna ofrece Guardar y salir / Salir sin guardar / Seguir editando, incluso al cambiar de módulo o cerrar sesión. Cerrar o recargar la pestaña usa el aviso nativo del navegador; no hay autoguardado. Control de versión impide sobrescribir cambios concurrentes.

Verificación: 16 pruebas documentales y 17 generales aprobadas; dos recorridos Edge (borradores y flujo completo), ES/EN y móvil. En producción, con la sesión interna existente, se guardó un borrador sintético sin destinatario ni firmante, se añadió contenido mediante Guardar y salir, se recargó y se recuperó desde Borradores. No se concedieron accesos, firmaron documentos ni enviaron correos. El documento de prueba permanece sin número. OAuth Gmail, Drive y administración central interaplicaciones conservan su estado pendiente.


## Emisión automática, sede del autor y anexos publicados — 13/11/2026

Operaciones/KYC: commit 6efc05c9ca9ccd6fd9ebf15f42a7f8b22e3af5b0, rama feat/correspondencia-emision-anexos integrada en main; once archivos seleccionados y hashes verificados. Vercel producción satisfactorio. Migración 029 aplicada en Supabase con resultado Success. No rows returned. Sin nuevas tablas, columnas, accesos ni cambios nominales de perfiles.

Oficios de salida: se eliminan entradas manuales de fecha y lugar. El servidor establece la fecha de Galápagos al guardar y la fija al aprobar; los eventos conservan fecha y hora. El lugar se obtiene de la sede del autor y el código de origen mantiene dirección-SX/SC-iniciales. Se conserva la fecha de origen de documentos entrantes. El firmante nuevo predeterminado es el usuario actual únicamente si ya tiene autorización; Cambiar persona que suscribe permite seleccionar otro firmante autorizado. Un autor sin esa atribución puede guardar y asignar posteriormente, sin obtener permisos de firma.

Administración documental: Asignaciones incluye Sede de trabajo y Usuarios por sede con filtro. No se crean cuentas separadas por isla; se utiliza el perfil existente. La configuración nominal de las personas sigue pendiente de su administración; esta publicación no modifica sus asignaciones.

Anexos del oficio: selección múltiple de PDF, máximo 20 MiB por archivo, validación y detección de nombres repetidos. Los pendientes se cargan al guardar el borrador en almacenamiento privado y quedan vinculados al documento. Sus nombres aparecen automáticamente después del contenido y antes de la firma, en vista previa y PDF. La aprobación conserva el listado en la revisión; no se permite añadir anexos después de esa etapa. No se alteran archivos firmados.

Verificación: 17 pruebas documentales y tres recorridos Edge aprobados (anexos, borradores y flujo completo), incluyendo ES/EN y móvil. PDF extraído y comprobado. En producción se guardó un borrador sintético con dos PDF privados; sus nombres aparecen en el oficio y en el PDF descargado, antes de la firma, con fecha y sede automáticas. No se aprobó, firmó ni despachó el borrador; no consumió número. OAuth Gmail, Drive y alta central interaplicaciones conservan su estado pendiente.


13/11/2026 — Logotipo del PDF de oficios: esquinas redondeadas con radio 1,5 mm, manteniendo tamaño, posición superior derecha y texto original en todas las páginas. Solo afecta la generación del PDF de correspondencia; no modifica imágenes de la aplicación ni archivos firmados existentes. Verificado visualmente en PDF sintético de dos páginas y compilación satisfactoria. Publicado main 7739da062172bfce90623b0fa0bcb71fb9aac9a8 desde feat/oficio-logo-redondeado; Vercel satisfactorio. Sin cambios de base de datos, permisos o contratos compartidos.


13/11/2026 — Distribución institucional del PDF de oficios aprobada e implementada: nombre GLF y logotipo redondeado; número y fecha larga a la derecha; asunto antes del destinatario; Times 11 y cuerpo justificado; Atentamente, espacio vacío, nombre y cargo; anexos después del firmante, copias individuales y siglas de origen al final. Sin leyendas ni representaciones de firma. Encabezado y paginación repetidos; bloque del firmante unido. Presentación de sede Santa Cruz como Puerto Ayora y San Cristóbal como Puerto Baquerizo Moreno, otras sedes conservadas. La vista de contenido y ayuda de anexos adoptan el nuevo orden. Sustituye el acuerdo previo de anexos antes de la firma. No cambia base de datos, fechas guardadas, identidad, permisos, numeración ni archivos firmados. Verificados PDF sintéticos de 1 y 4 páginas, texto y orden, compilación y recorrido Edge de anexos/descarga/ES-EN/móvil. Publicado main 38b403c428bc5eb9bc30a6429c2c5589956879a4 desde feat/oficio-distribucion-institucional, tres archivos cotejados, Vercel satisfactorio.


13/11/2026 — Variante azul del logotipo para PDF de correspondencia aprobada por el usuario tras vista previa. Se incorpora public/glf-logo-oficio.png: letras y cola exterior azules, figura interior blanca, fondo transparente sin recuadro. Se elimina el recorte de esquinas del PDF y se conserva la relación de aspecto. La interfaz y archivos firmados existentes conservan sus imágenes. Recurso embebido en el módulo PDF de carga diferida. Compilación y recorrido local Edge de anexos/descarga/ES-EN/móvil satisfactorios, PDF renderizado e inspeccionado. Main 51f2b6c15ec6c9c4e46d9c7788491b8488852178, rama feat/oficio-logo-azul, cuatro archivos cotejados, Vercel satisfactorio. Sin cambios de base de datos ni permisos.


13/11/2026 — Editor de contenido de oficios publicado. Controles izquierda/centrado/justificado por párrafo y negrita sobre selección, ES/EN, con persistencia y reproducción en PDF. Migración 030 aplicada en Supabase: una columna JSONB body_format para alineaciones y rangos Unicode de negrita, sin duplicar texto; validación en servidor y conservación en revisión aprobada. Texto anterior continúa justificado; entradas externas mantienen observaciones simples. HTML reconstruido con texto escapado; pegado e importación Word como texto plano. Se corrigió la incompatibilidad con CSP usando clases de estilos permitidas, sin ampliar la política, y el contraste del botón activo. Main final a9675b80f9366035096768d71643ac9c5e0ffd98; commits previos 9cb6ae24240263900c1fbebba381528fd3996766 (feat/oficio-editor-formato), 69d5743bea52bffe3e56364d88c1dc1a0370ef15 (fix/oficio-formato-csp); corrección final en fix/oficio-formato-contraste. Vercel satisfactorio. Pruebas: 17 documentales y 2 de formato/validación/revisión; Edge con la política CSP de Vercel, selección de negrita, tres alineaciones, guardado, recarga, descarga PDF, ES/EN y móvil; recorrido de anexos. PDF renderizado e inspeccionado. Prueba autenticada publicada: borrador sintético guardado y recuperado con título centrado/negrita y segundo párrafo a la izquierda. No se aprobó, firmó ni envió; sin número y sin cambios de permisos o identidad.


19/11/2026 — Operaciones/KYC: hoja de redacción de oficios y corrección del cursor, publicada en main 379ea359df2b000fe2de2638b1fc79054a4e6e15 desde fix/oficio-hoja-redaccion; siete archivos cotejados y Vercel satisfactorio. Se separan Datos del oficio, Redactar y Anexos, con hoja continua, márgenes, identidad GLF, datos de referencia e iconos accesibles de formato ES/EN. Se elimina la activación implícita del botón de negrita por el label contenedor y se preserva la selección antes de enfocar el editor. Retomar prioriza escritura; anexos permanecen abiertos después de cargarlos y los errores revelan sus campos. Referencia funcional Quipux (Manual Bandeja de Salida, MINTEL 2018) sin adoptar sus complejidades. Salvaguardas NarrativeTextarea revisado solo como referencia de foco; sin cambios en ese proyecto. Pruebas: 19 documentales satisfactorias; Edge con CSP de producción, escritura inmediata tras cada icono, clic en el cuerpo, teclado, Enter, persistencia y PDF; recorridos de borradores y anexos/firmantes, ES/EN y móvil satisfactorios. Hoja inspeccionada visualmente; recursos públicos de producción comprobados HTTP 200 con la interfaz nueva y CSP intacta. No se ha repetido un guardado autenticado en producción en esta sesión. Sin migraciones, cambios de permisos, identidad, numeración o contrato body/body_format. El PDF mantiene su composición y paginación; la hoja de edición no representa saltos exactos de página.


19/11/2026 — Operaciones/KYC: documentos y anexos debajo del contenido, tanto en lectura como en edición, según acuerdo del usuario. Vista de lectura de oficios entrantes/salientes en una sola columna: Contenido, Documentos y anexos, Historial. Edición de salida: tarjeta de anexos visible a todo el ancho después de la hoja; el botón Anexos desplaza a esa tarjeta sin duplicarla. Recepción mantiene el archivo debajo de observaciones. Publicado main 8c154ba1a5fb8e0bb71cb3ac600283b6dbf4b271, rama fix/oficio-anexos-debajo, tres archivos cotejados; Vercel satisfactorio y recursos públicos actualizados verificados HTTP 200. Pruebas Edge de anexos/firmantes, guardado/recuperación, descarga PDF, formato/cursor, ES/EN y móvil satisfactorias. Distribución vertical y anchos comprobados e imágenes inspeccionadas. No se repitió guardado autenticado en producción; sin migraciones, cambios de permisos, identidad, contratos o límites de archivo.


19/11/2026 — Correspondencia: recepción diferenciada de oficio principal y anexos PDF opcionales, seleccionables antes de registrar (20 MiB por archivo); número interno después de completar las cargas. Lectura con asunto/archivo principal, versiones previas desplegables y anexos separados debajo. Seguimiento y disposiciones reemplaza el historial técnico prominente: responsable, plazo, última disposición, reasignaciones, atención con evidencia opcional y respuesta relacionada. Registro técnico desplegable. Responder crea un borrador persistido con destinatario, número/fecha/asunto de origen; Continuar respuesta reutiliza borrador legible bajo bloqueo transaccional. La respuesta mantiene confidencialidad, autoría y permisos; aprobación/firma no equivale a envío ni cierre. El envío se muestra solo con despacho confirmado o constancia registrada.
Migración 031 aplicada en Supabase con éxito: tres columnas referenciadas en eventos (target_id, due_date, evidence_file_id); núcleo 030 conservado privado, sin ejecución directa por authenticated. RPC ampliada bajo identidad/MFA y permisos existentes, sin altas ni cambios nominales de roles. Comparación previa del código y conteos posteriores confirmó conservación de documentos, archivos y eventos previos.
Publicado main cb7c15b500eb40018876a2b59e2505eb11e6abc8 (ajuste de etiquetas fix/oficio-anexos-etiquetas), implementación d2e7b89abd703b06991f46877db1479e28a393f1 en feat/oficio-seguimiento-respuestas. Vercel satisfactorio; 37 recursos HTTP 200 y CSP conservada. Pruebas: 21 documentales/seguridad/migración; Edge con ingreso y dos anexos, asignación/disposición/atención, evidencia, respuesta y reutilización, ES/EN, móvil, formato/cursor y PDF. Comprobación autenticada publicada: lectura de oficio sintético previo, disposición y atención con respaldo guardadas y recuperadas tras recarga; respuesta previa aprobada aparece en preparación/firma, sin envío. No se firmó, envió ni cerró correspondencia. La creación de respuestas y el flujo completo de envío se probaron localmente, no se repitió el envío en producción.


## 19/11/2026 — Referencia visual Quipux 2021 para Correspondencia

Estado: análisis documentado; propuesta pendiente de implementación y revisión con el usuario. Se analizaron los manuales de entrada (69 páginas) y salida (97 páginas) proporcionados por el usuario, con extracción de texto y revisión visual de 20 páginas seleccionadas. Las fuentes y capturas se conservan únicamente en el contexto local, fuera del repositorio público.

Propuesta detallada: [Organización visual de Correspondencia](ANALISIS_INTERFAZ_CORRESPONDENCIA_REFERENCIA_QUIPUX_2021.md). Propone bandejas laterales separadas de entrada/salida, búsqueda compacta, acciones contextuales con iconos, metadatos breves y área amplia para redactar/leer. Anexos siempre debajo del contenido, con accesos por desplazamiento; seguimiento centrado en disposiciones, responsables, plazos y respuestas. Las bandejas reutilizan estados y registros existentes; no son tablas nuevas.

Prevalece el procedimiento GLF: firma externa, carga del PDF firmado y despacho como acciones distintas. No se adoptan la impresión/tramitación física de Quipux, su firma-envío combinado, límites antiguos, numeración, permisos ni gestión documental interna completa. Se conservan plantilla PDF, numeración, contratos body/body_format, archivos privados y atribuciones existentes. No se modificaron código funcional, Supabase, permisos, correos ni Vercel.

Siguiente paso: revisar la distribución propuesta y autorizar su implementación en Operaciones/KYC. Esta actualización solo comparte documentación; no sincroniza automáticamente los historiales de otros chats ni habilita integraciones pendientes.


## 21/11/2026 — Correspondencia: bandejas y área de redacción publicadas

Estado: implementación autorizada por el usuario, activada en Supabase y publicada en Vercel. Sustituye el estado de propuesta pendiente del análisis visual Quipux del 19/11/2026. Se conserva el procedimiento GLF y su identidad gráfica.

- Bandejas laterales de recibidos (todos, en atención, cerrados) y salidas (borradores, para firma, por enviar, enviados, todos). Agrupación de estados y conteos filtrados antes de paginar, bajo permisos del servidor. No se crean tablas ni se duplican registros para las bandejas.
- Búsqueda compacta, filtros adicionales desplegables y recuperación de búsqueda, página y posición al regresar al listado. Acciones contextuales con iconos.
- Redacción en hoja amplia, datos del oficio compactos, buscador de destinatarios y acciones superiores Guardar borrador/Vista previa/Volver. Se conserva selección, formato por párrafo, borradores incompletos y aviso de cambios sin guardar. Los anexos permanecen debajo del contenido tanto en lectura como en edición.
- Accesos Documento/Anexos/Seguimiento por desplazamiento. Entrada muestra el oficio principal separadamente; Ver oficio abre su PDF privado. Disposiciones, responsables, plazos y respuestas vinculadas se reutilizan sin reemplazar el historial.
- Vista previa sin guardar, numerar, aprobar o enviar. La verificación en Chrome publicado detectó bloqueo del visor PDF nativo; se sustituyó por PDF.js 5.4.624 de carga diferida, worker y recursos del mismo origen. Renderiza una página a la vez con anterior/siguiente, mantiene el PDF original descargable y no remite archivos a terceros. La apertura inicial de la aplicación no carga el visor. Se conservan X-Frame-Options DENY, object-src none y frame-ancestors none; frame-src none, worker-src self.

Publicación: repositorio `soulkernel/Prototipo.Proveedores.KYC`, carpeta `aplicacion-proveedores-kyc/`; implementación `806986f37c0494cd17308e16625e947083d3b71c`, rama `feat/correspondencia-bandejas-editor`. Corrección del visor y versión final en main `601e37772fcc2ee403f2f0f313553f57dbb11a8c`, rama `fix/correspondencia-preview-pdf`. Archivos seleccionados cotejados por hash; no se publicó la raíz documental. Vercel informó Deployment has completed para la versión final. Aplicación: https://glf-operaciones-kyc-archivo.vercel.app/.

Supabase: migración `202611210032_records_workspace.sql` aplicada. Conserva el núcleo anterior como `core_v031` privado sin ejecución directa por roles cliente; RPC list ampliada con bandeja y total legible. No añade tablas, columnas, identidades ni permisos. Se comparó el cuerpo de la función vigente antes de migrar y se verificaron después conservación de documentos/archivos/eventos, hash de función y ausencia de ejecución directa del núcleo. Firma, despacho, numeración anual, RLS, MFA y documentos anteriores se conservan.

Pruebas: 22 automatizadas satisfactorias de modelo, migraciones, flujo, archivos, aislamiento, permisos, MFA, numeración, formato, seguimiento y bandejas/paginación. Recorridos locales Edge de entrada con anexos, salida, respuesta, borradores, formato/cursor, PDF, destinatarios, filtros/paginación, ES/EN y móvil; visor verificado con todas las cabeceras de Vercel, documento multipágina y retorno al editor sin guardar. Verificación autenticada en producción: bandeja de recibidos, tres borradores existentes, dos registros para firma, lectura de seguimiento/respuesta vinculada y PDF principal renderizado correctamente en Chrome. No se repitieron escrituras, firma ni envío en producción en esta sesión.

Sin cambios en alta centralizada interaplicaciones, OAuth de correo ni integración Drive; sus estados y dependencias previos continúan. Esta nota documenta y comparte la versión, sin sincronizar automáticamente los historiales de otros chats.



## 21/11/2026 — Auditoría integral de Correspondencia

Solicitud: probar recepción -> respuesta -> envío -> cierre y entregar informe. Recorrido local aislado con datos sintéticos y cabeceras de Vercel: oficio principal + 2 anexos, validación de archivo obligatorio, asignación, disposición con respuesta requerida, atención con evidencia, respuesta vinculada reutilizable, autor/firmante distintos, anexo de respuesta, aprobación, vista/descarga PDF, registro simulado de revisión de firma, preparación de correo con alternativa manual, constancia de envío simulada, trazabilidad en el antecedente, cierre y recuperación tras recarga. Resultado satisfactorio, cero errores JavaScript. 26 pruebas automatizadas de modelo/servidor satisfactorias (22 previas + 4 complementarias, incluidas 2 auxiliares repetidas), con PostgreSQL embebido y migraciones reales; aceptación del proveedor de correo simulada, sin transmisión real.

Hallazgo corregido: el acceso Seguimiento apuntaba a una clase ausente en su tarjeta. Se agregó la referencia, se verificó el desplazamiento animado y se repitió el ciclo completo. Publicado main 14c28921c69317c1fe3244b4f426de99f62b8d17 en soulkernel/Prototipo.Proveedores.KYC desde fix/correspondencia-seguimiento-audit; cinco archivos cotejados. Vercel Deployment has completed. Sin migraciones, permisos nuevos o cambios en expedientes existentes.

Pendiente confirmado por inspección de Supabase en esta sesión: Edge Functions muestra Deploy your first edge function; correspondence-send no está desplegada. El código de envío existe, pero faltan despliegue/configuración y autorización OAuth institucional. El flujo operativo disponible es envío externo manual y registro de constancia. No declarar que descargar/aprobar equivale a enviar. No se probó firma con certificado ni entrega a un destinatario real; el ciclo de escritura completo se realizó localmente, no en Supabase de producción.

Siguiente validación: tras configurar el buzón institucional, ensayo autorizado con firma real y entrega a un destinatario controlado, comprobando adjuntos, acuse y trazabilidad. El informe local detalla etapas, evidencias y límites; no se publican expedientes ni capturas privadas en el repositorio central.


## 21/11/2026 — Directorio documental y recuperación de navegación

Directorio publicado en soulkernel/Prototipo.Proveedores.KYC: implementación 798a97379779a774b98c065545205510462a48fb, corrección 83fac1d0a7369f22984f36e44500f56ed7ec9ae0. Migración 202611210033_records_directory.sql aplicada y verificada en Supabase: conserva documentos, archivos, eventos y referencias; auditoría privada con RLS, RPC heredada sin ejecución directa. Excel completo o filtrado, instituciones/contactos, cambio de autoridad con vigencia e historial, destinatarios fijados en documentos registrados/emitidos. Pruebas previas: 29 comprobaciones satisfactorias, recorrido Edge con 56 registros sintéticos, exportación completa/filtrada, permisos, ES/EN y móvil. Interfaz publicada y diálogo de descarga comprobados; el archivo descargado existe, sin comparación exhaustiva del Excel real en esa sesión. Los datos comerciales vinculados todavía se leen desde Proveedores.

Recarga publicada en main 60cbd980a7482a371c7e37dcb3185b69ada4e755 desde fix/recarga-navegacion-modulos; nueve archivos cotejados y Vercel success confirmado. Conserva módulo, bandeja, filtros/página y registro guardado abierto por pestaña/usuario; vuelve a consultar datos y validar permisos tras autenticación/MFA. Cerrar sesión elimina la ubicación. No guarda respuestas KYC, documentos, tokens ni texto de formularios pendientes en la memoria de navegación. No recupera contenido sin guardar de un oficio nuevo. Corregido Editar en Proveedores: el control de operación ocupada bloqueaba la salida; ahora abre edición o lectura según permisos comerciales existentes. Sin migraciones ni concesiones de acceso en esta corrección.

Pruebas actuales: npm test, 19 satisfactorias; qa-navigation.mjs en Edge aislado con instituciones/contactos, edición comercial, bandeja de borradores, lectura/edición de oficio guardado, Administración/Sedes, filtro y expediente KYC, usuario de consulta y rechazo de una ruta KYC guardada sin autorización. No se repitieron escrituras autenticadas en producción para esta corrección.

Criterio solicitado y analizado, aún sin implementar: Instituciones y contactos debe tener ficha documental propia. Proveedores sirve para precargar datos y conservar una referencia de origen, sin sincronización automática. Editar institución/contacto modifica solamente la ficha documental; actualizar desde Proveedores presenta diferencias para decisión explícita. Migrar los vínculos actuales sin duplicar contrapartes ni alterar destinatarios históricos. Este cambio de estructura requiere la siguiente implementación; no confundirlo con la corrección ya publicada del botón. Mantener pendientes existentes de envío institucional/OAuth sin declararlos resueltos por esta publicación.


## 21/11/2026 — Descarga del directorio por categoría

Publicado main 8f4793cfcb1cc87a72255f023eca5e9610507d9d en soulkernel/Prototipo.Proveedores.KYC desde feat/directorio-descarga-grupos; siete archivos cotejados, Vercel success. Descarga Excel permite Todo el directorio, Proveedores, Instituciones y entidades, Personas naturales y Solo contactos. La búsqueda vigente se aplica por defecto y puede quitarse antes de confirmar. Muestra cantidades, categoría y alcance; cero coincidencias deshabilita descargar. Solo contactos produce únicamente esa hoja, indicando entidad/proveedor y categoría; el resto mantiene dos hojas, ambas con categoría. Conserva todas las páginas, estado de contactos anteriores y valores como texto. Deduplica fichas por identificador, sin fusionar entidades por nombre o correo.

Clasificación actual: proveedor vinculado; institución/entidad no vinculada; contraparte natural independiente. Una autoridad/contacto institucional sigue perteneciendo a su institución. La opción Proveedores cubre los proveedores registrados en este directorio de correspondencia, no importa todos los comerciales. La separación de ficha documental y la clasificación de relaciones múltiples continúan como propuesta pendiente; este cambio implementa exclusivamente la selección de descarga acordada. Sin migraciones, cambios de permisos ni modificaciones de registros reales.

Pruebas satisfactorias: cuatro pruebas automatizadas de directorio (incluyen seguridad/migración/conservación histórica y contenido Excel), Edge con cinco grupos descargados y leídos, combinación con búsqueda, quitar filtro, cero resultados, móvil, inglés y solo lectura. Regresión completa del directorio con 56 fichas, edición, cambio de autoridad, historial y exportación completa/filtrada. Captura móvil inspeccionada. Evidencia local: scripts/qa-directory-groups.mjs y test-results/records/group-*.xlsx y group-export-mobile.png. No se repitió una descarga autenticada de datos reales en producción.
