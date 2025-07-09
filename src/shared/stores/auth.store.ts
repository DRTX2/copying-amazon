import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Tipos para el usuario
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences?: {
    language: string;
    currency: string;
    notifications: boolean;
  };
}

// Tipos para la autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Estado del store de autenticación
interface AuthStore {
  // Estado
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Selectores computados
  hasPermission: (permission: string) => boolean;
  isTokenValid: () => boolean;
  getDisplayName: () => string;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        // Acciones
        login: (user, tokens) => {
          set({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        },
        
        logout: () => {
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        },
        
        updateUser: (updates) => {
          const { user } = get();
          if (user) {
            set({ user: { ...user, ...updates } });
          }
        },
        
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
        
        // Selectores computados
        hasPermission: (_permission: string) => {
          const { user } = get();
          if (!user) return false;
          
          // Lógica básica de permisos
          if (user.role === 'admin') return true;
          
          // Agregar más lógica de permisos según sea necesario
          // Por ahora solo verificamos el rol, pero se puede expandir
          // para verificar permisos específicos como _permission
          return false;
        },
        
        isTokenValid: () => {
          const { tokens } = get();
          if (!tokens) return false;
          
          return Date.now() < tokens.expiresAt;
        },
        
        getDisplayName: () => {
          const { user } = get();
          return user?.name || 'Usuario';
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// Hook conveniente para usar el store
export const useAuth = () => {
  const store = useAuthStore();
  
  // Métodos convenientes
  const loginUser = (userData: Omit<User, 'id'>, mockTokens?: Partial<AuthTokens>) => {
    // En un entorno real, esto vendría del backend
    const user: User = {
      id: Date.now(),
      ...userData,
    };
    
    const tokens: AuthTokens = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hora
      ...mockTokens,
    };
    
    store.login(user, tokens);
  };
  
  const logoutUser = () => {
    store.logout();
  };
  
  return {
    ...store,
    loginUser,
    logoutUser,
  };
};
