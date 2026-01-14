import { api } from '@/config/axios';
import { ApiFavoriteResponse, ApiProductResponse } from '@/types/api.types';

class FavoriteService {
  private readonly BASE_URL = '/favorites';

  /**
   * Obtiene los favoritos del usuario autenticado
   */
  async getUserFavorites(): Promise<ApiProductResponse[]> {
    const { data } = await api.get<ApiProductResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Agrega un producto a favoritos
   */
  async addFavorite(productId: number): Promise<ApiFavoriteResponse> {
    const { data } = await api.post<ApiFavoriteResponse>(`${this.BASE_URL}/product/${productId}`);
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
