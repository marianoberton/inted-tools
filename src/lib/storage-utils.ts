import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { put, list, del, head } from '@vercel/blob';

// Detectar si estamos en Vercel
const isVercel = process.env.VERCEL === '1';

// Prefijo para organizar los blobs
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
  } catch (error) {
    console.error('Error al crear directorio temporal:', error);
    throw new Error('No se pudo crear el directorio temporal. Verifique los permisos de escritura.');
  }
}

/**
 * Guarda un archivo en el almacenamiento adecuado (Blob Storage en Vercel, sistema de archivos en desarrollo)
 */
export async function saveTempFile(fileBuffer: Buffer, filePath: string): Promise<string> {
  try {
    if (isVercel) {
      // En Vercel, usar Blob Storage
      const fileName = path.basename(filePath);
      const blob = await put(fileName, fileBuffer, { access: 'public' });
      console.log('Archivo guardado en Blob Storage:', blob.url);
      return blob.url; // Devolver la URL completa
    } else {
      // En desarrollo, guardar en el sistema de archivos
      await writeFile(filePath, fileBuffer);
      console.log('Archivo guardado en sistema de archivos:', filePath);
      return filePath;
    }
  } catch (error) {
    console.error('Error al guardar archivo temporal:', error);
    throw new Error(`No se pudo guardar el archivo temporal: ${filePath}`);
  }
}

/**
 * Convierte una ruta de archivo a una URL accesible
 */
export function filePathToUrl(filePath: string): string {
  if (isVercel) {
    if (filePath.startsWith('http')) {
      // Ya es una URL de Blob Storage
      return filePath;
    }
    // Extraer el nombre del archivo de la ruta
    const fileName = path.basename(filePath);
    return `/api/files/${encodeURIComponent(fileName)}`;
  } else {
    // En desarrollo, los archivos en /public son accesibles directamente
    return filePath.replace(path.join(process.cwd(), 'public'), '');
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
      } catch (error) {
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
  } catch (error) {
    console.error('Error al leer archivo:', error);
    throw new Error(`No se pudo leer el archivo: ${filePath}`);
  }
} 