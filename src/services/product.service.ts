import { api } from '@/config/axios';

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

class ProductService {
  private readonly BASE_URL = '/products';

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
      `${this.BASE_URL}/images`,
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
      this.BASE_URL,
      product
    );
    return data;
  }

  /**
   * Obtiene todos los productos
   */
  async getAllProducts(): Promise<ProductResponse[]> {
    const { data } = await api.get<ProductResponse[]>(this.BASE_URL);
    return data;
  }

  /**
   * Obtiene un producto por ID
   */
  async getProductById(id: number): Promise<ProductResponse> {
    const { data } = await api.get<ProductResponse>(`${this.BASE_URL}/${id}`);
    return data;
  }

  /**
   * Actualiza un producto
   */
  async updateProduct(id: number, product: CreateProductRequest): Promise<ProductResponse> {
    const { data } = await api.put<ProductResponse>(
      `${this.BASE_URL}/${id}`,
      product
    );
    return data;
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }
}

export const productService = new ProductService();
