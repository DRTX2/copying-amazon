import { ProductData } from "../types/products";
import { Card } from "./Card/Card";
import { changeView } from "../hooks/pageHandler";
import { Action } from "../types/reducer";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

export interface ProductHandler {
  dispatch: (action: Action, payload?: ProductData) => void;
}

interface idCard {
  idCard: number;
}

export const searchProductById = (
  id: number,
  products: ProductData[]
): ProductData | undefined => {
  return products.find((prod) => prod.id === id);
};

export const clickProductHandler = (
  products: ProductData[],
  { dispatch }: ProductHandler,
  { idCard }: idCard
) => {
  const prod = searchProductById(idCard, products);
  if (!prod) return;
  changeView(dispatch, { type: "SHOW_PRODUCT", payload: prod });
};

const renderProducts = (
  { dispatch }: ProductHandler,
  prods?: ProductData[]
): JSX.Element[] => {
  const { products } = useProducts();
  let productsToRender = prods && prods.length > 0 ? prods : products;
  console.log("productos sin filter", productsToRender);
  productsToRender = productsToRender.filter(
    (prod) => prod.cantidadDisponible > 0
  );
  console.log("productos con filter", productsToRender);
  return productsToRender.map((card) => (
    <Card
      key={card.id}
      title={card.title}
      img={card.img}
      altImg={card.altImg}
      id={card.id}
      handleClick={() => {
        clickProductHandler(
          productsToRender,
          { dispatch },
          { idCard: card.id as number }
        );
      }}
    />
  ));
};

export const RenderProductsInBox: React.FC<
  ProductHandler & { existsCartProducts: boolean; expecifyContent?: string }
> = ({ dispatch, existsCartProducts }) => {
  let prods: ProductData[] = existsCartProducts
    ? useCart().products
    : useProducts().products;
  return <div className="cards">{renderProducts({ dispatch }, prods)}</div>;
};
