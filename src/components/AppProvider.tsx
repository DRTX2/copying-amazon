import React from "react";
import { AuthProvider } from "../stores/AuthProvider";
import { CartProvider } from "../stores/CartProvider";
import { ProductsProvider } from "../stores/ProductProvider";

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
