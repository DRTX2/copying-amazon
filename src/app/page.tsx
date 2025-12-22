import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Amazon Clone | Inicio - Mejores Ofertas y Productos',
  description: 'Descubre una amplia variedad de productos en Amazon Clone. Las mejores ofertas en electrónica, ropa, hogar y más.',
  openGraph: {
    title: 'Amazon Clone | Inicio',
    description: 'Tu tienda online de confianza con las mejores ofertas.',
  }
};

export default function HomePage() {
  return <HomeClient />;
}
