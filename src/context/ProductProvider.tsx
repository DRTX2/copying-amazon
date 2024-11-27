import { useEffect, useState } from "react";
import { ProductData } from "../types/products";
import { ProductsContext } from "./ProductContext";
import productsPetition from "../pages/products.json";

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const simulatePetition=new Promise<ProductData[]>(resolve=>setTimeout(()=>resolve(productsPetition),1500));

        const data: ProductData[] = await simulatePetition;
        setProducts(data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};