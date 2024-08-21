import { ProductData } from "../types/products";
import { Card } from "./Card";
import { changeView } from "../hooks/pageHandler";
import { Action } from "../types/reducer";
import {useProducts} from "../context/ProductContext";

// const {products} = useProducts();

export interface productHandler {
  dispatch: (action: Action, payload?: ProductData) => void;
}

interface idCard {
  idCard: number;
}

export const searchProductById = (id: number, products:ProductData[]): ProductData | undefined => {
  return products.find((prod) => prod.id === id);
};

export const clickProductHandler = (
  products:ProductData[],
  { dispatch }: productHandler,
  { idCard }: idCard
) => {
  const prod = searchProductById(idCard,products);
  if (!prod) return;
  changeView(dispatch, { type: "SHOW_PRODUCT", payload: prod });
};

const renderProducts = (
  { dispatch }: productHandler,
  prods?: ProductData[]
): JSX.Element[] => {

  if(!prods){
    const {products} = useProducts();
    prods=products;
  }
  
  return prods!.map((card) => (
    <Card
      key={card.id}
      title={card.title}
      img={card.img}
      altImg={card.altImg}
      id={card.id}
      handleClick={() => {
        clickProductHandler(products,{ dispatch }, { idCard: card.id as number });
      }}
    />
  ));
};

export const RenderProductsInBox: React.FC<productHandler & { prods?: ProductData[] }> = ({ dispatch, prods }) => {
  return (
    <div className="cards">
      {renderProducts({ dispatch }, prods)}
    </div>
  );
};