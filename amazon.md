bd
	marca
	color
	tipos en producto
//	vendedor
js

	rango precio
	mejores marcas
	con descuento
	nuevo/renovado

	//	lugar publicidad

--- 

## 🧩 **Fase 1: Reorganización y limpieza básica**

Pequeñas tareas para que todo tenga orden y puedas avanzar sin sentir que el código te ahoga:

1. ✅ **Revisar y limpiar el árbol de carpetas**

   * Elimina archivos basura, pruebas viejas, componentes no usados.
   * Asegúrate que `pages`, `components`, `services`, etc. estén bien definidos (como ya tienes).

2. ✅ **Renombrar cosas con sentido**

   * Usa nombres como `ProductCard`, `ProductService`, `useCart`, etc.
   * Todo debería leerse fácil aunque no veas el código adentro.

3. ✅ **Crear archivo de configuración (si no lo tienes)**

   * `config/axios.ts` con la instancia
   * `config/constants.ts` para URLs, tokens, etc.

---

## ⚙️ **Fase 2: Refactor de funcionalidades clave**

Hazlo **por módulo o sección**, para no abrumarte.

### 🛍️ **Productos**

* [ ] `services/productService.ts` con funciones: `getAllProducts()`, `getProductById(id)`
* [ ] `components/ProductCard.tsx` → Refactor visual y lógica mínima
* [ ] `pages/ProductsPage.tsx` → Mostrar productos con llamada real

### 🧺 **Carrito**

* [ ] Crear `context/cartContext.tsx` si no lo tienes
* [ ] Añadir `addToCart(product)`, `removeFromCart(id)`, `clearCart()`
* [ ] Crear `CartPage.tsx` que muestre los productos

### 👤 **Auth (opcional por ahora)**

* [ ] `services/authService.ts` con login y registro
* [ ] `context/authContext.tsx` para manejar sesión (token, logout, etc.)

---

## 🎨 **Fase 3: UI y experiencia**

Cuando ya funcione todo, empezá con detalles visuales.

* [ ] Agregar Tailwind o styled-components (si usas uno)
* [ ] Crear layout general (`layouts/MainLayout.tsx`)
* [ ] Agregar feedback al usuario (cargando, error, etc.)
* [ ] Separar rutas públicas y privadas (`routes/`)

---

## 🧠 **Regla de oro para estas metas:**

> 💡 *“Una meta por bloque de energía. No más.”*
> No hagas 3 cosas a la vez. Una sola, terminada, es mil veces mejor que 3 a medias.
