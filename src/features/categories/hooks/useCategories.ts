'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService, CategoryResponse, CreateCategoryRequest } from '@/services/category.service';

export const CATEGORY_QUERY_KEYS = {
  all: ['categories'] as const,
  list: () => [...CATEGORY_QUERY_KEYS.all, 'list'] as const,
  detail: (id: number) => [...CATEGORY_QUERY_KEYS.all, 'detail', id] as const,
};

// Tiempos de cache específicos para categorías (datos casi estáticos)
const CATEGORY_CACHE = {
  staleTime: 15 * 60 * 1000,  // 15 minutos - categorías cambian muy poco
  gcTime: 30 * 60 * 1000,     // 30 minutos en memoria
};

/**
 * Hook para obtener todas las categorías
 * Cache largo porque las categorías raramente cambian
 */
export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.list(),
    queryFn: () => categoryService.getAllCategories(),
    staleTime: CATEGORY_CACHE.staleTime,
    gcTime: CATEGORY_CACHE.gcTime,
  });
}

/**
 * Hook para obtener una categoría por ID
 */
export function useCategory(id: number) {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.detail(id),
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id,
  });
}

/**
 * Hook para crear una categoría
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CreateCategoryRequest) => categoryService.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
    },
  });
}

/**
 * Hook para actualizar una categoría
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: CreateCategoryRequest }) =>
      categoryService.updateCategory(id, category),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.detail(variables.id) });
    },
  });
}

/**
 * Hook para eliminar una categoría
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
    },
  });
}
