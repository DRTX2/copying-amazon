// Configuración del entorno
export const APP_CONFIG = {
  // Cambiar a true para usar datos locales (JSON)
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.DEV,
  
  // URL base de la API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  
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
    ENVIRONMENT: import.meta.env.MODE,
  }
};

// Función para verificar si estamos en modo desarrollo
export const isDevelopment = () => import.meta.env.DEV;

// Función para verificar si estamos en modo producción
export const isProduction = () => import.meta.env.PROD;

// Función para obtener la configuración actual
export const getConfig = () => {
  return {
    ...APP_CONFIG,
    currentMode: import.meta.env.MODE,
    isDev: isDevelopment(),
    isProd: isProduction(),
  };
};
