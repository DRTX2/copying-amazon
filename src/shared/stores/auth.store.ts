import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { jwtService } from '../services/jwt.service';

// Tipos para el usuario
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';
  authorities?: string[];
  preferences?: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  enabled?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
}

// Tipos para la autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType?: string;
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
          // Almacenar tokens en localStorage
          jwtService.storeTokens(tokens.accessToken, tokens.refreshToken);
          
          set({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        },
        
        logout: () => {
          // Limpiar tokens del localStorage
          jwtService.clearTokens();
          
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
        hasPermission: (permission: string) => {
          const { user, tokens } = get();
          if (!user || !tokens?.accessToken) return false;
          
          // Verificar si el token es válido
          if (!jwtService.isValidToken(tokens.accessToken)) return false;
          
          // Lógica básica de permisos
          if (user.role === 'ADMIN') return true;
          
          // Verificar authorities específicas del JWT
          const authorities = jwtService.getAuthorities(tokens.accessToken);
          return authorities.includes(permission) || authorities.includes(`ROLE_${permission}`);
        },
        
        isTokenValid: () => {
          const { tokens } = get();
          if (!tokens?.accessToken) return false;
          
          return jwtService.isValidToken(tokens.accessToken);
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
  const loginUser = (user: User, tokens: AuthTokens) => {
    store.login(user, tokens);
  };
  
  const logoutUser = () => {
    store.logout();
  };
  
  // Método para inicializar desde token almacenado
  const initializeFromToken = () => {
    const accessToken = jwtService.getAccessToken();
    const refreshToken = jwtService.getRefreshToken();
    
    if (accessToken && jwtService.isValidToken(accessToken)) {
      const userInfo = jwtService.getUserInfo(accessToken);
      const expiresAt = jwtService.getTokenExpiration(accessToken);
      
      if (userInfo && expiresAt) {
        const user: User = {
          id: userInfo.id || 0,
          name: userInfo.email?.split('@')[0] || 'Usuario',
          email: userInfo.email || '',
          role: (userInfo.role as User['role']) || 'USER',
          authorities: jwtService.getAuthorities(accessToken),
        };
        
        const tokens: AuthTokens = {
          accessToken,
          refreshToken: refreshToken || '',
          expiresAt,
          tokenType: 'Bearer',
        };
        
        store.login(user, tokens);
      }
    }
  };
  
  return {
    ...store,
    loginUser,
    logoutUser,
    initializeFromToken,
  };
};
