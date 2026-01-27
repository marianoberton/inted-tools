# Registro de Progreso

## Historial
- [2026-01-16] Inicialización del Memory Bank.
- [2026-01-16] Inicio del módulo "Generador de Presupuestos". Requerimiento: Múltiples trámites, template "Prefactibilidad Urbanística", generación PDF, conversión de números a letras.
- [2026-01-16] Implementación base del Presupuestador con template de "Prefactibilidad Urbanística", previsualización HTML, conversión de moneda a texto y descarga de PDF. Agregado enlace en Navbar.
- [2026-01-16] Refactorización de alcance: Desactivación visual de Dashboard, Buscador y Boletín Oficial. La Home ahora muestra Presupuestador y Comparativo.
- [2026-01-16] Ajustes de estilo en Presupuestador: Tipografía Open Sans, integración de imágenes de membrete y firma, ajustes de negrita en destinatario.
- [2026-01-16] Limpieza profunda: Eliminación de código de Dashboard, Buscador y Boletín Oficial. Desinstalación de Firebase y librerías de gráficos no utilizadas. Verificación de build exitoso.
- [2026-01-16] Refinamiento UI Presupuestador: Ajuste de firma (30% más chica), configuración de header full-width (sin márgenes) y ajuste de márgenes en generación PDF para soporte de membrete borde a borde.
- [2026-01-16] Optimización Mobile: Navbar responsive, previsualización con scroll horizontal y dimensiones fijas A4 (210mm x 297mm) para garantizar fidelidad del PDF en dispositivos móviles.
- [2026-01-16] Mejora UX Mobile: Eliminación de scroll horizontal y aprovechamiento de ancho completo. Implementación de diseño fluido responsive para previsualización con `windowWidth: 794` en `html2pdf`.
- [2026-01-16] Integración Git: Resolución de conflicto de merge con actualización de seguridad remota. Se consolidaron los cambios locales (eliminación de módulos, optimización mobile) con la versión remota.
- [2026-01-16] Corrección de formato moneda: Limpieza de sufijos "PESOS 00/100 M.N." generados automáticamente por la librería, dejando solo el texto del monto (ej. "PESOS CIENTO SESENTA MIL ($160.000)").
- [2026-01-16] Refactorización de datos: Implementación de "Campos Comunes" (`fecha`, `razonSocial`, `destinatario`) en `data.ts` y lógica de persistencia de datos al cambiar de trámite en `PresupuestadorClient.tsx`.
- [2026-01-16] Nuevo trámite agregado: "Regularización de Obra en Contravención". Se configuró el template con los campos comunes, domicilio y precio ($3.200.000 + IVA).
- [2026-01-16] Ajuste de estilo: Se eliminó la negrita del campo `domicilio` en todos los templates.
- [2026-01-16] Mejora PDF Multipage: Implementación de Header repetido en cada página y margen inferior (20mm) para evitar cortes de contenido. Se modificó la generación del PDF para inyectar la imagen manualmente en cada hoja y reservar el espacio con márgenes.
- [2026-01-16] Ajuste de Márgenes PDF: Se incrementó el margen superior a 45mm (manteniendo el header en 35mm) para generar un espacio de 10mm entre el encabezado y el contenido en todas las páginas, solucionando el solapamiento visual.
- [2026-01-16] Nuevo trámite agregado: "Registro de Etapa de Proyecto Plano Único". Configurado con los campos comunes y el template específico para este trámite, incluyendo domicilio por defecto y precio base de $2.200.000 + IVA.
- [2026-01-16] Implementación de campos de selección (Dropdown): Se extendió el sistema de tipos para soportar campos `select`.
- [2026-01-16] Nuevo trámite agregado: "Registro de instalación". Incluye un sub-menú (dropdown) para seleccionar el "Tipo de Instalación" (inicialmente "Ventilación Mecánica"). El contenido del presupuesto se adapta dinámicamente según la opción seleccionada.
- [2026-01-16] Nuevo trámite agregado: "Servicios de Capacitación en Licitaciones". Configurado con campos específicos (sin domicilio), defaults para La Emilia / Juan Martín Torrado, y contenido detallado de 3 módulos de capacitación con precio de $1.400.000 + IVA.
- [2026-01-16] Nuevo trámite agregado: "Micro Obra sin encomienda". Incluye configuración de campos para "ALAU TECNOLOGÍA S.A.U." y destinatario "J. Sebastián Mirko". El campo "Domicilio / Objeto" viene pre-cargado con la descripción larga del inmueble "Ámbito Gigena". Precio configurado en $2.400.000 + IVA.
- [2026-01-16] Refactorización lógica de Precios: Actualización de `PresupuestadorClient.tsx` para soportar múltiples campos de tipo `currency` en un mismo trámite, generando automáticamente las variables de texto asociadas (ej. `precioSinPlanos` genera `{{precioSinPlanosTexto}}`).
- [2026-01-16] Nuevo trámite agregado: "Conforme a Obra - Obra Menor/Media/Mayor". Características especiales: Soporte para dos precios simultáneos ("Sin Planos" y "Con Planos") que se muestran en la misma propuesta, ambos editables y con conversión automática a texto. Configuración de datos predeterminados para "ALAU TECNOLOGÍA S.A.U.".
- [2026-01-16] Nuevo trámite agregado: "Consulta de Usos". Configurado con campos comunes y específicos para "Consulta de Usos" con dirección predeterminada en "calle Nicaragua N° 5935, de esta Ciudad" y precio base de $160.000 + IVA.
- [2026-01-16] Implementación de soporte para Dólares (USD): Se actualizó la lógica del generador de presupuestos (`PresupuestadorClient.tsx` y `types.ts`) para soportar campos de moneda con tipo `USD`. Ahora genera el texto "DOLARES ESTADOUNIDENSES [TEXTO] (USD [NUMERO])" en lugar de PESOS.
- [2026-01-16] Nuevo trámite agregado: "Conforme de Instalación Complementaria". Utiliza la nueva funcionalidad de moneda en USD (Precio base 2500 USD), con Razón Social por defecto "FIDEICOMISO DORREGO Y LIBERTADOR".
- [2026-01-16] Corrección de Cortes en PDF: Se habilitó la opción `pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }` en `html2pdf.js` para evitar cortes automáticos dentro de los párrafos y elementos de texto, asegurando que los bloques de contenido no se dividan entre páginas de forma incorrecta.
- [2026-01-16] Implementación de Edición Manual: Se agregó un interruptor (Switch) "Edición Manual" en el previsualizador. Al activarlo, el usuario puede editar directamente el texto del presupuesto (WYSIWYG) antes de generar el PDF. Los cambios manuales se preservan y se incluyen en la descarga, pero se detiene la actualización automática desde el formulario mientras el modo manual esté activo.
- [2026-01-21] Actualización mayor de trámites: Se reemplazaron todos los trámites anteriores por uno único: "Registro de Etapa de Proyecto + Permiso de Obra Civil". Se configuró con precio fijo base de $3.400.000.
- [2026-01-21] Mejora en selección de precios: Se reemplazó el campo de input numérico del precio por un selector de 3 botones: "-20%", "Base" ($3.4M) y "+20%", permitiendo ajustes rápidos sobre el valor estándar.
- [2026-01-21] Configuración de fecha: El campo fecha ahora se inicializa automáticamente con la fecha actual (día de hoy).
- [2026-01-21] Checklist de Servicios Opcionales: Se transformó la lista estática de "Servicios no incluidos" en un checklist interactivo. Al seleccionar un item, este se mueve dinámicamente a la sección de "Servicios incluidos".
- [2026-01-21] Lógica dinámica de secciones: Implementación de lógica para ocultar automáticamente la sección "II. Servicios no incluidos" cuando todos los items han sido seleccionados (pasados a incluidos), y re-numeración automática de la sección "Contraprestación" de III a II en ese caso.
- [2026-01-22] Mejora UI Ingreso Manual: Se reemplazó el campo de ingreso manual permanente por un botón de "toggle" con ícono de lápiz. Al hacer clic, se despliega el campo de entrada numérico con una animación suave, mejorando la limpieza visual de la interfaz.
- [2026-01-22] Corrección en Referencia: Se eliminó el texto dinámico de magnitud ({{magnitudTexto}}) del título de referencia en el template del trámite, dejando solo el texto fijo solicitado.
- [2026-01-22] Cambio de puerto: Se actualizó la configuración de inicio (dev y start) para ejecutarse en el puerto 3002.
- [2026-01-22] Renombrado de Trámite: Se actualizó la etiqueta del trámite único a "Registro y Permiso de Obra" para simplificar su identificación en el selector.




