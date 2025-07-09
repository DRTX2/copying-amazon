// Tipos específicos del feature de productos
export interface Product {
  id: number;
  title: string;
  precio: number;
  img: string;
  altImg: string;
  category: string[];
  cantidadDisponible: number;
  description?: string;
  rating?: number;
  brand?: string;
  discount?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  category?: string[];
  brand?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  discount?: boolean;
}

export interface ProductSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  filters?: ProductFilters;
}

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  showQuickActions?: boolean;
  className?: string;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onProductSelect?: (product: Product) => void;
  emptyMessage?: string;
  className?: string;
}
