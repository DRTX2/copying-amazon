'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import { ApiOrderResponse as OrderResponse, ApiOrderRequest as CreateOrderRequest, OrderState } from '@/types/api.types';
import { Order } from '../types';

export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
  list: () => [...ORDER_QUERY_KEYS.all, 'list'] as const,
  detail: (id: number) => [...ORDER_QUERY_KEYS.all, 'detail', id] as const,
  userOrders: () => [...ORDER_QUERY_KEYS.all, 'user'] as const,
};

/**
 * Hook para obtener todas las órdenes (ADMIN)
 */
export function useOrders() {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.list(),
    queryFn: () => orderService.getAllOrders(),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook para obtener una orden por ID
 */
export function useOrder(id: number) {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
}

/**
 * Hook para crear una orden
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) => orderService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
    },
  });
}

/**
 * Hook para actualizar una orden (ADMIN)
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, orderData }: { id: number; orderData: CreateOrderRequest }) =>
      orderService.updateOrder(id, orderData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.detail(variables.id) });
    },
  });
}

/**
 * Hook para eliminar una orden (ADMIN)
 */
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
    },
  });
}

// Re-exportar utilidades del servicio
export { orderService };
export type { OrderResponse, CreateOrderRequest, OrderState };
