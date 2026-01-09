import { api } from '@/config/axios';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';
  address: string | null;
  phone: string | null;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';
  address: string;
  phone: string;
  password?: string;
}

export interface SellerStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  pendingOrders: number;
}

class UserService {
  private readonly BASE_URL = '/users';

  /**
   * Obtiene todos los usuarios (solo ADMIN)
   */
  async getAllUsers(): Promise<UserResponse[]> {
    const { data } = await api.get<UserResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(id: number): Promise<UserResponse> {
    const { data } = await api.get<UserResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Actualiza un usuario
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    const { data } = await api.put<UserResponse>(`${this.BASE_URL}/${id}`, userData);
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
  async getSellerStats(): Promise<SellerStats> {
    try {
      const { data } = await api.get<SellerStats>(`${this.BASE_URL}/seller/stats`);
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
