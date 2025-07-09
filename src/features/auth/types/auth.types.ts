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
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
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
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
