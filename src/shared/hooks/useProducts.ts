import { useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { useProductStore } from '../stores/product.store';

// Query keys para React Query
export const PRODUCT_KEYS = {
  all: ['products'] as const,
  lists: () => [...PRODUCT_KEYS.all, 'list'] as const,
  list: (filters: any) => [...PRODUCT_KEYS.lists(), { filters }] as const,
  details: () => [...PRODUCT_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PRODUCT_KEYS.details(), id] as const,
  search: (query: string) => [...PRODUCT_KEYS.all, 'search', query] as const,
  category: (category: string) => [...PRODUCT_KEYS.all, 'category', category] as const,
  related: (id: number) => [...PRODUCT_KEYS.all, 'related', id] as const,
  popular: () => [...PRODUCT_KEYS.all, 'popular'] as const,
  deals: () => [...PRODUCT_KEYS.all, 'deals'] as const,
};

// Hook para obtener productos con filtros
export const useProducts = (params: any = {}) => {
  const setProducts = useProductStore(state => state.setProducts);
  const setLoading = useProductStore(state => state.setLoading);
  const setError = useProductStore(state => state.setError);

  const query = useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Actualizar store cuando cambien los datos
  if (query.data) {
    setProducts(query.data.data);
    setLoading(false);
    setError(null);
  }

  if (query.error) {
    setError(query.error.message);
    setLoading(false);
  }

  return query;
};

// Hook para obtener producto por ID
export const useProduct = (id: number) => {
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);
  const setError = useProductStore(state => state.setError);

  const query = useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // Actualizar store cuando cambien los datos
  if (query.data) {
    setSelectedProduct(query.data);
    setError(null);
  }

  if (query.error) {
    setError(query.error.message);
  }

  return query;
};

// Hook para buscar productos
export const useSearchProducts = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: enabled && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutos
    select: (data) => data.slice(0, 10), // Limitar resultados
  });
};

// Hook para productos por categoría
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.category(category),
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para productos relacionados
export const useRelatedProducts = (productId: number, limit: number = 4) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.related(productId),
    queryFn: () => productService.getRelatedProducts(productId, limit),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook para productos populares
export const usePopularProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.popular(),
    queryFn: () => productService.getPopularProducts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para ofertas
export const useDeals = () => {
  return useQuery({
    queryKey: PRODUCT_KEYS.deals(),
    queryFn: () => productService.getDeals(),
    staleTime: 10 * 60 * 1000,
  });
};

// Hook para invalidar cache de productos
export const useInvalidateProducts = () => {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all }),
    invalidateList: (filters?: any) => 
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.list(filters) }),
    invalidateDetail: (id: number) => 
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) }),
    invalidateSearch: (query: string) => 
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.search(query) }),
    invalidateCategory: (category: string) => 
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.category(category) }),
  };
};

// Hook para prefetch de productos
export const usePrefetchProducts = () => {
  const queryClient = useQueryClient();

  return {
    prefetchProduct: (id: number) => 
      queryClient.prefetchQuery({
        queryKey: PRODUCT_KEYS.detail(id),
        queryFn: () => productService.getProductById(id),
        staleTime: 5 * 60 * 1000,
      }),
    prefetchRelated: (productId: number, limit: number = 4) => 
      queryClient.prefetchQuery({
        queryKey: PRODUCT_KEYS.related(productId),
        queryFn: () => productService.getRelatedProducts(productId, limit),
        staleTime: 10 * 60 * 1000,
      }),
  };
};
