import { ApiProductResponse } from '../../types/api.types';
import { ProductData } from '@/types/products';
import { Product } from '@/features/products/types';

/**
 * Adapter para convertir productos del backend al formato del frontend
 */
export class BackendProductAdapter {
  /**
   * Convierte ApiProductResponse a ProductData (formato legacy del frontend)
   */
  static toProductData(backendProduct: ApiProductResponse): ProductData {
    return {
      id: backendProduct.id,
      title: backendProduct.name,
      img: backendProduct.images?.[0] || '/assets/img/placeholder-product.png',
      altImg: `Imagen de ${backendProduct.name}`,
      category: [backendProduct.category?.name || 'Sin categoría'],
      description: [backendProduct.description || ''],
      marca: '', // El backend no tiene marca
      color: '',
      estilo: '',
      usos: [],
      precio: backendProduct.price,
      descuento: 0, // El backend no tiene descuento por ahora
      cantidadDisponible: backendProduct.stockQuantity || 0,
      origenEnvio: 'Local',
    };
  }

  /**
   * Convierte ApiProductResponse a Product (formato empresarial)
   */
  static toProduct(backendProduct: ApiProductResponse): Product {
    return {
      id: backendProduct.id,
      title: backendProduct.name,
      precio: backendProduct.price,
      img: backendProduct.images?.[0] || '/assets/img/placeholder-product.png',
      altImg: `Imagen de ${backendProduct.name}`,
      category: [backendProduct.category?.name || 'Sin categoría'],
      cantidadDisponible: backendProduct.stockQuantity || 0,
      description: backendProduct.description || '',
      rating: backendProduct.averageRating,
      brand: undefined,
      discount: 0,
      tags: [],
      createdAt: backendProduct.createdAt || new Date().toISOString(),
      updatedAt: backendProduct.updatedAt || new Date().toISOString(),
    };
  }

  /**
   * Convierte array de ApiProductResponse a array de ProductData
   */
  static toProductDataArray(backendProducts: ApiProductResponse[]): ProductData[] {
    return backendProducts.map(this.toProductData);
  }

  /**
   * Convierte array de ApiProductResponse a array de Product
   */
  static toProducts(backendProducts: ApiProductResponse[]): Product[] {
    return backendProducts.map(this.toProduct);
  }

  /**
   * Convierte ProductData de vuelta al formato de request del backend
   */
  static toBackendRequest(productData: Partial<ProductData>, categoryId: number = 1) {
    return {
      name: productData.title || '',
      description: productData.description?.join('\n') || '',
      price: productData.precio || 0,
      categoryId,
      averageRating: 0,
      images: productData.img ? [productData.img] : [],
      stockQuantity: productData.cantidadDisponible || 0,
    };
  }
}
