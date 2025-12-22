export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  authorities?: string[]; // Para los roles/authorities de Spring Security
  preferences?: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
  enabled?: boolean; // Para UserDetails
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType?: string; // Típicamente "Bearer"
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR'; // Optional, default to USER
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message?: string;
}

// Nueva interfaz para datos decodificados del JWT
export interface JWTPayload {
  sub: string; // subject (typically user ID or email)
  iat: number; // issued at
  exp: number; // expiration time
  authorities?: string[]; // Spring Security authorities
  userId?: number;
  email?: string;
  role?: string;
  [key: string]: any; // Para cualquier claim adicional
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}