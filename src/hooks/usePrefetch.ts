'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import { PRODUCT_QUERY_KEYS } from '@/features/products/hooks/useProducts';
import { CATEGORY_QUERY_KEYS } from '@/features/categories/hooks/useCategories';

/**
 * Hook para prefetching inteligente de datos
 * Mejora la experiencia del usuario al pre-cargar datos antes de que se necesiten
 */
export function usePrefetch() {
  const queryClient = useQueryClient();

  /**
   * Prefetch de un producto específico (útil al hacer hover sobre un producto)
   */
  const prefetchProduct = useCallback(
    (productId: number) => {
      queryClient.prefetchQuery({
        queryKey: PRODUCT_QUERY_KEYS.detail(productId),
        queryFn: () => productService.getProductById(productId),
        staleTime: 5 * 60 * 1000, // 5 minutos
      });
    },
    [queryClient]
  );

  /**
   * Prefetch de productos relacionados
   */
  const prefetchRelatedProducts = useCallback(
    (productId: number, limit: number = 4) => {
      queryClient.prefetchQuery({
        queryKey: [...PRODUCT_QUERY_KEYS.all, 'related', productId],
        queryFn: () => productService.getRelatedProducts(productId, limit),
        staleTime: 10 * 60 * 1000, // 10 minutos
      });
    },
    [queryClient]
  );

  /**
   * Prefetch de productos por categoría
   */
  const prefetchProductsByCategory = useCallback(
    (category: string) => {
      queryClient.prefetchQuery({
        queryKey: PRODUCT_QUERY_KEYS.category(category),
        queryFn: () => productService.getProductsByCategory(category),
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );

  /**
   * Prefetch de categorías (útil al cargar la app)
   */
  const prefetchCategories = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: CATEGORY_QUERY_KEYS.list(),
      queryFn: () => categoryService.getAllCategories(),
      staleTime: 15 * 60 * 1000, // 15 minutos
    });
  }, [queryClient]);

  /**
   * Prefetch de productos populares
   */
  const prefetchPopularProducts = useCallback(
    (limit: number = 10) => {
      queryClient.prefetchQuery({
        queryKey: PRODUCT_QUERY_KEYS.popular(),
        queryFn: () => productService.getPopularProducts(limit),
        staleTime: 15 * 60 * 1000,
      });
    },
    [queryClient]
  );

  /**
   * Prefetch de ofertas
   */
  const prefetchDeals = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: PRODUCT_QUERY_KEYS.deals(),
      queryFn: () => productService.getDeals(),
      staleTime: 10 * 60 * 1000,
    });
  }, [queryClient]);

  /**
   * Prefetch inicial de datos esenciales al cargar la app
   * Llamar en el layout principal
   */
  const prefetchEssentialData = useCallback(() => {
    // Prefetch categorías
    prefetchCategories();
    // Prefetch productos populares
    prefetchPopularProducts(12);
    // Prefetch ofertas
    prefetchDeals();
  }, [prefetchCategories, prefetchPopularProducts, prefetchDeals]);

  /**
   * Invalidar cache específico
   */
  const invalidateProducts = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
  }, [queryClient]);

  const invalidateCategories = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
  }, [queryClient]);

  return {
    // Prefetch individual
    prefetchProduct,
    prefetchRelatedProducts,
    prefetchProductsByCategory,
    prefetchCategories,
    prefetchPopularProducts,
    prefetchDeals,
    
    // Prefetch batch
    prefetchEssentialData,
    
    // Invalidación
    invalidateProducts,
    invalidateCategories,
  };
}

/**
 * Hook para obtener datos del cache directamente sin hacer fetch
 */
export function useCacheData() {
  const queryClient = useQueryClient();

  const getProductFromCache = useCallback(
    (productId: number) => {
      return queryClient.getQueryData(PRODUCT_QUERY_KEYS.detail(productId));
    },
    [queryClient]
  );

  const getCategoriesFromCache = useCallback(() => {
    return queryClient.getQueryData(CATEGORY_QUERY_KEYS.list());
  }, [queryClient]);

  const isCached = useCallback(
    (queryKey: unknown[]) => {
      const state = queryClient.getQueryState(queryKey);
      return state?.data !== undefined;
    },
    [queryClient]
  );

  return {
    getProductFromCache,
    getCategoriesFromCache,
    isCached,
  };
}
