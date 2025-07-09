import { api } from '../api/axios.config';
import { ProductData } from '../../types/products';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { productServiceMock } from './product.service.mock';
import { APP_CONFIG } from '../config/app.config';

// Tipos específicos del servicio
interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

interface ProductFilters {
  category?: string[];
  brand?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
}

/**
 * Servicio principal de productos que puede usar datos locales o API
 */
class ProductService {
  private readonly baseUrl = '/products';

  // Obtener productos con filtros y paginación
  async getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<ProductData>> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProducts(params);
    }

    try {
      const response = await api.get<PaginatedResponse<ProductData>>(this.baseUrl, {
        params,
      });
      return response.data;
    } catch (error) {
      // Fallback al mock si falla la API
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProducts(params);
    }
  }

  // Obtener producto por ID
  async getProductById(id: number): Promise<ProductData> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductById(id);
    }

    try {
      const response = await api.get<ApiResponse<ProductData>>(`${this.baseUrl}/${id}`);
      return response.data.data;
    } catch (error) {
      // Fallback al mock si falla la API
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProductById(id);
    }
  }

  // Buscar productos
  async searchProducts(query: string, filters?: ProductFilters): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.searchProducts(query);
    }

    try {
      const response = await api.get<ApiResponse<ProductData[]>>(`${this.baseUrl}/search`, {
        params: { q: query, ...filters },
      });
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.searchProducts(query);
    }
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductsByCategory(category);
    }

    try {
      const response = await api.get<ApiResponse<ProductData[]>>(`${this.baseUrl}/category/${category}`);
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProductsByCategory(category);
    }
  }

  // Obtener productos populares
  async getPopularProducts(limit: number = 10): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getPopularProducts(limit);
    }

    try {
      const response = await api.get<ApiResponse<ProductData[]>>(`${this.baseUrl}/popular`, {
        params: { limit },
      });
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getPopularProducts(limit);
    }
  }

  // Obtener productos en oferta
  async getDealsProducts(): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getDealsProducts();
    }

    try {
      const response = await api.get<ApiResponse<ProductData[]>>(`${this.baseUrl}/deals`);
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getDealsProducts();
    }
  }

  // Obtener categorías disponibles
  async getCategories(): Promise<string[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getCategories();
    }

    try {
      const response = await api.get<ApiResponse<string[]>>(`${this.baseUrl}/categories`);
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getCategories();
    }
  }

  // Obtener marcas disponibles
  async getBrands(): Promise<string[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getBrands();
    }

    try {
      const response = await api.get<ApiResponse<string[]>>(`${this.baseUrl}/brands`);
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getBrands();
    }
  }

  // Obtener productos relacionados
  async getRelatedProducts(productId: number, limit: number = 5): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      // Mock: obtener productos de la misma categoría
      const product = await productServiceMock.getProductById(productId);
      const allProducts = await productServiceMock.getProducts({ limit: 50 });
      return allProducts.data
        .filter(p => p.id !== productId && p.category.some(cat => product.category.includes(cat)))
        .slice(0, limit);
    }

    try {
      const response = await api.get<ApiResponse<ProductData[]>>(`${this.baseUrl}/${productId}/related`, {
        params: { limit },
      });
      return response.data.data;
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      const product = await productServiceMock.getProductById(productId);
      const allProducts = await productServiceMock.getProducts({ limit: 50 });
      return allProducts.data
        .filter(p => p.id !== productId && p.category.some(cat => product.category.includes(cat)))
        .slice(0, limit);
    }
  }

  // Alias para getDealsProducts (compatibilidad)
  async getDeals(): Promise<ProductData[]> {
    return this.getDealsProducts();
  }

}

export const productService = new ProductService();
