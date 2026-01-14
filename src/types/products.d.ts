/**
 * Legacy Product Types
 * 
 * Estos tipos representan la estructura de datos original del frontend.
 * Se mantienen para compatibilidad con componentes existentes.
 * 
 * Para nuevos desarrollos, preferir usar:
 * - Product de '@/features/products/types/product.types'
 * - ApiProductResponse de '@/types/api.types' para datos del backend
 */

export interface CardData {
  id?: string | number;
  title: string;
  img: string;
  altImg: string;
}

/**
 * @deprecated Usar Product de '@/features/products/types/product.types' para nuevos componentes
 */
export interface ProductData extends CardData {
  category: string[];
  marca: string;
  description: string[];
  color: string;
  estilo: string;
  precio: number;
  descuento: number;
  cantidadDisponible: number;
  origenEnvio: string;
  usos: string[];
}

// ============ Tipos actualizados alineados con el backend ============

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface ProductImage {
  id: number;
  url: string;
  alt?: string;
}

/**
 * Tipo de producto alineado con la respuesta del backend
 * Considerar migrar a ApiProductResponse de '@/types/api.types'
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  averageRating: number;
  images: ProductImage[];
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}