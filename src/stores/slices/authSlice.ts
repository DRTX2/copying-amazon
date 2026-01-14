import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtService } from '@/services/jwt.service';

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

// Estado del slice de autenticación
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Función para cargar estado desde localStorage
const loadStateFromStorage = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user || null,
        tokens: parsed.tokens || null,
        isAuthenticated: parsed.isAuthenticated || false,
      };
    }
  } catch {
    // Ignorar errores de parsing
  }
  return {};
};

// Función para guardar estado en localStorage
const saveStateToStorage = (state: AuthState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const toStore = {
      user: state.user,
      tokens: state.tokens,
      isAuthenticated: state.isAuthenticated,
    };
    localStorage.setItem('auth-storage', JSON.stringify(toStore));
  } catch {
    // Ignorar errores de localStorage
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; tokens: AuthTokens }>) => {
      const { user, tokens } = action.payload;
      
      // Almacenar tokens en localStorage
      jwtService.storeTokens(tokens.accessToken, tokens.refreshToken);
      
      state.user = user;
      state.tokens = tokens;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      
      saveStateToStorage(state);
    },
    
    logout: (state) => {
      // Limpiar tokens del localStorage
      jwtService.clearTokens();
      
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
      }
    },
    
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveStateToStorage(state);
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    hydrateFromStorage: (state) => {
      const stored = loadStateFromStorage();
      if (stored.user) state.user = stored.user;
      if (stored.tokens) state.tokens = stored.tokens;
      if (stored.isAuthenticated !== undefined) state.isAuthenticated = stored.isAuthenticated;
    },
  },
});

export const { 
  login, 
  logout, 
  updateUser, 
  setLoading, 
  setError, 
  clearError,
  hydrateFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
