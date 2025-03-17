// Definición de tipos para chart-generator.ts
export function generateHeatmap(
  rankingData: Record<number, Record<string, string | number>>,
  empresas: string[],
  renglones: number[],
  outputPath: string,
  title: string,
  _isClientOnly?: boolean
): Promise<void>;

export function generateBarChart(
  data: Array<{ Ranking: string, "Cantidad de renglones": number }>,
  outputPath: string,
  title: string
): Promise<void>; 