import React, { createContext, useContext, useState } from 'react';
import { ProductData } from '../types/products';

interface ProductContextType {
    products: ProductData[];
    setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

// Creación del contexto
export const ProductsContext = createContext<ProductContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useProducts = (): ProductContextType => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error('You must use a Provider to use this context');
    return context;
}
