// src/components/common.tsx
import { ProductData } from "../types/products";
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
    <div className="cards">
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
