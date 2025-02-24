import React from "react";
import CartContext, { CartContextType } from "./CartContext";
import useCartHandler from "../hooks/useCartHandler";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Usamos el hook para obtener el carrito y sus métodos
  const cartHandler = useCartHandler("Ecuador", "Ecuador");

  // El contextValue debe contener directamente todas las propiedades y métodos de cartHandler
  const contextValue: CartContextType = {
    ...cartHandler, // Pasamos todo lo que retorna el hook useCartHandler
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
