import { api } from '@/config/axios';
import { ApiCategoryResponse, ApiCreateCategoryRequest } from '@/types/api.types';

class CategoryService {
  private readonly BASE_URL = '/categories';

  /**
   * Obtiene todas las categorías
   */
  async getAllCategories(): Promise<ApiCategoryResponse[]> {
    const { data } = await api.get<ApiCategoryResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene una categoría por ID
   */
  async getCategoryById(id: number): Promise<ApiCategoryResponse> {
    const { data } = await api.get<ApiCategoryResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Crea una nueva categoría (requiere ADMIN)
   */
  async createCategory(category: ApiCreateCategoryRequest): Promise<ApiCategoryResponse> {
    const { data } = await api.post<ApiCategoryResponse>(this.BASE_URL, category);
    return data;
  }

  /**
   * Actualiza una categoría (requiere ADMIN)
   */
  async updateCategory(id: number, category: ApiCreateCategoryRequest): Promise<ApiCategoryResponse> {
    const { data } = await api.put<ApiCategoryResponse>(`${this.BASE_URL}/${id}`, category);
    return data;
  }

  /**
   * Elimina una categoría (requiere ADMIN)
   */
  async deleteCategory(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }
}

export const categoryService = new CategoryService();
