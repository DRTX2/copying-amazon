import { Product } from '@/features/products/types';

export interface FavoriteItem {
  id: number;
  product: Product;
  addedAt: string;
}
