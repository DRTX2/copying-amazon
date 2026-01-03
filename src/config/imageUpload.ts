// Configuración de límites para carga de imágenes de productos
export const PRODUCT_IMAGE_CONFIG = {
  // Límites basados en el backend (.env)
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB por archivo
  MAX_FILES_COUNT: 5, // Máximo 5 archivos
  MAX_TOTAL_SIZE: 20 * 1024 * 1024, // 20MB total
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Configuración de compresión
  COMPRESSION_QUALITY: 0.85,
  MAX_DIMENSION: 2048, // Máxima dimensión (ancho o alto)
} as const;

// Mensajes de error
export const IMAGE_UPLOAD_ERRORS = {
  FILE_TOO_LARGE: (size: number) => 
    `El archivo es demasiado grande. Tamaño máximo: ${(size / 1024 / 1024).toFixed(1)}MB`,
  TOO_MANY_FILES: (max: number) => 
    `Demasiados archivos. Máximo permitido: ${max}`,
  TOTAL_SIZE_EXCEEDED: (max: number) => 
    `El tamaño total excede el límite. Máximo: ${(max / 1024 / 1024).toFixed(1)}MB`,
  INVALID_TYPE: 'Tipo de archivo no válido. Use: JPG, PNG o WEBP',
  UPLOAD_FAILED: 'Error al cargar la imagen. Intente nuevamente.',
} as const;
