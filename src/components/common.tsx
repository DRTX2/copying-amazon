import { useNavigate } from "react-router-dom";
import { ProductData } from "../types/products";
import { Card } from "./Card/Card";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

interface RenderProps {
  existsCartProducts: boolean;
  expecifyContent?: string; // puedes usar esto si necesitas cambiar textos más adelante
}

export const searchProductById = (
  id: number,
  products: ProductData[]
): ProductData | undefined => {
  return products.find((prod) => prod.id === id);
};

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] mx-auto p-4">
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
