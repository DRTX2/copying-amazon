import { api } from '@/config/axios';
import { 
  OrderState, 
  ApiOrderResponse as OrderResponse, 
  ApiOrderRequest as CreateOrderRequest 
} from '@/types/api.types';

class OrderService {
  private readonly BASE_URL = '/orders';

  /**
   * Obtiene todas las órdenes (requiere ADMIN)
   */
  async getAllOrders(): Promise<OrderResponse[]> {
    const { data } = await api.get<OrderResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene una orden por ID
   */
  async getOrderById(id: number): Promise<OrderResponse> {
    const { data } = await api.get<OrderResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Crea una nueva orden
   */
  async createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
    const { data } = await api.post<OrderResponse>(this.BASE_URL, orderData);
    return data;
  }

  /**
   * Actualiza una orden (requiere ADMIN)
   */
  async updateOrder(id: number, orderData: CreateOrderRequest): Promise<OrderResponse> {
    const { data } = await api.put<OrderResponse>(`${this.BASE_URL}/${id}`, orderData);
    return data;
  }

  /**
   * Elimina una orden (requiere ADMIN)
   */
  async deleteOrder(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Obtiene el texto del estado de la orden en español
   */
  getOrderStateLabel(state: OrderState): string {
    const labels: Record<OrderState, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      SHIPPED: 'Enviada',
      DELIVERED: 'Entregada',
      CANCELLED: 'Cancelada',
    };
    return labels[state] || state;
  }

  /**
   * Obtiene el color del estado de la orden
   */
  getOrderStateColor(state: OrderState): string {
    const colors: Record<OrderState, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[state] || 'bg-gray-100 text-gray-800';
  }
}

export const orderService = new OrderService();
