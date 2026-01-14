const MB = 1024 * 1024;

const bytesToMB = (bytes: number): string => (bytes / MB).toFixed(1);

export const PRODUCT_IMAGE_CONFIG = {
  // Límites de archivos
  limits: {
    maxFileSize: 5 * MB,
    maxFilesCount: 5,
    maxTotalSize: 20 * MB,
    maxDimension: 2048,
  },

  // Formatos permitidos
  formats: {
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ] as const,

    extensions: [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.gif',
    ] as const,
  },

  // Configuración de compresión
  compression: {
    quality: 0.85,
  },
} as const;

export type AllowedImageMimeType =
  typeof PRODUCT_IMAGE_CONFIG.formats.mimeTypes[number];

export const IMAGE_UPLOAD_ERRORS = {
  fileTooLarge: (maxBytes: number) =>
    `El archivo es demasiado grande. Máximo: ${bytesToMB(maxBytes)}MB`,

  tooManyFiles: (max: number) =>
    `Demasiados archivos. Máximo permitido: ${max}`,

  totalSizeExceeded: (maxBytes: number) =>
    `El tamaño total excede el límite. Máximo: ${bytesToMB(maxBytes)}MB`,

  invalidType:
    'Tipo de archivo no válido. Use: JPG, PNG, WEBP o GIF',

  uploadFailed:
    'Error al cargar la imagen. Intente nuevamente.',
} as const;
