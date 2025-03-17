import path from 'path';
import fs from 'fs';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { put, head } from '@vercel/blob';

// Detectar si estamos en Vercel
export const isVercel = process.env.VERCEL === '1';
const BLOB_PREFIX = 'inted-utils/';

/**
 * Crea un directorio temporal adecuado para el entorno
 */
export async function createTempDir(): Promise<string> {
  try {
    let tempDir: string;

    if (isVercel) {
      // En Vercel, solo necesitamos un identificador para los blobs
      tempDir = BLOB_PREFIX + Date.now().toString();
    } else {
      // En desarrollo, usar carpeta pública para poder acceder a los archivos
      tempDir = path.join(process.cwd(), 'public', 'temp', Date.now().toString());
      await mkdir(tempDir, { recursive: true });
      
      // Verificar permisos de escritura
      const testFile = path.join(tempDir, 'test.txt');
      await writeFile(testFile, 'test');
      fs.unlinkSync(testFile);
    }
    
    return tempDir;
  } catch {
    throw new Error('No se pudo crear el directorio temporal. Verifique los permisos de escritura.');
  }
}

/**
 * Guarda un archivo en el almacenamiento adecuado (Blob Storage en Vercel, sistema de archivos en desarrollo)
 */
export async function saveTempFile(buffer: Buffer, filePath: string): Promise<string> {
  try {
    if (isVercel) {
      // En Vercel, guardar en Blob Storage
      const blobName = path.basename(filePath);
      const { url } = await put(BLOB_PREFIX + blobName, buffer, {
        access: 'public',
        addRandomSuffix: false
      });
      return url;
    } else {
      // En desarrollo, guardar en el sistema de archivos
      const dir = path.dirname(filePath);
      await mkdir(dir, { recursive: true });
      await writeFile(filePath, buffer);
      return filePath;
    }
  } catch {
    throw new Error('Error al guardar el archivo temporal');
  }
}

/**
 * Convierte una ruta de archivo a una URL accesible
 */
export function filePathToUrl(filePath: string): string {
  if (isVercel) {
    // Si ya es una URL, devolverla tal cual
    if (filePath.startsWith('http')) {
      return filePath;
    }
    // Si no, es un error porque en Vercel deberíamos tener URLs
    throw new Error('Error interno: se esperaba una URL de Blob Storage');
  } else {
    // En desarrollo, convertir ruta local a URL
    const relativePath = path.relative(process.cwd(), filePath)
      .split(path.sep)
      .join('/');
    return '/' + relativePath;
  }
}

/**
 * Busca un archivo por su nombre
 */
export async function findTempFile(fileName: string): Promise<string | null> {
  try {
    if (isVercel) {
      // En Vercel, intentar obtener el blob directamente
      try {
        const blobInfo = await head(fileName);
        if (blobInfo) {
          return blobInfo.url;
        }
      } catch {
        console.log('No se encontró el blob:', fileName);
      }
      return null;
    } else {
      // En desarrollo, buscar en el sistema de archivos
      const searchDir = path.join(process.cwd(), 'public', 'temp');
      
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
    }
  } catch {
    console.error('Error al buscar archivo');
    return null;
  }
}

/**
 * Lee el contenido de un archivo
 */
export async function readTempFile(filePath: string): Promise<Buffer> {
  try {
    if (isVercel && filePath.startsWith('http')) {
      // Si es una URL de Blob Storage, hacer una petición HTTP para obtener el contenido
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Error al obtener archivo de Blob Storage: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } else {
      // En desarrollo o si es una ruta local, leer del sistema de archivos
      return await readFile(filePath);
    }
  } catch {
    throw new Error('Error al leer el archivo temporal');
  }
} 