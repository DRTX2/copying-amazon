import { api } from '@/config/axios';
import { ProductData } from '@/types/products';
import { PaginatedResponse } from '../shared/types/api-response.types';
import { productServiceMock } from './product.service.mock';
import { APP_CONFIG } from '../config/shared/app.config';
import { 
  ApiProductResponse as ProductResponse, 
  ApiProductRequest as CreateProductRequest,
  ApiUploadImagesResponse as UploadImagesResponse,
  ApiProductQueryParams as GetProductsParams,
  ApiProductFilters as ProductFilters,
  ProductStatus
} from '@/types/api.types';


class ProductService {
  private readonly baseUrl = '/products';

  /**
   * Obtiene una lista paginada de productos con filtros
   */
  async getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<ProductData>> {
    // Si estamos en modo mock, devolver datos mock
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProducts(params);
    }

    try {
      const response = await api.get<PaginatedResponse<ProductData>>(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback a mock en caso de error de conexión si estamos en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.warn('Fallback to mock data due to API error');
        return productServiceMock.getProducts(params);
      }
      throw error;
    }
  }

  /**
   * Obtiene un producto por su ID
   */
  async getProductById(id: number): Promise<ProductData> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductById(id);
    }

    try {
      const response = await api.get<ProductData>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.getProductById(id);
      }
      throw error;
    }
  }

  /**
   * Obtiene un producto por su ID en formato Raw (ProductResponse)
   */
  async getProductByIdRaw(id: number): Promise<ProductResponse> {
    try {
      const response = await api.get<ProductResponse>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product raw:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los productos en formato Raw (ProductResponse[])
   */
  async getAllProductsRaw(): Promise<ProductResponse[]> {
    try {
      const response = await api.get<ProductResponse[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching all products raw:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto (requiere rol de vendedor o admin)
   */
  async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
    try {
      const response = await api.post<ProductResponse>(this.baseUrl, product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Actualiza un producto existente
   */
  async updateProduct(id: number, product: Partial<CreateProductRequest>): Promise<ProductResponse> {
    try {
      const response = await api.patch<ProductResponse>(`${this.baseUrl}/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Busca productos por coincidencia de texto
   */
  async searchProducts(query: string, filters?: ProductFilters): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.searchProducts(query);
    }

    try {
      const response = await api.get<ProductData[]>(`${this.baseUrl}/search`, {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.searchProducts(query);
      }
      throw error;
    }
  }

  /**
   * Obtiene productos por categoría
   */
  async getProductsByCategory(category: string): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductsByCategory(category);
    }

    try {
      const response = await api.get<ProductData[]>(`${this.baseUrl}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.getProductsByCategory(category);
      }
      throw error;
    }
  }

  /**
   * Obtiene productos populares
   */
  async getPopularProducts(limit: number = 10): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getPopularProducts(limit);
    }

    try {
      const response = await api.get<ProductData[]>(`${this.baseUrl}/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular products:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.getPopularProducts(limit);
      }
      throw error;
    }
  }

  /**
   * Obtiene productos en oferta
   */
  async getDeals(): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getDealsProducts();
    }

    try {
      const response = await api.get<ProductData[]>(`${this.baseUrl}/deals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deals:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.getDealsProducts();
      }
      throw error;
    }
  }

  /**
   * Obtiene productos relacionados
   */
  async getRelatedProducts(productId: number, limit: number = 4): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return (await productServiceMock.getProducts({ limit })).data;
    }

    try {
      const response = await api.get<ProductData[]>(`${this.baseUrl}/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }
  }

  /**
   * Sube imágenes de productos
   */
  async uploadImages(files: File[]): Promise<UploadImagesResponse> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await api.post<UploadImagesResponse>(`${this.baseUrl}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las marcas disponibles
   */
  async getBrands(): Promise<string[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getBrands();
    }

    try {
      const response = await api.get<string[]>(`${this.baseUrl}/brands`);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      if (process.env.NODE_ENV === 'development') {
        return productServiceMock.getBrands();
      }
      throw error;
    }
  }
}

export const productService = new ProductService();
