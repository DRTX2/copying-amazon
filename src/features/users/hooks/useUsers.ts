'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, UserResponse, UpdateUserRequest } from '@/services/user.service';

export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  list: () => [...USER_QUERY_KEYS.all, 'list'] as const,
  detail: (id: number) => [...USER_QUERY_KEYS.all, 'detail', id] as const,
};

/**
 * Hook para obtener todos los usuarios (solo ADMIN)
 */
export function useUsers() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.list(),
    queryFn: () => userService.getAllUsers(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para obtener un usuario por ID
 */
export function useUser(id: number) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}

/**
 * Hook para actualizar un usuario
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UpdateUserRequest }) =>
      userService.updateUser(id, userData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.list() });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(variables.id) });
    },
  });
}

/**
 * Hook para eliminar un usuario
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.list() });
    },
  });
}
