import { useReducer } from "react";
import Template from "../components/Template";
import { CardData, ProductData } from "../types/products";
import { Card } from "../components/Card";
import Product from "../components/Product";
import data from "./products.json";
import { reducer } from "../hooks/pageHandler";
import { State, Action, initialState } from "../types/reducer";

export default function Home() {
  const myCarData: CardData[] = data;

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const fragment = () => {
    switch (state.view) {
      case "home":
        return (
          <div className="cards">
            {myCarData!.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                img={card.img}
                altImg={card.altImg}
                id={card.id}
                handleClick={searchProductId}
              />
            ))}
          </div>
        );
      case "product":
        if (!state.selectedProduct) return null;
        const { selectedProduct } = state;
        return (
          <Product
            id={selectedProduct.id}
            img={selectedProduct.img}
            altImg={selectedProduct.altImg}
            title={selectedProduct.title}
            category={selectedProduct.category}
            description={selectedProduct.description}
            marca={selectedProduct.marca}
            color={selectedProduct.color}
            estilo={selectedProduct.estilo}
            usos={selectedProduct.usos}
            precio={selectedProduct.precio}
            descuento={selectedProduct.descuento}
            cantidadDisponible={selectedProduct.cantidadDisponible}
            origenEnvio={selectedProduct.origenEnvio}
          />
        );
      case "cart":
        return <div>Carrito de Compras</div>;
      default:
        return null;
    }
  };

  const searchProductId = (id: number): void => {
    const api: ProductData[] = data;
    const prod = api.find((prod) => prod.id === id);
    if (prod) {
      dispatch({ type: "SHOW_PRODUCT", payload: prod });
    }
  };

  return <Template>{fragment()}</Template>;
}
