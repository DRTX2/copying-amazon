import React, { useState } from "react";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { ProductsProvider } from "./ProductProvider";
import Template from "../components/Template";

interface AppProviderProps {
  needProducts: boolean;
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({
  needProducts,
  children,
}) => {
  const Content = () => 
  <Template>
    {children}
  </Template>;

  return (
    <AuthProvider>
      <CartProvider>
        {needProducts ? (
          <ProductsProvider>
            <Content />
          </ProductsProvider>
        ) : (
          <Content />
        )}
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
