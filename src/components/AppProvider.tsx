import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";
import { ProductsProvider } from "../context/ProductProvider";

interface Props {
  children: React.ReactNode;
  useProducts?: boolean;
}

const AppProvider: React.FC<Props> = ({
  children,
  useProducts = true,
}: Props) => {
  
  const Providers = useProducts ? (
    <ProductsProvider>{children}</ProductsProvider>
  ) : (
    children
  );


  return (
    <AuthProvider>
      <CartProvider>
        {Providers}
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
