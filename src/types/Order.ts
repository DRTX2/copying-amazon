import { Product } from './Product';
import { User } from './User';
import { OrderState } from './OrderState';

export interface Order {
  id: number;
  user: User;
  products: Product[];
  total: number;
  orderState: OrderState;
  createdAt: string;      // ISO string si viene como LocalDateTime
  deliveredAt?: string;   // puede ser null
  paymentType: string;
}
