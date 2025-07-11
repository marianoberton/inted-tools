import { NextRequest, NextResponse } from 'next/server';
import { processExcelFile, getAvailableClients } from '@/lib/excel-processor';
import path from 'path';
import { createTempDir, filePathToUrl, saveTempFile } from '@/lib/storage-utils';

// GET endpoint for health check
export async function GET() {
  try {
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'API is working correctly',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Processing request...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const clientName = formData.get('clientName') as string;
    
    console.log('File:', file?.name, 'Client:', clientName);
    
    if (!file || !clientName) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'Falta archivo o nombre de cliente'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar tamaño del archivo
    if (file.size > 16 * 1024 * 1024) { // 16MB
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'El archivo es demasiado grande. Máximo 16MB permitido.'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Crear directorio temporal y guardar el archivo
    console.log('Creating temp directory...');
    const tempDir = await createTempDir();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(tempDir, sanitizedFileName);
    const savedPath = await saveTempFile(buffer, filePath);
    
    console.log('File saved to:', savedPath);
    
    // Obtener la lista de clientes del archivo Excel con timeout
    console.log('Getting available clients...');
    const availableClients = await Promise.race([
      getAvailableClients(savedPath),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout al obtener clientes')), 10000)
      )
    ]);
    
    console.log('Available clients:', availableClients);
    
    // Verificar si el cliente existe en el archivo
    if (!availableClients.includes(clientName)) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: `Cliente no encontrado. Clientes disponibles: [${availableClients.join(', ')}]`
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Procesar el archivo con timeout
    console.log('Processing Excel file...');
    const results = await Promise.race([
      processExcelFile(savedPath, tempDir, clientName),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout al procesar archivo')), 25000)
      )
    ]);
    
    console.log('Processing results:', Object.keys(results));
    
    // Convertir rutas absolutas a URLs accesibles
    const fileUrls: Record<string, string> = {};
    for (const [key, absolutePath] of Object.entries(results)) {
      try {
        const url = filePathToUrl(absolutePath as string);
        fileUrls[key] = url;
        console.log(`Converted ${key}: ${absolutePath} -> ${url}`);
      } catch (error) {
        console.error(`Error al convertir ruta a URL para ${key}:`, error);
        // Continuar con el siguiente archivo
      }
    }
    
    if (Object.keys(fileUrls).length === 0) {
      throw new Error('No se pudieron generar los archivos de resultados');
    }
    
    console.log('Final file URLs:', fileUrls);
    
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        files: fileUrls
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing file:', error);
    
    let errorMessage = 'Error desconocido al procesar el archivo';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Proporcionar mensajes más específicos
      if (error.message.includes('Timeout')) {
        errorMessage = 'El procesamiento del archivo está tardando demasiado. Intenta con un archivo más pequeño.';
      } else if (error.message.includes('memoria')) {
        errorMessage = 'El archivo es demasiado complejo. Intenta con un archivo más simple.';
      }
    }
    
    // Siempre devolver JSON válido, incluso en caso de error
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: errorMessage,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
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