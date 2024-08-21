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
        // Simulando la petición a una API, usando el archivo JSON local
        const data: ProductData[] = productsPetition;
        setProducts(data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
