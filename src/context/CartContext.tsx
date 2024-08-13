import React, { createContext, useContext } from "react";
import { Cart } from "../types/cart";

export interface CartContextType {
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    //Dispatch representa una funcion que sirve solo para despachar una accion, recibe un valor y lo envia para actualizar el estado. 'React.SetStateAction<Cart>' es el tipo de accion q maneja el disspatch, en este caso hacer un set, este puede ser directo, reemplazando el estado actual. Ó una función que toma el estado actual (Cart) como argumento y devuelve un nuevo valor (Cart). Esto es útil si necesitas calcular el nuevo estado basado en el estado anterior. En pocas palabras la funcion acepta un nuevo objeto Cart directamente, o una función que recibe el estado anterior (Cart) y devuelve el nuevo estado (Cart).
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("You can't use this hook without its provider");
    return context;
}

export default CartContext;