import {
  PRODUCT_IMAGE_CONFIG,
  IMAGE_UPLOAD_ERRORS,
} from '@/config/imageUpload';

/**
 * Valida un archivo de imagen
 */
export const validateImageFile = (file: File): string | null => {
  const { formats, limits } = PRODUCT_IMAGE_CONFIG;

  // Validar tipo MIME
  if (!formats.mimeTypes.includes(file.type as any)) {
    return IMAGE_UPLOAD_ERRORS.invalidType;
  }

  // Validar tamaño individual
  if (file.size > limits.maxFileSize) {
    return IMAGE_UPLOAD_ERRORS.fileTooLarge(limits.maxFileSize);
  }

  return null;
};

/**
 * Valida un conjunto de archivos de imagen
 */
export const validateImageFiles = (files: File[]): string | null => {
  const { limits } = PRODUCT_IMAGE_CONFIG;

  // Validar cantidad
  if (files.length > limits.maxFilesCount) {
    return IMAGE_UPLOAD_ERRORS.tooManyFiles(limits.maxFilesCount);
  }

  // Validar cada archivo
  for (const file of files) {
    const error = validateImageFile(file);
    if (error) return error;
  }

  // Validar tamaño total
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > limits.maxTotalSize) {
    return IMAGE_UPLOAD_ERRORS.totalSizeExceeded(limits.maxTotalSize);
  }

  return null;
};

/**
 * Comprime una imagen usando Canvas
 */
export const compressImage = async (
  file: File,
  quality: number = PRODUCT_IMAGE_CONFIG.compression.quality
): Promise<File> => {
  const { maxDimension } = PRODUCT_IMAGE_CONFIG.limits;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Redimensionar si excede dimensiones máximas
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
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

            resolve(
              new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
            );
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
