# Correspondencia GLF: propuesta de organización visual

Fecha: 19 de noviembre de 2026.
Estado: análisis y propuesta para revisar en la siguiente sesión. No implementado ni desplegado por esta revisión.

## 1. Alcance y criterio de prevalencia

El usuario entregó los manuales Quipux de entrada y salida de 2021 para estudiar pantallas, ubicación de botones, navegación y secuencia de interacción. No solicitó sustituir el procedimiento GLF por el de Quipux. Los acuerdos GLF prevalecen sobre las instrucciones de esos manuales.

Se propone reorganizar el módulo Correspondencia existente, dentro de Operaciones/KYC; no crear otra aplicación, otro usuario ni una base documental paralela. Se mantienen la identidad compartida, MFA, permisos, español/inglés y línea gráfica GLF. La propuesta requiere revisión antes de implementarse.

## 2. Fuentes y evidencia

Fuentes conservadas byte a byte en `REFERENCIAS_QUIPUX_2021/`; `fuentes.json` registra origen, páginas y SHA-256. Las copias y sus capturas son material local de referencia: no se incorporan al repositorio público.

- Entrada: `Manual_UsuarioFinal_Bandeja-de-Entrada-04-10-2021-MP-publicado-signed.pdf`, 69 páginas.
- Salida: `Manual-de-usuario-QUIPUX-Bandeja-de-Salida-04-10-2021-JL-publicado-signed.pdf`, 97 páginas.
- Se extrajo e indexó el texto de las 166 páginas. Se renderizaron 20 páginas relevantes y se inspeccionaron sus paneles, ampliando las pantallas clave. Esto no constituye una inspección visual exhaustiva de cada página.
- Contraste con los contextos locales y código vigente: `records-ui.js`, `records-model.js`, `records-followup.js`, `records.css` y contratos documentales existentes. El despliegue registrado en el contexto es main `cb7c15b500eb40018876a2b59e2505eb11e6abc8`; esta revisión no repitió las pruebas de producción ni efectuó cambios funcionales.

Las referencias siguientes corresponden al número de página del PDF, contado desde la primera página. Describen la versión histórica suministrada, no una verificación del Quipux actual.

| Fuente | Páginas | Aporte a GLF |
|---|---|---|
| Entrada | 17–23, figura 10 en 18 | Registro con encabezado compacto, participantes, asunto y resumen; separar en GLF el archivo principal de los anexos. |
| Entrada | 26–30, figura 25 en 26 | Selector con búsqueda, resultados y destinatarios seleccionados. |
| Entrada | 33–38 | Acciones del documento y diálogo de reasignación con responsable, plazo y comentario. |
| Entrada | 44–45 | Recorrido con fecha, acción y comentario; priorizar las disposiciones en GLF. |
| Entrada | 53–58 | Filtros y carga del documento digitalizado; integrar la carga en el ingreso GLF. |
| Salida | 16–19 | Acciones arriba, participantes y asunto compactos, cuerpo como área dominante. |
| Salida | 20–25 | Gestión de anexos y opciones de impresión; tomar la tabla de archivos, no multiplicar configuraciones. |
| Salida | 26–31 | Selector de destinatarios, vista previa y guardado del borrador. |
| Salida | 35–42 | Reasignación y recorrido; no trasladar el procedimiento de firmar/enviar de Quipux. |
| Salida | 48–56 | Bandejas, acciones contextuales, respuesta y navegación. |
| Salida | 62–66 | Distinguir pendientes de despacho, errores de envío y reasignaciones. |

## 3. Diagnóstico de la interfaz GLF

Ya existen borradores, editor con alineación y negrita, anexos debajo, recepción diferenciada, seguimiento, disposiciones y respuestas relacionadas. No corresponde reconstruir esas funciones desde cero.

La distribución actual acumula encabezados, tarjetas y accesos verticales antes del trabajo principal. La hoja tiene márgenes y encabezado amplios; junto con los metadatos puede desplazar el inicio de escritura fuera de la primera pantalla. Los listados separan entrada/salida, pero todavía no ofrecen la organización lateral de bandejas que el usuario mostró. El seguimiento existe, aunque debe ser más fácil llegar a él sin recorrer todo el documento.

El problema predominante es de jerarquía visual y navegación. La reorganización básica no requiere duplicar documentos, contactos, estados ni añadir una tabla por bandeja.

## 4. Esquema de pantalla propuesto

```text
Encabezado global GLF · módulos · usuario · idioma
┌──────────────────────┬───────────────────────────────────────────────────┐
│ CORRESPONDENCIA      │ Bandeja o número · asunto breve · estado         │
│                      │ Acciones del contexto, con icono y texto         │
│ Oficios de entrada   ├───────────────────────────────────────────────────┤
│  Registrar recibido  │ En bandejas: búsqueda, filtros y tabla           │
│  Todos / En atención │                                                   │
│  Cerrados            │ En salida: Para / Copia / Suscribe / Asunto       │
│                      │ Barra de formato                                  │
│ Oficios de salida    │ Hoja amplia para redactar o leer                  │
│  Crear oficio        │                                                   │
│  Borradores          │ En entrada: asunto, resumen y oficio principal   │
│  Para firma          │                                                   │
│  Por enviar          │ Anexos, siempre debajo del contenido              │
│  Enviados            │ Seguimiento y disposiciones                       │
│  Todos               │                                                   │
│ Instituciones y     │                                                   │
│ contactos            │                                                   │
└──────────────────────┴───────────────────────────────────────────────────┘
```

Es una distribución propuesta, no una captura implementada. Menú lateral de aproximadamente 220–240 px en escritorio, área central flexible; en pantallas estrechas, selector de bandeja o panel plegable. Mantener el encabezado GLF y sus colores, fuentes, botones y estados de foco. No copiar los grises, naranjas, tipografía pequeña ni iconos bitmap antiguos de Quipux.

El menú principal conserva todos los módulos visibles y deshabilita los no autorizados. Las bandejas documentales y sus conteos respetan la lectura autorizada: no revelar existencia, títulos ni cantidades de documentos reservados a quien no puede leerlos. Una función no implementada no se presenta como operativa.

## 5. Bandejas y estados: vistas de los mismos documentos

| Vista propuesta | Criterio sobre datos existentes | Observación |
|---|---|---|
| Entrada / Todos | `direction=incoming` | Incluye estados legibles; filtro de estado adicional. |
| Entrada / En atención | `received`, `assigned` | Distinguir recibido sin asignar de asignado; responsable y plazo visibles. |
| Entrada / Cerrados | `closed` | El cierre no se deduce de que exista una respuesta. |
| Entrada / Registro incompleto | `draft` | Acceso secundario dentro de filtros, conservando la posibilidad de terminar cargas. |
| Salida / Borradores | `draft` | Retomar el mismo documento, sin numeración oficial anticipada. |
| Salida / Para firma | `review`, `prepared` | Mantener etiquetas diferenciadas dentro de la vista. |
| Salida / Por enviar | `signed` | Firmado pendiente de despacho; no confundir con un fallo de envío. |
| Salida / Enviados | `sent` | Basado en despacho confirmado o constancia registrada. |
| Salida / Todos | `direction=outgoing` | Permite consultar también cerrados y anulados. |

No se añade un estado por cada botón. La condición de atención y relación con la respuesta se deriva de los eventos y documentos ya relacionados. Las reasignaciones no convierten un oficio entrante en saliente ni lo colocan como «Enviado».

La API de listado debe admitir los conjuntos de estados necesarios: no filtrar únicamente los resultados de una página descargada. Conteos y paginación deben usar el mismo predicado autorizado. No introducir «Leído/No leído» hasta disponer de una implementación real por usuario; no inferirlo del estado documental.

## 6. Listado y búsqueda

Primera fila: una búsqueda por número interno, referencia externa, asunto o contraparte; botón Buscar y botón Limpiar filtros. Fechas, responsable y estado en «Más filtros», evitando una franja alta permanente. Indicar si las fechas corresponden a recepción o emisión. No trasladar restricciones históricas de Quipux sobre intervalos de búsqueda.

Columnas prioritarias: número, remitente/destinatario, asunto, fecha, estado y responsable/plazo cuando corresponda. El asunto debe tener más espacio que los códigos. Texto completo accesible al abrir o expandir; color acompañado de una etiqueta, no como único significado.

Guardar por bandeja la búsqueda, filtros, página y posición de regreso. Al abrir un documento y volver no debe perderse la consulta. Usar paginación de servidor y peticiones cancelables para que una respuesta antigua no reemplace la consulta más reciente.

Abrir una fila lleva al documento. Mantener las acciones específicas en su barra contextual. No introducir selección múltiple para aprobar, firmar, enviar o eliminar: añade riesgo y no responde al alcance acordado.

## 7. Creación y edición de salida

1. «Crear oficio» abre una superficie de trabajo, con los datos imprescindibles arriba y el editor inmediatamente debajo.
2. «Suscribe» muestra al usuario actual si está autorizado. «Cambiar firmante» abre la selección de personas autorizadas. Autor y firmante siguen siendo conceptos diferentes.
3. «Para» y «Copia» usan el directorio existente. En un selector: búsqueda arriba, resultados al centro y selección visible debajo; reutilizar proveedor/institución/contacto sin crear otra cuenta de usuario.
4. Asunto a todo el ancho. Antecedente únicamente cuando existe, con acceso al oficio de origen. Fecha, sede y siglas automáticas se presentan como información compacta, no como campos que deban rellenarse.
5. Hoja amplia y continua con barra de formato de iconos accesibles. Reducir el encabezado y márgenes excesivos en pantalla para dejar visible el cuerpo. La vista previa PDF conserva el diseño formal aprobado y la paginación real.
6. Anexos a todo el ancho después del cuerpo. El acceso «Anexos» de arriba desplaza a esta sección; no la duplica ni la oculta en otra pestaña.

Barra de acciones estable: «Guardar borrador», «Vista previa», acción de remisión/aprobación que corresponda y «Volver». Las acciones de firma y despacho se habilitan según estado y permisos. Evitar un genérico «Aceptar» y evitar «Firmar y enviar» como una sola operación.

Mantener negrita y alineaciones ya disponibles, selección y cursor después de cada acción, atajos accesibles y pegado seguro. Deshacer/rehacer puede añadirse solo después de comprobar su consistencia con edición y PDF. No incorporar fuentes, colores, tablas, imágenes o HTML libre únicamente porque aparecen en Quipux; el contrato actual de texto y formato no los representa.

La vista previa debe usar el motor PDF existente y los datos actuales del borrador, sin aprobar, numerar o enviar como efecto secundario. Mostrar claramente cambios pendientes de guardar. Revisar las cargas pendientes antes de producir una versión definitiva. No imitar el guardado implícito de Quipux al abrir una ventana emergente.

Guardar un borrador permite datos parciales conforme a las reglas existentes. Salir con cambios conserva el diálogo de guardar/descartar/seguir editando. No anunciar «Guardado» antes de la confirmación del servidor ni almacenar documentos reservados en caché persistente por introducir una nueva navegación.

## 8. Recepción de oficios externos

El ingreso conserva su propio tratamiento: registrar un documento recibido, no redactar su contenido. Datos compactos: remitente, referencia de origen, fecha del oficio, fecha/hora de recepción y asunto. El número GLF es independiente de la referencia del remitente y se asigna conforme al flujo vigente, una vez completadas las cargas requeridas.

Un control inequívoco «Oficio principal PDF» y, por separado, «Anexos opcionales». No adoptar el checkbox de Quipux que convierte un anexo en «imagen del documento». Se mantienen PDF, 20 MiB por archivo y validación vigente; no trasladar sus antiguos límites de 2 MB o formatos obsoletos.

En lectura: asunto y resumen primero; botón «Ver oficio» para cargar únicamente el PDF principal cuando se solicite. Puede abrir un visor integrado amplio, con alternativa de descarga si el navegador no lo soporta. Los anexos permanecen debajo como lista, sin abrir todos sus archivos automáticamente. El visor usaría acceso autenticado temporal, carga diferida y liberación del recurso al salir; nunca una URL pública permanente.

Las versiones anteriores quedan accesibles sin desplazar el archivo vigente. Registrar o reemplazar el principal no borra evidencia previa. La recepción y asignación siguen restringidas a quienes tengan los permisos ya acordados.

## 9. Lectura, seguimiento y respuesta

En lectura se mantiene el mismo orden espacial: documento, anexos, seguimiento. Una barra corta «Documento · Anexos · Seguimiento» desplaza a cada sección; esta opción evita contradecir el acuerdo de mantener anexos debajo y no exige tres vistas duplicadas.

«Seguimiento y disposiciones» destaca responsable actual, plazo, última disposición y respuesta relacionada. Cada actuación muestra quién dispuso, a quién, qué solicitó, cuándo y su evidencia si existe. El registro técnico queda desplegable. La fecha sola nunca sustituye la descripción de lo actuado.

«Asignar» o «Reasignar» abre un diálogo compacto con persona, plazo y disposición. «Responder» crea o recupera el borrador relacionado existente, toma destinatario y referencia del antecedente y prepara una introducción editable. No copia todo el oficio original ni sus destinatarios en copia sin revisión. «Ver antecedente» respeta permisos.

El usuario puede seguir leyendo o editando en la misma distribución. No cerrar el ingreso porque se creó, aprobó o firmó una respuesta: atender, responder, despachar y cerrar tienen efectos diferentes.

## 10. Qué se conserva y qué no se incorpora

Se conserva el procedimiento GLF: borrador → revisión/aprobación → PDF preparado → firma externa → carga del PDF firmado → despacho o constancia manual según configuración → seguimiento/cierre. Las transiciones exactas continúan regidas por la lógica vigente, no por el dibujo de la interfaz.

También se mantienen numeración anual acordada, siglas de área/sede/persona, fecha y sede automáticas de salida, archivo principal y versiones, anexos vinculados, privacidad y atribuciones. El PDF institucional aprobado conserva logotipo, contenido, anexos, copias, firma y paginación; la adaptación de pantalla no lo rediseña.

No se trasladan: memorandos y trámites internos de Quipux; impresión y traslado físico obligatorios; firma/envío combinados; comprobantes y códigos de barras; números temporales o sufijos Quipux; borrado de expedientes; un módulo completo de tareas, etiquetas o carpetas; opciones extensas de impresión; límites de 250 caracteres o tres páginas. El código GLF revisado admite asunto de 300 caracteres y cuerpo de 60.000 caracteres; no se cambian por esta referencia.

La existencia de carpetas en Quipux no significa que Drive esté integrado. Gmail/Drive y las demás integraciones conservan su estado real registrado en contexto. Esta propuesta no activa servicios, delegaciones ni nuevos permisos.

## 11. Implementación futura y compatibilidad

Orden recomendado, pendiente de aprobación:

1. Contenedor de Correspondencia y bandejas, sin alterar el menú global; conservar consultas y regreso.
2. Unificar barras contextuales y compactar metadatos; reorganizar edición y lectura sin cambiar contratos.
3. Selector de participantes y vista previa; visor bajo demanda del oficio principal.
4. Optimizar acceso a seguimiento y filtros; pruebas de permisos, paginación, borradores, PDF y dispositivos.

Reutilizar documentos, partes/contactos, destinatarios, archivos, eventos, revisiones y despachos existentes. Las bandejas son consultas, no copias. No añadir una columna por control visual. Si hacen falta filtros agrupados o conteos, ampliar consultas autorizadas y sus pruebas de servidor; la interfaz por sí sola no garantiza un listado correcto.

Conservar `body` y `body_format`, estilos permitidos por CSP y generación PDF. Cualquier nueva herramienta de formato exige persistencia, validación y reproducción equivalentes en PDF antes de habilitarse. Cargar visor/editor solo cuando se necesitan y no descargar anexos al abrir la bandeja.

Antes de publicar la implementación futura: releer contextos vigentes, verificar destino `soulkernel/Prototipo.Proveedores.KYC`, crear rama específica de interfaz de correspondencia y revisar cambios concurrentes. El portal `soulkernel/GLF` solo recibe la referencia de continuidad compartida. La raíz local contiene documentos reservados y nunca se publica íntegra.

## 12. Criterios de aceptación para la siguiente etapa

- Entrada y salida inequívocas, con acciones y búsquedas independientes.
- Al abrir y volver, recuperar filtros, página y posición; conteos compatibles con permisos y paginación.
- En escritorio de 1366 y 1920 px, datos compactos y cuerpo de escritura visible sin atravesar tarjetas vacías; móvil de 390 px sin pérdida de acciones.
- Teclado, foco visible, lectores de pantalla y zoom 200 %; iconos con nombre accesible y texto en acciones de negocio.
- Centrar, justificar y poner negrita permiten seguir escribiendo; persistencia, recarga y PDF conservan el formato.
- Vista previa no asigna número, aprueba, firma, envía ni duplica eventos.
- Anexos debajo tanto en lectura como edición; el visor muestra exclusivamente el oficio principal seleccionado.
- Registro parcial y reintento de cargas no generan documentos duplicados ni pierden anexos.
- Responder reutiliza borrador autorizado; referencia y confidencialidad conservadas.
- Firma no equivale a despacho; un error o resultado incierto de correo no se presenta como envío confirmado ni provoca reenvío ciego.
- Menú visible y operaciones protegidas en servidor; sin exposición de títulos, conteos o archivos no autorizados.
- Español/inglés, cierre de sesión, guardado pendiente y regreso funcionan sin perder el trabajo.

## 13. Punto de reanudación

Análisis listo. No falta contexto indispensable para presentar esta distribución. La siguiente sesión debe revisar esta propuesta y, con autorización, implementar primero bandejas y superficie de trabajo. No se modificaron aplicación, Supabase, permisos, correos ni despliegue Vercel en esta revisión. Las pruebas citadas de implementaciones anteriores no se presentan como pruebas de esta propuesta.
