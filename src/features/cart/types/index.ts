import { ProductData } from '@/types/products';

export interface CartItem extends ProductData {
  id: number; // Override: id es requerido en el carrito
  quantity: number;
}

export interface CartStats {
  totalItems: number;
  totalPrice: number;
  savings: number;
}
