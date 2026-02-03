# Registro de Cambios y Progreso

## Tareas Pendientes
- [ ] Implementar checklist para servicios no incluidos que permita pasarlos a incluidos al tildarlos
- [ ] Mejorar UI de ingreso manual con botón de toggle

## Historial de Cambios

### 2026-01-22
- [x] Nuevo Trámite: Se agregó el trámite "Capacitación en licitaciones" con precio base de $1.800.000, texto personalizado desde capacitacion.txt.
- [x] Nuevo Trámite: Se agregó el trámite "Inscripción registros (BAC/COMPRAR/PBAC)" con precio base de $350.000, sin magnitudes.
- [x] Nuevo Trámite: Se agregó el trámite "Solicitud de Fijación de Línea Oficial (DGIUR)" con precio base de $120.000, sin magnitudes.
- [x] Nuevo Trámite: Se agregó el trámite "Transferencia de Habilitación Comercial" con precio base de $850.000, sin magnitudes.
- [x] Nuevo Trámite: Se agregó el trámite "Habilitación Comercial" con 4 magnitudes de superficie (Hasta 200m2 $1.8M, 200-500m2 $2.2M, 500-800m2 $2.6M, >800m2 $3.0M).
- [x] Nuevo Trámite: Se agregó el trámite "Elaboración de Proyecto Ventilación Mecánica" con 4 magnitudes (Micro $1.8M, Menor $2.4M, Media $3.1M, Mayor $4.0M), incluyendo proyecto de ventilación, planilla de cargas y potencias.
- [x] Nuevo Trámite: Se agregó el trámite "Elaboración de Proyecto de instalaciones (Sanitaria Eléctrica Incendios)" con 4 magnitudes ($1.8M, $2.4M, $3.1M, $4.0M), excluyendo arquitectura.
- [x] Nuevo Trámite: Se agregó el trámite "Elaboración de Proyecto de Arquitectura" con 4 magnitudes ($1.8M, $2.4M, $3.1M, $4.0M), incluyendo prefactibilidad y renders.
- [x] Nuevo Trámite: Se agregó el trámite "Regularización de obra en contravención" con 4 magnitudes (Micro $1.9M, Menor $2.6M, Media $3.4M, Mayor $4.2M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Ventilación Mecanica Con plano" con 3 magnitudes (Menor $2.2M, Media $3.0M, Mayor $3.8M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Ventilación Mecanica sin plano" con 3 magnitudes fijas en $1.4M (Micro, Menor, Media).

### 2026-01-21
- [x] Nuevo Trámite: Se agregó el trámite "Registro de Instalación Ventilación Mecánica" con 3 magnitudes (Menor $2.2M, Media $3.0M, Mayor $3.8M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Instalación Complementaria con plano Ajuste" con 3 magnitudes (Menor $2.2M, Media $3.0M, Mayor $3.8M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Obra con plano Ajuste (Plano Unico)" con 4 magnitudes (Micro $1.4M, Menor $2.6M, Media $3.4M, Mayor $4.2M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Instalación Complementaria Obra sin plano" con 3 magnitudes (Menor $1.4M, Media $1.6M, Mayor $1.8M).
- [x] Nuevo Trámite: Se agregó el trámite "Conforme de Obra sin plano (Plano Unico)" con magnitudes Micro ($1.2M) y Resto ($1.4M).

### 2026-01-20
- [x] Nuevos Trámites: Se agregaron los trámites de "Consulta de Plano Antecedente", "Consulta de Usos (DGIUR)", "Consulta Obligatoria DGIUR (Morfología)", "Registro y Permiso de Demolición" y "Registro y Permiso de Micro Obra".
- [x] Nuevo Trámite: Se agregó el trámite "Aviso de Obra" con precio fijo de $900.000.
- [x] Corrección: Se implementó el reset de precio y magnitud al cambiar de trámite seleccionado.
- [x] Nuevo Trámite: Se agregó el trámite "Prefactibilidad Urbanistica Lote" con precio fijo de $180.000.
- [x] Nuevo Trámite: Se agregó el trámite "Análisis de viabilidad de Proyecto" con precio fijo de $250.000.
- [x] Nuevo Trámite: Se agregó el trámite "Registro de Instalación Complementaria" con selección de magnitud (Menor, Media, Mayor) y servicios específicos (Proyecto, Planilla, Plano).
- [x] Mejora UI: Se agregó opción de ingreso manual de monto con toggle en la interfaz.

### 2026-01-19
- [x] Feature: Se implementó la selección de "Magnitud de Obra" (Menor/Media/Mayor) para el trámite "Registro de Etapa de Proyecto".
- [x] Feature: Se implementaron botones de ajuste de precio (Base, +20%, -20%) reemplazando el input editable.
- [x] Update: Se actualizó el precio base del trámite "Registro de Etapa de Proyecto + Permiso de Obra Civil" a $3,400,000.00.
- [x] Refactor: Se eliminaron los trámites anteriores y se dejó solo "Registro de Etapa de Proyecto + Permiso de Obra Civil".
- [x] Feature: Se habilitó la edición manual del contenido generado (WYSIWYG/contentEditable).

### 2026-01-14
- [x] Fix: Se solucionó el corte de contenido en el PDF implementando saltos de página inteligentes.
- [x] Feature: Se agregó soporte para moneda USD en el trámite "Conforme de Instalación Complementaria".
- [x] Feature: Se agregaron los trámites "Consulta de Usos" y "Conforme de Instalación Complementaria".
