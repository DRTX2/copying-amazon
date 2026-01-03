import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Producto | Amazon Clone',
  description: 'Publica un nuevo producto en la plataforma',
};

export default function CreateProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
