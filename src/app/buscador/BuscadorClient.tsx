'use client';

import { useState, Fragment, useMemo } from 'react';
import type { Proceso, DetalleProductoItem } from '@/app/dashboard/types';
import { ProcesoStatus } from '@/app/dashboard/types'; // For getStatusColor and potentially displaying status

// Re-use getStatusColor and ItemsModal from DashboardClient or move to shared utils
// For now, let's copy getStatusColor and define a simplified ItemsModal if needed, or reuse if DashboardClient is lightweight enough to import
// For simplicity, let's copy getStatusColor here. ItemsModal can be added later if detailed view is needed directly from search.

const getStatusColor = (status: ProcesoStatus) => {
  switch (status) {
    case ProcesoStatus.PREVISTO: return 'bg-blue-500';
    case ProcesoStatus.CONSULTAS_ABIERTAS: return 'bg-sky-500';
    case ProcesoStatus.RECEPCION_OFERTAS: return 'bg-teal-500';
    case ProcesoStatus.PROXIMA_APERTURA: return 'bg-yellow-500 text-slate-900';
    case ProcesoStatus.EN_EVALUACION: return 'bg-purple-500';
    case ProcesoStatus.FINALIZADO: return 'bg-green-500';
    case ProcesoStatus.ERROR_FECHA: return 'bg-red-600';
    default: return 'bg-gray-500';
  }
};

const SEARCH_RESULTS_PAGE_SIZE = 50; // Changed from 10 to 50

// Helper to rehydrate date strings from API to Date objects
const rehydrateProcesoDates = (proceso: Proceso): Proceso => {
  if (proceso.cronograma_parsed) {
    const cp = proceso.cronograma_parsed;
    return {
      ...proceso,
      cronograma_parsed: {
        ...cp,
        fecha_publicacion: cp.fecha_publicacion ? new Date(cp.fecha_publicacion as any) : null,
        fecha_inicio_consultas: cp.fecha_inicio_consultas ? new Date(cp.fecha_inicio_consultas as any) : null,
        fecha_fin_consultas: cp.fecha_fin_consultas ? new Date(cp.fecha_fin_consultas as any) : null,
        fecha_apertura: cp.fecha_apertura ? new Date(cp.fecha_apertura as any) : null,
        fecha_fin_recepcion_documentos: cp.fecha_fin_recepcion_documentos ? new Date(cp.fecha_fin_recepcion_documentos as any) : null,
      },
    };
  }
  return proceso;
};

// Modal Component for Items (Copied from DashboardClient.tsx)
interface ItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: DetalleProductoItem[] | null | undefined;
  procesoNombre: string;
}

const ItemsModal = ({ isOpen, onClose, items, procesoNombre }: ItemsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-slate-200 truncate" title={procesoNombre}>Ítems del Proceso: {procesoNombre}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-700"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
          {(!items || items.length === 0) ? (
            <p className="text-slate-400 text-center py-8">No hay ítems detallados para este proceso.</p>
          ) : (
            <table className="min-w-full text-sm text-slate-300">
              <thead className="bg-slate-700 sticky top-0">
                <tr>
                  <th className="p-3 text-left font-semibold text-slate-200">N° Renglón</th>
                  <th className="p-3 text-left font-semibold text-slate-200">Código Ítem</th>
                  <th className="p-3 text-left font-semibold text-slate-200">Descripción</th>
                  <th className="p-3 text-left font-semibold text-slate-200">Cantidad</th>
                  <th className="p-3 text-left font-semibold text-slate-200">Objeto Gasto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {items.map((item, index) => (
                  <tr key={item.numero_renglon || index} className="hover:bg-slate-700/50 transition-colors">
                    <td className="p-3 whitespace-nowrap text-slate-300">{item.numero_renglon || '-'}</td>
                    <td className="p-3 whitespace-nowrap text-slate-300">{item.codigo_item || '-'}</td>
                    <td className="p-3 text-slate-300" title={item.descripcion}>{item.descripcion || '-'}</td>
                    <td className="p-3 whitespace-nowrap text-slate-300">{item.cantidad || '-'}</td>
                    <td className="p-3 whitespace-nowrap text-slate-300">{item.objeto_gasto || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
         <div className="mt-6 text-right">
          <button 
            onClick={onClose} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BuscadorClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Proceso[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastNacionDocId, setLastNacionDocId] = useState<string | undefined>(undefined);
  const [lastBacDocId, setLastBacDocId] = useState<string | undefined>(undefined);
  const [hasMoreNacion, setHasMoreNacion] = useState(true); // Assume more initially until API says otherwise
  const [hasMoreBac, setHasMoreBac] = useState(true);     // Assume more initially

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DetalleProductoItem[] | null | undefined>(null);
  const [selectedProcesoNombre, setSelectedProcesoNombre] = useState('');

  // State for source filter
  const [sourceFilter, setSourceFilter] = useState<'all' | 'NACION' | 'BAC'>('all');

  const handleOpenModal = (proceso: Proceso) => {
    setSelectedItems(proceso.detalle_productos_parsed);
    setSelectedProcesoNombre(proceso.nombre_proceso || proceso.numero_proceso || 'Proceso seleccionado');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItems(null);
    setSelectedProcesoNombre('');
  };

  const handleSearch = async (loadMore = false) => {
    if (!searchTerm.trim() && !loadMore) {
      setSearchResults([]);
      setSubmittedSearchTerm('');
      setLastNacionDocId(undefined);
      setLastBacDocId(undefined);
      setHasMoreNacion(true);
      setHasMoreBac(true);
      return;
    }
    
    const currentQuery = loadMore ? submittedSearchTerm : searchTerm;
    if (!currentQuery.trim()) return; // Don't search if term is empty after trim

    setIsLoading(true);
    setError(null);
    if (!loadMore) {
        setSearchResults([]); // Clear previous results for a new search
        setSubmittedSearchTerm(currentQuery);
        setLastNacionDocId(undefined); // Reset pagination for new search
        setLastBacDocId(undefined);   // Reset pagination for new search
        setHasMoreNacion(true);       // Reset hasMore for new search
        setHasMoreBac(true);        // Reset hasMore for new search
    }

    const nacionStart = loadMore ? lastNacionDocId : undefined;
    const bacStart = loadMore ? lastBacDocId : undefined;

    // Only fetch if there's potentially more data for that source
    const fetchNacion = loadMore ? hasMoreNacion && lastNacionDocId : true;
    const fetchBac = loadMore ? hasMoreBac && lastBacDocId : true;
    
    let url = `/api/buscar?query=${encodeURIComponent(currentQuery)}&limit=${SEARCH_RESULTS_PAGE_SIZE}`;
    if (fetchNacion && nacionStart) url += `&startAfterDocIdNacion=${nacionStart}`;
    if (fetchBac && bacStart) url += `&startAfterDocIdBac=${bacStart}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Error ${response.status}`);
      }
      const data = await response.json();

      // Rehydrate dates before setting state
      const rehydratedProcesos = data.procesos.map(rehydrateProcesoDates);

      setSearchResults(prevResults => {
        const newProcesos = rehydratedProcesos.filter(
          (pNew: Proceso) => !prevResults.some(pOld => pOld.id === pNew.id)
        );
        const combined = [...prevResults, ...newProcesos];
        return combined.sort((a, b) => (b.cronograma_parsed?.fecha_publicacion?.getTime() || 0) - (a.cronograma_parsed?.fecha_publicacion?.getTime() || 0));
      });
      
      setLastNacionDocId(data.lastNacionDocId);
      setLastBacDocId(data.lastBacDocId);
      setHasMoreNacion(!!data.lastNacionDocId);
      setHasMoreBac(!!data.lastBacDocId);

    } catch (e: any) {
      setError(e.message || 'Error al realizar la búsqueda.');
      console.error('Search error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Derived state for displayed results based on filter
  const displayedResults = useMemo(() => {
    if (sourceFilter === 'all') {
      return searchResults;
    }
    return searchResults.filter(proceso => proceso.fuente === sourceFilter);
  }, [searchResults, sourceFilter]);

  const canLoadMore = (hasMoreNacion && lastNacionDocId) || (hasMoreBac && lastBacDocId);

  return (
    <Fragment>
      <section className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ingrese término de búsqueda..."
            className="flex-grow p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={() => handleSearch()} 
            disabled={isLoading || !searchTerm.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && !searchResults.length ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </section>

      {/* Filter Buttons - only show if there are search results */}
      {searchResults.length > 0 && (
        <section className="mb-6 flex justify-center items-center space-x-2 sm:space-x-3">
          <button 
            onClick={() => setSourceFilter('all')} 
            className={`px-4 py-2 text-sm sm:text-base sm:px-5 rounded-lg font-medium transition-all duration-150 ease-in-out 
                        ${sourceFilter === 'all' ? 'bg-purple-600 text-white shadow-md scale-105 ring-2 ring-purple-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}>
            Todos ({searchResults.length})
          </button>
          <button 
            onClick={() => setSourceFilter('NACION')} 
            className={`px-4 py-2 text-sm sm:text-base sm:px-5 rounded-lg font-medium transition-all duration-150 ease-in-out 
                        ${sourceFilter === 'NACION' ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}>
            Nación ({searchResults.filter(p => p.fuente === 'NACION').length})
          </button>
          <button 
            onClick={() => setSourceFilter('BAC')} 
            className={`px-4 py-2 text-sm sm:text-base sm:px-5 rounded-lg font-medium transition-all duration-150 ease-in-out 
                        ${sourceFilter === 'BAC' ? 'bg-green-600 text-white shadow-md scale-105 ring-2 ring-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}>
            BAC ({searchResults.filter(p => p.fuente === 'BAC').length})
          </button>
        </section>
      )}

      {error && (
        <p className="text-center text-red-400 mb-4">Error: {error}</p>
      )}

      {submittedSearchTerm && !isLoading && displayedResults.length === 0 && (
        <p className="text-center text-slate-400 py-10">
          No se encontraron resultados para \"{submittedSearchTerm}\"
          {sourceFilter !== 'all' && ` con el filtro de fuente '${sourceFilter}'`}.
        </p>
      )}

      {displayedResults.length > 0 && (
        <div className="overflow-x-auto bg-slate-800 shadow-xl rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-3 text-left font-semibold">N° Proceso</th>
                <th className="p-3 text-left font-semibold">Nombre/Objeto</th>
                <th className="p-3 text-left font-semibold">Fuente</th>
                <th className="p-3 text-left font-semibold">Repartición</th>
                {/* Add more relevant columns, potentially conditional if needed */}
                <th className="p-3 text-left font-semibold">Modalidad/Proced.</th>
                <th className="p-3 text-right font-semibold">Monto Est. (BAC)</th>
                <th className="p-3 text-left font-semibold">Publicación</th>
                <th className="p-3 text-left font-semibold">Apertura</th>
                <th className="p-3 text-center font-semibold">Ítems</th>
                <th className="p-3 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {displayedResults.map((proceso) => (
                <tr key={proceso.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="p-3 whitespace-nowrap">{proceso.numero_proceso || '-'}</td>
                  <td className="p-3 max-w-xs xl:max-w-md truncate" title={proceso.nombre_proceso || proceso.objeto}>{proceso.nombre_proceso || proceso.objeto || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${proceso.fuente === 'NACION' ? 'bg-blue-700 text-blue-100' : 'bg-green-700 text-green-100'}`}>
                        {proceso.fuente}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">{proceso.reparticion_display || '-'}</td>
                  <td className="p-3 whitespace-nowrap">{proceso.fuente === 'NACION' ? proceso.modalidad_nacion : proceso.procedimiento_seleccion_bac || '-'}</td>
                  <td className="p-3 whitespace-nowrap text-right">
                    {proceso.fuente === 'BAC' && typeof proceso.monto_estimado_bac === 'number' 
                      ? proceso.monto_estimado_bac.toLocaleString('es-AR', { 
                          style: 'currency', 
                          currency: (proceso.moneda_bac || 'ARS').split(' ')[0],
                          minimumFractionDigits: 2 
                        })
                      : '-'
                    }
                  </td>
                  <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_publicacion?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || '-'}</td>
                  <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_apertura?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || '-'}</td>
                  <td className="p-3 text-center">{proceso.detalle_productos_parsed?.length || 0}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button 
                      onClick={() => handleOpenModal(proceso)} 
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={!proceso.detalle_productos_parsed || proceso.detalle_productos_parsed.length === 0}
                    >
                      Ver Ítems ({proceso.detalle_productos_parsed?.length || 0})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isLoading && displayedResults.length > 0 && (
         <p className='text-center mt-4 text-slate-400'>Cargando más resultados...</p>
      )}

      {!isLoading && displayedResults.length > 0 && canLoadMore && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => handleSearch(true)} 
            disabled={isLoading} // isLoading should cover this
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? 'Cargando...' : 'Cargar Más Resultados'}
          </button>
        </div>
      )}
      {!isLoading && submittedSearchTerm && displayedResults.length > 0 && !canLoadMore && (
         <p className='text-center mt-8 text-slate-500'>No hay más resultados para esta búsqueda.</p>
      )}

      <ItemsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        items={selectedItems} 
        procesoNombre={selectedProcesoNombre} 
      />
    </Fragment>
  );
} 