'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/stores/auth.store';

/**
 * Hook personalizado para proteger rutas de administrador
 * Solo permite acceso a usuarios con rol ADMIN
 */
export function useAdminGuard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    if (user && user.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  return {
    isAdmin: user?.role === 'ADMIN',
    isAuthenticated,
    user,
  };
}
