# 🚀 Guía Rápida del Frontend - Amazon Clone

> **Objetivo**: Entender la arquitectura completa del frontend en 10 minutos

---

## 📚 Índice

1. [Stack Tecnológico](#-stack-tecnológico)
2. [Arquitectura General](#-arquitectura-general)
3. [Flujo de Datos](#-flujo-de-datos)
4. [Estructura de Carpetas](#-estructura-de-carpetas)
5. [Conceptos Clave](#-conceptos-clave)
6. [Patrones de Diseño](#-patrones-de-diseño)
7. [Rutas y Navegación](#-rutas-y-navegación)
8. [Guía Rápida de Código](#-guía-rápida-de-código)

---

## 🛠️ Stack Tecnológico

### **Core**
- **Next.js 16** (App Router) - Framework React con SSR/SSG
- **React 19** - Biblioteca de UI con Server/Client Components
- **TypeScript** - Tipado estático para mayor seguridad

### **Gestión de Estado**
- **React Query** (@tanstack/react-query) - Server state (datos del backend)
- **Zustand** - Client state (estado local de la app)
- **Context API** - Estado compartido entre componentes

### **Formularios y Validación**
- **React Hook Form** - Manejo de formularios eficiente
- **Zod** - Validación de esquemas y tipos

### **HTTP & Auth**
- **Axios** - Cliente HTTP con interceptores
- **JWT Decode** - Decodificación de tokens de autenticación

### **UI/UX**
- **Tailwind CSS 4** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **React Toastify** - Notificaciones toast

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      USUARIO (BROWSER)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                        │
│  • Server Components (RSC)                                   │
│  • Client Components ("use client")                          │
│  • Middleware (auth guards)                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   STORES    │   │  FEATURES   │   │ COMPONENTS  │
│             │   │             │   │             │
│ • Auth      │   │ • auth      │   │ • Common    │
│ • Cart      │   │ • cart      │   │ • Product   │
│ • Products  │   │ • products  │   │ • Card      │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
              ┌────────────────────┐
              │   REACT QUERY      │
              │  (Server State)    │
              └──────────┬─────────┘
                         │
                         ▼
              ┌────────────────────┐
              │   AXIOS + API      │
              │  (HTTP Client)     │
              └──────────┬─────────┘
                         │
                         ▼
              ┌────────────────────┐
              │   BACKEND API      │
              │  (REST/GraphQL)    │
              └────────────────────┘
```

---

## 🔄 Flujo de Datos

### **1. Server State (React Query)**
Maneja datos del servidor con cache inteligente:

```typescript
// Configuración de cache en src/app/providers.tsx
CACHE_CONFIG = {
  static: 15-30 min    // Categorías, configuración
  products: 5-10 min   // Listados de productos
  dynamic: 3-5 min     // Favoritos, carrito
  frequent: 1-2 min    // Órdenes, notificaciones
}
```

**Ejemplo de uso:**
```typescript
// En un componente
const { data, isLoading, error } = useProducts();
const mutation = useLogin();
```

### **2. Client State (Zustand + Context)**
Maneja estado de la aplicación (usuario, carrito, UI):

```typescript
// Stores principales
/stores/AuthProvider.tsx    → Usuario autenticado
/stores/CartProvider.tsx    → Carrito de compras
/stores/ProductProvider.tsx → Productos locales
```

### **3. Flujo típico de una petición:**

```
User Action → Hook (React Query) → Service → Axios → Backend
     ↓
   Cache ← Data ← Response ← Interceptor ← API
     ↓
   UI Update
```

---

## 📁 Estructura de Carpetas

### **Organización por Capas**

```
src/
├── app/                    # 🎯 ROUTER Y PÁGINAS (Next.js App Router)
│   ├── page.tsx           # Página principal (/)
│   ├── layout.tsx         # Layout raíz
│   ├── providers.tsx      # Providers globales (React Query, Toast)
│   ├── auth/              # Rutas de autenticación
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── product/[id]/      # Rutas dinámicas
│   ├── checkout/          # Proceso de compra
│   ├── admin/             # Panel de administrador
│   └── seller/            # Panel de vendedor
│
├── features/              # 📦 FEATURES (Módulos por dominio)
│   ├── auth/             # Todo relacionado con autenticación
│   │   ├── hooks/        # useLogin, useRegister, useLogout
│   │   ├── types/        # Tipos de Auth
│   │   └── index.ts      # Barrel export
│   ├── cart/             # Carrito de compras
│   ├── products/         # Productos
│   ├── orders/           # Órdenes
│   ├── favorites/        # Favoritos
│   ├── categories/       # Categorías
│   ├── seller/           # Funcionalidad de vendedor
│   └── users/            # Gestión de usuarios
│
├── components/            # 🧩 COMPONENTES REUTILIZABLES
│   ├── common.tsx        # Componentes genéricos
│   ├── Footer.tsx
│   ├── SearchField.tsx
│   ├── ProtectedRoute.tsx
│   ├── Card/             # Componentes de tarjetas
│   ├── Menu/             # Navegación
│   └── Product/          # Componentes de producto
│
├── stores/                # 🗄️ ESTADO GLOBAL (Context + Zustand)
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   ├── CartContext.tsx
│   ├── CartProvider.tsx
│   ├── ProductContext.tsx
│   └── ProductProvider.tsx
│
├── services/              # 🌐 SERVICIOS DE API
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── order.service.ts
│   ├── favorite.service.ts
│   └── user.service.ts
│
├── hooks/                 # 🪝 CUSTOM HOOKS
│   ├── useAuthGuards.ts   # Guards de autenticación
│   ├── useAdminGuard.ts   # Guard de admin
│   ├── useSellerGuard.ts  # Guard de seller
│   ├── usePrefetch.ts     # Prefetching de datos
│   └── useCartHandler.ts  # Lógica del carrito
│
├── types/                 # 📝 TIPOS TYPESCRIPT
│   ├── auth.d.ts
│   ├── Product.ts
│   ├── Cart.ts
│   ├── Order.ts
│   └── User.ts
│
├── config/                # ⚙️ CONFIGURACIÓN
│   ├── axios.ts           # Cliente HTTP configurado
│   └── imageUpload.ts     # Config de subida de imágenes
│
├── utils/                 # 🛠️ UTILIDADES
│   ├── cookies.ts         # Manejo de cookies
│   ├── navigation.ts      # Helpers de navegación
│   └── imageUtils.ts      # Utilidades de imágenes
│
└── shared/                # 🔗 CÓDIGO COMPARTIDO
    ├── components/
    ├── hooks/
    ├── services/
    ├── stores/
    └── types/
```

---

## 💡 Conceptos Clave

### **1. Features (Feature-Based Architecture)**

Cada `feature` agrupa TODO lo relacionado con un dominio:

```
features/auth/
├── hooks/          # useLogin, useRegister, useLogout
├── types/          # User, AuthTokens, LoginRequest
└── index.ts        # Exporta todo públicamente
```

**Ventajas:**
- ✅ Código organizado por funcionalidad
- ✅ Fácil de encontrar y modificar
- ✅ Reutilizable y testeable
- ✅ Evita imports largos

### **2. Server Components vs Client Components**

**Server Components** (por defecto en App Router):
```tsx
// No necesita "use client"
async function ProductPage({ params }) {
  const product = await fetchProduct(params.id);
  return <ProductDetail product={product} />;
}
```

**Client Components** (con interactividad):
```tsx
"use client"; // ← Marca como Client Component

export default function LoginPage() {
  const [email, setEmail] = useState("");
  // Hooks, eventos, estado local
}
```

### **3. React Query (TanStack Query)**

Maneja el estado del servidor automáticamente:

```typescript
// Hook personalizado en features/products/hooks/
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// Uso en componente
const { data: products, isLoading, error } = useProducts();
```

**Beneficios:**
- ✅ Cache automático
- ✅ Revalidación en background
- ✅ Retry automático
- ✅ Loading/Error states
- ✅ Optimistic updates

### **4. Guards y Protección de Rutas**

```typescript
// hooks/useAuthGuards.ts
export function useGuestGuard() {
  // Redirige a "/" si el usuario está autenticado
  // Usado en /login y /register
}

export function useProtectedRoute() {
  // Redirige a "/login" si NO está autenticado
  // Usado en páginas privadas
}

// hooks/useAdminGuard.ts
export function useAdminGuard() {
  // Solo permite acceso a administradores
}
```

### **5. Axios con Interceptores**

```typescript
// config/axios.ts
api.interceptors.request.use((config) => {
  // Agrega JWT automáticamente
  const token = jwtService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Refresh token si expiró
    // Redirige a /login si no hay auth
  }
);
```

---

## 🎨 Patrones de Diseño

### **1. Compound Components Pattern**

Usado en componentes complejos como Product Card:

```tsx
<Product>
  <Product.Image src={image} />
  <Product.Title>{title}</Product.Title>
  <Product.Price value={price} />
  <Product.Actions>
    <AddToCart />
    <AddToFavorites />
  </Product.Actions>
</Product>
```

### **2. Provider Pattern**

Envolver la app con providers globales:

```tsx
// app/layout.tsx
<Providers>           {/* React Query + Toast */}
  <AppProvider>       {/* Auth + Cart + Products */}
    {children}
  </AppProvider>
</Providers>
```

### **3. Barrel Exports**

Centralizar exports en `index.ts`:

```typescript
// features/auth/index.ts
export { useLogin, useRegister } from './hooks/useAuth';
export type { User, AuthTokens } from './types/auth.types';

// Uso
import { useLogin, User } from '@/features/auth';
```

### **4. Custom Hooks Pattern**

Extraer lógica reutilizable:

```typescript
// hooks/useCartHandler.ts
export function useCartHandler() {
  const { addItem, removeItem } = useCart();
  
  const handleAddToCart = (product) => {
    addItem(product);
    toast.success('Agregado al carrito');
  };
  
  return { handleAddToCart };
}
```

---

## 🗺️ Rutas y Navegación

### **Rutas Públicas**
```
/                    → Página principal (productos)
/product/[id]        → Detalle de producto
/search              → Búsqueda de productos
/auth/login          → Login (solo guests)
/auth/register       → Registro (solo guests)
```

### **Rutas Protegidas** (requieren autenticación)
```
/profile             → Perfil de usuario
/shopping-cart       → Carrito de compras
/checkout            → Proceso de pago
/checkout/success    → Confirmación de compra
/favorites           → Productos favoritos
/orders              → Historial de órdenes
```

### **Rutas de Admin** (requiere rol ADMIN)
```
/admin/users         → Gestión de usuarios
/admin/categories    → Gestión de categorías
```

### **Rutas de Seller** (requiere rol SELLER)
```
/seller              → Dashboard de vendedor
/seller/products     → Productos del vendedor
/seller/orders       → Órdenes del vendedor
```

---

## 🔍 Guía Rápida de Código

### **¿Cómo agregar una nueva página?**

1. **Crear la ruta** en `src/app/`:
```tsx
// src/app/mi-pagina/page.tsx
export default function MiPagina() {
  return <div>Mi Página</div>;
}
```

2. **Si necesita protección**, usa guards:
```tsx
"use client";
import { useProtectedRoute } from '@/hooks/useAuthGuards';

export default function MiPaginaProtegida() {
  useProtectedRoute();
  return <div>Solo usuarios autenticados</div>;
}
```

### **¿Cómo crear un feature nuevo?**

1. **Crear estructura**:
```
src/features/mi-feature/
├── hooks/
│   └── useMiFeature.ts
├── types/
│   └── mi-feature.types.ts
└── index.ts
```

2. **Crear hook con React Query**:
```typescript
// hooks/useMiFeature.ts
import { useQuery } from '@tanstack/react-query';

export function useMiFeature() {
  return useQuery({
    queryKey: ['mi-feature'],
    queryFn: () => fetch('/api/mi-feature').then(r => r.json()),
  });
}
```

3. **Exportar en index.ts**:
```typescript
// index.ts
export { useMiFeature } from './hooks/useMiFeature';
export type { MiFeatureType } from './types/mi-feature.types';
```

### **¿Cómo hacer una petición al backend?**

1. **Crear servicio**:
```typescript
// services/mi-servicio.service.ts
import { api } from '@/config/axios';

export const miServicioService = {
  getAll: () => api.get('/mi-recurso').then(r => r.data),
  getById: (id: string) => api.get(`/mi-recurso/${id}`).then(r => r.data),
  create: (data) => api.post('/mi-recurso', data).then(r => r.data),
};
```

2. **Crear hook**:
```typescript
// features/mi-feature/hooks/
export function useMiRecurso() {
  return useQuery({
    queryKey: ['mi-recurso'],
    queryFn: miServicioService.getAll,
  });
}
```

3. **Usar en componente**:
```tsx
const { data, isLoading, error } = useMiRecurso();
```

### **¿Cómo manejar formularios?**

```tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof schema>;

export default function MiFormulario() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nombre')} />
      {errors.nombre && <p>{errors.nombre.message}</p>}
      
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### **¿Cómo mostrar notificaciones?**

```typescript
import { toast } from 'react-toastify';

toast.success('¡Éxito!');
toast.error('Error al procesar');
toast.info('Información importante');
toast.warning('Advertencia');
```

---

## 📊 Flujo Completo: Login de Usuario

Para entender cómo funciona todo junto, veamos el flujo de login:

```
1. Usuario visita /auth/login
   ↓
2. LoginPage renderiza (Client Component)
   ↓
3. useGuestGuard() verifica que no esté autenticado
   ↓
4. Usuario llena el formulario (React Hook Form + Zod)
   ↓
5. onSubmit → loginMutation.mutateAsync()
   ↓
6. useLogin hook (React Query mutation)
   ↓
7. authService.login() → axios.post('/auth/login')
   ↓
8. Axios interceptor agrega headers
   ↓
9. Backend responde con tokens JWT
   ↓
10. Axios interceptor procesa respuesta
   ↓
11. jwtService guarda tokens en cookies
   ↓
12. React Query actualiza cache
   ↓
13. AuthProvider actualiza estado global
   ↓
14. router.push('/') → redirige a home
   ↓
15. Middleware valida JWT
   ↓
16. Usuario autenticado puede acceder a rutas protegidas
```

---

## 🚦 Checklist para Nuevos Desarrolladores

Cuando trabajes en el proyecto, sigue este orden:

### **Día 1: Setup**
- [ ] Clonar repo y ejecutar `npm install`
- [ ] Configurar `.env.local` con variables de entorno
- [ ] Ejecutar `npm run dev` y verificar que corra
- [ ] Explorar la estructura de carpetas

### **Día 2: Entender el flujo**
- [ ] Leer esta guía completa
- [ ] Revisar [src/app/layout.tsx](src/app/layout.tsx) - Layout principal
- [ ] Revisar [src/app/providers.tsx](src/app/providers.tsx) - Providers globales
- [ ] Revisar [src/config/axios.ts](src/config/axios.ts) - Config HTTP

### **Día 3: Explorar features**
- [ ] Revisar [src/features/auth](src/features/auth) - Autenticación
- [ ] Revisar [src/features/cart](src/features/cart) - Carrito
- [ ] Revisar [src/features/products](src/features/products) - Productos

### **Día 4: Componentes y hooks**
- [ ] Revisar componentes en [src/components](src/components)
- [ ] Revisar hooks en [src/hooks](src/hooks)
- [ ] Probar crear un componente simple

### **Día 5: Práctica**
- [ ] Crear una página nueva
- [ ] Crear un hook personalizado
- [ ] Hacer una petición al backend

---

## 🔗 Recursos Adicionales

### **Documentación Oficial**
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### **Otros docs del proyecto**
- [README.md](../README.md) - Instalación y configuración
- [BACKEND_INTEGRATION.md](../BACKEND_INTEGRATION.md) - Integración con backend
- [SELLER_IMPLEMENTATION.md](../SELLER_IMPLEMENTATION.md) - Funcionalidad de vendedor

---

## 🎯 Conceptos Finales

### **Lo más importante que debes recordar:**

1. **Next.js App Router**: Rutas basadas en carpetas en `src/app/`
2. **React Query**: Maneja TODO el estado del servidor (cache, loading, error)
3. **Features**: Código organizado por dominio (auth, cart, products)
4. **Guards**: Protegen rutas según autenticación y roles
5. **Axios + Interceptores**: Maneja JWT automáticamente
6. **TypeScript**: Todo está tipado para mayor seguridad

### **Preguntas frecuentes:**

**Q: ¿Dónde agrego una nueva página?**  
A: En `src/app/mi-pagina/page.tsx`

**Q: ¿Dónde creo un componente reutilizable?**  
A: En `src/components/` o en el feature correspondiente

**Q: ¿Cómo hago una petición HTTP?**  
A: Crea un servicio en `src/services/` y usa React Query

**Q: ¿Cómo protejo una ruta?**  
A: Usa `useProtectedRoute()`, `useAdminGuard()` o `useSellerGuard()`

**Q: ¿Cómo manejo el estado global?**  
A: Usa los providers en `src/stores/` o crea un nuevo Zustand store

---

## 📝 Conclusión

Este proyecto sigue las **mejores prácticas de Next.js** con:
- ✅ Arquitectura escalable basada en features
- ✅ Tipado fuerte con TypeScript
- ✅ Cache inteligente con React Query
- ✅ Componentes reutilizables y modulares
- ✅ Guards de autenticación robustos
- ✅ Interceptores HTTP para JWT
- ✅ Validación de formularios con Zod

**Ahora estás listo para empezar a desarrollar** 🚀

Si tienes dudas, revisa los archivos mencionados o consulta la documentación oficial de cada tecnología.

---

**Última actualización**: Enero 2026  
**Autor**: David  
**Versión**: 1.0.0
