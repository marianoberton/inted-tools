# Arquitectura

## Estructura General
El proyecto utiliza **Next.js 15 (App Router)**.

### Organización de Carpetas
- `src/app`: Rutas de la aplicación (páginas y layouts).
- `src/components`: Componentes de UI reutilizables (basados en Shadcn UI).
- `src/lib`: Utilidades y lógica de negocio compartida (procesamiento de Excel, utilidades generales).
- `src/types`: Definiciones de tipos TypeScript globales.
- `public`: Activos estáticos.

## Patrones
- **Client Components vs Server Components**: Se utiliza la distinción de Next.js. Las páginas (`page.tsx`) suelen ser Server Components o envoltorios, mientras que la interactividad reside en componentes cliente (`*Client.tsx`).
- **UI Library**: Shadcn UI (Radix Primitives + Tailwind CSS).
- **Estilos**: Tailwind CSS para todo el estilizado.

## Flujos de Datos
- Las interacciones de usuario ocurren en el cliente.
- Las llamadas a API para procesamiento de archivos (Comparativo) se manejan vía Route Handlers (`src/app/api`).
- La generación de documentos (PDF) en el Presupuestador se realiza en el cliente.
- El procesamiento de Excel en el Comparativo se realiza en el servidor (API Routes) para manejar la lógica de negocio compleja y lectura de archivos.

## Diagrama de Módulos (Alto Nivel)
```mermaid
graph TD
    App[Next.js App] --> Presupuestador[Generador de Presupuestos]
    App --> Comparativo[Comparador de Ofertas]

    Presupuestador --> Form[Formulario de Datos]
    Presupuestador --> Preview[Previsualización HTML]
    Presupuestador --> PDF[Generación PDF]

    Comparativo --> Upload[Carga de Excel]
    Comparativo --> Process[Procesamiento Server-Side]
    Comparativo --> Download[Descarga de Resultados]
    
    Subgraph Libs
        Utils[src/lib/utils]
        ExcelProc[src/lib/excel-processor]
    end
```
