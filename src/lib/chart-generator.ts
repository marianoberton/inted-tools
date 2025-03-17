import { createCanvas } from 'canvas';

// Función para aclarar un color (aumentar luminosidad)
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// Función para oscurecer un color (disminuir luminosidad)
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return '#' + (
    0x1000000 +
    (R > 0 ? (R > 255 ? 255 : R) : 0) * 0x10000 +
    (G > 0 ? (G > 255 ? 255 : G) : 0) * 0x100 +
    (B > 0 ? (B > 255 ? 255 : B) : 0)
  ).toString(16).slice(1);
}

// Función para generar un heatmap
export async function generateHeatmap(
  rankingData: Record<number, Record<string, string | number>>,
  empresas: string[],
  renglones: number[],
  outputPath: string,
  title: string,
  // Parámetro usado internamente para estilo específico
  _isClientOnly: boolean = false
): Promise<Buffer> {
  try {
    // Configuración del canvas
    const cellWidth = 120;
    const cellHeight = 50;
    // Margen superior para el título y encabezados
    const topMargin = 120;
    // Margen izquierdo para etiquetas de renglones
    const leftMargin = 80;
    
    // Calcular dimensiones del canvas
    const width = leftMargin + (empresas.length * cellWidth) + 80;
    const height = topMargin + (renglones.length * cellHeight) + 80;
    
    // Crear canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fondo blanco con gradiente sutil, ajustamos el color si es solo para cliente
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, _isClientOnly ? '#f8fdff' : '#ffffff');
    gradient.addColorStop(1, _isClientOnly ? '#edf7fa' : '#f8f9fa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar título con sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#1B293F';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 50);
    ctx.shadowColor = 'transparent';
    
    // Dibujar encabezados de columnas (empresas)
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1B293F';
    for (let i = 0; i < empresas.length; i++) {
      const x = leftMargin + (i * cellWidth) + (cellWidth / 2);
      ctx.fillText(empresas[i], x, topMargin - 15);
    }
    
    // Dibujar encabezados de filas (renglones)
    ctx.textAlign = 'right';
    for (let i = 0; i < renglones.length; i++) {
      const y = topMargin + (i * cellHeight) + (cellHeight / 2) + 5;
      ctx.fillText(renglones[i].toString(), leftMargin - 15, y);
    }
    
    // Función para obtener color según ranking
    const getColor = (rank: string | number): string => {
      if (rank === 'NC') return '#f0f0f0';
      
      const numRank = typeof rank === 'number' ? rank : parseInt(rank.toString());
      
      if (numRank === 1) return '#4CAF50';  // Verde para el 1er lugar
      if (numRank === 2) return '#8BC34A';  // Verde claro para el 2do lugar
      if (numRank === 3) return '#CDDC39';  // Lima para el 3er lugar
      if (numRank <= 5) return '#FFEB3B';   // Amarillo para 4to y 5to
      return '#FF9800';                     // Naranja para el resto
    };
    
    // Dibujar celdas con colores según ranking
    for (let i = 0; i < renglones.length; i++) {
      const renglon = renglones[i];
      
      for (let j = 0; j < empresas.length; j++) {
        const empresa = empresas[j];
        const rank = rankingData[renglon][empresa];
        
        const x = leftMargin + (j * cellWidth);
        const y = topMargin + (i * cellHeight);
        
        // Dibujar fondo de celda con gradiente
        const cellGradient = ctx.createLinearGradient(x, y, x, y + cellHeight);
        const baseColor = getColor(rank);
        const lighterColor = lightenColor(baseColor, 20);
        cellGradient.addColorStop(0, lighterColor);
        cellGradient.addColorStop(1, baseColor);
        
        ctx.fillStyle = cellGradient;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        
        // Dibujar borde redondeado
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x, y, cellWidth, cellHeight);
        ctx.stroke();
        
        // Dibujar texto de ranking con sombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = rank === 1 ? '#ffffff' : '#333333';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          rank.toString(), 
          x + (cellWidth / 2), 
          y + (cellHeight / 2) + 6
        );
        ctx.shadowColor = 'transparent';
      }
    }
    
    // Dibujar leyenda
    const legendX = 50;
    const legendY = height - 60;
    const legendItemWidth = 120;
    
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'left';
    ctx.fillText('Leyenda:', legendX, legendY);
    
    const legendItems = [
      { rank: 1, label: '1er lugar' },
      { rank: 2, label: '2do lugar' },
      { rank: 3, label: '3er lugar' },
      { rank: 4, label: '4to o 5to' },
      { rank: 6, label: '6to o más' },
      { rank: 'NC', label: 'No compite' }
    ];
    
    for (let i = 0; i < legendItems.length; i++) {
      const item = legendItems[i];
      const itemX = legendX + (i * legendItemWidth);
      
      // Dibujar cuadrado de color
      ctx.fillStyle = getColor(item.rank);
      ctx.fillRect(itemX, legendY + 10, 15, 15);
      
      // Dibujar borde
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.strokeRect(itemX, legendY + 10, 15, 15);
      
      // Dibujar texto
      ctx.fillStyle = '#333333';
      ctx.textAlign = 'left';
      ctx.font = '12px Arial';
      ctx.fillText(item.label, itemX + 20, legendY + 22);
    }
    
    // Devolver el buffer de imagen sin escribir en disco
    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error("Error al generar heatmap:", error);
    // En caso de error, devolver un buffer vacío
    throw error;
  }
}

// Función para generar un gráfico de barras
export async function generateBarChart(
  data: Array<{ Ranking: string, "Cantidad de renglones": number }>,
  outputPath: string,
  title: string
): Promise<Buffer> {
  try {
    // Configuración del canvas
    const width = 900;
    const height = 600;
    const margin = { top: 100, right: 80, bottom: 100, left: 100 };
    
    // Crear canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#f8f9fa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar título con sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#1B293F';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, margin.top / 2);
    ctx.shadowColor = 'transparent';
    
    // Calcular el ancho de las barras
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const barWidth = chartWidth / data.length * 0.7;
    const barSpacing = chartWidth / data.length * 0.3;
    
    // Encontrar el valor máximo para escalar
    const maxValue = Math.max(...data.map(d => d["Cantidad de renglones"]));
    const yScale = chartHeight / (maxValue * 1.2); // 20% de espacio extra arriba
    
    // Función para obtener color según ranking
    const getColor = (ranking: string): string => {
      switch (ranking) {
        case '1': return '#4CAF50';  // Verde
        case '2': return '#8BC34A';  // Verde claro
        case '3': return '#CDDC39';  // Lima
        case '4 o más': return '#FFEB3B';  // Amarillo
        case 'NC': return '#FF9800';  // Naranja
        default: return '#2196F3';  // Azul por defecto
      }
    };
    
    // Dibujar cuadrícula
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Líneas horizontales
    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
      const y = height - margin.bottom - (i * (chartHeight / numGridLines));
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(width - margin.right, y);
      ctx.stroke();
      
      // Etiquetas de valores en eje Y
      const value = Math.round((i * maxValue) / numGridLines);
      ctx.fillStyle = '#666666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), margin.left - 10, y + 4);
    }
    
    // Dibujar ejes
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.stroke();
    
    // Eje X
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();
    
    // Dibujar barras
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const value = item["Cantidad de renglones"];
      
      const x = margin.left + (i * (barWidth + barSpacing)) + barSpacing;
      const barHeight = value * yScale;
      const y = height - margin.bottom - barHeight;
      
      // Dibujar barra con gradiente
      const barGradient = ctx.createLinearGradient(x, y, x, height - margin.bottom);
      const baseColor = getColor(item.Ranking);
      const lighterColor = lightenColor(baseColor, 20);
      barGradient.addColorStop(0, lighterColor);
      barGradient.addColorStop(1, baseColor);
      
      ctx.fillStyle = barGradient;
      
      // Barra con esquinas redondeadas
      const radius = 8;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, height - margin.bottom);
      ctx.lineTo(x, height - margin.bottom);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
      
      // Dibujar borde
      ctx.strokeStyle = darkenColor(baseColor, 10);
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Dibujar etiqueta de categoría (Ranking)
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.Ranking, x + barWidth / 2, height - margin.bottom + 25);
      
      // Dibujar valor encima de la barra con sombra
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 15);
      ctx.shadowColor = 'transparent';
    }
    
    // Dibujar etiquetas de ejes
    ctx.fillStyle = '#1B293F';
    ctx.font = 'bold 18px Arial';
    
    // Etiqueta eje Y
    ctx.save();
    ctx.translate(margin.left / 3, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Cantidad de renglones', 0, 0);
    ctx.restore();
    
    // Etiqueta eje X
    ctx.textAlign = 'center';
    ctx.fillText('Ranking', width / 2, height - margin.bottom / 3);
    
    // Devolver buffer en lugar de escribir en disco
    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error("Error al generar gráfico de barras:", error);
    throw error;
  }
} 