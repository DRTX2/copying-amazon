export interface SellerProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  averageRating: number;
  images: string[];
  sku: string;
  stockQuantity: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'PENDING';
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  pendingOrders: number;
  revenue: number;
}

export interface SellerDashboardData {
  stats: SellerStats;
  recentProducts: SellerProduct[];
  recentOrders: SellerOrder[];
}

export interface SellerOrder {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'PENDING';
