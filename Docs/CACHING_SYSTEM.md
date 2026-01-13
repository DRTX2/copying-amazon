# 🚀 Sistema de Caching del Frontend

## 📋 Resumen

El frontend utiliza **React Query** como sistema de caching del lado del cliente, configurado para optimizar el rendimiento y la experiencia del usuario.

---

## ⚡ Estrategia de Cache

### Configuración Global (`src/app/providers.tsx`)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 min - datos frescos
      gcTime: 15 * 60 * 1000,       // 15 min - en cache
      refetchOnWindowFocus: false,  // No refetch automático
      refetchOnReconnect: 'always', // Refetch al reconectar
      retry: 2,                     // 2 reintentos
      structuralSharing: true,      // Optimización de memoria
    },
  },
});
```

### Tiempos de Cache por Tipo de Datos

| Tipo de Datos | staleTime | gcTime | Razón |
|---------------|-----------|--------|-------|
| **Categorías** | 15 min | 30 min | Casi estáticos |
| **Productos** | 5 min | 15 min | Cambian poco |
| **Favoritos** | 3 min | 10 min | Moderado |
| **Órdenes** | 1 min | 5 min | Frecuente |
| **Usuario** | 5 min | 10 min | Sensible |

---

## 🔄 Conceptos Clave

### staleTime
Tiempo que los datos se consideran "frescos". Durante este tiempo, no se hace refetch.

```typescript
staleTime: 5 * 60 * 1000 // 5 minutos frescos
```

### gcTime (antes cacheTime)
Tiempo que los datos permanecen en cache después de no usarse. Después de este tiempo, se eliminan de memoria.

```typescript
gcTime: 15 * 60 * 1000 // 15 minutos en cache
```

### refetchOnWindowFocus
Desactivado para evitar refetch innecesarios al cambiar de pestaña.

---

## 🎯 Prefetching

### DataPrefetcher Component

Se ejecuta al cargar la app y pre-carga datos esenciales:

```tsx
// src/components/DataPrefetcher.tsx
<DataPrefetcher />

// Pre-carga:
// - Categorías (usados en filtros y navegación)
// - Productos populares
// - Ofertas
```

### usePrefetch Hook

Hook para prefetch manual de datos:

```typescript
const { 
  prefetchProduct,           // Prefetch de un producto
  prefetchRelatedProducts,   // Productos relacionados
  prefetchProductsByCategory,// Productos de una categoría
  prefetchCategories,        // Todas las categorías
  prefetchEssentialData,     // Batch de datos esenciales
} = usePrefetch();
```

### useHoverPrefetch Hook

Prefetch al hacer hover sobre productos:

```tsx
const { onMouseEnter, onMouseLeave } = useHoverPrefetch(productId);

<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
  <ProductCard product={product} />
</div>
```

---

## 📁 Archivos del Sistema de Cache

```
src/
├── app/
│   └── providers.tsx          # Configuración global de React Query
│
├── components/
│   └── DataPrefetcher.tsx     # Pre-carga inicial de datos
│
└── hooks/
    ├── usePrefetch.ts         # Hook de prefetching
    └── useHoverPrefetch.ts    # Prefetch en hover
```

---

## 🎨 Uso en Hooks Existentes

### Productos
```typescript
// src/features/products/hooks/useProducts.ts
useQuery({
  queryKey: PRODUCT_QUERY_KEYS.list(params),
  staleTime: 5 * 60 * 1000,  // 5 min
  gcTime: 10 * 60 * 1000,    // 10 min
});
```

### Categorías
```typescript
// src/features/categories/hooks/useCategories.ts
useQuery({
  queryKey: CATEGORY_QUERY_KEYS.list(),
  staleTime: 15 * 60 * 1000, // 15 min
  gcTime: 30 * 60 * 1000,    // 30 min
});
```

---

## ⚙️ Invalidación de Cache

Cuando se modifican datos, se invalida el cache automáticamente:

```typescript
const queryClient = useQueryClient();

// Después de crear/actualizar/eliminar
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['products'] });
}
```

---

## 📊 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                        Usuario                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Component                           │
│                   useProducts()                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Query                               │
│   ┌──────────────────────────────────────────────────────┐  │
│   │  ¿Datos en cache?                                     │  │
│   │     └─ SÍ → ¿Datos frescos (staleTime)?              │  │
│   │            └─ SÍ → Retornar datos del cache          │  │
│   │            └─ NO → Retornar cache + refetch en bg    │  │
│   │     └─ NO → Hacer fetch                               │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API                               │
│                   (Spring Boot)                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Redis Cache                               │
│                   (Backend)                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Optimizaciones Adicionales

### 1. Structural Sharing
React Query compara automáticamente los datos nuevos con los existentes y solo actualiza lo que cambió, ahorrando memoria y re-renders.

### 2. Retry con Backoff Exponencial
```typescript
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
// Intento 1: 1s, Intento 2: 2s, Intento 3: 4s...
```

### 3. Placeholder Data
Mantiene los datos anteriores mientras se hace refetch:
```typescript
placeholderData: (previousData) => previousData
```

---

## 📈 Beneficios

1. **Reducción de requests**: Los datos se reutilizan del cache
2. **Mejor UX**: Navegación instantánea entre páginas
3. **Menor carga del servidor**: Backend recibe menos requests
4. **Datos sincronizados**: Cache se invalida automáticamente en mutaciones
5. **Prefetching inteligente**: Datos listos antes de que el usuario los necesite

---

## 🔍 Debugging

En desarrollo, React Query Devtools está disponible para inspeccionar el cache:

- Botón en la esquina inferior izquierda
- Ver queries activas
- Ver datos en cache
- Invalidar cache manualmente
- Ver tiempos de stale/gc

---

## 📝 Buenas Prácticas

1. **No cachear datos sensibles** (tokens, passwords)
2. **Invalidar cache** después de mutaciones
3. **Usar staleTime apropiado** según volatilidad de datos
4. **Prefetch** datos que el usuario probablemente necesitará
5. **Evitar over-fetching** con buenos tiempos de cache

---

¡El sistema de caching está optimizado para un excelente rendimiento! 🎉
