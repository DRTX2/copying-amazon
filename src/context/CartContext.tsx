import React, { createContext, useContext } from "react";
import { ProductData } from "../types/products";
// Tipo del contexto basado en lo que retorna useCartHandler
export interface CartContextType {
  to: string;
  from: string;
  currency: string;
  products: ProductData[];
  totalPrice: number;
  discount: number;
  addProduct: (product: ProductData) => void;
  removeProduct: (prodId: string) => void;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  //  el mismo obtiene el valor acutal del contexto, si no esta el contexto eso da undefined, permite un acceso seguro y cuando se use no va a ser undefined haciendolo mas facil de depurar si existe error en el programa
  const context = useContext(CartContext);
  if (!context) throw new Error("You can't use this hook without its provider");
  return context;
};

export default CartContext;
