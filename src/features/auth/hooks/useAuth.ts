import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../shared/stores/auth.store";
import { jwtService } from "../../../shared/services/jwt.service";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth.types";

const AUTH_API_BASE = "http://localhost:8080/api/v1/auth"; // esto luego se cambiara por axios

// Query keys para autenticación
export const AUTH_QUERY_KEYS = {
  all: ["auth"] as const,
  user: () => [...AUTH_QUERY_KEYS.all, "user"] as const,
  profile: () => [...AUTH_QUERY_KEYS.all, "profile"] as const,
  permissions: () => [...AUTH_QUERY_KEYS.all, "permissions"] as const,
};

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${AUTH_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Auth service with real API calls
const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const data = await apiCall("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store tokens using JWT service
    if (data.tokens) {
      jwtService.storeTokens(data.tokens.accessToken, data.tokens.refreshToken);
    }

    return data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    if (data.password !== data.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const { confirmPassword, ...registerData } = data;
    if (!registerData.role) {
      registerData.role = "USER";
    }
    
    const response = await apiCall("/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    // Store tokens using JWT service
    if (response.tokens) {
      jwtService.storeTokens(response.tokens.accessToken, response.tokens.refreshToken);
    }

    return response;
  },

  logout: async (): Promise<void> => {
    const token = jwtService.getAccessToken();

    try {
      await apiCall("/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Even if server logout fails, clear local storage
      console.warn("Server logout failed:", error);
    } finally {
      // Always clear local storage using JWT service
      jwtService.clearTokens();
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const data = await apiCall("/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    // Update stored tokens using JWT service
    if (data.tokens) {
      jwtService.storeTokens(data.tokens.accessToken, data.tokens.refreshToken);
    }

    return data;
  },

  // Updated method to get user profile with JWT
  getProfile: async (): Promise<any> => {
    const token = jwtService.getAccessToken();

    if (!token || !jwtService.isValidToken(token)) {
      throw new Error("No valid access token found");
    }

    return apiCall("/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      console.error("Login error:", error);
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
      console.error("Register error:", error);
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
      console.error("Logout error:", error);
      // Still logout user locally even if server request fails
      logoutUser();
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

// Hook para obtener perfil de usuario (now with real API call)
export const useProfile = () => {
  const { user, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile(),
    queryFn: authService.getProfile,
    enabled: isAuthenticated && !!user,
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: (failureCount, error: any) => {
      // Don't retry if it's an auth error
      if (
        error.message?.includes("401") ||
        error.message?.includes("Unauthorized")
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook para refresh token
export const useRefreshToken = () => {
  const { loginUser, logoutUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authService.refreshToken(refreshToken),
    onSuccess: (data) => {
      loginUser(data.user, data.tokens);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error("Token refresh error:", error);
      // If refresh fails, logout user and clear tokens
      jwtService.clearTokens();
      logoutUser();
      queryClient.clear();
    },
  });
};

// Hook para inicializar autenticación desde token almacenado
export const useInitializeAuth = () => {
  const { initializeFromToken } = useAuth();
  
  return () => {
    initializeFromToken();
  };
};
