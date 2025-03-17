declare module 'canvas' {
  export interface Canvas {
    toBuffer(format: string): Buffer;
    getContext(contextId: '2d'): CanvasRenderingContext2D;
  }

  export interface CanvasRenderingContext2D {
    canvas: Canvas;
    fillStyle: string | CanvasGradient;
    strokeStyle: string;
    lineWidth: number;
    shadowColor: string;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    font: string;
    textAlign: CanvasTextAlign;
    
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    fillRect(x: number, y: number, width: number, height: number): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
    fillText(text: string, x: number, y: number): void;
    beginPath(): void;
    rect(x: number, y: number, width: number, height: number): void;
    stroke(): void;
  }

  export interface CanvasGradient {
    addColorStop(offset: number, color: string): void;
  }

  export function createCanvas(width: number, height: number): Canvas;
} 