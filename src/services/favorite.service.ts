import { api } from '@/config/axios';
import { ProductResponse } from './product.service';

export interface FavoriteResponse {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  product: ProductResponse;
  createdAt: string;
}

class FavoriteService {
  private readonly BASE_URL = '/favorites';

  /**
   * Obtiene los favoritos del usuario autenticado
   */
  async getUserFavorites(): Promise<ProductResponse[]> {
    const { data } = await api.get<ProductResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Agrega un producto a favoritos
   */
  async addFavorite(productId: number): Promise<FavoriteResponse> {
    const { data } = await api.post<FavoriteResponse>(`${this.BASE_URL}/product/${productId}`);
    return data;
  }

  /**
   * Elimina un producto de favoritos
   */
  async removeFavorite(productId: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/product/${productId}`);
  }

  /**
   * Verifica si un producto está en favoritos
   */
  async isFavorite(productId: number): Promise<boolean> {
    try {
      const favorites = await this.getUserFavorites();
      return favorites.some(p => p.id === productId);
    } catch {
      return false;
    }
  }
}

export const favoriteService = new FavoriteService();
