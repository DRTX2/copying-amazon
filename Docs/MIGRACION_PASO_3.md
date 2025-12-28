# 🚀 Paso 3: Optimización Avanzada y Rendimiento

## 📋 Objetivo
Refinar la aplicación migrada implementando características nativas de Next.js para maximizar el rendimiento, la seguridad y la experiencia de usuario (UX).

---

## 🛠️ Tareas Principales

### 1. Middleware de Autenticación 🔒
Actualmente, las rutas protegidas se validan en el cliente mediante hooks (`useAuthGuard`). Esto causa un "parpadeo" donde el contenido se muestra brevemente antes de redirigir.
- [ ] Implementar `src/middleware.ts`.
- [ ] Proteger rutas `/shopping-cart`, `/checkout`, `/profile` desde el servidor.
- [ ] Redirigir a `/auth/login` si no hay token válido.

### 2. Optimización de Imágenes (`next/image`) 🖼️
La aplicación usa etiquetas `<img>` estándar que no están optimizadas.
- [ ] Reemplazar `<img>` por el componente `Image` de Next.js.
- [ ] Configurar dominios permitidos en `next.config.js` (si las imágenes vienen de una URL externa).
- [ ] Implementar `priority` para imágenes Above-the-Fold (como el logo y la imagen principal del producto).

### 3. Server-Side Data Fetching (SSR/ISR) ⚡
Actualmente, la Home fetchéa datos en el cliente con React Query.
- [ ] Refactorizar `src/app/page.tsx` para obtener los productos iniciales en el servidor.
- [ ] Implementar revalidación gradual (ISR) para mantener los datos frescos sin perder velocidad.
- [ ] Reducir el tamaño del bundle de JS eliminando hydration innecesaria.

### 4. Fuentes y Fuentes Locales 🖋️
- [ ] Asegurar que `Inter` (o la fuente elegida) esté cargando correctamente sin Layout Shift (CLS).

---

## 🎯 Checklist de Victoria
- [ ] Cero parpadeos en rutas protegidas.
- [ ] Mejora en el puntaje de Lighthouse (especialmente LCP y CLS).
- [ ] Navegación instantánea en la Home con datos pre-renderizados.
- [ ] Todas las imágenes optimizadas automáticamente.

---
*Este documento guía la fase final de optimización de la migración.*
