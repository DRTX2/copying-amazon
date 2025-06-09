import { User } from './User';
import { Product } from './Product';

export interface Cart {
  id: number;
  user: User;
  products: Product[];
}
