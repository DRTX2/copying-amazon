// src/components/common.tsx
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
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

  const products = existsCartProducts
    ? useCart().products
    : useProducts().products;

  const filteredProducts = products.filter(
    (prod) => prod.cantidadDisponible > 0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-4">
      {filteredProducts.map((card) => (
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
