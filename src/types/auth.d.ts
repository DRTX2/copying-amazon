export interface User {
  id: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
