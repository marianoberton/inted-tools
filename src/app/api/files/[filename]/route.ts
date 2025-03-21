import { NextRequest, NextResponse } from 'next/server';
import { findTempFile, readTempFile } from '@/lib/storage-utils';

/**
 * Endpoint para servir archivos temporales
 * Esta API es necesaria en Vercel donde no podemos escribir en /public
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ filename: string }> }
) {
  try {
    const params = await props.params;
    const { filename } = params;
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Nombre de archivo no proporcionado' },
        { status: 400 }
      );
    }
    
    // Buscar el archivo en el almacenamiento (Blob o sistema de archivos)
    const blobUrl = await findTempFile(filename);
    
    if (!blobUrl) {
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      );
    }
    
    // Si estamos en Vercel y es una URL de Blob Storage, redireccionar directamente a ella
    if (process.env.VERCEL === '1' && blobUrl.startsWith('http')) {
      return NextResponse.redirect(blobUrl);
    }
    
    // En desarrollo o para compatibilidad, leer el contenido del archivo
    const fileBuffer = await readTempFile(blobUrl);
    
    // Determinar el tipo MIME basado en la extensión
    const mimeTypes: Record<string, string> = {
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xls': 'application/vnd.ms-excel',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
    };
    
    // Extraer la extensión del archivo
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Crear una respuesta con el contenido del archivo
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    console.error('Error al servir el archivo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al servir el archivo';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 