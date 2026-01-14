import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { productService } from '@/services/product.service';

export const metadata: Metadata = {
  title: 'Amazon Clone | Inicio - Mejores Ofertas y Productos',
  description: 'Descubre una amplia variedad de productos en Amazon Clone. Las mejores ofertas en electrónica, ropa, hogar y más.',
  openGraph: {
    title: 'Amazon Clone | Inicio',
    description: 'Tu tienda online de confianza con las mejores ofertas.',
  }
};

export default async function HomePage() {
  let initialProducts = null;
  
  try {
    initialProducts = await productService.getProducts({ limit: 20 });
  } catch (error) {
    console.error('Error fetching products on SSR:', error);
  }

  return <HomeClient initialProducts={initialProducts} />;
}
