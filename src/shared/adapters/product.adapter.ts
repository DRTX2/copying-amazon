import { ProductData } from '@/types/products';
import { Product } from '../../features/products/types/product.types';

/**
 * Adapter para convertir entre tipos de producto legacy y nuevos tipos empresariales
 */
export class ProductAdapter {
  /**
   * Convierte ProductData (legacy) a Product (empresarial)
   */
  static toProduct(productData: ProductData): Product {
    return {
      id: typeof productData.id === 'number' ? productData.id : parseInt(productData.id?.toString() || '0'),
      title: productData.title,
      precio: productData.precio,
      img: productData.img,
      altImg: productData.altImg,
      category: productData.category,
      cantidadDisponible: productData.cantidadDisponible,
      description: productData.description?.join(' ') || '',
      rating: undefined,
      brand: productData.marca,
      discount: productData.descuento,
      tags: productData.usos,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Convierte Product (empresarial) a ProductData (legacy)
   */
  static toProductData(product: Product): ProductData {
    return {
      id: product.id,
      title: product.title,
      precio: product.precio,
      img: product.img,
      altImg: product.altImg,
      category: product.category,
      cantidadDisponible: product.cantidadDisponible,
      description: product.description ? [product.description] : [],
      marca: product.brand || '',
      color: '', // Default values for legacy fields
      estilo: '',
      usos: product.tags || [],
      descuento: product.discount || 0,
      origenEnvio: '',
    };
  }

  /**
   * Convierte array de ProductData a array de Product
   */
  static toProducts(productDataArray: ProductData[]): Product[] {
    return productDataArray.map(this.toProduct);
  }

  /**
   * Convierte array de Product a array de ProductData
   */
  static toProductDataArray(products: Product[]): ProductData[] {
    return products.map(this.toProductData);
  }
}
