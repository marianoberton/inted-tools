import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
// Importamos directamente del archivo .ts en la misma carpeta
import { generateHeatmap, generateBarChart } from './chart-generator';
import { saveTempFile } from './storage-utils';

interface ResultFiles {
  [key: string]: string;
}

// Tipo personalizado para las filas de datos
type DataRow = (string | number | null)[];

export async function processExcelFile(
  inputPath: string, 
  outputDir: string, 
  clientName: string
): Promise<ResultFiles> {
  try {
    // Generar nombres únicos para los archivos
    const uniqueId = Date.now().toString();
    
    const heatmapPath = path.join(outputDir, `heatmap_${uniqueId}.png`);
    const clientHeatmapPath = path.join(outputDir, `client_heatmap_${uniqueId}.png`);
    const barChartPath = path.join(outputDir, `barchart_${uniqueId}.png`);
    const outputExcelPath = path.join(outputDir, `results_${uniqueId}.xlsx`);
    
    // Leer el archivo Excel con manejo de errores mejorado
    console.log("Intentando leer archivo:", inputPath);
    
    // Leer el contenido del archivo como buffer
    let fileBuffer: Buffer;
    
    // Si la ruta es una URL (Vercel Blob), primero descargamos el contenido
    if (inputPath.startsWith('http')) {
      const response = await fetch(inputPath);
      if (!response.ok) {
        throw new Error(`Error al obtener archivo de Blob Storage: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      // Si es ruta local, leer directamente
      fileBuffer = fs.readFileSync(inputPath);
    }
    
    // Usar el buffer para leer el Excel
    const workbook = XLSX.read(fileBuffer);
    
    // Intentar leer 'Hoja1', si no existe, usar la primera hoja
    const sheetName = workbook.SheetNames.includes('Hoja1') 
      ? 'Hoja1' 
      : workbook.SheetNames[0];
    
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON para facilitar el procesamiento
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null }) as DataRow[];
    
    // Verificar si el archivo tiene el formato mínimo esperado
    if (data[0].length < 5) {
      throw new Error("El archivo no tiene suficientes columnas. Verifique el formato.");
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
      
      const strValor = String(valor)
        .replace('$', '')
        .replace(' ', '')
        .replace('.', '')
        .replace(',', '.')
        .trim();
      
      try {
        return parseFloat(strValor);
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
      const prices: Record<string, number> = {};
      
      for (const nombre of empresas) {
        prices[nombre] = pricesDict[nombre][renglon] || NaN;
      }
      
      const validPrices = Object.entries(prices)
        .filter(([, p]) => !isNaN(p) && p > 0)
        .sort((a, b) => a[1] - b[1]);
      
      let bestProvider = null, bestPrice = NaN;
      
      if (validPrices.length > 0) {
        [bestProvider, bestPrice] = validPrices[0];
      }
      
      const precioCliente = prices[clientName] || NaN;
      const rankingCliente = rankingGrouped[renglon][clientName] || "NC";
      
      // Calcular diferencias
      const diffs = (pCliente: number, pRef: number) => {
        if (!isNaN(pCliente) && !isNaN(pRef) && pRef !== 0) {
          const d = parseFloat((pCliente - pRef).toFixed(2));
          const p = parseFloat(((pCliente - pRef) / pRef * 100).toFixed(2));
          return [d, p];
        }
        return [NaN, NaN];
      };
      
      const [diffBest, pctDiffBest] = diffs(precioCliente, bestPrice);
      
      resumenList.push({
        "Renglón": renglon,
        "Mejor precio": !isNaN(bestPrice) ? parseFloat(bestPrice.toFixed(2)) : null,
        "Empresa mejor precio": bestProvider,
        "Precio cliente": !isNaN(precioCliente) ? parseFloat(precioCliente.toFixed(2)) : null,
        "Ranking cliente": rankingCliente,
        "Diferencia (cliente - mejor)": !isNaN(diffBest) ? diffBest : null,
        "% Diferencia (cliente - mejor)": !isNaN(pctDiffBest) ? pctDiffBest : null,
      });
    }
    
    // Ordenar resumen por número de renglón
    resumenList.sort((a, b) => (a["Renglón"] as number) - (b["Renglón"] as number));
    
    // Generar heatmap global de rankings
    const heatmapBuffer = await generateHeatmap(
      rankingGrouped, 
      empresas, 
      renglonesUnicos, 
      heatmapPath, 
      "Ranking de Precio Unitario por Renglón"
    );
    
    // Guardar el heatmap usando saveTempFile
    const savedHeatmapPath = await saveTempFile(heatmapBuffer, heatmapPath);
    
    // Generar heatmap del cliente
    const clientHeatmapBuffer = await generateHeatmap(
      rankingGrouped, 
      [clientName], 
      renglonesUnicos, 
      clientHeatmapPath, 
      `Ranking de Precio Unitario de ${clientName}`,
      true
    );
    
    // Guardar el heatmap del cliente
    const savedClientHeatmapPath = await saveTempFile(clientHeatmapBuffer, clientHeatmapPath);
    
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
    
    // Generar gráfico de barras
    const barChartBuffer = await generateBarChart(
      rankingSummary, 
      barChartPath, 
      `Distribución de ranking de '${clientName}'`
    );
    
    // Guardar el gráfico de barras
    const savedBarChartPath = await saveTempFile(barChartBuffer, barChartPath);
    
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
    const wsResumen = XLSX.utils.json_to_sheet(resumenList);
    XLSX.utils.book_append_sheet(newWorkbook, wsResumen, "Resumen");
    
    // Agregar hoja "Totales"
    const totalesArray = Object.entries(totalesEmpresas).map(([empresa, total]) => ({
      "Empresa": empresa,
      "Total ARS": total
    }));
    const wsTotales = XLSX.utils.json_to_sheet(totalesArray);
    XLSX.utils.book_append_sheet(newWorkbook, wsTotales, "Totales");
    
    // Agregar hoja "Ranking_cliente"
    const wsRankingCliente = XLSX.utils.json_to_sheet(rankingSummary);
    XLSX.utils.book_append_sheet(newWorkbook, wsRankingCliente, "Ranking_cliente");
    
    // Agregar hoja "Ofertas por renglon"
    const wsOfertas = XLSX.utils.json_to_sheet(ofertas);
    XLSX.utils.book_append_sheet(newWorkbook, wsOfertas, "Ofertas por renglon");
    
    // Guardar el archivo Excel usando buffer en lugar de escribir directamente
    const excelBuffer = XLSX.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Guardar el Excel usando saveTempFile
    const savedExcelPath = await saveTempFile(excelBuffer, outputExcelPath);
    
    // Devolver rutas de los archivos generados
    return {
      "Excel de resultados": savedExcelPath,
      "Heatmap global": savedHeatmapPath,
      "Heatmap del cliente": savedClientHeatmapPath,
      "Gráfico de barras": savedBarChartPath
    };
  } catch (error) {
    console.error("Error en el procesamiento:", error);
    throw error;
  }
} 