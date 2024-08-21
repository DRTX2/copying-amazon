import { useReducer } from "react";
import Template from "../components/Template";
import Product from "../components/Product";
import { RenderProductsInBox } from "../components/common";
import { reducer } from "../hooks/pageHandler";
import { State, Action, initialState } from "../types/reducer";
import SelectedProducts from "../selectedProducts";

// agregar al carrito es distinto de comprar ahora, lo d comprar ahora es para 1 unico articulo, mientras que con el carrito se cargan mas a la compra, se muestran, puede editarse y luego ahi si pagar por los mismos
export default function Home() {
  
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const fragment = () => {
    switch (state.view) {
      case "home":
        return RenderProductsInBox({dispatch})
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
      case "cart":
        return <SelectedProducts dispatch={dispatch}/>
      default:
        return null;
    }
  };

  return <Template>{fragment()}</Template>;
}