export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR' | 'SELLER';
  address?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
}
