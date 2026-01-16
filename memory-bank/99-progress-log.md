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
- [2026-01-16] Mejora UX Mobile: Eliminación de scroll horizontal y aprovechamiento de ancho completo. Implementación de diseño fluido responsive para previsualización con `windowWidth: 794` en `html2pdf` para garantizar que el PDF final conserve el formato de escritorio/A4 independientemente de la vista móvil. Ajuste de paddings globales para mayor espacio útil.
