import React, { useState } from "react";
import CartContext, { CartContextType } from "./CartContext";
import { Cart } from "../types/cart";

interface CartProviderProps {
    children: React.ReactNode;
}

const initialCart: Cart = new Cart("Ecuador", "Ecuador");

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState(initialCart);

    const contextValue: CartContextType = {
        cart,
        setCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}