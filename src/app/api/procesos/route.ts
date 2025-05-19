import { firestore } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Re-define necessary types here or import from a shared location if they become complex
import type { Proceso, Cronograma, DetalleProductoItem, InformacionBasicaNacion, InformacionBasicaBac, MontoDuracionSource, InfoContratoNacion } from '@/app/dashboard/types'; 
import { ProcesoStatus } from '@/app/dashboard/types'; // Removed ProcesoStatusType alias
import { parseFlexibleDate, getProcesoStatus, safeParseJSON, parseMonto } from '@/lib/processoUtils';

interface CronogramaRawData {
    fecha_publicacion?: string;
    fecha_inicio_consultas?: string;
    fecha_fin_consultas?: string;
    fecha_apertura_ofertas?: string; // Nación
    fecha_acto_apertura?: string;    // BAC
    fecha_fin_recepcion_documentos?: string;
    fecha_recepcion_ofertas?: string; // BAC, alternative for fin_recepcion_documentos
}

// Type for elements within procesosRaw array
interface RawDoc {
    id: string;
    [key: string]: any; // Firestore document data can have various fields
}

async function fetchPaginatedData(collectionName: string, limitCount: number, startAfterDocId?: string): Promise<{ procesosRaw: RawDoc[], lastDocId?: string }> {
  if (!firestore) {
    console.error('API Route: Firestore is not initialized.');
    return { procesosRaw: [] };
  }
  try {
    let query = firestore.collection(collectionName).orderBy('__name__').limit(limitCount);
    if (startAfterDocId) {
      const startAfterDoc = await firestore.collection(collectionName).doc(startAfterDocId).get();
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
      }
    }
    const snapshot = await query.get();
    if (snapshot.empty) {
      return { procesosRaw: [] };
    }
    const procesosRaw: RawDoc[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastDocId = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : undefined;
    return { procesosRaw, lastDocId };
  } catch (error) {
    console.error(`API Route: Error fetching paginated data from ${collectionName}:`, error);
    return { procesosRaw: [] };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const source = searchParams.get('source');
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const startAfterDocId = searchParams.get('startAfterDocId') || undefined;

  if (!source || (source !== 'nacion' && source !== 'bac')) {
    return NextResponse.json({ error: 'Invalid source parameter. Must be \'nacion\' or \'bac\'.' }, { status: 400 });
  }

  const collectionName = source === 'nacion' ? 'procesos-nacion' : 'procesos-bac';
  
  const { procesosRaw, lastDocId } = await fetchPaginatedData(collectionName, limit, startAfterDocId);

  const processedProcesos: Proceso[] = procesosRaw.map((doc: RawDoc) => { // Added type for doc
    if (source === 'nacion') {
      const infoBasica = safeParseJSON<InformacionBasicaNacion>(doc.informacion_basica, `api_info_basica_nacion_${doc.id}`);
      const cronogramaRaw = safeParseJSON<CronogramaRawData>(doc.cronograma, `api_cronograma_nacion_${doc.id}`);
      const infoContratoNacionRaw = safeParseJSON<InfoContratoNacion>(doc.info_contrato, `api_info_contrato_nacion_${doc.id}`);

      // Fields to check for filtering
      const nombreProcesoCabecera = infoBasica?.nombre_proceso_cabecera || '';
      const objetoConvocatoria = infoBasica?.objeto || '';

      // Apply filtering for Nación processes
      if (nombreProcesoCabecera.trim() === 'Error al extraer') {
        return null; // Skip this process by returning null, will be filtered out later
      }
      if ((nombreProcesoCabecera.trim() === '-' || nombreProcesoCabecera.trim() === '') && 
          (objetoConvocatoria.trim() === '-' || objetoConvocatoria.trim() === '')) {
        return null; // Skip this process
      }

      const cronogramaParsed: Cronograma | null = cronogramaRaw ? { 
        fecha_publicacion_raw: cronogramaRaw.fecha_publicacion ?? undefined,
        fecha_inicio_consultas_raw: cronogramaRaw.fecha_inicio_consultas ?? undefined,
        fecha_fin_consultas_raw: cronogramaRaw.fecha_fin_consultas ?? undefined,
        fecha_apertura_ofertas_raw: cronogramaRaw.fecha_apertura_ofertas ?? undefined,
        fecha_fin_recepcion_documentos_raw: cronogramaRaw.fecha_fin_recepcion_documentos ?? undefined,
        fecha_publicacion: parseFlexibleDate(cronogramaRaw.fecha_publicacion ?? undefined),
        fecha_inicio_consultas: parseFlexibleDate(cronogramaRaw.fecha_inicio_consultas ?? undefined),
        fecha_fin_consultas: parseFlexibleDate(cronogramaRaw.fecha_fin_consultas ?? undefined),
        fecha_apertura: parseFlexibleDate(cronogramaRaw.fecha_apertura_ofertas ?? undefined),
        fecha_fin_recepcion_documentos: parseFlexibleDate(cronogramaRaw.fecha_fin_recepcion_documentos ?? undefined),
      } : null;
      return {
        id: doc.id,
        fuente: 'NACION',
        codigo_reparticion: doc.codigo_reparticion || '',
        numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso_cabecera || '',
        nombre_proceso: infoBasica?.nombre_proceso_cabecera || '',
        objeto: infoBasica?.objeto || '',
        cronograma_parsed: cronogramaParsed,
        detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `api_detalle_prod_nacion_${doc.id}`),
        status: getProcesoStatus(cronogramaParsed, 'NACION', ProcesoStatus),
        
        modalidad_nacion: infoBasica?.modalidad,
        moneda_nacion: infoBasica?.moneda,
        unidad_operativa_nacion: infoBasica?.unidad_operativa || doc.codigo_reparticion,
        info_contrato_nacion_parsed: infoContratoNacionRaw,

        reparticion_display: doc.codigo_reparticion || '',
      };
    } else { // BAC
      const infoBasica = safeParseJSON<InformacionBasicaBac>(doc.informacion_basica, `api_info_basica_bac_${doc.id}`);
      const cronogramaRaw = safeParseJSON<CronogramaRawData>(doc.cronograma, `api_cronograma_bac_${doc.id}`);
      const cronogramaParsed: Cronograma | null = cronogramaRaw ? { 
        fecha_publicacion_raw: cronogramaRaw.fecha_publicacion ?? undefined,
        fecha_inicio_consultas_raw: cronogramaRaw.fecha_inicio_consultas ?? undefined,
        fecha_fin_consultas_raw: cronogramaRaw.fecha_fin_consultas ?? undefined,
        fecha_acto_apertura_raw: cronogramaRaw.fecha_acto_apertura ?? undefined,
        fecha_fin_recepcion_documentos_raw: (cronogramaRaw.fecha_recepcion_ofertas ?? cronogramaRaw.fecha_fin_recepcion_documentos) ?? undefined,
        fecha_publicacion: parseFlexibleDate(cronogramaRaw.fecha_publicacion ?? undefined),
        fecha_inicio_consultas: parseFlexibleDate(cronogramaRaw.fecha_inicio_consultas ?? undefined),
        fecha_fin_consultas: parseFlexibleDate(cronogramaRaw.fecha_fin_consultas ?? undefined),
        fecha_apertura: parseFlexibleDate(cronogramaRaw.fecha_acto_apertura ?? undefined),
        fecha_fin_recepcion_documentos: parseFlexibleDate((cronogramaRaw.fecha_recepcion_ofertas ?? cronogramaRaw.fecha_fin_recepcion_documentos) ?? undefined),
      } : null;
      const montoDuracionSource = safeParseJSON<MontoDuracionSource>(doc.monto_duracion, `api_monto_duracion_bac_${doc.id}`);
      let montoEstimadoBac: number | null = null, monedaBac: string | null = null, duracionContratoBac: string | null = null;
      if (montoDuracionSource) {
        montoEstimadoBac = parseMonto(montoDuracionSource.monto);
        monedaBac = montoDuracionSource.moneda;
        duracionContratoBac = montoDuracionSource.duracion_contrato;
      }
      return {
        id: doc.id,
        fuente: 'BAC',
        codigo_reparticion: doc.codigo_reparticion || '',
        numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso || '',
        nombre_proceso: infoBasica?.nombre_proceso || '',
        objeto: infoBasica?.objeto || '',
        cronograma_parsed: cronogramaParsed,
        detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `api_detalle_prod_bac_${doc.id}`),
        status: getProcesoStatus(cronogramaParsed, 'BAC', ProcesoStatus),

        procedimiento_seleccion_bac: infoBasica?.procedimiento_seleccion,
        monto_estimado_bac: montoEstimadoBac,
        moneda_bac: monedaBac,
        duracion_contrato_bac: duracionContratoBac,

        reparticion_display: doc.codigo_reparticion || infoBasica?.clase || '',
      };
    }
  }).filter(p => p !== null) as Proceso[]; // Filter out nulls if any parsing fails catastrophically, though safeParseJSON handles it

  // Sort the processedProcesos by fecha_publicacion descending before returning
  processedProcesos.sort((a, b) => {
    const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    return dateB - dateA;
  });

  return NextResponse.json({ procesos: processedProcesos, lastDocId });
} 