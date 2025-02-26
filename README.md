# Simple sales products

Deploy by this project: https://drtx2.github.io/copying-amazon/

Plan:
- Busqueda
 - Tambien añadiremos un boton para cerrar ese espacio de navegacion pasando un setState; 
- El contenido del templete debe ser llenado por campo de busqueda, yo que se una factura. 
- Añadir y comprar productos, para lo que tendre que hacer 
    - Contexto para los datos locales 
    - reduzca/aumente productos  
    - Carrito de compras
    - Pasarela de pago 
- Register+login
    - contexto con el usuario,
- Ver productos por categoria
- Paginas solo de texto para ver más info
- Activar zonas q dependen de autentificación

No se como hacer una parte del proyecto, cuando se pulsa el boton de busqueda este deberia de mostrar un filtrado de los productos, entonces toca cambiar lo que tiene el contexto de page_handler para que este modifique el contenido de los productos, es decir que muestre lo q lo contiene, sino tambien se podria recorrer las cars para luego añadirle una clase que haga que se muestre o desaparezca, lo cual debo decir me llama mas la atencion y preferiria, no se, no se.
Para hacer la segunda opcion creo que estaria d puta madre usar un useRef desde el template para asi poderlo comunicar con el campo de busqueda, luego ese campo de busqueda renderiza de nuevo el children dandole otro estilo, o eliminando elementos, a sus elementos hay que darles una animacion. si esta en /product o /cart tambien tocaria consultarlo de una mas bien, tambien toca usar un evento que detecte cuando ya se detuvo de escribir por un buen tiempo antes de efectuar ese proceso.

## Update 24/02/2025
- Pasarela
- Reducir cantidad tras decidir comprar uno[components/Product/Product.tsx]
- Darle funcionalidad al buscador
- Boton Cart
- Agregar routing con React Router
- Manejar el consumo de productos
- Mejorar UI/UX 
- Dejarlo todo en ingles
- Ver bn lo del carrito con todo el monto
- Hacer la factura
- Refactor
- Implement
- Calificacion del producto
- Mostrar mas contenido bajo un producto
  - Agregar como esa parte donde cada vendedor pueda agregar como parte de su pagina
  - Comentaerios de compradores
  - Permitir dejar comentarios y calificacion
  - Agregar otro idioma
- Agregar la parte de la cuenta de cada persona al igual que su gestion
- Una parte para ver sus compras
- Hacer lo de agregar al carrito similar a lo de amazon
- El listado con lo del carrito y  todos sus detalles + opciones por item

## Pasarela

Esa pantalla que aparece antes de completar el pago se puede llamar de varias formas en inglés, dependiendo de su propósito exacto. Aquí te dejo algunas opciones:  

### **1. Nombres comunes para esa sección**  
- **"Order Review"** → Revisión del pedido (muy común en e-commerce).  
- **"Checkout Preview"** → Vista previa del pago.  
- **"Payment Overview"** → Resumen del pago.  
- **"Order Summary"** → Resumen del pedido.  

### **2. Flujo típico en un checkout como Amazon**  
Parece que describes un **proceso de pago en varias etapas**, que suele incluir:  
1. **"Order Confirmation Page"** → Página de confirmación de pedido (muestra mensaje de bienvenida, promociones, etc.).  
2. **"Shipping Details"** → Selección o ingreso de dirección de envío.  
3. **"Payment Method Selection"** → Selección del método de pago.  
4. **"Review & Place Order"** → Revisión final y botón para completar la compra.  
5. **"Payment Gateway"** → Redirección a la pasarela de pago (si es externa).  

Si tu objetivo es definir el nombre de una etapa específica dentro de este flujo, dime cuál y te ayudo a elegir el mejor término. 🚀
