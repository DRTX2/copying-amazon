import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: unknown;
}

/**
 * Hook para manejar errores de forma centralizada
 * Muestra notificaciones toast y loguea errores
 */
export function useErrorHandler() {
  const handleError = (error: unknown, customMessage?: string) => {
    let errorMessage = customMessage || 'Ocurrió un error inesperado';

    // Handle Axios errors
    if (error instanceof AxiosError) {
      const data = error.response?.data as ApiErrorResponse;
      errorMessage = data?.message || data?.error || errorMessage;

      // Log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });
      }
    } 
    // Handle standard Error objects
    else if (error instanceof Error) {
      errorMessage = error.message;
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
      }
    }
    // Handle unknown errors
    else {
      if (process.env.NODE_ENV === 'development') {
        console.error('Unknown error:', error);
      }
    }

    // Show toast notification
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // TODO: Send to error tracking service (Sentry)
    // logErrorToSentry(error);

    return errorMessage;
  };

  return { handleError };
}

/**
 * Hook para manejar errores globales de window
 * Útil para capturar errores no manejados
 */
export function useGlobalErrorHandler() {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      event.preventDefault();
      handleError(event.error, 'Error global detectado');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      handleError(event.reason, 'Promesa rechazada no manejada');
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [handleError]);
}
