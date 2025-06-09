import { Category } from './Category';
import { ProductImage } from './ProductImage';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  averageRating: number;
  images: ProductImage[];
}
