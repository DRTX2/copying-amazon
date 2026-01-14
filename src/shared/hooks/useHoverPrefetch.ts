'use client';

import { useCallback, useRef } from 'react';
import { usePrefetch } from '@/shared/hooks/usePrefetch';

interface UseHoverPrefetchOptions {
  delay?: number; // Delay antes de hacer prefetch (ms)
  enabled?: boolean;
}

/**
 * Hook para hacer prefetch de un producto al hacer hover
 * Mejora la experiencia del usuario al pre-cargar los datos
 * antes de que haga clic en el producto
 * 
 * Uso:
 * const { onMouseEnter, onMouseLeave } = useHoverPrefetch(productId);
 * <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>...</div>
 */
export function useHoverPrefetch(
  productId: number,
  options: UseHoverPrefetchOptions = {}
) {
  const { delay = 100, enabled = true } = options;
  const { prefetchProduct, prefetchRelatedProducts } = usePrefetch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseEnter = useCallback(() => {
    if (!enabled) return;

    // Pequeño delay para evitar prefetch innecesario en scroll rápido
    timeoutRef.current = setTimeout(() => {
      prefetchProduct(productId);
      // También prefetch de productos relacionados
      prefetchRelatedProducts(productId, 4);
    }, delay);
  }, [productId, delay, enabled, prefetchProduct, prefetchRelatedProducts]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
}

/**
 * Hook para prefetch de categoría al hacer hover
 */
export function useCategoryHoverPrefetch(
  category: string,
  options: UseHoverPrefetchOptions = {}
) {
  const { delay = 150, enabled = true } = options;
  const { prefetchProductsByCategory } = usePrefetch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseEnter = useCallback(() => {
    if (!enabled || !category) return;

    timeoutRef.current = setTimeout(() => {
      prefetchProductsByCategory(category);
    }, delay);
  }, [category, delay, enabled, prefetchProductsByCategory]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
}

export default useHoverPrefetch;
