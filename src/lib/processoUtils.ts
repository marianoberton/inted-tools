import type { Cronograma, ProcesoStatus as ProcesoStatusType } from '@/app/dashboard/types';
import { ProcesoStatus } from '@/app/dashboard/types'; // Enum needs to be imported directly

export function parseFlexibleDate(dateString?: string): Date | null {
  if (!dateString || typeof dateString !== 'string') return null;
  const cleanedString = dateString.replace(/ Hrs\./g, '').replace(/\//g, '-');
  const parts = cleanedString.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] || '00:00:00';

  const dateComponents = datePart.split('-');
  if (dateComponents.length !== 3) return null;

  let day = parseInt(dateComponents[0], 10);
  let month = parseInt(dateComponents[1], 10);
  let year = parseInt(dateComponents[2], 10);

  if (day > 12 && month <= 12) { 
    month = month -1;
  } else if (month > 12 && day <=12) { 
    const tempDay = day;
    day = month;
    month = tempDay -1;
  } else if (day <=12 && month <= 12) { 
     const d1 = new Date(year, month - 1, day, ...timePart.split(':').map(Number) as [number, number, number]);
     if (!isNaN(d1.getTime()) && d1.getDate() === day && d1.getMonth() === month -1 && d1.getFullYear() === year) {
        return d1;
     }
     const d2 = new Date(year, day - 1, month, ...timePart.split(':').map(Number) as [number, number, number]);
     if (!isNaN(d2.getTime()) && d2.getDate() === month && d2.getMonth() === day-1 && d2.getFullYear() === year) {
        return d2;
     }
     return null; 
  } else { 
    return null;
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  
  const timeComponents = timePart.split(':').map(Number);
  const finalDate = new Date(year, month, day, timeComponents[0] || 0, timeComponents[1] || 0, timeComponents[2] || 0);
  
  if (isNaN(finalDate.getTime())) return null;
  if (finalDate.getFullYear() !== year || finalDate.getMonth() !== month || finalDate.getDate() !== day) {
    if (parseInt(dateComponents[0], 10) <= 12 && parseInt(dateComponents[1], 10) <=12) {
        const swappedMonth = parseInt(dateComponents[0], 10) -1; 
        const swappedDay = parseInt(dateComponents[1], 10);    
        const swappedDate = new Date(year, swappedMonth, swappedDay, timeComponents[0] || 0, timeComponents[1] || 0, timeComponents[2] || 0);
        if (!isNaN(swappedDate.getTime()) && swappedDate.getFullYear() === year && swappedDate.getMonth() === swappedMonth && swappedDate.getDate() === swappedDay) {
            return swappedDate;
        }
    }
    return null; 
  }
  return finalDate;
}

export function getProcesoStatus(cronograma: Cronograma | null, fuente: 'NACION' | 'BAC', ProcesoStatusEnum: typeof ProcesoStatus): ProcesoStatusType {
  if (!cronograma) return ProcesoStatusEnum.DESCONOCIDO;

  const now = new Date();

  const pub = cronograma.fecha_publicacion;
  const iniCons = cronograma.fecha_inicio_consultas;
  const finCons = cronograma.fecha_fin_consultas;
  const finRecep = cronograma.fecha_fin_recepcion_documentos;
  const apertura = cronograma.fecha_apertura;

  if (cronograma.fecha_publicacion_raw?.includes('Error') || cronograma.fecha_fin_recepcion_documentos_raw?.includes('Error')) {
    return ProcesoStatusEnum.ERROR_FECHA;
  }

  if (apertura && now > apertura) return ProcesoStatusEnum.EN_EVALUACION;
  if (finRecep && now > finRecep && apertura && now < apertura ) return ProcesoStatusEnum.PROXIMA_APERTURA;
  if (finRecep && now <= finRecep && (!iniCons || now >= iniCons)) return ProcesoStatusEnum.RECEPCION_OFERTAS;
  if (finCons && now > finCons && finRecep && now < finRecep) return ProcesoStatusEnum.RECEPCION_OFERTAS; 
  if (iniCons && finCons && now >= iniCons && now <= finCons) return ProcesoStatusEnum.CONSULTAS_ABIERTAS;
  if (pub && now < pub) return ProcesoStatusEnum.PREVISTO;
  if (pub && now >= pub && (!iniCons || now < iniCons) && (!finCons || now < finCons)) {
      if (finRecep && now <= finRecep) return ProcesoStatusEnum.RECEPCION_OFERTAS;
      return ProcesoStatusEnum.CONSULTAS_ABIERTAS; 
  }
  
  return ProcesoStatusEnum.DESCONOCIDO;
}

export function safeParseJSON<T>(jsonString: string | undefined | null, fieldName: string): T | null {
  if (typeof jsonString !== 'string' || !jsonString) {
    // console.log(`safeParseJSON: Input for ${fieldName} is not a string or is empty.`);
    return null;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.warn(`Failed to parse JSON for field '${fieldName}'. Offending string (first 100 chars): '${jsonString.substring(0,100)}'`, e);
    return null;
  }
}

export function parseMonto(montoString?: string): number | null {
  if (!montoString) return null;
  let cleaned = montoString.replace(/[^\d,.-]/g, ''); 
  if (cleaned.includes(',')) { 
      cleaned = cleaned.replace(/\.(?=.*\.)/g, ''); 
      cleaned = cleaned.replace(',', '.'); 
  } else {
      const dotCount = (cleaned.match(/\./g) || []).length;
      if (dotCount > 1) { 
          cleaned = cleaned.replace(/\./g, ''); 
      }
  }
  const val = parseFloat(cleaned);
  return isNaN(val) ? null : val;
} 