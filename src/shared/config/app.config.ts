// Configuración del entorno
export const APP_CONFIG = {
  // Cambiar a true para usar datos locales (JSON) - false para usar API real
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  
  // URL base de la API
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.yourdomain.com',
  
  // Configuración específica para productos
  PRODUCTS: {
    CACHE_TIME: 5 * 60 * 1000, // 5 minutos
    STALE_TIME: 3 * 60 * 1000, // 3 minutos
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 100,
  },
  
  // Configuración de la aplicación
  APP: {
    NAME: 'Amazon Clone',
    VERSION: '1.0.0',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
  }
};

// Función para verificar si estamos en modo desarrollo
export const isDevelopment = () => process.env.NODE_ENV === 'development';

// Función para verificar si estamos en modo producción
export const isProduction = () => process.env.NODE_ENV === 'production';

// Función para obtener la configuración actual
export const getConfig = () => {
  return {
    ...APP_CONFIG,
    currentMode: process.env.NODE_ENV || 'development',
    isDev: isDevelopment(),
    isProd: isProduction(),
  };
};
