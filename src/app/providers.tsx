"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ReduxProvider } from "@/shared/stores/ReduxProvider";

/**
 * Configuración optimizada de cache para React Query
 * 
 * Tiempos de cache por tipo de datos:
 * - Productos: 5-10 min (cambian poco)
 * - Categorías: 15-30 min (casi estáticos)
 * - Usuario/Auth: 5 min (datos sensibles)
 * - Favoritos: 3-5 min (cambian moderadamente)
 * - Órdenes: 2-3 min (pueden cambiar frecuentemente)
 */
const CACHE_CONFIG = {
  // Datos casi estáticos (categorías, configuración)
  static: {
    staleTime: 15 * 60 * 1000,  // 15 minutos hasta que se considere stale
    gcTime: 30 * 60 * 1000,     // 30 minutos en cache
  },
  // Datos que cambian poco (productos)
  products: {
    staleTime: 5 * 60 * 1000,   // 5 minutos
    gcTime: 15 * 60 * 1000,     // 15 minutos
  },
  // Datos dinámicos (favoritos, carrito)
  dynamic: {
    staleTime: 3 * 60 * 1000,   // 3 minutos
    gcTime: 10 * 60 * 1000,     // 10 minutos
  },
  // Datos frecuentes (órdenes, notificaciones)
  frequent: {
    staleTime: 1 * 60 * 1000,   // 1 minuto
    gcTime: 5 * 60 * 1000,      // 5 minutos
  },
};

export { CACHE_CONFIG };

export function Providers({ children }: { children: React.ReactNode }) {
  // Crear el QueryClient con configuración optimizada
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tiempo por defecto que los datos se consideran "frescos"
            staleTime: 5 * 60 * 1000, // 5 minutos
            
            // Tiempo que los datos se mantienen en cache después de no usarse
            gcTime: 15 * 60 * 1000, // 15 minutos (antes cacheTime)
            
            // No refetch automático al volver a la ventana
            refetchOnWindowFocus: false,
            
            // No refetch automático al reconectar
            refetchOnReconnect: 'always',
            
            // Retry con backoff exponencial
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            
            // Mantener datos previos mientras se refetch
            placeholderData: (previousData: unknown) => previousData,
            
            // Usar datos estructurados para mejor performance
            structuralSharing: true,
          },
          mutations: {
            // Retry para mutaciones
            retry: 1,
            
            // Callback global de error para mutaciones
            onError: (error: Error) => {
              console.error('Mutation error:', error.message);
            },
          },
        },
      })
  );

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* Solo mostrar devtools en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
