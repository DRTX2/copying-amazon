import { Product } from './Product';

export interface Category {
  id: number;
  name: string;
  description: string;
  products?: Product[]; // Puede omitirse si no lo necesitas en el front
}