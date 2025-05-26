export interface BoletinDocument {
  id: string;
  fecha_publicacion: string;
  seccion: string;
  organismo: string;
  numero_norma: string;
  titulo: string;
  url_detalle: string;
  has_attachments: boolean;
  jurisdiccion: string;
  detalle_titulo_header?: string;
  detalle_fecha_norma?: string;
  detalle_visto?: string;
  detalle_considerando?: string[];
  detalle_parte_resolutiva?: {
    firmantes?: string;
    [key: string]: string | undefined; // For articulos like "articulo_1", "articulo_2"
  };
  detalle_texto_completo_pars?: string[];
  detalle_metadatos?: {
    "Tipo de Norma"?: string;
    "Número de Norma"?: string;
    "Referencia"?: string;
    "Fecha"?: string;
    "Fecha de Publicación"?: string;
    "Organismo"?: string;
    [key: string]: string | undefined; // For any other metadata fields
  };
  detalle_attachments_urls?: Array<{
    descripcion: string;
    url: string;
  }>;
  classification?: {
    aranceles?: string;
    relevancia_general?: string; // e.g., "Alta", "Media", "Baja"
    relevancia_newsletter?: string; // e.g., "Alta", "Media", "Baja"
    regulacion_fiscal?: string;
    palabras_clave?: string[];
    keywords_sectoriales?: string[]; // Older field name
    keywords_tecnico_legales?: string[]; // New field name
    sector_energetico?: string;
    normativa_industrial?: string;
    resumen_ejecutivo?: string;
    resumen_sectorial?: string; // Older field name
    resumen_tecnico_legal?: string; // New field name
    justificacion?: string;
    comercio_exterior?: string;
    es_normativa_relevante?: string; // New field: "No"/"Si"
    sectores_impactados?: string; // New field
    [key: string]: any; // For any other fields within classification
  };
}

export interface BoletinKpiData {
  totalDocumentos: number;
  documentosPorSeccion: Record<string, number>;
  documentosPorOrganismo: Record<string, number>;
} 