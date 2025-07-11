import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { saveTempFile } from '@/lib/storage-utils';

interface ResultFiles {
  [key: string]: string;
}

// Tipo personalizado para las filas de datos
type DataRow = (string | number | null)[];

/**
 * Extrae la lista de clientes disponibles del archivo Excel
 */
export async function getAvailableClients(inputPath: string): Promise<string[]> {
  try {
    // Leer el contenido del archivo como buffer
    let fileBuffer: Buffer;
    
    try {
      if (inputPath.startsWith('http')) {
        const response = await fetch(inputPath);
        if (!response.ok) {
          throw new Error(`Error al obtener archivo de Blob Storage: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      } else {
        fileBuffer = fs.readFileSync(inputPath);
      }
    } catch {
      throw new Error('Error al leer el archivo');
    }
    
    // Leer el Excel
    const workbook = XLSX.read(fileBuffer);
    const sheetName = workbook.SheetNames.includes('Hoja1') ? 'Hoja1' : workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null }) as DataRow[];
    
    // Validar que tengamos suficientes datos
    if (!data || data.length < 8) {
      throw new Error('El archivo no contiene suficientes datos');
    }
    
    // Los nombres de las empresas están en la fila 8 (índice 7), cada 6 columnas
    const empresas: string[] = [];
    const numColumnasEmpresa = 6;
    
    for (let col = 6; col < (data[7] as DataRow).length; col += numColumnasEmpresa) {
      const cellValue = (data[7] as DataRow)[col];
      if (cellValue) {
        empresas.push(String(cellValue).trim());
      }
    }
    
    if (empresas.length === 0) {
      throw new Error('No se encontraron empresas en el archivo');
    }
    
    return empresas;
  } catch (error) {
    throw new Error(`Error al obtener lista de clientes: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

export async function processExcelFile(
  inputPath: string, 
  outputDir: string, 
  clientName: string
): Promise<ResultFiles> {
  try {
    // Generar nombres únicos para los archivos
    const uniqueId = Date.now().toString();
    const outputExcelPath = path.join(outputDir, `results_${uniqueId}.xlsx`);
    
    console.log('Starting Excel file processing...');
    
    // Leer el contenido del archivo como buffer
    let fileBuffer: Buffer;
    
    try {
      // Si la ruta es una URL (Vercel Blob), primero descargamos el contenido
      if (inputPath.startsWith('http')) {
        console.log('Downloading file from URL...');
        const response = await fetch(inputPath);
        if (!response.ok) {
          throw new Error(`Error al obtener archivo de Blob Storage: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      } else {
        // Si es ruta local, leer directamente
        console.log('Reading local file...');
        fileBuffer = fs.readFileSync(inputPath);
      }
    } catch {
      throw new Error('Error al leer el archivo');
    }
    
    console.log('Parsing Excel file...');
    
    // Usar el buffer para leer el Excel con manejo de errores
    let workbook: XLSX.WorkBook;
    try {
      workbook = XLSX.read(fileBuffer);
    } catch {
      throw new Error('El archivo no es un archivo Excel válido');
    }
    
    // Validar que el archivo tenga al menos una hoja
    if (!workbook.SheetNames.length) {
      throw new Error('El archivo Excel está vacío');
    }
    
    // Intentar leer 'Hoja1', si no existe, usar la primera hoja
    const sheetName = workbook.SheetNames.includes('Hoja1') 
      ? 'Hoja1' 
      : workbook.SheetNames[0];
    
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON para facilitar el procesamiento
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null }) as DataRow[];
    
    console.log('Validating data structure...');
    
    // Validaciones básicas del archivo
    if (!data || data.length < 9) {
      throw new Error('El archivo no contiene suficientes datos');
    }
    
    if (!data[0] || data[0].length < 5) {
      throw new Error('El archivo no tiene el formato correcto. Verifique las columnas.');
    }
    
    // Extraer información global
    const infoGlobal: Record<string, string> = {};
    for (let i = 0; i < 5; i++) {
      try {
        const row = data[i] as DataRow;
        if (row && row[3] && row[4]) {
          const etiqueta = String(row[3]).trim();
          const valor = String(row[4]).trim();
          infoGlobal[etiqueta] = valor;
        }
      } catch {
        throw new Error(`Error al leer la información global en la fila ${i+1}`);
      }
    }
    
    // Buscar el índice de la fila "Total:" en la columna C (índice 2)
    let endIndex = null;
    for (let idx = 8; idx < data.length; idx++) {
      const row = data[idx] as DataRow;
      if (row && !row[0] && !row[1] && row[2] && String(row[2]).includes('Total:')) {
        endIndex = idx;
        break;
      }
    }
    
    if (endIndex === null) {
      throw new Error("No se encontró la fila con 'Total:' en la columna C.");
    }
    
    // Extraer renglones desde la fila 9 (índice 8) hasta antes de "Total:" (columnas A-F)
    const renglones: Record<string, unknown>[] = [];
    for (let i = 8; i < endIndex; i++) {
      const row = data[i] as DataRow;
      if (row && row[0] && row[0] !== "Renglón") {
        renglones.push({
          "Renglón": parseInt(String(row[0]).trim()),
          "Opción": row[1],
          "Código": row[2],
          "Descripción": row[3],
          "Cantidad solicitada": row[4],
          "Unidad de medida": row[5]
        });
      }
    }
    
    // Ordenar por número de renglón
    renglones.sort((a, b) => (a["Renglón"] as number) - (b["Renglón"] as number));
    
    // Extraer los nombres de las empresas
    const numColumnasEmpresa = 6;
    const empresas: string[] = [];
    
    for (let col = 6; col < (data[7] as DataRow).length; col += numColumnasEmpresa) {
      const cellValue = (data[7] as DataRow)[col];
      if (cellValue) {
        empresas.push(String(cellValue).trim());
      }
    }
    
    // Extraer datos de empresas
    const datosEmpresas: Record<string, Record<string, unknown>[]> = {};
    
    for (let i = 0; i < empresas.length; i++) {
      const nombre = empresas[i];
      const inicio = i * numColumnasEmpresa + 6;
      const fin = inicio + numColumnasEmpresa;
      
      const empresaData: Record<string, unknown>[] = [];
      
      for (let rowIdx = 9; rowIdx < endIndex; rowIdx++) {
        const row = data[rowIdx] as DataRow;
        if (row && row.length > fin) {
          empresaData.push({
            "Código Moneda": row[inicio],
            "Precio unitario": row[inicio + 1],
            "Cantidad ofertada": row[inicio + 2],
            "Total por renglón": row[inicio + 3],
            "Especificacion técnica": row[inicio + 4],
            "Total por renglón en ARS": row[inicio + 5]
          });
        }
      }
      
      datosEmpresas[nombre] = empresaData;
    }
    
    // Función para convertir valores a float (limpieza de símbolos)
    const convertirAFloat = (valor: unknown): number => {
      if (!valor || valor === '' || valor === null) return 0.0;
      
      let strValor = String(valor).trim();
      
      // Remover símbolos de moneda y espacios
      strValor = strValor.replace(/[$\s]/g, '');
      
      // Si el valor ya es un número válido, devolverlo directamente
      if (!isNaN(Number(strValor)) && strValor !== '') {
        return parseFloat(strValor);
      }
      
      // Detectar formato de número basado en la posición de puntos y comas
      // Formato común: 1,234.56 (separador de miles: coma, decimal: punto)
      // Formato alternativo: 1.234,56 (separador de miles: punto, decimal: coma)
      
      const lastCommaIndex = strValor.lastIndexOf(',');
      const lastDotIndex = strValor.lastIndexOf('.');
      
      if (lastCommaIndex > lastDotIndex) {
        // La coma está después del punto, formato: 1.234,56
        // Remover puntos (separadores de miles) y cambiar coma por punto decimal
        strValor = strValor.replace(/\./g, '').replace(',', '.');
      } else if (lastDotIndex > lastCommaIndex) {
        // El punto está después de la coma, formato: 1,234.56
        // Remover comas (separadores de miles), mantener punto decimal
        strValor = strValor.replace(/,/g, '');
      } else if (lastCommaIndex !== -1 && lastDotIndex === -1) {
        // Solo hay coma, podría ser decimal: 1234,56
        // Verificar si hay más de 3 dígitos después de la coma
        const afterComma = strValor.split(',')[1];
        if (afterComma && afterComma.length <= 2) {
          // Probablemente es decimal
          strValor = strValor.replace(',', '.');
        } else {
          // Probablemente es separador de miles
          strValor = strValor.replace(',', '');
        }
      } else if (lastDotIndex !== -1 && lastCommaIndex === -1) {
        // Solo hay punto, podría ser decimal o separador de miles
        // Verificar si hay más de 3 dígitos después del punto
        const afterDot = strValor.split('.')[1];
        if (afterDot && afterDot.length > 2) {
          // Probablemente es separador de miles
          strValor = strValor.replace('.', '');
        }
        // Si hay 1-2 dígitos después del punto, mantenerlo como decimal
      }
      
      try {
        const result = parseFloat(strValor);
        return isNaN(result) ? 0.0 : result;
      } catch {
        return 0.0;
      }
    };
    
    // Calcular totales por empresa
    const totalesEmpresas: Record<string, number> = {};
    
    for (const nombre of empresas) {
      let total = 0;
      for (const row of datosEmpresas[nombre]) {
        total += convertirAFloat(row["Total por renglón en ARS"]);
      }
      totalesEmpresas[nombre] = parseFloat(total.toFixed(2));
    }
    
    // Agrupar precios por "Renglón" y calcular ranking
    const pricesDict: Record<string, Record<number, number>> = {};
    const renglonesUnicos = [...new Set(renglones.map(r => r["Renglón"] as number))];
    
    for (const nombre of empresas) {
      pricesDict[nombre] = {};
      
      for (let i = 0; i < renglones.length; i++) {
        const renglon = renglones[i]["Renglón"] as number;
        if (i < datosEmpresas[nombre].length) {
          const precio = convertirAFloat(datosEmpresas[nombre][i]["Precio unitario"]);
          
          if (precio > 0) {
            // Si ya existe un precio para este renglón, tomar el mínimo
            if (pricesDict[nombre][renglon]) {
              pricesDict[nombre][renglon] = Math.min(pricesDict[nombre][renglon], precio);
            } else {
              pricesDict[nombre][renglon] = precio;
            }
          }
        }
      }
    }
    
    // Calcular ranking por renglón
    const rankingGrouped: Record<number, Record<string, string | number>> = {};
    
    for (const renglon of renglonesUnicos) {
      const precios: Record<string, number> = {};
      
      for (const nombre of empresas) {
        if (pricesDict[nombre][renglon] && pricesDict[nombre][renglon] > 0) {
          precios[nombre] = pricesDict[nombre][renglon];
        }
      }
      
      // Inicializar ranking con "NC" (No Compite)
      const ranking: Record<string, string | number> = {};
      for (const nombre of empresas) {
        ranking[nombre] = "NC";
      }
      
      // Ordenar precios y asignar ranking
      if (Object.keys(precios).length > 0) {
        const sortedPrices = Object.entries(precios).sort((a, b) => a[1] - b[1]);
        
        for (let pos = 0; pos < sortedPrices.length; pos++) {
          const [nombre] = sortedPrices[pos];
          ranking[nombre] = pos + 1;
        }
      }
      
      rankingGrouped[renglon] = ranking;
    }
    
    // Generar resumen por renglón
    const resumenList: Record<string, unknown>[] = [];
    
    for (const renglon of renglonesUnicos) {
      const prices: Record<string, number | null> = {};
      
      for (const nombre of empresas) {
        const precio = pricesDict[nombre][renglon];
        prices[nombre] = precio || null;
      }
      
      // Filtrar y ordenar precios válidos
      const validPrices = Object.entries(prices)
        .filter(entry => entry[1] !== null && entry[1] > 0)
        .sort((a, b) => {
          const price1 = a[1];
          const price2 = b[1];
          if (price1 === null || price2 === null) return 0;
          return price1 - price2;
        });
      
      let bestProvider: string | null = null;
      let bestPrice: number | null = null;
      
      if (validPrices.length > 0) {
        bestProvider = validPrices[0][0];
        bestPrice = validPrices[0][1];
      }
      
      const precioCliente = prices[clientName];
      const rankingCliente = rankingGrouped[renglon][clientName];
      
      // Calcular diferencias solo si tenemos ambos precios
      let diffBest: number | null = null;
      let pctDiffBest: number | null = null;
      
      if (precioCliente !== null && bestPrice !== null && bestPrice > 0) {
        diffBest = parseFloat((precioCliente - bestPrice).toFixed(2));
        pctDiffBest = parseFloat(((precioCliente - bestPrice) / bestPrice * 100).toFixed(2));
      }
      
      resumenList.push({
        "Renglón": renglon,
        "Mejor precio": bestPrice !== null ? bestPrice : "NC",
        "Empresa mejor precio": bestProvider || "NC",
        "Precio cliente": precioCliente !== null ? precioCliente : "NC",
        "Ranking cliente": rankingCliente,
        "Diferencia (cliente - mejor)": diffBest !== null ? diffBest : "",
        "% Diferencia (cliente - mejor)": pctDiffBest !== null ? pctDiffBest : ""
      });
    }
    
    // Ordenar resumen por número de renglón
    resumenList.sort((a, b) => (a["Renglón"] as number) - (b["Renglón"] as number));
    
    // Calcular distribución del ranking del cliente
    const clientRankings = renglonesUnicos.map(r => rankingGrouped[r][clientName]);
    const countRank1 = clientRankings.filter(r => r === 1).length;
    const countRank2 = clientRankings.filter(r => r === 2).length;
    const countRank3 = clientRankings.filter(r => r === 3).length;
    const countRank4plus = clientRankings.filter(r => typeof r === 'number' && r >= 4).length;
    const countNC = clientRankings.filter(r => r === "NC").length;
    
    const rankingSummary = [
      { "Ranking": "1", "Cantidad de renglones": countRank1 },
      { "Ranking": "2", "Cantidad de renglones": countRank2 },
      { "Ranking": "3", "Cantidad de renglones": countRank3 },
      { "Ranking": "4 o más", "Cantidad de renglones": countRank4plus },
      { "Ranking": "NC", "Cantidad de renglones": countNC }
    ];
    
    // Crear la hoja "Ofertas por renglon" con ranking
    const ofertas: Record<string, unknown>[] = [];
    
    for (const renglon of renglonesUnicos) {
      const rowPrices: Record<string, number> = {};
      
      for (const nombre of empresas) {
        if (pricesDict[nombre][renglon] && pricesDict[nombre][renglon] > 0) {
          rowPrices[nombre] = pricesDict[nombre][renglon];
        }
      }
      
      const validOffers = Object.entries(rowPrices).sort((a, b) => a[1] - b[1]);
      
      for (let rank = 0; rank < validOffers.length; rank++) {
        const [empresa, monto] = validOffers[rank];
        ofertas.push({
          "Renglón": renglon,
          "Ranking": rank + 1,
          "Empresa": empresa,
          "Monto": parseFloat(monto.toFixed(2))
        });
      }
    }
    
    // Ordenar ofertas por renglón y ranking
    ofertas.sort((a, b) => {
      if ((a["Renglón"] as number) !== (b["Renglón"] as number)) {
        return (a["Renglón"] as number) - (b["Renglón"] as number);
      }
      return (a["Ranking"] as number) - (b["Ranking"] as number);
    });
    
    // Crear nuevo workbook para exportar
    const newWorkbook = XLSX.utils.book_new();
    
    // Agregar hoja "Resumen"
    const wsResumen = XLSX.utils.json_to_sheet(resumenList, {
      header: ["Renglón", "Mejor precio", "Empresa mejor precio", "Precio cliente", 
              "Ranking cliente", "Diferencia (cliente - mejor)", "% Diferencia (cliente - mejor)"]
    });

    // Aplicar formato a las columnas numéricas
    const numericColumns = ['B', 'D', 'F', 'G'];
    const range = XLSX.utils.decode_range(wsResumen['!ref'] || 'A1');
    
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (const C of numericColumns) {
        const cell = wsResumen[`${C}${R + 1}`];
        if (cell && cell.v !== "NC" && cell.v !== "") {
          cell.t = 'n';  // tipo numérico
          cell.z = '#,##0.00';  // formato con 2 decimales
        }
      }
    }

    // Aplicar estilos a la hoja
    wsResumen['!cols'] = [
      { wch: 10 },  // A - Renglón
      { wch: 15 },  // B - Mejor precio
      { wch: 35 },  // C - Empresa mejor precio
      { wch: 15 },  // D - Precio cliente
      { wch: 15 },  // E - Ranking cliente
      { wch: 25 },  // F - Diferencia
      { wch: 25 }   // G - % Diferencia
    ];

    XLSX.utils.book_append_sheet(newWorkbook, wsResumen, "Resumen");
    
    // Agregar hoja "Totales"
    const totalesArray = Object.entries(totalesEmpresas)
      .map(([empresa, total]) => ({
        "Empresa": empresa,
        "Total ARS": total
      }))
      .sort((a, b) => (b["Total ARS"] as number) - (a["Total ARS"] as number));
    
    const wsTotales = XLSX.utils.json_to_sheet(totalesArray, {
      header: ["Empresa", "Total ARS"]
    });
    XLSX.utils.book_append_sheet(newWorkbook, wsTotales, "Totales");
    
    // Agregar hoja "Ranking_cliente"
    const wsRankingCliente = XLSX.utils.json_to_sheet(rankingSummary, {
      header: ["Ranking", "Cantidad de renglones"]
    });
    XLSX.utils.book_append_sheet(newWorkbook, wsRankingCliente, "Ranking_cliente");
    
    // Agregar hoja "Ofertas por renglon"
    const wsOfertas = XLSX.utils.json_to_sheet(ofertas, {
      header: ["Renglón", "Ranking", "Empresa", "Monto"]
    });
    XLSX.utils.book_append_sheet(newWorkbook, wsOfertas, "Ofertas por renglon");
    
    // Guardar el archivo Excel usando buffer
    const excelBuffer = XLSX.write(newWorkbook, { 
      type: 'buffer',
      bookType: 'xlsx',
      bookSST: false,
      compression: true
    });
    
    // Guardar el Excel usando saveTempFile
    const savedExcelPath = await saveTempFile(excelBuffer, outputExcelPath);
    
    // Devolver rutas de los archivos generados
    return {
      "Excel de resultados": savedExcelPath,
    };
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    throw new Error('Error al procesar el archivo Excel');
  }
} 