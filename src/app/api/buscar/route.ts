import { firestore } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Proceso, Cronograma, DetalleProductoItem, InformacionBasicaNacion, InformacionBasicaBac, MontoDuracionSource, InfoContratoNacion } from '@/app/dashboard/types';
import { ProcesoStatus } from '@/app/dashboard/types';
import { parseFlexibleDate, getProcesoStatus, safeParseJSON, parseMonto } from '@/lib/processoUtils';

const SEARCH_PAGE_SIZE = 10; // Number of items to fetch from each collection for filtering

async function fetchAndFilterData(
    collectionName: string,
    searchTerm: string,
    limitCount: number,
    startAfterDocId?: string
): Promise<{ procesos: Proceso[], lastDocId?: string }> {
    if (!firestore) {
        console.error('API/Buscar: Firestore is not initialized.');
        return { procesos: [] };
    }

    let allMatchingProcesos: Proceso[] = [];
    let currentStartAfterDocId = startAfterDocId;
    let lastProcessedDocId: string | undefined = startAfterDocId;
    let fetchedCount = 0;

    // Loop to fetch enough documents to filter down to limitCount, or until no more docs
    while (fetchedCount < limitCount) {
        let query = firestore.collection(collectionName).orderBy('__name__').limit(SEARCH_PAGE_SIZE * 2); // Fetch more to have enough for filtering

        if (currentStartAfterDocId) {
            const startDoc = await firestore.collection(collectionName).doc(currentStartAfterDocId).get();
            if (startDoc.exists) {
                query = query.startAfter(startDoc);
            } else {
                break; // Start ID doesn't exist, stop
            }
        }

        const snapshot = await query.get();
        if (snapshot.empty) {
            break; // No more documents
        }

        // Explicitly type rawDocs elements for clarity within the next map
        const rawDocs: Array<{ id: string, [key: string]: any }> = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (rawDocs.length === 0) break;
        
        lastProcessedDocId = rawDocs[rawDocs.length - 1].id;

        const source = collectionName === 'procesos-nacion' ? 'NACION' : 'BAC';
        const lowerSearchTerm = searchTerm.toLowerCase();

        const newlyProcessedAndFiltered: Proceso[] = rawDocs.map((doc: { id: string, [key: string]: any }) => { // Explicit type for doc here
            // Process doc into Proceso (similar to other routes)
            let proceso: Proceso | null = null;
            if (source === 'NACION') {
                const infoBasica = safeParseJSON<InformacionBasicaNacion>(doc.informacion_basica, `search_info_basica_nacion_${doc.id}`);
                const cronogramaRaw = safeParseJSON<any>(doc.cronograma, `search_cronograma_nacion_${doc.id}`);
                const infoContratoNacionRaw = safeParseJSON<InfoContratoNacion>(doc.info_contrato, `search_info_contrato_nacion_${doc.id}`);
                const cronogramaParsed: Cronograma | null = cronogramaRaw ? { /* mapping */
                    fecha_publicacion_raw: cronogramaRaw.fecha_publicacion,
                    fecha_inicio_consultas_raw: cronogramaRaw.fecha_inicio_consultas,
                    fecha_fin_consultas_raw: cronogramaRaw.fecha_fin_consultas,
                    fecha_apertura_ofertas_raw: cronogramaRaw.fecha_apertura_ofertas,
                    fecha_fin_recepcion_documentos_raw: cronogramaRaw.fecha_fin_recepcion_documentos,
                    fecha_publicacion: parseFlexibleDate(cronogramaRaw.fecha_publicacion),
                    fecha_inicio_consultas: parseFlexibleDate(cronogramaRaw.fecha_inicio_consultas),
                    fecha_fin_consultas: parseFlexibleDate(cronogramaRaw.fecha_fin_consultas),
                    fecha_apertura: parseFlexibleDate(cronogramaRaw.fecha_apertura_ofertas),
                    fecha_fin_recepcion_documentos: parseFlexibleDate(cronogramaRaw.fecha_fin_recepcion_documentos),
                } : null;
                proceso = {
                    id: doc.id,
                    fuente: 'NACION',
                    codigo_reparticion: doc.codigo_reparticion || '',
                    numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso_cabecera || '',
                    nombre_proceso: infoBasica?.nombre_proceso_cabecera || '',
                    objeto: infoBasica?.objeto || '',
                    cronograma_parsed: cronogramaParsed,
                    detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `search_detalle_prod_nacion_${doc.id}`),
                    status: getProcesoStatus(cronogramaParsed, 'NACION', ProcesoStatus),
                    modalidad_nacion: infoBasica?.modalidad,
                    moneda_nacion: infoBasica?.moneda,
                    unidad_operativa_nacion: infoBasica?.unidad_operativa || doc.codigo_reparticion,
                    info_contrato_nacion_parsed: infoContratoNacionRaw,
                    reparticion_display: doc.codigo_reparticion || '',
                };
            } else { // BAC
                const infoBasica = safeParseJSON<InformacionBasicaBac>(doc.informacion_basica, `search_info_basica_bac_${doc.id}`);
                const cronogramaRaw = safeParseJSON<any>(doc.cronograma, `search_cronograma_bac_${doc.id}`);
                const cronogramaParsed: Cronograma | null = cronogramaRaw ? { /* mapping */
                    fecha_publicacion_raw: cronogramaRaw.fecha_publicacion,
                    fecha_inicio_consultas_raw: cronogramaRaw.fecha_inicio_consultas,
                    fecha_fin_consultas_raw: cronogramaRaw.fecha_fin_consultas,
                    fecha_acto_apertura_raw: cronogramaRaw.fecha_acto_apertura,
                    fecha_fin_recepcion_documentos_raw: cronogramaRaw.fecha_recepcion_ofertas || cronogramaRaw.fecha_fin_recepcion_documentos,
                    fecha_publicacion: parseFlexibleDate(cronogramaRaw.fecha_publicacion),
                    fecha_inicio_consultas: parseFlexibleDate(cronogramaRaw.fecha_inicio_consultas),
                    fecha_fin_consultas: parseFlexibleDate(cronogramaRaw.fecha_fin_consultas),
                    fecha_apertura: parseFlexibleDate(cronogramaRaw.fecha_acto_apertura),
                    fecha_fin_recepcion_documentos: parseFlexibleDate(cronogramaRaw.fecha_recepcion_ofertas || cronogramaRaw.fecha_fin_recepcion_documentos),
                 } : null;
                const montoDuracionSource = safeParseJSON<MontoDuracionSource>(doc.monto_duracion, `search_monto_duracion_bac_${doc.id}`);
                let montoEstimadoBac: number | null = null, monedaBac: string | null = null, duracionContratoBac: string | null = null;
                if (montoDuracionSource) {
                    montoEstimadoBac = parseMonto(montoDuracionSource.monto);
                    monedaBac = montoDuracionSource.moneda;
                    duracionContratoBac = montoDuracionSource.duracion_contrato;
                }
                proceso = {
                    id: doc.id,
                    fuente: 'BAC',
                    codigo_reparticion: doc.codigo_reparticion || '',
                    numero_proceso: doc.numero_proceso || infoBasica?.numero_proceso || '',
                    nombre_proceso: infoBasica?.nombre_proceso || '',
                    objeto: infoBasica?.objeto || '',
                    cronograma_parsed: cronogramaParsed,
                    detalle_productos_parsed: safeParseJSON<DetalleProductoItem[]>(doc.detalle_productos, `search_detalle_prod_bac_${doc.id}`),
                    status: getProcesoStatus(cronogramaParsed, 'BAC', ProcesoStatus),
                    procedimiento_seleccion_bac: infoBasica?.procedimiento_seleccion,
                    monto_estimado_bac: montoEstimadoBac,
                    moneda_bac: monedaBac,
                    duracion_contrato_bac: duracionContratoBac,
                    reparticion_display: doc.codigo_reparticion || infoBasica?.clase || '',
                };
            }
            return proceso;
        })
        .filter(p => p !== null) as Proceso[];

        const filteredChunk = newlyProcessedAndFiltered.filter(proceso => {
            let match = false;
            if (proceso.numero_proceso?.toLowerCase().includes(lowerSearchTerm)) match = true;
            if (proceso.nombre_proceso?.toLowerCase().includes(lowerSearchTerm)) match = true;
            if (proceso.objeto?.toLowerCase().includes(lowerSearchTerm)) match = true;
            if (proceso.detalle_productos_parsed) {
                if (proceso.detalle_productos_parsed.some(item =>
                    item.descripcion?.toLowerCase().includes(lowerSearchTerm) ||
                    item.codigo_item?.toLowerCase().includes(lowerSearchTerm) ||
                    item.objeto_gasto?.toLowerCase().includes(lowerSearchTerm)
                )) match = true;
            }
            return match;
        });

        for (const p of filteredChunk) {
            if (fetchedCount < limitCount) {
                allMatchingProcesos.push(p);
                fetchedCount++;
            } else {
                break;
            }
        }
        currentStartAfterDocId = lastProcessedDocId; // Next fetch starts after the last doc of this chunk
        if (snapshot.docs.length < (SEARCH_PAGE_SIZE * 2)) break; // Reached the end of collection
    }
    // If we couldn't find enough items, lastDocId should signify no more data
    const finalLastDocId = fetchedCount < limitCount && allMatchingProcesos.length < limitCount ? undefined : lastProcessedDocId;

    return { procesos: allMatchingProcesos, lastDocId: finalLastDocId };
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const startAfterDocIdNacion = searchParams.get('startAfterDocIdNacion') || undefined;
    const startAfterDocIdBac = searchParams.get('startAfterDocIdBac') || undefined;

    if (!query) {
        return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    try {
        const { procesos: procesosNacion, lastDocId: newLastNacionId } = await fetchAndFilterData(
            'procesos-nacion',
            query,
            limit,
            startAfterDocIdNacion
        );
        const { procesos: procesosBac, lastDocId: newLastBacId } = await fetchAndFilterData(
            'procesos-bac',
            query,
            limit,
            startAfterDocIdBac
        );

        const combinedProcesos = [...procesosNacion, ...procesosBac];
        // Sort combined results, e.g., by publication date or relevance (not implemented here)
        combinedProcesos.sort((a, b) => {
            const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
            const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
            return dateB - dateA;
        });
        
        // Take top N results after combining and sorting, if a global limit is desired
        // For now, it returns up to `limit` from Nacion + up to `limit` from BAC

        return NextResponse.json({
            procesos: combinedProcesos,
            lastNacionDocId: newLastNacionId,
            lastBacDocId: newLastBacId
        });
    } catch (error) {
        console.error('API/Buscar: Error during search:', error);
        return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
    }
} 