# Amazon Clone - Next.js Migration

Un clon de Amazon e-commerce construido con Next.js 16, TypeScript, Tailwind CSS y React Query.

---

## 🛠️ Stack Tecnológico

### Core
- **Next.js 16.1.1** - Framework React con App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first

### State Management & Data Fetching
- **React Query** - Server state management
- **Redux Toolkit** - Client state management
- **Axios** - HTTP client

### Forms & Validation
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Auth & Notifications
- **JWT Decode** - Decodificación de tokens
- **React Toastify** - Notificaciones toast

---

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local

# Editar variables de entorno
nano .env.local
```

---

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

---

## 🏗️ Build

```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

---

## 📁 Estructura del proyecto

```
front-next/
├── public/                 # Assets estáticos
├── src/
│   ├── app/               # App Router (páginas y layouts)
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Home page
│   │   ├── providers.tsx # React Query & Toast providers
│   │   └── globals.css   # Estilos globales
│   ├── components/        # Componentes reutilizables
│   ├── features/          # Features por dominio
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades y helpers
│   ├── services/         # Servicios API
│   ├── stores/           # Context providers (Zustand)
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Funciones utilitarias
│   ├── config/           # Configuración (Axios, etc.)
│   ├── shared/           # Código compartido
│   └── data/             # Datos estáticos (JSON)
├── .env.local            # Variables de entorno
├── next.config.js        # Configuración de Next.js
├── tailwind.config.ts    # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

---

## 🔐 Variables de entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# App Configuration
NEXT_PUBLIC_APP_NAME=Amazon Clone
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_ENABLE_DEVTOOLS=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

---

## 🎨 Características

### Implementadas
- ✅ Configuración de Next.js con App Router
- ✅ React Query para data fetching
- ✅ Zustand para state management
- ✅ Autenticación con JWT
- ✅ Tema Amazon (colores y estilos)
- ✅ Componentes reutilizables
- ✅ TypeScript configurado
- ✅ Tailwind CSS integrado

### En desarrollo (Paso 2)
- ⏳ Páginas principales (Home, Product, Cart)
- ⏳ Routing con Next.js App Router
- ⏳ Autenticación (Login, Register)
- ⏳ Carrito de compras
- ⏳ Checkout

---

## 🧪 Testing

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 📄 Licencia

Este proyecto es un clon educativo de Amazon con fines de aprendizaje.

---

## 👨‍💻 Autor

David Manjarres - [@DRTX2](https://github.com/DRTX2)
