import { Product } from './domain.types';

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
