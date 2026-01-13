// Re-exportar desde Redux Toolkit slices para mantener compatibilidad
import { useAppDispatch, useAppSelector } from './hooks';
import { 
  login, 
  logout, 
  updateUser, 
  setLoading, 
  setError, 
  clearError,
} from './slices/authSlice';
import type { User, AuthTokens } from './slices/authSlice';
import { jwtService } from '../services/jwt.service';

// Re-exportar tipos
export type { User, AuthTokens };

// Hook compatible con la API anterior de Zustand
export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);
  
  return {
    // Estado
    ...state,
    
    // Acciones adaptadas
    login: (user: User, tokens: AuthTokens) => {
      dispatch(login({ user, tokens }));
    },
    
    logout: () => {
      dispatch(logout());
    },
    
    updateUser: (updates: Partial<User>) => {
      dispatch(updateUser(updates));
    },
    
    setLoading: (loading: boolean) => {
      dispatch(setLoading(loading));
    },
    
    setError: (error: string | null) => {
      dispatch(setError(error));
    },
    
    clearError: () => {
      dispatch(clearError());
    },
    
    // Selectores computados
    hasPermission: (permission: string): boolean => {
      if (!state.user || !state.tokens?.accessToken) return false;
      
      if (!jwtService.isValidToken(state.tokens.accessToken)) return false;
      
      if (state.user.role === 'ADMIN') return true;
      
      const authorities = jwtService.getAuthorities(state.tokens.accessToken);
      return authorities.includes(permission) || authorities.includes(`ROLE_${permission}`);
    },
    
    isTokenValid: (): boolean => {
      if (!state.tokens?.accessToken) return false;
      return jwtService.isValidToken(state.tokens.accessToken);
    },
    
    getDisplayName: (): string => {
      return state.user?.name || 'Usuario';
    },
  };
};

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
