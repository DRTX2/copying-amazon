'use client';

import { useEffect } from 'react';
import { usePrefetch } from '@/hooks/usePrefetch';

/**
 * Componente que pre-carga datos esenciales al iniciar la aplicación
 * Esto mejora significativamente la experiencia del usuario al tener
 * los datos ya disponibles en cache cuando los necesite
 * 
 * Incluir en el layout principal:
 * <DataPrefetcher />
 */
export function DataPrefetcher() {
  const { prefetchEssentialData } = usePrefetch();

  useEffect(() => {
    // Pequeño delay para no bloquear el render inicial
    const timer = setTimeout(() => {
      prefetchEssentialData();
    }, 100);

    return () => clearTimeout(timer);
  }, [prefetchEssentialData]);

  // Este componente no renderiza nada
  return null;
}

export default DataPrefetcher;
