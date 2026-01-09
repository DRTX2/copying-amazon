import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Vendedor | Amazon E-commerce',
  description: 'Gestiona tus productos, ventas y estadísticas como vendedor',
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
