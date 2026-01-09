// Types
export interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';
  address?: string;
  phone?: string;
}

// Hooks
export * from './hooks/useUsers';
