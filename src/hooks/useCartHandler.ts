import { useState } from "react";
import { ProductData } from "../types/products";

export interface CartData {
  to: string;
  from: string;
  currency: string;
  totalPrice: number;
  products: ProductData[];
  discount: number;
}

const useCartHandler = (
  initialTo: string,
  initialFrom: string,
  initialCurrency: string = "USD",
  initialDiscount: number = 0
) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(initialDiscount);
  const [to] = useState<string>(initialTo);
  const [from] = useState<string>(initialFrom);
  const [currency] = useState<string>(initialCurrency);
  const [showCart, setShowCart] = useState(false);

  const addProduct = (product: ProductData) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      
      const updatedProducts = existingProduct
        ? // Si ya existe, incrementa la cantidad
          prevProducts.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  cantidadDisponible:
                    p.cantidadDisponible + product.cantidadDisponible,
                }
              : p
          )
        : [...prevProducts, product];
      setTotalPrice(calculateTotalPrice(updatedProducts));
      return updatedProducts;
    });
  };

  const removeProduct = (prodId: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((p) => p.id !== prodId);
      setTotalPrice(calculateTotalPrice(updatedProducts));
      return updatedProducts;
    });
  };

  const calculateTotalPrice = (products: ProductData[]): number => {
    return products.reduce(
      (sum, product) => sum + product.cantidadDisponible * product.precio,
      0
    );
  };

  return {
    showCart,
    to,
    from,
    currency,
    products,
    totalPrice,
    discount,
    addProduct,
    removeProduct,
    setDiscount,
    setShowCart,
  };
};

export default useCartHandler;
