# Decisiones Activas

## Generación de Presupuestos (Nueva)
- **Decisión**: Se implementará como un módulo nuevo en `/presupuestador`.
- **Enfoque**: Renderizado en cliente para previsualización en tiempo real.
- **Formato**: PDF generado a partir de HTML usando `html2pdf.js`.
- **Conversión de Texto**: Se utiliza `numero-a-letras` para convertir montos numéricos a texto en pesos argentinos.
- **Templates**: Los templates de trámites se definen en `src/app/presupuestador/data.ts` como objetos con campos y contenido HTML con placeholders (`{{campo}}`).
- **Tipografía**: Se utiliza **Open Sans** para el cuerpo del presupuesto.
- **Recursos Gráficos**: Se utilizan imágenes estáticas para el membrete (`header.png`) y la firma (`firma.png`).

## Alcance y Navegación
- **Simplificación Extrema**: Se han eliminado físicamente del código los módulos de Dashboard, Buscador y Boletín Oficial, así como la dependencia de Firebase.
- **Foco**: La herramienta se centra exclusivamente en Presupuestador y Comparativo.

## UI/UX
- Seguir patrones de Shadcn UI para formularios (Inputs, Selects).
- Mantener diseño limpio y minimalista.

## Arquitectura de Datos
- **Eliminación de Firebase**: Se ha removido `firebase-admin` y toda conexión a base de datos externa. El proyecto ahora opera con almacenamiento local temporal (para Comparativo) y generación cliente (para Presupuestador).
