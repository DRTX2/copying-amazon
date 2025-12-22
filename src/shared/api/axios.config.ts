import axios from 'axios';
import type { ApiError } from '../types/api.types';

// Configuración del cliente HTTP
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Logging en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📡 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    // Logging en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    const apiError: ApiError = {
      message: 'Error desconocido',
      status: 500,
    };

    if (error.response) {
      // Error del servidor
      apiError.status = error.response.status;
      apiError.message = error.response.data?.message || `Error ${error.response.status}`;
      apiError.details = error.response.data;
    } else if (error.request) {
      // Error de red
      apiError.message = 'Error de conexión. Verifica tu conexión a internet.';
      apiError.status = 0;
    } else {
      // Error en la configuración
      apiError.message = error.message;
    }

    // Manejo específico por código de estado
    switch (apiError.status) {
      case 401:
        // Token expirado o inválido
        localStorage.removeItem('auth_token');
        window.location.href = '/auth/login';
        break;
      case 403:
        apiError.message = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        apiError.message = 'Recurso no encontrado';
        break;
      case 422:
        apiError.message = 'Datos inválidos';
        break;
      case 500:
        apiError.message = 'Error interno del servidor';
        break;
    }

    // Logging del error
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', apiError);
    }

    return Promise.reject(apiError);
  }
);

export default api;
