import React from "react";
import { useCart } from "./context/CartContext";
import { RenderProductsInBox, productHandler } from "./components/common";

const SelectedProducts = ({ dispatch }: productHandler) => {
  const { cart } = useCart();
  // Si no hay productos en el carrito, mostramos un mensaje simple.
  console.log(cart);
  console.log(cart.products);
  if (!cart.products || cart.products.length === 0) {
    return <div>No products selected</div>;
  }

  // Renderizamos los productos si hay elementos en el carrito.
  return RenderProductsInBox({ dispatch }, cart.products)
    
};

export default SelectedProducts;