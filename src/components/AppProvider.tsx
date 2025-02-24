import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";
import { ProductsProvider } from "../context/ProductProvider";
import Template from "./Template";

interface AppProviderProps {
  needProducts: boolean;
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({
  needProducts,
  children,
}) => {
  const Content = () => <Template>{children}</Template>;

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
