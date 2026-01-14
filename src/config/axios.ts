import axios from 'axios';
import { jwtService } from '../services/jwt.service';
import { AuthResponse, AuthTokens } from '../features/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar JWT automáticamente a las requests
api.interceptors.request.use(
  (config) => {
    const token = jwtService.getAccessToken();
    
    if (token && jwtService.isValidToken(token)) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores de autenticación
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si recibimos 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = jwtService.getRefreshToken();
      
      if (refreshToken) {
        try {
          // Intentar refrescar el token
          const response = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;
          
          // Guardar nuevos tokens
          jwtService.storeTokens(accessToken, newRefreshToken);
          
          // Reintentar la request original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
          
        } catch (refreshError) {
          // Si falla el refresh, limpiar tokens y redirigir al login
          jwtService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No hay refresh token, limpiar storage y redirigir
        jwtService.clearTokens();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

