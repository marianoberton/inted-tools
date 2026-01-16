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
