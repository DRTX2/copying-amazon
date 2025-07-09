import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../shared/stores/auth.store';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

// Query keys para autenticación
export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  user: () => [...AUTH_QUERY_KEYS.all, 'user'] as const,
  profile: () => [...AUTH_QUERY_KEYS.all, 'profile'] as const,
  permissions: () => [...AUTH_QUERY_KEYS.all, 'permissions'] as const,
};

// Mock service para simular autenticación
const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email y contraseña son requeridos');
    }
    
    // Mock user data
    const user = {
      id: Date.now(),
      name: credentials.email.split('@')[0] || 'Usuario',
      email: credentials.email,
      role: 'user' as const,
      preferences: {
        language: 'es',
        currency: 'USD',
        notifications: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hora
    };
    
    return { user, tokens };
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock validation
    if (data.password !== data.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    
    // Mock user creation
    const user = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: 'user' as const,
      preferences: {
        language: 'es',
        currency: 'USD',
        notifications: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hora
    };
    
    return { user, tokens };
  },
  
  logout: async (): Promise<void> => {
    // Simular logout
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  refreshToken: async (_refreshToken: string): Promise<AuthResponse> => {
    // Mock refresh token
    await new Promise(resolve => setTimeout(resolve, 800));
    
    throw new Error('Token refresh not implemented in mock');
  },
};

// Hook para login
export const useLogin = () => {
  const { loginUser } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      loginUser(data.user, data.tokens);
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const { loginUser } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      loginUser(data.user, data.tokens);
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const { logoutUser } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutUser();
      
      // Limpiar cache
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

// Hook para verificar autenticación
export const useAuthCheck = () => {
  const { user, isAuthenticated, isTokenValid } = useAuth();
  
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user(),
    queryFn: () => {
      if (!isAuthenticated || !isTokenValid()) {
        return null;
      }
      return user;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener perfil de usuario
export const useProfile = () => {
  const { user, isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile(),
    queryFn: () => {
      // En producción, esto haría una llamada al backend
      return user;
    },
    enabled: isAuthenticated && !!user,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};
