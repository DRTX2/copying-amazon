// src/pages/ProductPage.tsx
import { useProducts } from "../features/products";
import { useCart } from "../features/cart";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card/Card";



interface RenderProps {
  existsCartProducts: boolean;
  expecifyContent?: string;
}

export const RenderProductsInBox: React.FC<RenderProps> = ({
  existsCartProducts,
}) => {
  const navigate = useNavigate();
  const { products: allProducts } = useProducts();
  const { getProductsData } = useCart();

  // Obtener productos del carrito o todos los productos
  const products = existsCartProducts
    ? getProductsData()
    : allProducts;

  const filteredProducts = products.filter(
    (prod: any) => prod.cantidadDisponible > 0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-4">
      {filteredProducts.map((card: any) => (
        <Card
          key={card.id}
          title={card.title}
          img={card.img}
          altImg={card.altImg}
          onClick={() => navigate(`/product/${card.id}`)}
        />
      ))}
    </div>
  );
};
