import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProductStore } from '../../../stores/product.store';
import { productService } from '@/services/product.service';
import { ApiProductQueryParams as ProductSearchParams, ApiProductResponse as ProductResponse } from '@/types/api.types';
import { ProductFilters } from '../types';
import { ProductAdapter } from '../../../shared/adapters/product.adapter';

// Query keys para este feature
export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  lists: () => [...PRODUCT_QUERY_KEYS.all, 'list'] as const,
  list: (params: ProductSearchParams) => [...PRODUCT_QUERY_KEYS.lists(), params] as const,
  details: () => [...PRODUCT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PRODUCT_QUERY_KEYS.details(), id] as const,
  search: (query: string, filters?: ProductFilters) => 
    [...PRODUCT_QUERY_KEYS.all, 'search', { query, filters }] as const,
  category: (category: string) => [...PRODUCT_QUERY_KEYS.all, 'category', category] as const,
  popular: () => [...PRODUCT_QUERY_KEYS.all, 'popular'] as const,
  deals: () => [...PRODUCT_QUERY_KEYS.all, 'deals'] as const,
};

// Hook principal para productos con filtros
export const useProducts = (params: ProductSearchParams = {}, initialData?: any) => {
  const setProducts = useProductStore(state => state.setProducts);
  const setLoading = useProductStore(state => state.setLoading);
  const setError = useProductStore(state => state.setError);

  const query = useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list(params),
    queryFn: () => productService.getProducts(params),
    initialData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Actualizar store global cuando cambien los datos
  if (query.data && query.data.data) {
    setProducts(query.data.data);
    setLoading(query.isLoading);
    setError(query.error?.message || null);
  }

  return {
    ...query,
    products: query.data?.data || [],
    pagination: query.data?.pagination,
    totalCount: query.data?.pagination?.total || 0,
    hasNextPage: query.data?.pagination?.hasNext || false,
    hasPrevPage: query.data?.pagination?.hasPrev || false,
  };
};

// Hook para producto individual
export const useProduct = (id: number, initialData?: any) => {
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);
  const setError = useProductStore(state => state.setError);

  const query = useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(id),
    queryFn: async () => {
      const productData = await productService.getProductById(id);
      return ProductAdapter.toProduct(productData);
    },
    enabled: !!id,
    initialData,
    staleTime: 5 * 60 * 1000,
  });

  // Actualizar store cuando cambie el producto seleccionado
  if (query.data) {
    // Convertir de Product a ProductData para el store
    const productData = ProductAdapter.toProductData(query.data);
    setSelectedProduct(productData);
    setError(null);
  }

  if (query.error) {
    setError(query.error.message);
  }

  return query;
};

// Hook para búsqueda de productos
export const useSearchProducts = (query: string, filters?: ProductFilters, enabled: boolean = true) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.search(query, filters),
    queryFn: () => productService.searchProducts(query, filters),
    enabled: enabled && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutos para búsquedas
    select: (data) => data.slice(0, 20), // Limitar resultados de búsqueda
  });
};

// Hook para productos por categoría
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.category(category),
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para productos populares
export const usePopularProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.popular(),
    queryFn: () => productService.getPopularProducts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para ofertas especiales
export const useProductDeals = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.deals(),
    queryFn: () => productService.getDeals(),
    staleTime: 10 * 60 * 1000,
  });
};

// Hook para prefetch de productos relacionados
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  return {
    prefetchProduct: (id: number) => {
      return queryClient.prefetchQuery({
        queryKey: PRODUCT_QUERY_KEYS.detail(id),
        queryFn: () => productService.getProductById(id),
        staleTime: 5 * 60 * 1000,
      });
    },
    prefetchRelated: (productId: number, limit: number = 4) => {
      return queryClient.prefetchQuery({
        queryKey: [...PRODUCT_QUERY_KEYS.all, 'related', productId],
        queryFn: () => productService.getRelatedProducts(productId, limit),
        staleTime: 10 * 60 * 1000,
      });
    },
  };
};
