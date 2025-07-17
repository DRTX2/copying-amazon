import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo de cache por defecto
      staleTime: 5 * 60 * 1000, // 5 minutos, datos frescos que no se pediran de nuevo
      gcTime: 10 * 60 * 1000, //  tiempo que React Query mantiene en memoria la data después de que no hay ningún componente usándola.
      
      retry: (failureCount, error: any) => {// no reintentar errores 400-499 excepto 408, si son otros reintentar hasta 3 veces
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 408) {
          return false;
        }
        return failureCount < 3;
      },
      
      // Retry delay exponencial
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // No refetch automático al volver a la pagina
      refetchOnWindowFocus: false,
      
      // no network, no refetch
      refetchOnReconnect: true,
      
      // avoid throw exceptions, insted of that, return error using onError
      throwOnError: false,
    },

    mutations: {// modifican datos en el servidor
      retry: 1, // reintentar una vez mas si falla luego de 1 seg, sino lanzar error
      retryDelay: 1000,
      onError: (error: any) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

export const invalidateRelatedQueries = { // datos no confiables, se hace una nueva peticion si se requiere
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

// cuando el usuario llegue a cierta pagina ya se encuentren los datos
export const prefetchCriticalData = async () => {
  // Prefetch productos populares
  // manualmente se obtiene y guarda la info, sin necesidad de que useQuery esste montado
  await queryClient.prefetchQuery({
    // guardar query con una clave unica
    queryKey: ['products', 'popular'],
    queryFn: async () => {
      // Aquí llamarías al servicio real
      const response = await fetch('/api/products/popular');
      return response.json();
    },
    staleTime: 10 * 60 * 1000,
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      return response.json();
    },
    staleTime: 30 * 60 * 1000,
  });
};
