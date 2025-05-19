export enum ProcesoStatus {
  PREVISTO = 'Previsto',
  CONSULTAS_ABIERTAS = 'Consultas Abiertas',
  RECEPCION_OFERTAS = 'Recepción Ofertas',
  PROXIMA_APERTURA = 'Próxima Apertura',
  EN_EVALUACION = 'En Evaluación',
  FINALIZADO = 'Finalizado',
  ERROR_FECHA = 'Error en Fechas',
  DESCONOCIDO = 'Desconocido'
}

export interface Cronograma {
  fecha_publicacion_raw?: string;
  fecha_inicio_consultas_raw?: string;
  fecha_fin_consultas_raw?: string;
  fecha_apertura_ofertas_raw?: string; 
  fecha_acto_apertura_raw?: string; 
  fecha_fin_recepcion_documentos_raw?: string;
  fecha_publicacion?: Date | null;
  fecha_inicio_consultas?: Date | null;
  fecha_fin_consultas?: Date | null;
  fecha_apertura?: Date | null; 
  fecha_fin_recepcion_documentos?: Date | null;
}

export interface DetalleProductoItem {
  numero_renglon: string;
  objeto_gasto: string;
  codigo_item: string;
  descripcion: string;
  cantidad: string;
}

export interface InformacionBasicaNacion {
  numero_proceso_cabecera?: string;
  numero_expediente?: string;
  nombre_proceso_cabecera?: string;
  unidad_operativa?: string;
  objeto?: string;
  modalidad?: string;
  moneda?: string;
}

export interface InfoContratoNacion {
  fecha_inicio_contrato?: string;
  duracion_contrato?: string;
}

export interface InformacionBasicaBac {
  numero_proceso?: string;
  nombre_proceso?: string;
  procedimiento_seleccion?: string;
  objeto?: string;
  moneda?: string;
  encuadre_legal?: string;
  clase?: string;
}

export interface MontoDuracionSource {
  monto: string; 
  moneda: string; 
  duracion_contrato: string;
}

export interface Proceso {
  id: string;
  fuente: 'NACION' | 'BAC';
  numero_proceso: string;
  nombre_proceso: string;
  objeto: string;
  cronograma_parsed: Cronograma | null;
  status: ProcesoStatus;
  detalle_productos_parsed: DetalleProductoItem[] | null | undefined;
  
  codigo_reparticion: string;
  reparticion_display: string;

  modalidad_nacion?: string;
  moneda_nacion?: string;
  unidad_operativa_nacion?: string;
  info_contrato_nacion_parsed?: InfoContratoNacion | null;

  procedimiento_seleccion_bac?: string;
  monto_estimado_bac?: number | null;
  moneda_bac?: string | null;
  duracion_contrato_bac?: string | null;
}

export interface KpiData {
    totalProcesosNacion: number;
    totalProcesosBac: number;
} 