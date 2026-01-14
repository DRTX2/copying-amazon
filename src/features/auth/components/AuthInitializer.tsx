'use client';

import { useEffect } from 'react';
import { useInitializeAuth } from '../hooks/useAuth';

/**
 * Componente que inicializa la autenticación desde tokens almacenados
 * Debe ser usado en el nivel raíz de la aplicación
 */
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializeAuth = useInitializeAuth();

  useEffect(() => {
    // Inicializar autenticación al cargar la app
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};
