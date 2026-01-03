import { PRODUCT_IMAGE_CONFIG, IMAGE_UPLOAD_ERRORS } from '@/config/imageUpload';

/**
 * Valida un archivo de imagen
 */
export const validateImageFile = (file: File): string | null => {
  // Validar tipo
  const allowedTypes = PRODUCT_IMAGE_CONFIG.ALLOWED_TYPES as readonly string[];
  if (!allowedTypes.includes(file.type)) {
    return IMAGE_UPLOAD_ERRORS.INVALID_TYPE;
  }

  // Validar tamaño individual
  if (file.size > PRODUCT_IMAGE_CONFIG.MAX_FILE_SIZE) {
    return IMAGE_UPLOAD_ERRORS.FILE_TOO_LARGE(PRODUCT_IMAGE_CONFIG.MAX_FILE_SIZE);
  }

  return null;
};

/**
 * Valida un conjunto de archivos de imagen
 */
export const validateImageFiles = (files: File[]): string | null => {
  // Validar cantidad
  if (files.length > PRODUCT_IMAGE_CONFIG.MAX_FILES_COUNT) {
    return IMAGE_UPLOAD_ERRORS.TOO_MANY_FILES(PRODUCT_IMAGE_CONFIG.MAX_FILES_COUNT);
  }

  // Validar cada archivo
  for (const file of files) {
    const error = validateImageFile(file);
    if (error) return error;
  }

  // Validar tamaño total
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > PRODUCT_IMAGE_CONFIG.MAX_TOTAL_SIZE) {
    return IMAGE_UPLOAD_ERRORS.TOTAL_SIZE_EXCEEDED(PRODUCT_IMAGE_CONFIG.MAX_TOTAL_SIZE);
  }

  return null;
};

/**
 * Comprime una imagen usando Canvas
 */
export const compressImage = async (
  file: File,
  quality: number = PRODUCT_IMAGE_CONFIG.COMPRESSION_QUALITY
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Redimensionar si excede las dimensiones máximas
        const maxDim = PRODUCT_IMAGE_CONFIG.MAX_DIMENSION;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height / width) * maxDim;
            width = maxDim;
          } else {
            width = (width / height) * maxDim;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al comprimir la imagen'));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen'));
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo'));
  });
};

/**
 * Formatea el tamaño de archivo para mostrar
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Crea una URL de preview para un archivo
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
};
