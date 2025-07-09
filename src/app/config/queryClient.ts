import { QueryClient } from '@tanstack/react-query';

// Configuración del QueryClient con opciones empresariales
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo de cache por defecto
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // No reintentar para errores 4xx (excepto 408)
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 408) {
          return false;
        }
        // Máximo 3 reintentos para otros errores
        return failureCount < 3;
      },
      
      // Retry delay exponencial
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // No refetch automático en focus (configurable por query)
      refetchOnWindowFocus: false,
      
      // Refetch en reconexión de red
      refetchOnReconnect: true,
      
      // Configuración de errores
      throwOnError: false,
    },
    mutations: {
      // Retry para mutaciones críticas
      retry: 1,
      retryDelay: 1000,
      
      // Error handling global para mutaciones
      onError: (error: any) => {
        // Aquí puedes agregar logging global o notificaciones
        console.error('Mutation error:', error);
      },
    },
  },
});

// Función para invalidar queries relacionadas cuando hay cambios
export const invalidateRelatedQueries = {
  products: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
  cart: () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  },
  user: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
};

// Función para prefetch de datos críticos
export const prefetchCriticalData = async () => {
  // Prefetch productos populares
  await queryClient.prefetchQuery({
    queryKey: ['products', 'popular'],
    queryFn: async () => {
      // Aquí llamarías al servicio real
      const response = await fetch('/api/products/popular');
      return response.json();
    },
    staleTime: 10 * 60 * 1000,
  });
  
  // Prefetch categorías
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // Las categorías cambian menos frecuentemente
  });
};
