// Tipos para las respuestas de la API
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Tipos para filtros y parámetros
export interface BaseFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends BaseFilters {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
