import { api } from '../config/axios';
import { ProductData } from '@/types/products';
import { PaginatedResponse } from '../shared/types/api-response.types';
import { productServiceMock } from './product.service.mock';
import { APP_CONFIG } from '../config/shared/app.config';
import { ApiProductResponse } from '../types/api.types';
import { BackendProductAdapter } from '../shared/adapters/backend-product.adapter';
import { ApiProductListSchema, ApiProductSchema, validateData } from '../types/schemas';

// Tipos específicos del servicio
export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFilters {
  category?: string[];
  brand?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
}

export interface UploadImagesResponse {
  imageUrls: string[];
}

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  averageRating: number;
  images: string[];
  sku?: string;
  stockQuantity?: number;
  status?: ProductStatus;
  slug?: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    description?: string;
  };
  averageRating: number;
  images: string[];
  sku?: string;
  stockQuantity?: number;
  status?: ProductStatus;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Servicio principal de productos que usa API real del backend
 * con fallback a datos mock si falla
 */
class ProductService {
  private readonly baseUrl = '/products';

  /**
   * Obtener productos con filtros y paginación
   * El backend devuelve un array directo de ProductResponse
   */
  async getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<ProductData>> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProducts(params);
    }

    try {
      // El backend devuelve un array directo, no un objeto paginado
      const response = await api.get<ApiProductResponse[]>(this.baseUrl, { params });
      
      // Validar respuesta con Zod para garantizar type-safety en runtime
      const validatedProducts = validateData(ApiProductListSchema, response.data);
      
      // Convertir al formato del frontend
      const products = BackendProductAdapter.toProductDataArray(validatedProducts);
      
      // Crear respuesta paginada (el backend no tiene paginación por ahora)
      return {
        data: products,
        pagination: {
          page: params.page || 1,
          limit: params.limit || products.length,
          total: products.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
        message: 'OK',
        status: 200,
      };
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProducts(params);
    }
  }

  /**
   * Obtener producto por ID
   */
  async getProductById(id: number): Promise<ProductData> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductById(id);
    }

    try {
      // El backend devuelve el producto directamente
      const response = await api.get<ApiProductResponse>(`${this.baseUrl}/${id}`);
      
      // Validar respuesta con Zod
      const validatedProduct = validateData(ApiProductSchema, response.data);
      
      return BackendProductAdapter.toProductData(validatedProduct);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProductById(id);
    }
  }

  /**
   * Obtener producto por ID (formato ProductResponse sin conversión)
   * Útil para formularios de edición que necesitan el formato del backend
   */
  async getProductByIdRaw(id: number): Promise<ProductResponse> {
    try {
      const response = await api.get<ProductResponse>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Buscar productos
   */
  async searchProducts(query: string, filters?: ProductFilters): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.searchProducts(query);
    }

    try {
      // Usar el endpoint de productos con filtro de búsqueda
      const response = await api.get<ApiProductResponse[]>(this.baseUrl);
      const products = response.data;
      
      // Filtrar localmente por nombre o descripción
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      return BackendProductAdapter.toProductDataArray(filtered);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.searchProducts(query);
    }
  }

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(category: string): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getProductsByCategory(category);
    }

    try {
      const response = await api.get<ApiProductResponse[]>(this.baseUrl);
      const products = response.data;
      
      // Filtrar por categoría
      const filtered = products.filter(p => 
        p.category?.name?.toLowerCase() === category.toLowerCase()
      );
      
      return BackendProductAdapter.toProductDataArray(filtered);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getProductsByCategory(category);
    }
  }

  /**
   * Obtener productos populares (ordenados por rating)
   */
  async getPopularProducts(limit: number = 10): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getPopularProducts(limit);
    }

    try {
      const response = await api.get<ApiProductResponse[]>(this.baseUrl);
      const products = response.data;
      
      // Ordenar por rating y limitar
      const sorted = [...products]
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, limit);
      
      return BackendProductAdapter.toProductDataArray(sorted);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getPopularProducts(limit);
    }
  }

  /**
   * Obtener productos en oferta (los más baratos por ahora)
   */
  async getDealsProducts(): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getDealsProducts();
    }

    try {
      const response = await api.get<ApiProductResponse[]>(this.baseUrl);
      const products = response.data;
      
      // Obtener los 6 más baratos como "ofertas"
      const deals = [...products]
        .sort((a, b) => a.price - b.price)
        .slice(0, 6);
      
      return BackendProductAdapter.toProductDataArray(deals);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getDealsProducts();
    }
  }

  /**
   * Obtener categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getCategories();
    }

    try {
      // Obtener categorías del endpoint de categorías
      const response = await api.get<{ id: number; name: string }[]>('/categories');
      return response.data.map(c => c.name);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      return productServiceMock.getCategories();
    }
  }

  /**
   * Obtener marcas disponibles
   */
  async getBrands(): Promise<string[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return productServiceMock.getBrands();
    }

    // El backend no tiene marcas, devolver array vacío
    return [];
  }

  /**
   * Obtener productos relacionados
   */
  async getRelatedProducts(productId: number, limit: number = 5): Promise<ProductData[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      const product = await productServiceMock.getProductById(productId);
      const allProducts = await productServiceMock.getProducts({ limit: 50 });
      return allProducts.data
        .filter(p => p.id !== productId && p.category.some(cat => product.category.includes(cat)))
        .slice(0, limit);
    }

    try {
      // Obtener el producto actual para saber su categoría
      const currentProduct = await api.get<ApiProductResponse>(`${this.baseUrl}/${productId}`);
      const categoryName = currentProduct.data.category?.name;

      // Obtener todos los productos y filtrar por categoría
      const response = await api.get<ApiProductResponse[]>(this.baseUrl);
      const related = response.data
        .filter(p => p.id !== productId && p.category?.name === categoryName)
        .slice(0, limit);

      return BackendProductAdapter.toProductDataArray(related);
    } catch (error) {
      console.warn('API failed, falling back to mock data:', error);
      const product = await productServiceMock.getProductById(productId);
      const allProducts = await productServiceMock.getProducts({ limit: 50 });
      return allProducts.data
        .filter(p => p.id !== productId && p.category.some(cat => product.category.includes(cat)))
        .slice(0, limit);
    }
  }

  /**
   * Alias para getDealsProducts (compatibilidad)
   */
  async getDeals(): Promise<ProductData[]> {
    return this.getDealsProducts();
  }

  /**
   * Sube imágenes de producto (solo SELLER)
   * @param files Array de archivos de imagen (1-5 archivos)
   * @returns Promise con las URLs de las imágenes subidas
   */
  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const { data } = await api.post<UploadImagesResponse>(
      `${this.baseUrl}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data.imageUrls;
  }

  /**
   * Crea un nuevo producto
   * @param product Datos del producto a crear
   * @returns Promise con el producto creado
   */
  async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
    const { data } = await api.post<ProductResponse>(
      this.baseUrl,
      product
    );
    return data;
  }

  /**
   * Actualiza un producto
   */
  async updateProduct(id: number, product: CreateProductRequest): Promise<ProductResponse> {
    const { data } = await api.put<ProductResponse>(
      `${this.baseUrl}/${id}`,
      product
    );
    return data;
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Obtener todos los productos (formato ProductResponse sin conversión)
   * Útil para listados de administración/seller
   */
  async getAllProductsRaw(): Promise<ProductResponse[]> {
    try {
      const response = await api.get<ProductResponse[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
