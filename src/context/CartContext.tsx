import React, { createContext, useContext } from "react";
import { ProductData } from "../types/products";
// Tipo del contexto basado en lo que retorna useCartHandler
export interface CartContextType {
  showCart:boolean;
  to: string;
  from: string;
  currency: string;
  products: ProductData[];
  totalPrice: number;
  discount: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (product: ProductData) => void;
  removeProduct: (prodId: string) => void;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  // La función setDiscount es un despachador de estado generado por el hook useState. En este caso, se utiliza para actualizar el valor del descuento en el carrito. Al llamar a setDiscount con un nuevo valor, se actualiza el estado de discount en el contexto del carrito, lo que permite que el cambio se refleje en la interfaz o en cualquier otra lógica dependiente de ese valor.
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  //  el mismo obtiene el valor acutal del contexto, si no esta el contexto eso da undefined, permite un acceso seguro y cuando se use no va a ser undefined haciendolo mas facil de depurar si existe error en el programa
  const context = useContext(CartContext);
  if (!context) throw new Error("You can't use this hook without its provider");
  return context;
};

export default CartContext;
