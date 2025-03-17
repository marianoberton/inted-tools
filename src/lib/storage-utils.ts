import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { mkdir, writeFile, readFile } from 'fs/promises';
import os from 'os';

// Detectar si estamos en Vercel
const isVercel = process.env.VERCEL === '1';

/**
 * Crea un directorio temporal adecuado para el entorno
 */
export async function createTempDir(): Promise<string> {
  try {
    let tempDir: string;

    if (isVercel) {
      // En Vercel, usar /tmp que es el único directorio con permisos de escritura
      tempDir = path.join('/tmp', uuidv4());
    } else {
      // En desarrollo, usar carpeta pública para poder acceder a los archivos
      tempDir = path.join(process.cwd(), 'public', 'temp', Date.now().toString());
    }

    await mkdir(tempDir, { recursive: true });
    
    // Verificar permisos de escritura
    const testFile = path.join(tempDir, 'test.txt');
    await writeFile(testFile, 'test');
    fs.unlinkSync(testFile);
    
    return tempDir;
  } catch (error) {
    console.error('Error al crear directorio temporal:', error);
    throw new Error('No se pudo crear el directorio temporal. Verifique los permisos de escritura.');
  }
}

/**
 * Convierte una ruta de archivo a una URL accesible
 */
export function filePathToUrl(filePath: string): string {
  if (isVercel) {
    // En Vercel, necesitamos servir el archivo a través de una API
    // Extraer el nombre del archivo de la ruta
    const fileName = path.basename(filePath);
    return `/api/files/${encodeURIComponent(fileName)}`;
  } else {
    // En desarrollo, los archivos en /public son accesibles directamente
    return filePath.replace(path.join(process.cwd(), 'public'), '');
  }
}

/**
 * Busca un archivo por su nombre en el directorio temporal
 */
export async function findTempFile(fileName: string): Promise<string | null> {
  try {
    let searchDir: string;
    
    if (isVercel) {
      searchDir = '/tmp';
    } else {
      searchDir = path.join(process.cwd(), 'public', 'temp');
    }
    
    // Función recursiva para buscar en subdirectorios
    const findInDir = async (dir: string): Promise<string | null> => {
      const files = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
          const found = await findInDir(fullPath);
          if (found) return found;
        } else if (file.name === fileName) {
          return fullPath;
        }
      }
      
      return null;
    };
    
    return await findInDir(searchDir);
  } catch (error) {
    console.error('Error al buscar archivo:', error);
    return null;
  }
}

/**
 * Lee el contenido de un archivo
 */
export async function readTempFile(filePath: string): Promise<Buffer> {
  try {
    return await readFile(filePath);
  } catch (error) {
    console.error('Error al leer archivo:', error);
    throw new Error(`No se pudo leer el archivo: ${filePath}`);
  }
} 