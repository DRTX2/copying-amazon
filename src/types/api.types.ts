/**
 * API Types - Tipos que representan la estructura de datos de la API
 * Estos tipos reflejan exactamente la estructura de las respuestas y requests del backend
 */

// ============ Shared / Auth ============
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';

export interface ApiUserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  address?: string | null;
  phone?: string | null;
}

export interface ApiUpdateUserRequest {
  name: string;
  email: string;
  role?: UserRole;
  address?: string;
  phone?: string;
  password?: string;
}

export interface ApiSellerStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  pendingOrders: number;
}

// ============ Category ============
export interface ApiCategoryResponse {
  id: number;
  name: string;
  description?: string;
}

export interface ApiCreateCategoryRequest {
  name: string;
  description?: string;
}

// ============ Product ============
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';

export interface ApiProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: ApiCategoryResponse;
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

export interface ApiUploadImagesResponse {
  imageUrls: string[];
}

export interface ApiProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiProductFilters {
  category?: string[];
  brand?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  discount?: boolean;
}

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

// ============ Orders ============
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface ApiOrderItemResponse {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product?: ApiProductResponse;
}

export interface ApiOrderResponse {
  id: number;
  user?: ApiUserResponse;
  items: ApiOrderItemResponse[];
  total: number;
  orderState: OrderStatus;
  createdAt: string;
  deliveredAt?: string;
  paymentType?: string;
}

export interface ApiOrderRequest {
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

// ============ Cart ============
export interface ApiCartItemResponse {
  productId: number;
  quantity: number;
}

export interface ApiCartResponse {
  id: number;
  userId?: number;
  items: ApiCartItemResponse[];
}

export interface ApiCartRequest {
  userId: number;
  items: ApiCartItemResponse[];
}
