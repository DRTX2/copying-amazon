import { jwtDecode } from 'jwt-decode';
import { JWTPayload } from '../../features/auth/types/auth.types';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';

class JWTService {
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
      if (!payload || !payload.exp) {
        return true;
      }

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
    
    try {
      const payload = this.decodeToken(token);
      if (!payload) return false;
      
      return !this.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  storeTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      setCookie('accessToken', accessToken);
      
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('refreshToken', refreshToken);
      }
    }
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken') || getCookie('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    }
  }

  getAuthHeader(): string | null {
    const token = this.getAccessToken();
    return token ? `Bearer ${token}` : null;
  }
}

export const jwtService = new JWTService();
