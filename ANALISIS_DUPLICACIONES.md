# Análisis de Duplicaciones y Capas Repetidas en el Frontend

**Fecha:** 2026-01-14  
**Proyecto:** E-commerce Frontend (Next.js)

## 🔍 Resumen Ejecutivo

Se han identificado **múltiples capas duplicadas** y código repetido en el frontend que generan confusión, inconsistencias y dificultan el mantenimiento. Las principales áreas problemáticas son:

1. **Hooks de productos duplicados** (2 versiones)
2. **Servicios duplicados** (carpetas `services/` y `shared/services/`)
3. **Tipos duplicados** (múltiples archivos `api.types.ts`)
4. **Gestión de estado dual** (Redux Toolkit + Zustand compatibility layer)
5. **Componentes de productos dispersos**

---

## 📊 Problemas Identificados

### 1. **CRÍTICO: Hooks de Productos Duplicados**

**Ubicaciones:**
- `/src/features/products/hooks/useProducts.ts` (143 líneas)
- `/src/shared/hooks/useProducts.ts` (159 líneas)

**Problema:**
Existen **DOS implementaciones casi idénticas** del mismo hook con ligeras diferencias:

| Aspecto | `features/products/hooks` | `shared/hooks` |
|---------|---------------------------|----------------|
| Query Keys | `PRODUCT_QUERY_KEYS` | `PRODUCT_KEYS` |
| Imports | Usa `ProductAdapter` | No usa adaptadores |
| Funcionalidad | Incluye `initialData` param | Incluye `useInvalidateProducts` |
| Líneas | 143 | 159 |

**Impacto:**
- ❌ Confusión sobre cuál usar
- ❌ Posibles inconsistencias en el comportamiento
- ❌ Duplicación de lógica de caché
- ❌ Mantenimiento doble

**Uso actual:**
```typescript
// features/products/hooks/useProducts.ts usado en:
- features/products/hooks/useProducts.ts
- features/seller/hooks/useSellerProducts.ts

// shared/hooks/useProducts.ts usado en:
- shared/hooks/useProducts.ts
```

---

### 2. **CRÍTICO: Servicios Duplicados**

**Estructura actual:**
```
src/
├── services/
│   ├── backend-cart.service.ts
│   ├── category.service.ts
│   ├── favorite.service.ts
│   ├── jwt.service.ts
│   ├── order.service.ts
│   ├── product.service.ts
│   └── user.service.ts
└── shared/
    └── services/
        └── (vacío actualmente, pero la carpeta existe)
```

**Problema:**
- Existe una carpeta `shared/services/` vacía que sugiere una refactorización incompleta
- Todos los servicios están en `/services/` pero algunos hooks importan desde rutas relativas diferentes
- No hay una convención clara de dónde deben estar los servicios

**Impacto:**
- ❌ Confusión sobre la ubicación correcta
- ❌ Imports inconsistentes
- ❌ Arquitectura poco clara

---

### 3. **ALTO: Tipos API Duplicados**

**Ubicaciones:**
- `/src/types/api.types.ts` (102 líneas) - Tipos específicos de entidades
- `/src/shared/types/api.types.ts` (44 líneas) - Tipos genéricos de respuesta

**Problema:**
Aunque tienen propósitos ligeramente diferentes, la nomenclatura idéntica causa confusión:

**`/src/types/api.types.ts`:**
```typescript
- ApiCategory
- ApiProductResponse
- ApiProductRequest
- ApiFavoriteResponse
- ApiOrderResponse
- ApiCartResponse
```

**`/src/shared/types/api.types.ts`:**
```typescript
- ApiResponse<T>
- PaginatedResponse<T>
- ApiError
- BaseFilters
- SearchParams
```

**Impacto:**
- ⚠️ Nombres de archivo idénticos en rutas diferentes
- ⚠️ Confusión al importar
- ⚠️ Posible colisión de nombres

---

### 4. **ALTO: Gestión de Estado Dual (Redux + Zustand Compatibility)**

**Estructura actual:**
```
src/stores/
├── auth.store.ts          # Zustand compatibility wrapper
├── cart.store.ts          # Zustand compatibility wrapper
├── product.store.ts       # Zustand compatibility wrapper
├── slices/
│   ├── authSlice.ts       # Redux Toolkit slice
│   ├── cartSlice.ts       # Redux Toolkit slice
│   └── productSlice.ts    # Redux Toolkit slice
├── hooks.ts               # Redux hooks
└── store.ts               # Redux store config
```

**Problema:**
Existe una **capa de compatibilidad** que envuelve Redux Toolkit para simular la API de Zustand:

```typescript
// product.store.ts (compatibility layer)
const useProductStoreInternal = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product);
  
  return {
    ...state,
    setProducts: (products) => dispatch(setProductsAction(products)),
    // ... más wrappers
  };
};
```

**Impacto:**
- ⚠️ Capa de abstracción innecesaria
- ⚠️ Confusión sobre qué sistema de estado usar
- ⚠️ Overhead de performance mínimo pero innecesario
- ⚠️ Código más difícil de mantener

**Recomendación:**
Decidir entre:
1. **Usar Redux Toolkit directamente** (eliminar wrappers)
2. **Migrar completamente a Zustand** (eliminar Redux)

---

### 5. **MEDIO: Componentes de Productos Dispersos**

**Ubicaciones:**
```
src/
├── components/Product/
│   ├── EnhancedProduct.tsx
│   ├── Product.tsx
│   ├── Product-cost.tsx
│   ├── ProductBuyBox.tsx
│   ├── ProductDetails.tsx
│   ├── ProductImage.tsx
│   └── selectQuantityProduct.tsx
└── features/products/components/
    ├── ProductCard.tsx
    └── ProductGrid.tsx
```

**Problema:**
- Componentes de productos en **dos ubicaciones diferentes**
- `Product.tsx` vs `ProductCard.tsx` tienen propósitos similares pero diferentes
- No hay una convención clara de cuándo usar cada uno

**Diferencias:**
- `Product.tsx`: Componente de página completa de detalle
- `ProductCard.tsx`: Componente de tarjeta para listados

**Impacto:**
- ⚠️ Confusión sobre dónde crear nuevos componentes
- ⚠️ Posible duplicación futura

---

### 6. **MEDIO: Tipos de Productos Dispersos**

**Ubicaciones:**
- `/src/types/products.d.ts`
- `/src/types/api.types.ts` (ApiProductResponse, ApiProductRequest)
- `/src/features/products/types/product.types.ts`

**Problema:**
Los tipos relacionados con productos están en **3 archivos diferentes**:

1. **`types/products.d.ts`**: `ProductData` (tipo legacy del store)
2. **`types/api.types.ts`**: `ApiProductResponse`, `ApiProductRequest`
3. **`features/products/types/product.types.ts`**: `Product`, `ProductSearchParams`, `ProductFilters`

**Impacto:**
- ⚠️ Confusión sobre qué tipo usar en cada contexto
- ⚠️ Necesidad de adaptadores entre tipos

---

## 🎯 Recomendaciones de Refactorización

### **Prioridad 1: CRÍTICO**

#### 1.1 Consolidar Hooks de Productos
**Acción:**
- ✅ Eliminar `/src/shared/hooks/useProducts.ts`
- ✅ Usar únicamente `/src/features/products/hooks/useProducts.ts`
- ✅ Actualizar todos los imports

**Beneficios:**
- Una sola fuente de verdad
- Mantenimiento simplificado
- Comportamiento consistente

---

#### 1.2 Consolidar Servicios
**Acción:**
- ✅ Mantener todos los servicios en `/src/services/`
- ✅ Eliminar carpeta `/src/shared/services/` (está vacía)
- ✅ Estandarizar imports usando alias `@/services/`

**Estructura propuesta:**
```
src/services/
├── api/                    # Servicios de API
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── order.service.ts
│   ├── favorite.service.ts
│   └── user.service.ts
├── auth/                   # Servicios de autenticación
│   └── jwt.service.ts
└── cart/                   # Servicios de carrito
    └── backend-cart.service.ts
```

---

### **Prioridad 2: ALTO**

#### 2.1 Reorganizar Tipos API
**Acción:**
- ✅ Renombrar `/src/shared/types/api.types.ts` a `api-response.types.ts`
- ✅ Mantener `/src/types/api.types.ts` para tipos de entidades
- ✅ Crear barrel exports claros

**Estructura propuesta:**
```typescript
// src/types/api/index.ts
export * from './entities';      // ApiProduct, ApiCategory, etc.
export * from './responses';     // ApiResponse<T>, PaginatedResponse<T>
export * from './requests';      // ApiProductRequest, etc.
```

---

#### 2.2 Simplificar Gestión de Estado
**Opción A: Usar Redux Toolkit directamente**
```typescript
// Eliminar compatibility layers
// Usar directamente:
const dispatch = useAppDispatch();
const products = useAppSelector(state => state.product.products);
```

**Opción B: Migrar a Zustand**
```typescript
// Eliminar Redux Toolkit
// Usar Zustand puro:
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
```

**Recomendación:** Opción A (Redux Toolkit) ya que ya está implementado y es más robusto para aplicaciones grandes.

---

### **Prioridad 3: MEDIO**

#### 3.1 Consolidar Componentes de Productos
**Acción:**
- ✅ Mover todos los componentes a `/src/features/products/components/`
- ✅ Organizar por tipo:

```
src/features/products/components/
├── cards/
│   └── ProductCard.tsx
├── detail/
│   ├── ProductDetails.tsx
│   ├── ProductImage.tsx
│   ├── ProductBuyBox.tsx
│   └── ProductCost.tsx
├── lists/
│   └── ProductGrid.tsx
└── forms/
    └── SelectQuantityProduct.tsx
```

---

#### 3.2 Consolidar Tipos de Productos
**Acción:**
- ✅ Crear un único archivo de tipos de dominio
- ✅ Separar tipos de API de tipos de dominio

```
src/features/products/types/
├── domain.types.ts      # Product, ProductFilters
├── api.types.ts         # ApiProductResponse, ApiProductRequest
└── index.ts             # Barrel export
```

---

## 📈 Impacto Estimado de la Refactorización

| Área | Archivos Afectados | Tiempo Estimado | Riesgo |
|------|-------------------|-----------------|--------|
| Hooks duplicados | ~10 archivos | 2 horas | Bajo |
| Servicios | ~15 archivos | 1 hora | Bajo |
| Tipos API | ~20 archivos | 3 horas | Medio |
| Estado dual | ~30 archivos | 5 horas | Alto |
| Componentes | ~15 archivos | 2 horas | Bajo |
| **TOTAL** | **~90 archivos** | **13 horas** | **Medio** |

---

## ✅ Plan de Acción Sugerido

### Fase 1: Quick Wins (2-3 horas)
1. ✅ Eliminar `/src/shared/hooks/useProducts.ts`
2. ✅ Eliminar carpeta vacía `/src/shared/services/`
3. ✅ Estandarizar imports de servicios

### Fase 2: Reorganización de Tipos (3-4 horas)
4. ✅ Renombrar y reorganizar tipos API
5. ✅ Consolidar tipos de productos
6. ✅ Actualizar imports

### Fase 3: Componentes (2-3 horas)
7. ✅ Mover componentes a features
8. ✅ Actualizar imports

### Fase 4: Estado (5-6 horas) - OPCIONAL
9. ⚠️ Decidir estrategia de estado
10. ⚠️ Eliminar compatibility layers si se elige Redux
11. ⚠️ Actualizar todos los componentes

---

## 🚨 Notas Importantes

1. **Testing:** Ejecutar tests después de cada fase
2. **Git:** Hacer commits pequeños y atómicos por cada cambio
3. **Documentación:** Actualizar README con la nueva estructura
4. **Team Communication:** Informar al equipo sobre los cambios

---

## 📝 Conclusión

El frontend tiene una **deuda técnica moderada** causada principalmente por:
- Refactorizaciones incompletas
- Falta de convenciones claras
- Evolución orgánica del código

La refactorización propuesta es **factible y de bajo riesgo** si se hace de manera incremental. Se recomienda empezar por las **Fases 1 y 2** que tienen el mayor impacto con el menor riesgo.

**Beneficios esperados:**
- ✅ Código más mantenible
- ✅ Menor confusión para desarrolladores
- ✅ Mejor organización
- ✅ Reducción de bugs por inconsistencias
- ✅ Onboarding más fácil para nuevos desarrolladores
