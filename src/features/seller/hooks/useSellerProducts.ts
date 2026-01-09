'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, CreateProductRequest, ProductResponse } from '@/services/product.service';

export const SELLER_QUERY_KEYS = {
  all: ['seller'] as const,
  products: () => [...SELLER_QUERY_KEYS.all, 'products'] as const,
  product: (id: number) => [...SELLER_QUERY_KEYS.products(), id] as const,
  stats: () => [...SELLER_QUERY_KEYS.all, 'stats'] as const,
};

/**
 * Hook para obtener todos los productos del vendedor
 */
export function useSellerProducts() {
  return useQuery({
    queryKey: SELLER_QUERY_KEYS.products(),
    queryFn: () => productService.getAllProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

/**
 * Hook para obtener un producto específico
 */
export function useSellerProduct(id: number) {
  return useQuery({
    queryKey: SELLER_QUERY_KEYS.product(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
}

/**
 * Hook para crear un producto
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductRequest) => productService.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.products() });
    },
  });
}

/**
 * Hook para actualizar un producto
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: CreateProductRequest }) =>
      productService.updateProduct(id, product),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.products() });
      queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.product(variables.id) });
    },
  });
}

/**
 * Hook para eliminar un producto
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.products() });
    },
  });
}

/**
 * Hook para subir imágenes de producto
 */
export function useUploadProductImages() {
  return useMutation({
    mutationFn: (files: File[]) => productService.uploadProductImages(files),
  });
}
