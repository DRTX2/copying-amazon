import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../stores/auth.store';

export const useAuthGuard = (redirectTo: string = '/login') => {
  const { isAuthenticated, isTokenValid } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid()) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isTokenValid, router, redirectTo]);

  return { isAuthenticated: isAuthenticated && isTokenValid() };
};

export const usePermissionGuard = (
  permission: string, 
  redirectTo: string = '/unauthorized'
) => {
  const { isAuthenticated, isTokenValid, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid()) {
      router.replace('/login');
      return;
    }

    if (!hasPermission(permission)) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isTokenValid, hasPermission, permission, router, redirectTo]);

  return { 
    isAuthenticated: isAuthenticated && isTokenValid(),
    hasPermission: hasPermission(permission)
  };
};

/**
 * Hook para redirigir usuarios autenticados (útil para login/register)
 */
export const useGuestGuard = (redirectTo: string = '/') => {
  const { isAuthenticated, isTokenValid } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && isTokenValid()) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isTokenValid, router, redirectTo]);

  return { isGuest: !isAuthenticated || !isTokenValid() };
};
