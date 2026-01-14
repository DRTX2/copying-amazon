import { Product } from '@/features/products/types/domain.types';
import { User } from '@/features/auth/types/auth.types';
import { OrderState } from '@/types/api.types';

export interface Order {
  id: number;
  user: User;
  products: Product[];
  total: number;
  orderState: OrderState;
  createdAt: string;
  deliveredAt?: string;
  paymentType: string;
}
