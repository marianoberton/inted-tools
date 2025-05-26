import { firestore } from '@/lib/firebaseAdmin';
import { BoletinDocument, BoletinKpiData } from './types';
import BoletinClient from './BoletinClient';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';



async function fetchData(): Promise<{ documents: BoletinDocument[], kpiData: BoletinKpiData }> {
  if (!firestore) {
    console.error("Firestore not initialized");
    return { documents: [], kpiData: { totalDocumentos: 0, documentosPorSeccion: {}, documentosPorOrganismo: {} } };
  }
  const snapshot = await firestore.collection('boletinOficial_nacion').get();
  
  // Add log for snapshot size
  console.log(`Firestore query returned ${snapshot.size} documents from boletinOficial_nacion collection`);
  
  const documents: BoletinDocument[] = [];
  const kpiData: BoletinKpiData = {
    totalDocumentos: 0,
    documentosPorSeccion: {},
    documentosPorOrganismo: {},
  };

  let firstDocLogged = false;
  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data();
    
    // Log field names of first document
    if (!firstDocLogged) {
      console.log("First raw data field names:", Object.keys(data));
    }
    
    // Map directly to the expected structure from what's in Firestore
    const transformedDoc: BoletinDocument = {
      id: doc.id,
      fecha_publicacion: data.fecha_publicacion || '',
      seccion: data.seccion || '',
      organismo: data.organismo || '',
      numero_norma: data.numero_norma || '',
      titulo: data.titulo || '',
      url_detalle: data.url || '',
      has_attachments: data.has_attachments || false,
      jurisdiccion: data.jurisdiccion || '',
      detalle_titulo_header: data.detalle_titulo_header || '',
      detalle_fecha_norma: data.detalle_fecha_norma || null,
      detalle_visto: data.detalle_visto || null,
      detalle_considerando: data.detalle_considerando || [],
      detalle_parte_resolutiva: data.detalle_parte_resolutiva || null,
      detalle_texto_completo_pars: data.detalle_texto_completo_pars || [], 
      detalle_metadatos: data.detalle_metadatos || null,
      detalle_attachments_urls: data.detalle_attachments_urls || null,
      classification: {
        aranceles: data.aranceles || data.classification?.aranceles || '',
        relevancia_general: data.relevancia_newsletter || data.classification?.relevancia_newsletter || '',
        regulacion_fiscal: data.regulacion_fiscal || data.classification?.regulacion_fiscal || '',
        palabras_clave: data.keywords_sectoriales || data.classification?.keywords_sectoriales || [],
        keywords_tecnico_legales: data.keywords_tecnico_legales || data.classification?.keywords_tecnico_legales || [],
        sector_energetico: data.sector_energetico || data.classification?.sector_energetico || '',
        normativa_industrial: data.normativa_industrial || data.classification?.normativa_industrial || '',
        resumen_ejecutivo: data.resumen_sectorial || data.classification?.resumen_sectorial || '',
        resumen_tecnico_legal: data.resumen_tecnico_legal || data.classification?.resumen_tecnico_legal || '',
        justificacion: data.justificacion || data.classification?.justificacion || '',
        comercio_exterior: data.comercio_exterior || data.classification?.comercio_exterior || '',
        es_normativa_relevante: data.es_normativa_relevante || data.classification?.es_normativa_relevante || 'No',
        sectores_impactados: data.sectores_impactados || data.classification?.sectores_impactados || ''
      }
    };

    documents.push(transformedDoc);

    kpiData.totalDocumentos++;
    if (transformedDoc.seccion) {
      kpiData.documentosPorSeccion[transformedDoc.seccion] = (kpiData.documentosPorSeccion[transformedDoc.seccion] || 0) + 1;
    }
    if (transformedDoc.organismo) {
      kpiData.documentosPorOrganismo[transformedDoc.organismo] = (kpiData.documentosPorOrganismo[transformedDoc.organismo] || 0) + 1;
    }

    if (!firstDocLogged) {
      console.log("First raw data from Firestore (page.tsx):", JSON.stringify(data, null, 2));
      console.log("First transformedDoc (page.tsx):", JSON.stringify(transformedDoc, null, 2));
      firstDocLogged = true;
    }
  });

  // Add summary log
  console.log(`Transformed ${documents.length} documents with these field counts:`);
  const fieldCounts = {
    organismo: documents.filter(d => d.organismo).length,
    titulo: documents.filter(d => d.titulo).length,
    numero_norma: documents.filter(d => d.numero_norma).length,
    fecha_publicacion: documents.filter(d => d.fecha_publicacion).length,
    classification: documents.filter(d => d.classification).length
  };
  console.log(fieldCounts);

  return { documents, kpiData };
}

export default async function BoletinOficialPage() {
  const { documents, kpiData } = await fetchData();
  return <BoletinClient initialDocuments={documents} initialKpiData={kpiData} />;
}

export const dynamic = 'force-dynamic'; 