import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis Productos | Panel de Vendedor',
  description: 'Gestiona tu catálogo de productos como vendedor',
};

export default function SellerProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
