/**
 * API Types - Tipos que representan la estructura de datos de la API
 * Estos tipos reflejan exactamente la estructura de las respuestas y requests del backend
 */

// ============ Category ============
export interface ApiCategory {
  id: number;
  name: string;
  description?: string;
}

// ============ Product ============
export interface ApiProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ApiCategory;
  averageRating: number;
  images: string[];
  sku?: string;
  stockQuantity?: number;
  status?: ProductStatus;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiProductRequest {
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

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';

// ============ Favorites ============
export interface ApiFavoriteResponse {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  product: ApiProductResponse;
  createdAt: string;
}

// ============ Category Response ============
export interface ApiCategoryResponse {
  id: number;
  name: string;
  description?: string;
}

// ============ Orders ============
export interface ApiOrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface ApiOrderResponse {
  id: number;
  items: ApiOrderItemDto[];
  total: number;
  orderState: OrderState;
  createdAt: string;
  deliveredAt?: string;
}

export interface ApiOrderRequest {
  items: ApiOrderItemDto[];
}

export type OrderState = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// ============ Cart ============
export interface ApiCartItemDto {
  productId: number;
  quantity: number;
}

export interface ApiCartResponse {
  id: number;
  items: ApiCartItemDto[];
}

export interface ApiCartRequest {
  userId: number;
  items: ApiCartItemDto[];
}

// ============ Aliases para compatibilidad (deprecated) ============
/** @deprecated Usar ApiCategory */
export type BackendCategory = ApiCategory;
/** @deprecated Usar ApiProductResponse */
export type BackendProductResponse = ApiProductResponse;
/** @deprecated Usar ApiProductRequest */
export type BackendProductRequest = ApiProductRequest;
/** @deprecated Usar ApiFavoriteResponse */
export type BackendFavoriteResponse = ApiFavoriteResponse;
/** @deprecated Usar ApiCategoryResponse */
export type BackendCategoryResponse = ApiCategoryResponse;
/** @deprecated Usar ApiOrderItemDto */
export type BackendOrderItemDto = ApiOrderItemDto;
/** @deprecated Usar ApiOrderResponse */
export type BackendOrderResponse = ApiOrderResponse;
/** @deprecated Usar ApiOrderRequest */
export type BackendOrderRequest = ApiOrderRequest;
/** @deprecated Usar ApiCartItemDto */
export type BackendCartItemDto = ApiCartItemDto;
/** @deprecated Usar ApiCartResponse */
export type BackendCartResponse = ApiCartResponse;
/** @deprecated Usar ApiCartRequest */
export type BackendCartRequest = ApiCartRequest;
