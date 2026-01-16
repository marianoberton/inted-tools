'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TRAMITES } from './data';
import { PresupuestoData } from './types';
// @ts-expect-error: numero-a-letras does not have types
import { NumerosALetras } from 'numero-a-letras';

export default function PresupuestadorClient() {
  const [selectedTramiteId, setSelectedTramiteId] = useState<string>('');
  const [formData, setFormData] = useState<PresupuestoData>({});
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedTramite = TRAMITES.find(t => t.id === selectedTramiteId);

  // Initialize form data when template changes
  useEffect(() => {
    if (selectedTramite) {
      setFormData(prev => {
        const newData: PresupuestoData = { ...prev };
        
        selectedTramite.fields.forEach(field => {
          // If the field doesn't have a value in current state, set its default
          // This preserves values for common fields (fecha, razonSocial, destinatario) when switching templates
          if (newData[field.name] === undefined || newData[field.name] === '') {
            newData[field.name] = field.defaultValue || '';
          }
        });
        
        return newData;
      });
    }
  }, [selectedTramite]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cleanAmountText = (text: string) => {
    return text.replace(/PESOS/g, '')
               .replace(/00\/100/g, '')
               .replace(/M\.N\./g, '')
               .trim();
  };

  const getProcessedContent = () => {
    if (!selectedTramite) return '';
    let content = selectedTramite.content;

    // Replace standard fields
    selectedTramite.fields.forEach(field => {
      let value = formData[field.name] || '';
      
      // Special formatting for specific fields
      if (field.name === 'fecha' && value) {
         // Format date: 2025-11-06 -> 6 de noviembre de 2025
         const date = new Date(value);
         // Adjust for timezone offset to avoid previous day
         const userTimezoneOffset = date.getTimezoneOffset() * 60000;
         const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
         
         value = adjustedDate.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      
      content = content.replace(new RegExp(`{{${field.name}}}`, 'g'), String(value));

      if (field.type === 'currency' && value) {
        const num = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num)) {
          const rawText = NumerosALetras(num).toUpperCase();
          const text = cleanAmountText(rawText);
          let formattedPrice = '';
          
          if (field.currencyType === 'USD') {
            formattedPrice = `DOLARES ESTADOUNIDENSES ${text} (USD ${num.toLocaleString('es-AR')})`;
          } else {
            formattedPrice = `PESOS ${text} ($${num.toLocaleString('es-AR')})`;
          }
          
          content = content.replace(new RegExp(`{{${field.name}Texto}}`, 'g'), formattedPrice);
        } else {
          content = content.replace(new RegExp(`{{${field.name}Texto}}`, 'g'), '');
        }
      }
    });

    return content;
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    // Dynamically import html2pdf
    const html2pdf = (await import('html2pdf.js')).default;

    // Helper to load image
    const getBase64ImageFromUrl = async (imageUrl: string) => {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
    };

    try {
      const headerImgData = await getBase64ImageFromUrl('/header.png');

      // Clone element to manipulate without affecting view
      const element = previewRef.current.cloneNode(true) as HTMLElement;
      
      // Remove header image from HTML content (it will be added as fixed header per page)
      const headerImg = element.querySelector('img[alt="Membrete"]');
      if (headerImg) {
        headerImg.remove();
      }

      const opt = {
        margin: [45, 0, 20, 0] as [number, number, number, number], // Top margin increased to 45mm to leave space after header (35mm)
        filename: `presupuesto-${formData['destinatario'] || 'cliente'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Generate PDF and add header to every page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf: any) {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const headerHeight = 35; // Fixed header height
        
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.addImage(headerImgData, 'PNG', 0, 0, pageWidth, headerHeight);
        }
        pdf.save(opt.filename);
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Generador de Presupuestos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Trámite</Label>
                <Select value={selectedTramiteId} onValueChange={setSelectedTramiteId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un trámite" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRAMITES.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTramite && (
                <div className="space-y-4 mt-4 border-t pt-4">
                  {selectedTramite.fields.map(field => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      {field.type === 'select' ? (
                        <Select
                          value={formData[field.name]?.toString() || ''}
                          onValueChange={(value) => handleInputChange(field.name, value)}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder={field.placeholder || "Seleccione una opción"} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type === 'currency' ? 'number' : field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.type === 'currency' && formData[field.name] && (
                         <p className="text-xs text-muted-foreground">
                           {field.currencyType === 'USD' 
                             ? `DOLARES ESTADOUNIDENSES ${cleanAmountText(NumerosALetras(parseInt(formData[field.name].toString().replace(/[^0-9]/g, '') || '0')).toUpperCase())}`
                             : `PESOS ${cleanAmountText(NumerosALetras(parseInt(formData[field.name].toString().replace(/[^0-9]/g, '') || '0')).toUpperCase())}`
                           }
                         </p>
                      )}
                    </div>
                  ))}
                  
                  <Button onClick={handleDownloadPDF} className="w-full mt-4">
                    Descargar PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-6">
           <Card className="bg-gray-100/50">
             <CardHeader>
               <CardTitle>Previsualización</CardTitle>
             </CardHeader>
             <CardContent className="p-0 sm:p-6">
               {selectedTramite ? (
                  <div className="w-full">
                    <div className="bg-white shadow-lg min-h-[50vh] sm:min-h-[297mm] w-full max-w-[210mm] mx-auto font-open flex flex-col" ref={previewRef}>
                       {/* Header Image */}
                       <img 
                         src="/header.png" 
                         alt="Membrete" 
                         className="w-full h-auto"
                       />
                      
                       <div className="px-8 py-4 sm:px-16 sm:py-8 flex-1">
                         {/* Content */}
                         <div 
                           className="prose max-w-none font-open text-sm sm:text-base"
                           dangerouslySetInnerHTML={{ __html: getProcessedContent() }}
                         />

                         {/* Signature Image */}
                         <div className="mt-8 sm:mt-12 flex justify-start">
                           <img 
                             src="/firma.png" 
                             alt="Firma" 
                             className="w-32 sm:w-44 h-auto"
                           />
                         </div>
                       </div>
                    </div>
                  </div>
                ) : (
                 <div className="flex items-center justify-center h-64 text-muted-foreground p-6">
                   Seleccione un trámite para ver la previsualización
                 </div>
               )}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
