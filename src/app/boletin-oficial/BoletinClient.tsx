'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BoletinDocument, BoletinKpiData } from './types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { addDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { ChevronDown, ChevronUp, FileText, AlertCircle } from 'lucide-react';

interface BoletinClientProps {
  initialDocuments: BoletinDocument[];
  initialKpiData: BoletinKpiData;
}

const ITEMS_PER_PAGE = 15;

// Define the keys from classification object we want to create filters for
const CLASSIFICATION_FILTER_KEYS = [
  'es_normativa_relevante',
  'aranceles',
  'comercio_exterior',
  'normativa_industrial',
  'regulacion_fiscal',
  'sector_energetico',
  'sectores_impactados'
] as const;

// Type for filter state
type ClassificationFilterKey = typeof CLASSIFICATION_FILTER_KEYS[number];
type ClassificationFiltersState = Record<ClassificationFilterKey, boolean>;

export default function BoletinClient({ initialDocuments, initialKpiData }: BoletinClientProps) {
  useEffect(() => {
    console.log("BoletinClient initialDocuments (first 5):", JSON.stringify(initialDocuments.slice(0,5), null, 2));
    console.log("BoletinClient initialKpiData:", JSON.stringify(initialKpiData, null, 2));
    
    setDocuments(initialDocuments);
    setKpiData(initialKpiData);
  }, [initialDocuments, initialKpiData]);

  const [documents, setDocuments] = useState<BoletinDocument[]>(initialDocuments);
  const [kpiData, setKpiData] = useState<BoletinKpiData>(initialKpiData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganismo, setSelectedOrganismo] = useState<string | 'all'>('all');
  const [selectedDocument, setSelectedDocument] = useState<BoletinDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -90),
    to: new Date(),
  });
  
  // State for collapsible sections in detail view
  const [showFullText, setShowFullText] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  // Initial classification filters state (now boolean based)
  const initialClassificationFilters: ClassificationFiltersState = {
    es_normativa_relevante: false,
    aranceles: false,
    comercio_exterior: false, 
    normativa_industrial: false,
    regulacion_fiscal: false,
    sector_energetico: false,
    sectores_impactados: false
  };
  
  const [classificationFilters, setClassificationFilters] = useState<ClassificationFiltersState>(initialClassificationFilters);

  const handleToggleFilter = (filterKey: ClassificationFilterKey) => {
    setClassificationFilters(prev => ({ 
      ...prev, 
      [filterKey]: !prev[filterKey] 
    }));
    setCurrentPage(1);
  };

  const allOrganismos = useMemo(() => ['all', ...new Set(initialDocuments.map(doc => doc.organismo).filter(Boolean))], [initialDocuments]);

  // Helper function to normalize text for comparison (remove accents, case-insensitive)
  const normalizeText = (text: string | undefined): string => {
    if (!text) return '';
    // Remove accents/diacritics and convert to lowercase
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredDocuments = useMemo(() => {
    // Add debug logging for initial filters
    console.log('Filtering documents with criteria:', { 
      dateRange, 
      selectedOrganismo, 
      searchTerm, 
      classificationFilters 
    });
    
    // Log the first 3 documents with their es_normativa_relevante values 
    console.log('First 3 documents es_normativa_relevante values:',
      documents.slice(0, 3).map(doc => ({
        id: doc.id,
        organismo: doc.organismo,
        es_normativa_relevante: doc.classification?.es_normativa_relevante,
        normalized: normalizeText(doc.classification?.es_normativa_relevante)
      }))
    );
    
    return documents
      .filter(doc => {
        const fechaPublicacion = doc.fecha_publicacion ? new Date(doc.fecha_publicacion) : null;
        const fromDate = dateRange?.from ? new Date(dateRange.from) : null;
        const toDate = dateRange?.to ? new Date(dateRange.to) : null;

        if (fromDate && fechaPublicacion && fechaPublicacion < fromDate) return false;
        if (toDate && fechaPublicacion && fechaPublicacion > toDate) return false;
        return true;
      })
      .filter(doc => selectedOrganismo === 'all' || doc.organismo === selectedOrganismo)
      .filter(doc => {
        if (!searchTerm) return true;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          doc.titulo?.toLowerCase().includes(lowerSearchTerm) ||
          doc.numero_norma?.toLowerCase().includes(lowerSearchTerm) ||
          doc.detalle_texto_completo_pars?.some(p => p.toLowerCase().includes(lowerSearchTerm))
        );
      })
      .filter(doc => {
        // Filter by classification criteria (new button toggle approach)
        
        // Es Normativa Relevante filter
        if (classificationFilters.es_normativa_relevante) {
          const value = normalizeText(doc.classification?.es_normativa_relevante);
          if (value !== 'si') return false;
        }
        
        // Comercio Exterior filter
        if (classificationFilters.comercio_exterior) {
          const value = normalizeText(doc.classification?.comercio_exterior);
          if (!value || !value.includes('relevante')) return false;
        }
        
        // Aranceles filter
        if (classificationFilters.aranceles) {
          const value = normalizeText(doc.classification?.aranceles);
          if (!value || !value.includes('relevante')) return false;
        }
        
        // Normativa Industrial filter
        if (classificationFilters.normativa_industrial) {
          const value = normalizeText(doc.classification?.normativa_industrial);
          if (!value || !value.includes('relevante')) return false;
        }
        
        // Regulacion Fiscal filter
        if (classificationFilters.regulacion_fiscal) {
          const value = normalizeText(doc.classification?.regulacion_fiscal);
          if (!value || !value.includes('relevante')) return false;
        }
        
        // Sector Energetico filter
        if (classificationFilters.sector_energetico) {
          const value = normalizeText(doc.classification?.sector_energetico);
          if (!value || !value.includes('relevante')) return false;
        }
        
        return true;
      });
  }, [documents, searchTerm, selectedOrganismo, dateRange, classificationFilters]);

  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDocuments, currentPage]);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const handleRowClick = (doc: BoletinDocument) => {
    setSelectedDocument(doc);
    setShowFullText(false); // Reset collapsible sections when opening a new document
    setShowMetadata(false);
  };

  const renderParteResolutiva = (parteResolutiva?: { [key: string]: string | undefined; firmantes?: string } | null) => {
    if (!parteResolutiva) return <p className="text-gray-400 italic">No disponible</p>;
    
    // Check if it's an object with properties
    if (typeof parteResolutiva === 'object') {
      const articles = Object.entries(parteResolutiva)
        .filter(([key]) => key !== 'firmantes')
        .map(([key, value]) => (
          <p key={key} className="mb-2">
            <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
          </p>
        ));
      
      return (
        <div>
          {articles.length > 0 ? articles : <p className="text-gray-400 italic">No hay artículos disponibles</p>}
          {parteResolutiva.firmantes && <p className="mt-4"><strong>FIRMANTES:</strong> {parteResolutiva.firmantes}</p>}
        </div>
      );
    }
    
    // If it's not the expected object structure, just return the value as string
    return <p>{String(parteResolutiva)}</p>;
  };

  // Helper for rendering arrays of text paragraphs
  const renderTextArray = (items?: string[] | null) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-400 italic">No hay información disponible</p>;
    }
    
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span className="bg-blue-900 text-white rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs">{index + 1}</span>
            <p className="whitespace-pre-wrap">{item}</p>
          </div>
        ))}
      </div>
    );
  };
  
  const chartDataOrganismo = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredDocuments.forEach(doc => {
        if(doc.organismo) counts[doc.organismo] = (counts[doc.organismo] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredDocuments]);

  const formatFilterKey = (key: string | number) => {
    return String(key).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper for rendering relevance indicator
  const renderRelevanceIndicator = (relevance?: string) => {
    if (!relevance) return <div className="h-4 w-4 rounded-full bg-gray-400"></div>;
    
    const normalizedRelevance = normalizeText(relevance);
    if (normalizedRelevance === 'si') {
      return <div className="h-4 w-4 rounded-full bg-green-500" title="Normativa Relevante"></div>;
    } else {
      return <div className="h-4 w-4 rounded-full bg-red-500" title="Normativa No Relevante"></div>;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-400">Boletín Oficial de la Nación</h1>
      </header>

      {/* KPIs - These reflect overall data from server, charts below reflect filtered data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-300">Total de Documentos (Cargados)</h3>
          <p className="text-3xl font-bold">{kpiData.totalDocumentos}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-300">Documentos Relevantes (Filtrados)</h3>
          <p className="text-3xl font-bold">{filteredDocuments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Buscar</label>
            <Input
              id="search"
              type="text"
              placeholder="Título, norma, contenido..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="organismo-filter" className="block text-sm font-medium text-gray-300 mb-1">Organismo</label>
            <Select value={selectedOrganismo} onValueChange={(value: string) => {setSelectedOrganismo(value); setCurrentPage(1);}}>
              <SelectTrigger id="organismo-filter" className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Todos los organismos" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                {allOrganismos.map(o => <SelectItem key={o} value={o} className="hover:bg-gray-700">{o === 'all' ? 'Todos' : o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="date-range-picker" className="block text-sm font-medium text-gray-300 mb-1">Fecha de Publicación</label>
            <DateRangePicker
              id="date-range-picker"
              value={dateRange}
              onValueChange={(range?: DateRange) => {setDateRange(range); setCurrentPage(1);}}
              className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
        </div>

        {/* Classification Filter Buttons */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-sm font-medium text-gray-300">Filtros de Relevancia:</h3>
            <div className="text-sm text-blue-400 ml-auto">
              Total documentos filtrados: <span className="font-bold">{filteredDocuments.length}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {CLASSIFICATION_FILTER_KEYS.map((filterKey) => {
              const isActive = classificationFilters[filterKey];
              return (
                <Button
                  key={filterKey}
                  variant={isActive ? "default" : "outline"} 
                  className={isActive 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300"}
                  onClick={() => handleToggleFilter(filterKey)}
                  size="sm"
                >
                  {formatFilterKey(filterKey)}
                  {isActive && <span className="ml-1">✓</span>}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Document Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead className="text-blue-300">Fecha Publicación</TableHead>
              <TableHead className="text-blue-300">Organismo</TableHead>
              <TableHead className="text-blue-300">N° Norma</TableHead>
              <TableHead className="text-blue-300">Título</TableHead>
              <TableHead className="text-blue-300 text-center">Relevante</TableHead>
              <TableHead className="text-blue-300">Palabras Clave</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.map((doc, index) => {
              if (index === 0 && currentPage === 1) { // Log only for the first item on the first page
                console.log("First doc in paginatedDocuments.map (BoletinClient.tsx):", JSON.stringify(doc, null, 2));
              }
              return (
                <TableRow key={doc.id} onClick={() => handleRowClick(doc)} className="hover:bg-gray-700 cursor-pointer even:bg-gray-800 odd:bg-gray-850">
                  <TableCell>{doc.fecha_publicacion || 'N/A'}</TableCell>
                  <TableCell>{doc.organismo || 'N/A'}</TableCell>
                  <TableCell>{doc.numero_norma || 'N/A'}</TableCell>
                  <TableCell className="max-w-xs truncate" title={doc.titulo || undefined}>{doc.titulo || 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      {renderRelevanceIndicator(doc.classification?.es_normativa_relevante)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={doc.classification?.keywords_tecnico_legales?.join(', ') || undefined}>
                    {doc.classification?.keywords_tecnico_legales && doc.classification.keywords_tecnico_legales.length > 0 
                      ? doc.classification.keywords_tecnico_legales.join(', ') 
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              );
            })}
             {paginatedDocuments.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                        No se encontraron documentos con los filtros aplicados.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
       {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600"
          >
            Anterior
          </Button>
          <span className="text-gray-300">Página {currentPage} de {totalPages} (Total Coincidencias: {filteredDocuments.length})</span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600"
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Detail Modal - Redesigned with classification data as priority */}
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="bg-gray-800 text-gray-100 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto p-0">
            {/* Header */}
            <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 z-10">
              <DialogHeader>
                <DialogTitle className="text-2xl text-blue-400 mb-2">{selectedDocument.titulo || 'N/A'}</DialogTitle>
                <DialogDescription className="text-sm text-gray-400">
                  {selectedDocument.numero_norma || 'N/A'} - {selectedDocument.organismo || 'N/A'} - Publicado: {selectedDocument.fecha_publicacion || 'N/A'}
                </DialogDescription>
              </DialogHeader>
            </div>
            
            {/* Content Area with improved spacing and organization */}
            <div className="p-6 space-y-6">
              {/* Classification Card - Prominently displayed */}
              {selectedDocument.classification && (
                <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
                  <div className="bg-blue-900 p-3">
                    <h3 className="text-lg font-semibold text-white">Clasificación Detallada</h3>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Relevancia General with indicator */}
                    <div className="bg-gray-700 p-3 rounded flex items-center space-x-3">
                      {renderRelevanceIndicator(selectedDocument.classification?.es_normativa_relevante)}
                      <div>
                        <p className="text-sm font-medium text-gray-300">Normativa Relevante</p>
                        <p className="text-base">{selectedDocument.classification?.es_normativa_relevante || 'No'}</p>
                      </div>
                    </div>

                    {/* Sectores Impactados if available */}
                    {selectedDocument.classification?.sectores_impactados && (
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-sm font-medium text-gray-300">Sectores Impactados</p>
                        <p className="text-base">{selectedDocument.classification.sectores_impactados}</p>
                      </div>
                    )}
                    
                    {/* Other classification categories */}
                    {Object.entries(selectedDocument.classification)
                      .filter(([key]) => 
                        key !== 'es_normativa_relevante' && 
                        key !== 'justificacion' && 
                        key !== 'resumen_ejecutivo' && 
                        key !== 'resumen_tecnico_legal' &&
                        key !== 'palabras_clave' &&
                        key !== 'keywords_tecnico_legales' &&
                        key !== 'sectores_impactados'
                      )
                      .map(([key, value]) => (
                        <div key={key} className="bg-gray-700 p-3 rounded">
                          <p className="text-sm font-medium text-gray-300">{formatFilterKey(key)}</p>
                          <p className="text-base">{typeof value === 'string' ? value : (Array.isArray(value) ? value.join(', ') : 'N/A')}</p>
                        </div>
                      ))}
                      
                    {/* Keywords Técnico-Legales in full width */}
                    {selectedDocument.classification?.keywords_tecnico_legales && selectedDocument.classification.keywords_tecnico_legales.length > 0 && (
                      <div className="bg-gray-700 p-3 rounded md:col-span-2">
                        <p className="text-sm font-medium text-gray-300">Palabras Clave Técnico-Legales</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedDocument.classification.keywords_tecnico_legales.map((keyword, idx) => (
                            <span key={idx} className="bg-blue-900 px-2 py-1 rounded-full text-sm">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Justificación & Resumen Técnico-Legal */}
                  <div className="p-4 space-y-4 border-t border-gray-700">
                    {selectedDocument.classification?.resumen_tecnico_legal && (
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-1">Resumen Técnico-Legal</p>
                        <p className="bg-gray-700 p-3 rounded">{selectedDocument.classification.resumen_tecnico_legal}</p>
                      </div>
                    )}
                    
                    {selectedDocument.classification?.justificacion && (
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-1">Justificación</p>
                        <p className="bg-gray-700 p-3 rounded">{selectedDocument.classification.justificacion}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Basic Document Info */}
              <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-blue-900 p-3">
                  <h3 className="text-lg font-semibold text-white">Información Básica</h3>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><strong className="text-gray-300">ID:</strong> {selectedDocument.id}</div>
                  <div><strong className="text-gray-300">Organismo:</strong> {selectedDocument.organismo || 'N/A'}</div>
                  <div><strong className="text-gray-300">Número de Norma:</strong> {selectedDocument.numero_norma || 'N/A'}</div>
                  <div><strong className="text-gray-300">Fecha Publicación:</strong> {selectedDocument.fecha_publicacion || 'N/A'}</div>
                  {selectedDocument.url_detalle && (
                    <div className="md:col-span-2">
                      <strong className="text-gray-300">URL:</strong>{' '}
                      <a href={selectedDocument.url_detalle} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline break-all">
                        {selectedDocument.url_detalle}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Collapsible Full Text (collapsed by default) */}
              <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
                <button 
                  onClick={() => setShowFullText(!showFullText)} 
                  className="w-full bg-blue-900 p-3 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Texto Completo
                  </h3>
                  {showFullText ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {showFullText && (
                  <div className="p-4 space-y-4">
                    <div>
                      <strong className="text-blue-300 block mb-1">Título:</strong>
                      <p className="bg-gray-700 p-3 rounded text-sm">{selectedDocument.detalle_titulo_header || selectedDocument.titulo || 'N/A'}</p>
                    </div>

                    {selectedDocument.detalle_visto && (
                      <div>
                        <strong className="text-blue-300 block mb-1">Visto:</strong>
                        <p className="whitespace-pre-wrap bg-gray-700 p-3 rounded text-sm">{selectedDocument.detalle_visto}</p>
                      </div>
                    )}

                    {selectedDocument.detalle_considerando && selectedDocument.detalle_considerando.length > 0 && (
                      <div>
                        <strong className="text-blue-300 block mb-1">Considerando:</strong>
                        <div className="bg-gray-700 p-3 rounded text-sm space-y-2">
                          {renderTextArray(selectedDocument.detalle_considerando)}
                        </div>
                      </div>
                    )}

                    {selectedDocument.detalle_parte_resolutiva && (
                      <div>
                        <strong className="text-blue-300 block mb-1">Parte Resolutiva:</strong>
                        <div className="bg-gray-700 p-3 rounded text-sm">{renderParteResolutiva(selectedDocument.detalle_parte_resolutiva)}</div>
                      </div>
                    )}

                    {selectedDocument.detalle_texto_completo_pars && selectedDocument.detalle_texto_completo_pars.length > 0 && (
                      <div>
                        <strong className="text-blue-300 block mb-1">Texto Completo:</strong>
                        <div className="max-h-96 overflow-y-auto bg-gray-700 p-3 rounded text-sm">
                          {renderTextArray(selectedDocument.detalle_texto_completo_pars)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Collapsible Metadata (collapsed by default) */}
              {(selectedDocument.detalle_metadatos && Object.keys(selectedDocument.detalle_metadatos).length > 0) || 
               (selectedDocument.has_attachments && selectedDocument.detalle_attachments_urls && selectedDocument.detalle_attachments_urls.length > 0) ? (
                <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
                  <button 
                    onClick={() => setShowMetadata(!showMetadata)} 
                    className="w-full bg-blue-900 p-3 text-left flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold text-white">Metadatos y Adjuntos</h3>
                    {showMetadata ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  
                  {showMetadata && (
                    <div className="p-4 space-y-4">
                      {selectedDocument.detalle_metadatos && Object.keys(selectedDocument.detalle_metadatos).length > 0 ? (
                        <div>
                          <strong className="text-blue-300 block mb-1">Metadatos Adicionales:</strong>
                          <div className="bg-gray-700 p-3 rounded text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.entries(selectedDocument.detalle_metadatos).map(([key, value]) => (
                              <div key={key}><strong className="font-medium">{key}:</strong> {value}</div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400 italic">
                          <AlertCircle className="h-4 w-4" />
                          <p>No hay metadatos disponibles</p>
                        </div>
                      )}

                      {selectedDocument.has_attachments && selectedDocument.detalle_attachments_urls && selectedDocument.detalle_attachments_urls.length > 0 ? (
                        <div>
                          <strong className="text-blue-300 block mb-1">Adjuntos:</strong>
                          <ul className="list-disc space-y-2 p-3 bg-gray-700 rounded">
                            {selectedDocument.detalle_attachments_urls.map((att, index) => (
                              <li key={index} className="ml-4">
                                <a 
                                  href={att.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-indigo-400 hover:underline flex items-center"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  {att.descripcion || 'Descargar Adjunto'}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400 italic">
                          <AlertCircle className="h-4 w-4" />
                          <p>No hay adjuntos disponibles</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <DialogFooter className="sticky bottom-0 bg-gray-800 p-6 border-t border-gray-700">
              <DialogClose asChild>
                <Button variant="outline" className="bg-gray-600 hover:bg-gray-500 border-gray-500">Cerrar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 