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