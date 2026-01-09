/**
 * Tipos para la API de productos del backend
 * Estos tipos reflejan exactamente lo que devuelve el backend Spring Boot
 */

export interface BackendCategory {
  id: number;
  name: string;
  description?: string;
}

export interface BackendProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: BackendCategory;
  averageRating: number;
  images: string[];
  sku?: string;
  stockQuantity?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackendProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  averageRating: number;
  images: string[];
  sku?: string;
  stockQuantity?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';
  slug?: string;
}

// Tipos para favoritos
export interface BackendFavoriteResponse {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  product: BackendProductResponse;
  createdAt: string;
}

// Tipos para categorías
export interface BackendCategoryResponse {
  id: number;
  name: string;
  description?: string;
}

// Tipos para órdenes
export interface BackendOrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface BackendOrderResponse {
  id: number;
  items: BackendOrderItemDto[];
  total: number;
  orderState: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  deliveredAt?: string;
}

export interface BackendOrderRequest {
  items: BackendOrderItemDto[];
}

// Tipos para carrito
export interface BackendCartItemDto {
  productId: number;
  quantity: number;
}

export interface BackendCartResponse {
  id: number;
  items: BackendCartItemDto[];
}

export interface BackendCartRequest {
  userId: number;
  items: BackendCartItemDto[];
}
