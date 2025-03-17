import { NextRequest, NextResponse } from 'next/server';
import { processExcelFile } from '@/lib/excel-processor';
import path from 'path';
import { createTempDir, filePathToUrl, saveTempFile } from '@/lib/storage-utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const clientName = formData.get('clientName') as string;
    
    if (!file || !clientName) {
      return NextResponse.json({
        status: 'error',
        message: 'Falta archivo o nombre de cliente'
      });
    }

    // Lista de clientes disponibles (simulada)
    const availableClients = ["DIGITAL STRATEGY SAS", "EMPRESA A", "EMPRESA B", "EMPRESA C"];
    
    // Verificar si el cliente existe
    if (!availableClients.includes(clientName)) {
      return NextResponse.json({
        status: 'error',
        message: `Cliente no encontrado. Clientes disponibles: [${availableClients.join(', ')}]`
      });
    }
    
    // Crear directorio temporal usando la nueva utilidad
    const tempDir = await createTempDir();
    
    // Guardar el archivo temporalmente
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Sanitizar el nombre del archivo
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(tempDir, sanitizedFileName);
    
    const savedPath = await saveTempFile(buffer, filePath);
    
    // Procesar el archivo
    const results = await processExcelFile(savedPath, tempDir, clientName);
    
    // Convertir rutas absolutas a URLs accesibles
    const fileUrls: Record<string, string> = {};
    for (const [key, absolutePath] of Object.entries(results)) {
      const url = filePathToUrl(absolutePath as string);
      fileUrls[key] = url;
    }
    
    return NextResponse.json({
      status: 'success',
      files: fileUrls
    });
  } catch (error: unknown) {
    console.error('Error processing file:', error);
    
    // Asegurarnos de que el mensaje de error sea una cadena
    let errorMessage = 'Error desconocido al procesar el archivo';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return NextResponse.json({
      status: 'error',
      message: errorMessage
    });
  }
}

// Aumentar el límite de tamaño del cuerpo de la solicitud
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16mb',
    },
  },
}; 