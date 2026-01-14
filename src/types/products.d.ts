/**
 * Legacy Product Types
 * 
 * Estos tipos representan la estructura de datos original del frontend.
 * Se mantienen para compatibilidad con el store de carrito y componentes antiguos.
 * 
 * Para nuevos desarrollos, usar:
 * - Product de '@/features/products/types' para lógica de UI
 * - ApiProductResponse de '@/types/api.types' para datos del backend
 */

export interface CardData {
  id?: string | number;
  title: string;
  img: string;
  altImg: string;
}

/**
 * @deprecated Usar Product de '@/features/products/types' para nuevos componentes
 */
export interface ProductData extends CardData {
  category: string[];
  marca: string;
  description: string[];
  color: string;
  estilo: string;
  precio: number;
  descuento: number;
  cantidadDisponible: number;
  origenEnvio: string;
  usos: string[];
}