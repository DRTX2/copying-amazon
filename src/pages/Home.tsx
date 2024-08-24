import { useReducer } from "react";
import Product from "../components/Product";
import { RenderProductsInBox } from "../components/common";
import { reducer } from "../hooks/pageHandler";
import { State, Action, initialState } from "../types/reducer";

// agregar al carrito es distinto de comprar ahora, lo d comprar ahora es para 1 unico articulo, mientras que con el carrito se cargan mas a la compra, se muestran, puede editarse y luego ahi si pagar por los mismos
export default function Home() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  
  const fragment = () => {
    switch (state.view) {
      case "home":
        return RenderProductsInBox({ dispatch,existsCartProducts:false });
        break;
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
            dispatch={dispatch}
          />
        );
        break;
      case "cart":
        return RenderProductsInBox({ dispatch,existsCartProducts:true });
        break;
      default:
        return null;
        break;
    }
  };

  return fragment()
}
