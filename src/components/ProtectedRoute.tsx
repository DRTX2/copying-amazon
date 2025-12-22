import React from 'react';
import { useAuthGuard } from '../hooks/useAuthGuards';
import { useAuth } from '../shared/stores/auth.store';

/**
 * Componente wrapper para proteger rutas que requieren autenticación
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated } = useAuthGuard(redirectTo);

  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Componente wrapper para proteger rutas que requieren permisos específicos
 */
interface PermissionRouteProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({ 
  children, 
  permission,
  fallback 
}) => {
  const { hasPermission, user } = useAuth();

  if (!hasPermission(permission)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Acceso Denegado
          </h2>
          <p className="text-gray-600 mb-4">
            No tienes permisos para acceder a esta página.
          </p>
          <p className="text-sm text-gray-500">
            Usuario: {user?.email} | Rol: {user?.role}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
