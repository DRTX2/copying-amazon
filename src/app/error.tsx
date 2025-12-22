'use client';

import { useEffect } from 'react';
import Template from '@/layouts/Template';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí podrías enviar el error a un servicio de monitoreo como Sentry
    console.error('Error capturado por Next.js Error Boundary:', error);
  }, [error]);

  return (
    <Template>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-red-100 max-w-xl w-full">
          <div className="text-red-500 mb-6 text-5xl">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Algo ha salido mal
          </h1>
          <p className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado al procesar tu solicitud. No te preocupes, ya estamos trabajando para solucionarlo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md transition-colors shadow-sm"
            >
              Intentar de nuevo
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-8 rounded-md transition-colors shadow-sm"
            >
              Volver al inicio
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200 text-left overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-700 whitespace-pre-wrap">
                {error.stack}
              </p>
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
