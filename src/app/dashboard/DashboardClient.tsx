'use client';

import { useState, useMemo, Fragment, useEffect } from 'react';
// Import ProcesoStatus along with other types from ./types
import type { Proceso, DetalleProductoItem } from './types'; 
import { ProcesoStatus } from './types'; // Enum needs to be imported directly for use as a value

// DetalleProductoItem is imported, so local definition can be removed if it exists.
// KPICard and getStatusColor helpers remain, getStatusColor will use the imported ProcesoStatus

// Modal Component for Items
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

interface DashboardClientProps {
  initialNacionProcesos: Proceso[];
  initialBacProcesos: Proceso[];
  initialLastNacionDocId?: string;
  initialLastBacDocId?: string;
  searchTerm: string;
}

const PAGE_SIZE = 20; // Same as in page.tsx, can be a shared constant

// Helper to rehydrate date strings from API to Date objects
const rehydrateProcesoDates = (proceso: Proceso): Proceso => {
  if (proceso.cronograma_parsed) {
    const cp = proceso.cronograma_parsed;
    
    const ensureDate = (dateInput: string | number | Date | null | undefined): Date | null => {
      if (!dateInput) return null;
      if (dateInput instanceof Date) return dateInput;
      if (typeof dateInput === 'string' || typeof dateInput === 'number') {
        const d = new Date(dateInput);
        return isNaN(d.getTime()) ? null : d;
      }
      return null;
    };

    return {
      ...proceso,
      cronograma_parsed: {
        ...cp,
        fecha_publicacion: ensureDate(cp.fecha_publicacion),
        fecha_inicio_consultas: ensureDate(cp.fecha_inicio_consultas),
        fecha_fin_consultas: ensureDate(cp.fecha_fin_consultas),
        fecha_apertura: ensureDate(cp.fecha_apertura),
        fecha_fin_recepcion_documentos: ensureDate(cp.fecha_fin_recepcion_documentos),
      },
    };
  }
  return proceso;
};

export default function DashboardClient({ 
  initialNacionProcesos,
  initialBacProcesos,
  initialLastNacionDocId,
  initialLastBacDocId, 
  searchTerm
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'nacion' | 'bac'>('nacion');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DetalleProductoItem[] | null | undefined>(null);
  const [selectedProcesoNombre, setSelectedProcesoNombre] = useState('');

  // State for paginated data - now per source
  const [nacionProcesos, setNacionProcesos] = useState<Proceso[]>(initialNacionProcesos);
  const [bacProcesos, setBacProcesos] = useState<Proceso[]>(initialBacProcesos);
  
  const [lastNacionDocId, setLastNacionDocId] = useState<string | undefined>(initialLastNacionDocId);
  const [lastBacDocId, setLastBacDocId] = useState<string | undefined>(initialLastBacDocId);
  const [isLoadingNacion, setIsLoadingNacion] = useState(false);
  const [isLoadingBac, setIsLoadingBac] = useState(false);
  const [hasMoreNacion, setHasMoreNacion] = useState(!!initialLastNacionDocId);
  const [hasMoreBac, setHasMoreBac] = useState(!!initialLastBacDocId);

  // Update processes if initial props change
  useEffect(() => {
    setNacionProcesos(initialNacionProcesos);
    setBacProcesos(initialBacProcesos);
    setLastNacionDocId(initialLastNacionDocId);
    setLastBacDocId(initialLastBacDocId);
    setHasMoreNacion(!!initialLastNacionDocId);
    setHasMoreBac(!!initialLastBacDocId);
  }, [initialNacionProcesos, initialBacProcesos, initialLastNacionDocId, initialLastBacDocId]);

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

  const filteredProcesos = useMemo(() => {
    const procesosToFilter = activeTab === 'nacion' ? nacionProcesos : bacProcesos;
    if (!searchTerm.trim()) {
      return procesosToFilter;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return procesosToFilter.filter(proceso => {
      if (proceso.nombre_proceso?.toLowerCase().includes(lowerSearchTerm) ||
          proceso.numero_proceso?.toLowerCase().includes(lowerSearchTerm) ||
          proceso.objeto?.toLowerCase().includes(lowerSearchTerm) 
      ) {
        return true;
      }
      if (proceso.detalle_productos_parsed) {
        return proceso.detalle_productos_parsed.some(item => 
          item.descripcion?.toLowerCase().includes(lowerSearchTerm) ||
          item.codigo_item?.toLowerCase().includes(lowerSearchTerm) ||
          item.objeto_gasto?.toLowerCase().includes(lowerSearchTerm)
        );
      }
      return false;
    });
  }, [nacionProcesos, bacProcesos, searchTerm, activeTab]); // Depend on activeTab and respective process arrays

  const handleLoadMore = async (source: 'nacion' | 'bac') => {
    if (source === 'nacion') {
      if (!lastNacionDocId || isLoadingNacion) return;
      setIsLoadingNacion(true);
    } else { // source === 'bac'
      if (!lastBacDocId || isLoadingBac) return;
      setIsLoadingBac(true);
    }

    const startAfter = source === 'nacion' ? lastNacionDocId : lastBacDocId;

    try {
      const response = await fetch(`/api/procesos?source=${source}&limit=${PAGE_SIZE}&startAfterDocId=${startAfter}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch more ${source} data`);
      }
      const data = await response.json();
      
      // Rehydrate dates before setting state
      const rehydratedProcesos = data.procesos.map(rehydrateProcesoDates);

      if (data.procesos && data.procesos.length > 0) {
        if (source === 'nacion') {
          setNacionProcesos(prevProcesos => {
            const newProcesos = rehydratedProcesos.filter(
              (pNew: Proceso) => !prevProcesos.some(pOld => pOld.id === pNew.id)
            );
            return [...prevProcesos, ...newProcesos].sort((a, b) => {
              const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
              const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
              return dateB - dateA; 
            });
          });
          setLastNacionDocId(data.lastDocId);
          setHasMoreNacion(!!data.lastDocId);
        } else { // source === 'bac'
          setBacProcesos(prevProcesos => {
            const newProcesos = rehydratedProcesos.filter(
              (pNew: Proceso) => !prevProcesos.some(pOld => pOld.id === pNew.id)
            );
            return [...prevProcesos, ...newProcesos].sort((a, b) => {
              const dateA = a.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
              const dateB = b.cronograma_parsed?.fecha_publicacion?.getTime() || 0;
              return dateB - dateA; 
            });
          });
          setLastBacDocId(data.lastDocId);
          setHasMoreBac(!!data.lastDocId);
        }
      } else {
        if (source === 'nacion') setHasMoreNacion(false);
        else setHasMoreBac(false);
      }
    } catch (error) {
      console.error(`Error loading more ${source} data:`, error);
      // Optionally set an error state to show to the user
    } finally {
      if (source === 'nacion') setIsLoadingNacion(false);
      else setIsLoadingBac(false);
    }
  };

  return (
    <Fragment>
      {/* <h1 style={{ fontSize: '50px', color: 'red', textAlign: 'center', padding: '50px' }}>AYUDA</h1> */}
      <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Tablero de Mando: Procesos Licitatorios</h1>
        </header>

        {/* Tab Navigation Section */}
        <section className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('nacion')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-150 ease-in-out
                        ${activeTab === 'nacion' 
                          ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}
          >
            Procesos Nación ({nacionProcesos.length})
          </button>
          <button
            onClick={() => setActiveTab('bac')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-150 ease-in-out
                        ${activeTab === 'bac' 
                          ? 'bg-green-600 text-white shadow-lg scale-105 ring-2 ring-green-400' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}
          >
            Procesos BAC ({bacProcesos.length})
          </button>
        </section>

        {/* Process Tables Section - Conditional Rendering based on activeTab */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-slate-700 text-slate-300">
            Detalle de Procesos {activeTab === 'nacion' ? 'Nación' : 'BAC'} ({filteredProcesos.length})
          </h2>
          {(filteredProcesos.length === 0 && !(activeTab === 'nacion' ? isLoadingNacion : isLoadingBac)) ? (
             <p className="text-slate-400 text-center py-10">
              {searchTerm ? `No se encontraron procesos para "${searchTerm}".` : 'No hay procesos para mostrar o cargar.'}
            </p>
          ) : (
            <div className="overflow-x-auto bg-slate-800 shadow-xl rounded-lg">
              {/* Table for Nación */}
              {activeTab === 'nacion' && (
                <div className="overflow-x-auto bg-slate-800 shadow-xl rounded-lg mt-6">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 text-left font-semibold text-slate-200">N° Proceso</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Nombre/Objeto</th>
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Fuente</th> */}
                        <th className="p-3 text-left font-semibold text-slate-200">Repartición</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Modalidad</th>
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Unidad Operativa</th> */}
                        <th className="p-3 text-left font-semibold text-slate-200">Duración Contrato</th>
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Publicación</th> */}
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Apertura</th> */}
                        <th className="p-3 text-center font-semibold text-slate-200">Ítems</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredProcesos.map((proceso) => (
                        <tr key={proceso.id} className="hover:bg-slate-700/50 transition-colors">
                          <td className="p-3 whitespace-nowrap">{proceso.numero_proceso || '-'}</td>
                          <td className="p-3 max-w-xs xl:max-w-md truncate" title={proceso.nombre_proceso || proceso.objeto}>{proceso.nombre_proceso || proceso.objeto || '-'}</td>
                          {/* <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${proceso.fuente === 'NACION' ? 'bg-blue-700 text-blue-100' : 'bg-green-700 text-green-100'}`}>
                                {proceso.fuente}
                            </span>
                          </td> */}
                          <td className="p-3 whitespace-nowrap">{proceso.reparticion_display || '-'}</td>
                          <td className="p-3 whitespace-nowrap">{proceso.modalidad_nacion || '-'}</td>
                          {/* <td className="p-3 whitespace-nowrap">{proceso.unidad_operativa_nacion || '-'}</td> */}
                          <td className="p-3 whitespace-nowrap">{proceso.info_contrato_nacion_parsed?.duracion_contrato || '-'}</td>
                          {/* <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_publicacion?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || '-'}</td> */}
                          {/* <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_apertura?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit\', year: \'numeric\' }) || \'-\'}</td> */}
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
              {/* Table for BAC */}
              {activeTab === 'bac' && (
                <div className="overflow-x-auto bg-slate-800 shadow-xl rounded-lg mt-6">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 text-left font-semibold text-slate-200">N° Proceso</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Nombre/Objeto</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Fuente</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Repartición</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Procedimiento Selección</th>
                        <th className="p-3 text-right font-semibold text-slate-200">Valor Estimado (BAC)</th>
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Moneda (BAC)</th> */}
                        <th className="p-3 text-left font-semibold text-slate-200">Duración Contrato</th>
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Publicación</th> */}
                        {/* <th className="p-3 text-left font-semibold text-slate-200">Apertura</th> */}
                        <th className="p-3 text-center font-semibold text-slate-200">Ítems</th>
                        <th className="p-3 text-left font-semibold text-slate-200">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredProcesos.map((proceso) => (
                        <tr key={proceso.id} className="hover:bg-slate-700/50 transition-colors">
                          <td className="p-3 whitespace-nowrap">{proceso.numero_proceso || '-'}</td>
                          <td className="p-3 max-w-xs xl:max-w-md truncate" title={proceso.nombre_proceso || proceso.objeto}>{proceso.nombre_proceso || proceso.objeto || '-'}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${proceso.fuente === 'NACION' ? 'bg-blue-700 text-blue-100' : 'bg-green-700 text-green-100'}`}>
                                {proceso.fuente}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">{proceso.reparticion_display || '-'}</td>
                          <td className="p-3 whitespace-nowrap">{proceso.procedimiento_seleccion_bac || '-'}</td>
                          <td className="p-3 whitespace-nowrap text-right">
                            {typeof proceso.monto_estimado_bac === 'number' 
                              ? proceso.monto_estimado_bac.toLocaleString('es-AR', { 
                                  style: 'currency', 
                                  currency: (proceso.moneda_bac || 'ARS').split(' ')[0],
                                  minimumFractionDigits: 2 
                                })
                              : '-'
                            }
                          </td>
                          {/* <td className="p-3 whitespace-nowrap">{(proceso.moneda_bac || 'ARS').split(' ')[0]}</td> */}
                          <td className="p-3 whitespace-nowrap">{proceso.duracion_contrato_bac || '-'}</td>
                          {/* <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_publicacion?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit\', year: \'numeric\' }) || \'-\'}</td> */}
                          {/* <td className="p-3 whitespace-nowrap">{proceso.cronograma_parsed?.fecha_apertura?.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit\', year: \'numeric\' }) || \'-\'}</td> */}
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
            </div>
          )}
          {/* Load More Buttons Section - Conditional based on activeTab */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            {activeTab === 'nacion' && hasMoreNacion && (
              <button 
                onClick={() => handleLoadMore('nacion')} 
                disabled={isLoadingNacion}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoadingNacion ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoadingNacion ? 'Cargando Nación...' : 'Cargar Más Procesos de Nación'}
              </button>
            )}
            {activeTab === 'bac' && hasMoreBac && (
              <button 
                onClick={() => handleLoadMore('bac')} 
                disabled={isLoadingBac}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                 {isLoadingBac ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoadingBac ? 'Cargando BAC...' : 'Cargar Más Procesos de BAC'}
              </button>
            )}
          </div>
          {((activeTab === 'nacion' && isLoadingNacion) || (activeTab === 'bac' && isLoadingBac)) && 
            <p className='text-center mt-4 text-slate-400'>Cargando más procesos...</p>}
          
          {activeTab === 'nacion' && !hasMoreNacion && nacionProcesos.length > 0 && (
            <p className='text-center mt-8 text-slate-500'>No hay más procesos de Nación para cargar.</p>
          )}
          {activeTab === 'bac' && !hasMoreBac && bacProcesos.length > 0 && (
            <p className='text-center mt-8 text-slate-500'>No hay más procesos de BAC para cargar.</p>
          )}
        </section>
      </div>
      <ItemsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        items={selectedItems} 
        procesoNombre={selectedProcesoNombre} 
      />
    </Fragment>
  );
} 