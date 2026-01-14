import { jwtDecode } from 'jwt-decode';
import { JWTPayload } from '../features/auth/types/auth.types';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';

const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

class JWTService {
  private readonly isClient = typeof window !== 'undefined';

  decodeToken(token: string): JWTPayload | null {
    try {
      return jwtDecode<JWTPayload>(token);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      if (!payload?.exp) return true;
      // exp -> segs, Date.now() -> ms
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getTokenExpiration(token: string): number | null {
    try {
      const payload = this.decodeToken(token);
      return payload?.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }

  getAuthorities(token: string): string[] {
    try {
      const payload = this.decodeToken(token);
      return payload?.authorities || [];
    } catch {
      return [];
    }
  }

  getUserInfo(token: string): Partial<{ id: number; email: string; role: string }> | null {
    try {
      const payload = this.decodeToken(token);
      if (!payload) return null;

      return {
        id: payload.userId || parseInt(payload.sub) || undefined,
        email: payload.email || payload.sub,
        role: payload.role,
      };
    } catch {
      return null;
    }
  }

  isValidToken(token: string): boolean {
    if (!token) return false;
    const payload = this.decodeToken(token);
    return payload !== null && !this.isTokenExpired(token);
  }

  // ============ Token Storage Management ============

  storeTokens(accessToken: string, refreshToken?: string): void {
    if (!this.isClient) return;
    
    this.setToken(TOKEN_KEYS.ACCESS, accessToken);
    if (refreshToken) {
      this.setToken(TOKEN_KEYS.REFRESH, refreshToken);
    }
  }

  getAccessToken(): string | null {
    if (!this.isClient) return null;
    return localStorage.getItem(TOKEN_KEYS.ACCESS) || getCookie(TOKEN_KEYS.ACCESS);
  }

  getRefreshToken(): string | null {
    if (!this.isClient) return null;
    return localStorage.getItem(TOKEN_KEYS.REFRESH) || getCookie(TOKEN_KEYS.REFRESH);
  }

  clearTokens(): void {
    if (!this.isClient) return;
    
    this.removeToken(TOKEN_KEYS.ACCESS);
    this.removeToken(TOKEN_KEYS.REFRESH);
  }

  getAuthHeader(): string | null {
    const token = this.getAccessToken();
    return token ? `Bearer ${token}` : null;
  }

  // ============ Private Helpers ============

  private setToken(key: string, value: string): void {
    localStorage.setItem(key, value);
    setCookie(key, value);
  }

  private removeToken(key: string): void {
    localStorage.removeItem(key);
    deleteCookie(key);
  }
}

export const jwtService = new JWTService();
