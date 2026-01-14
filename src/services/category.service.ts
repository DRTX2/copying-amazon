import { api } from '@/config/axios';

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

class CategoryService {
  private readonly BASE_URL = '/categories';

  /**
   * Obtiene todas las categorías
   */
  async getAllCategories(): Promise<CategoryResponse[]> {
    const { data } = await api.get<CategoryResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene una categoría por ID
   */
  async getCategoryById(id: number): Promise<CategoryResponse> {
    const { data } = await api.get<CategoryResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Crea una nueva categoría (requiere ADMIN)
   */
  async createCategory(category: CreateCategoryRequest): Promise<CategoryResponse> {
    const { data } = await api.post<CategoryResponse>(this.BASE_URL, category);
    return data;
  }

  /**
   * Actualiza una categoría (requiere ADMIN)
   */
  async updateCategory(id: number, category: CreateCategoryRequest): Promise<CategoryResponse> {
    const { data } = await api.put<CategoryResponse>(`${this.BASE_URL}/${id}`, category);
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
