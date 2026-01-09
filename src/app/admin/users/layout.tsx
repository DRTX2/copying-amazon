import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Usuarios | Admin',
  description: 'Administra los usuarios de la plataforma',
};

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
