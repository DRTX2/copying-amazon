import { api } from '@/config/axios';
import { ApiCartResponse, ApiCartRequest, ApiCartItemResponse } from '@/types/api.types';

class BackendCartService {
  private readonly BASE_URL = '/carts';

  /**
   * Obtiene los carritos del usuario
   */
  async getUserCarts(userId: number): Promise<ApiCartResponse[]> {
    const { data } = await api.get<ApiCartResponse[]>(this.BASE_URL, {
      params: { userId }
    });
    return data;
  }

  /**
   * Obtiene un carrito por ID
   */
  async getCartById(id: number): Promise<ApiCartResponse> {
    const { data } = await api.get<ApiCartResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Crea un nuevo carrito
   */
  async createCart(cartData: ApiCartRequest): Promise<ApiCartResponse> {
    const { data } = await api.post<ApiCartResponse>(this.BASE_URL, cartData);
    return data;
  }

  /**
   * Actualiza un carrito
   */
  async updateCart(id: number, cartData: ApiCartRequest): Promise<ApiCartResponse> {
    const { data } = await api.put<ApiCartResponse>(`${this.BASE_URL}/${id}`, cartData);
    return data;
  }

  /**
   * Elimina un carrito
   */
  async deleteCart(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Sincroniza el carrito local con el backend
   */
  async syncCart(userId: number, items: ApiCartItemResponse[]): Promise<ApiCartResponse> {
    const carts = await this.getUserCarts(userId);
    
    if (carts.length > 0) {
      // Actualizar carrito existente
      return this.updateCart(carts[0].id, { userId, items });
    } else {
      // Crear nuevo carrito
      return this.createCart({ userId, items });
    }
  }
}

export const backendCartService = new BackendCartService();
