import { z } from 'zod';

/**
 * Schemas de validación para respuestas de API usando Zod
 * Esto asegura type-safety y validación en runtime
 */

// Schema para categoría
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

// Schema para producto (respuesta del backend)
export const ApiProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  category: CategorySchema.optional(),
  averageRating: z.number().min(0).max(5).default(0),
  images: z.array(z.string().url()).default([]),
  sku: z.string().optional(),
  stockQuantity: z.number().int().min(0).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'ARCHIVED']).optional(),
  slug: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schema para lista de productos
export const ApiProductListSchema = z.array(ApiProductSchema);

// Schema para tokens de autenticación
export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

// Schema para usuario
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.string(),
  createdAt: z.string().optional(),
});

// Schema para respuesta de autenticación
export const AuthResponseSchema = z.object({
  tokens: AuthTokensSchema,
  user: UserSchema,
});

// Schema para favorito
export const FavoriteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  productId: z.number(),
  product: ApiProductSchema.optional(),
  createdAt: z.string().optional(),
});

// Schema para item de orden
export const OrderItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  product: ApiProductSchema.optional(),
});

// Schema para orden
export const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  total: z.number().positive(),
  items: z.array(OrderItemSchema),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

// Schema para paginación
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Schema genérico para respuestas paginadas
export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: PaginationSchema,
    message: z.string().optional(),
    status: z.number().int(),
  });

// Schema para errores de API
export const ApiErrorSchema = z.object({
  message: z.string(),
  status: z.number().int(),
  details: z.unknown().optional(),
  timestamp: z.string().optional(),
  path: z.string().optional(),
});

// Tipos inferidos de los schemas
export type Category = z.infer<typeof CategorySchema>;
export type ApiProduct = z.infer<typeof ApiProductSchema>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type User = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type Favorite = z.infer<typeof FavoriteSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Helper function para validar datos con manejo de errores
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}

/**
 * Helper function para validar datos de forma segura (no lanza errores)
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  return result;
}
