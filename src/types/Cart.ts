import { User } from './User';
import { Product } from './products';

export interface Cart {
  id: number;
  user: User;
  products: Product[];
}
