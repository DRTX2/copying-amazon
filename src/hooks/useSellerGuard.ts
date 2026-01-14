'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores/auth.store';

/**
 * Hook personalizado para proteger rutas de vendedor
 * Solo permite acceso a usuarios con rol SELLER
 */
export function useSellerGuard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    if (user && user.role !== 'SELLER') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  return {
    isSeller: user?.role === 'SELLER',
    isAuthenticated,
    user,
  };
}
