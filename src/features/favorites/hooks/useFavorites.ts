'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteService, FavoriteResponse } from '@/services/favorite.service';
import { ProductResponse } from '@/services/product.service';

export const FAVORITE_QUERY_KEYS = {
  all: ['favorites'] as const,
  list: () => [...FAVORITE_QUERY_KEYS.all, 'list'] as const,
  check: (productId: number) => [...FAVORITE_QUERY_KEYS.all, 'check', productId] as const,
};

/**
 * Hook para obtener los favoritos del usuario
 */
export function useFavorites() {
  return useQuery({
    queryKey: FAVORITE_QUERY_KEYS.list(),
    queryFn: () => favoriteService.getUserFavorites(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para verificar si un producto está en favoritos
 */
export function useIsFavorite(productId: number) {
  const { data: favorites = [] } = useFavorites();
  return favorites.some(p => p.id === productId);
}

/**
 * Hook para agregar un producto a favoritos
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => favoriteService.addFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITE_QUERY_KEYS.all });
    },
  });
}

/**
 * Hook para eliminar un producto de favoritos
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => favoriteService.removeFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITE_QUERY_KEYS.all });
    },
  });
}

/**
 * Hook para toggle de favoritos (agregar/quitar)
 */
export function useToggleFavorite() {
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const { data: favorites = [] } = useFavorites();

  const toggle = async (productId: number) => {
    const isFavorite = favorites.some(p => p.id === productId);
    
    if (isFavorite) {
      await removeFavorite.mutateAsync(productId);
    } else {
      await addFavorite.mutateAsync(productId);
    }
  };

  return {
    toggle,
    isLoading: addFavorite.isPending || removeFavorite.isPending,
  };
}
