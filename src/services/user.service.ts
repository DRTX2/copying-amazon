import { api } from '@/config/axios';
import { ApiUserResponse, ApiUpdateUserRequest, ApiSellerStats } from '@/types/api.types';

class UserService {
  private readonly BASE_URL = '/users';

  /**
   * Obtiene todos los usuarios (solo ADMIN)
   */
  async getAllUsers(): Promise<ApiUserResponse[]> {
    const { data } = await api.get<ApiUserResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(id: number): Promise<ApiUserResponse> {
    const { data } = await api.get<ApiUserResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Actualiza un usuario
   */
  async updateUser(id: number, userData: ApiUpdateUserRequest): Promise<ApiUserResponse> {
    const { data } = await api.put<ApiUserResponse>(`${this.BASE_URL}/${id}`, userData);
    return data;
  }

  /**
   * Elimina un usuario (solo ADMIN)
   */
  async deleteUser(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Obtiene estadísticas del vendedor
   */
  async getSellerStats(): Promise<ApiSellerStats> {
    try {
      const { data } = await api.get<ApiSellerStats>(`${this.BASE_URL}/seller/stats`);
      return data;
    } catch {
      // Si el endpoint no existe, devolvemos stats vacías
      return {
        totalProducts: 0,
        activeProducts: 0,
        totalSales: 0,
        pendingOrders: 0,
      };
    }
  }
}

export const userService = new UserService();
