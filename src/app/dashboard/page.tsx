import { firestore } from '@/lib/firebaseAdmin';
// import DashboardClient from './DashboardClient'; // Replaced by DashboardContainer
import DashboardContainer from './DashboardContainer'; // Import DashboardContainer
import type { Proceso, KpiData, Cronograma, DetalleProductoItem, InformacionBasicaNacion, InformacionBasicaBac, MontoDuracionSource, InfoContratoNacion } from './types';
import { ProcesoStatus } from './types'; // Enum needs to be imported directly for use as a value
import { parseFlexibleDate, getProcesoStatus, safeParseJSON, parseMonto } from '@/lib/processoUtils'; // Import helpers

// Define CronogramaRawData here as it's used for parsing
interface CronogramaRawData {
    fecha_publicacion?: string;
    fecha_inicio_consultas?: string;
    fecha_fin_consultas?: string;
    fecha_apertura_ofertas?: string; // Nación
    fecha_acto_apertura?: string;    // BAC
    fecha_fin_recepcion_documentos?: string;
    fecha_recepcion_ofertas?: string; // BAC, alternative for fin_recepcion_documentos
}

// Type for the raw document structure from fetchData
interface RawDoc {
    id: string;
    [key: string]: any; // Firestore document data
}

// --- Helper Functions ---

async function getCollectionCount(collectionName: string): Promise<number> {
  if (!firestore) {
    console.error('Firestore is not initialized for count.');
    return 0;
  }
  try {
    const snapshot = await firestore.collection(collectionName).count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error(`Error fetching count for ${collectionName}:`, error);
    return 0;
  }
}

async function fetchData(collectionName: string, limitCount: number, startAfterDocId?: string ): Promise<{procesos: RawDoc[], lastVisibleDocId?: string}> {
  if (!firestore) {
    console.error('Firestore is not initialized.');
    return { procesos: [] };
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
        console.log(`No documents found in ${collectionName} (or no more documents).`);
        return { procesos: [] };
    }
    
    const procesos: RawDoc[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastVisibleDocId = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : undefined;
    
    return { procesos, lastVisibleDocId };

  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    return { procesos: [] };
  }
}

// --- Main Component (Server Component) ---
export default async function DashboardPage() {
  const PAGE_SIZE = 20; // Define page size

  const totalProcesosNacion = await getCollectionCount('procesos-nacion');
  const totalProcesosBac = await getCollectionCount('procesos-bac');

  const { procesos: procesosNacionRaw_firstPage, lastVisibleDocId: initialLastNacionDocId } = await fetchData('procesos-nacion', PAGE_SIZE);
  const { procesos: procesosBacRaw_firstPage, lastVisibleDocId: initialLastBacDocId } = await fetchData('procesos-bac', PAGE_SIZE);

  const initialNacionProcesos: Proceso[] = [];
  const initialBacProcesos: Proceso[] = [];

  // Process Nacion data (first page)
  procesosNacionRaw_firstPage.forEach((doc: RawDoc) => {
    const infoBasica = safeParseJSON<InformacionBasicaNacion>(doc.informacion_basica, `info_basica_nacion_${doc.id}`);
    const cronogramaRaw = safeParseJSON<CronogramaRawData>(doc.cronograma, `cronograma_nacion_${doc.id}`);
    const infoContratoNacionRaw = safeParseJSON<InfoContratoNacion>(doc.info_contrato, `info_contrato_nacion_${doc.id}`);

    // Fields to check for filtering
    const nombreProcesoCabecera = infoBasica?.nombre_proceso_cabecera || '';
    const objetoConvocatoria = infoBasica?.objeto || '';

    // Apply filtering for Nación processes
    if (nombreProcesoCabecera.trim() === 'Error al extraer') {
      return; // Skip this process
    }
    if ((nombreProcesoCabecera.trim() === '-' || nombreProcesoCabecera.trim() === '') && 
        (objetoConvocatoria.trim() === '-' || objetoConvocatoria.trim() === '')) {
      return; // Skip this process if both effectively lead to a "-" display
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

    initialNacionProcesos.push({
      id: doc.id,
      fuente: 'NACION',
      codigo_reparticion: doc.codigo_reparticion || '',
      numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso_cabecera || '',
      nombre_proceso: infoBasica?.nombre_proceso_cabecera || '',
      objeto: infoBasica?.objeto || '',
      cronograma_parsed: cronogramaParsed,
      detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `detalle_prod_nacion_${doc.id}`),
      status: getProcesoStatus(cronogramaParsed, 'NACION', ProcesoStatus),
      
      // Nación-specific fields
      modalidad_nacion: infoBasica?.modalidad, 
      moneda_nacion: infoBasica?.moneda, 
      unidad_operativa_nacion: infoBasica?.unidad_operativa || doc.codigo_reparticion,
      info_contrato_nacion_parsed: infoContratoNacionRaw,

      reparticion_display: doc.codigo_reparticion || '',
    });
  });

  // Sort initialNacionProcesos by fecha_publicacion descending
  initialNacionProcesos.sort((a, b) => {
    const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    return dateB - dateA;
  });

  // Process BAC data (first page)
  procesosBacRaw_firstPage.forEach((doc: RawDoc) => {
    const infoBasica = safeParseJSON<InformacionBasicaBac>(doc.informacion_basica, `info_basica_bac_${doc.id}`);
    const cronogramaRaw = safeParseJSON<CronogramaRawData>(doc.cronograma, `cronograma_bac_${doc.id}`);
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

    const montoDuracionSource = safeParseJSON<MontoDuracionSource>(doc.monto_duracion, `monto_duracion_bac_${doc.id}`);
    let montoEstimadoBac: number | null = null;
    let monedaBac: string | null = null;
    let duracionContratoBac: string | null = null;

    if (montoDuracionSource) {
        montoEstimadoBac = parseMonto(montoDuracionSource.monto);
        monedaBac = montoDuracionSource.moneda;
        duracionContratoBac = montoDuracionSource.duracion_contrato;
    }

    initialBacProcesos.push({
      id: doc.id,
      fuente: 'BAC',
      codigo_reparticion: doc.codigo_reparticion || '',
      numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso || '',
      nombre_proceso: infoBasica?.nombre_proceso || '',
      objeto: infoBasica?.objeto || '',
      cronograma_parsed: cronogramaParsed,
      detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `detalle_prod_bac_${doc.id}`),
      status: getProcesoStatus(cronogramaParsed, 'BAC', ProcesoStatus),

      // BAC-specific fields
      procedimiento_seleccion_bac: infoBasica?.procedimiento_seleccion,
      monto_estimado_bac: montoEstimadoBac,
      moneda_bac: monedaBac,
      duracion_contrato_bac: duracionContratoBac,

      reparticion_display: doc.codigo_reparticion || infoBasica?.clase || '',
    });
  });

  // Sort initialBacProcesos by fecha_publicacion descending
  initialBacProcesos.sort((a, b) => {
    const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
    return dateB - dateA;
  });

  // Combine initial loads for KPI calculation (temporary, can be tab-specific later)
  // const combinedInitialProcesos = [...initialNacionProcesos, ...initialBacProcesos]; // No longer needed for combined sort here
  
  // combinedInitialProcesos.sort((a, b) => { // This sort is no longer needed as individual arrays are sorted
  //   const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
  //   const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
  //   return dateB - dateA; 
  // });

  const kpiData: KpiData = {
    totalProcesosNacion,
    totalProcesosBac,
  };
  
  if (!firestore) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error de Configuración</h1>
        <p className="text-xl">No se pudo conectar a la base de datos. Verifique la configuración de Firebase.</p>
      </div>
    );
  }
  
  return <DashboardContainer 
    initialNacionProcesos={initialNacionProcesos}
    initialBacProcesos={initialBacProcesos}
    kpiData={kpiData} 
    initialLastNacionDocId={initialLastNacionDocId}
    initialLastBacDocId={initialLastBacDocId}
  />;
}
