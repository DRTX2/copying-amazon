import { ApiProductFilters as ProductFilters } from '@/types/api.types';

// Tipos de dominio para productos (formato usado en el frontend)
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

export { type ProductFilters };

