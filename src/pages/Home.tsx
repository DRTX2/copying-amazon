import { useReducer } from "react";
import Product from "../components/Product";
import { RenderProductsInBox } from "../components/common";
import { reducer } from "../hooks/pageHandler";
import { State, Action, initialState } from "../types/reducer";
import "./home.css"
import { useCart } from "../context/CartContext";

export default function Home() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  
  const fragment = () => {
    switch (state.view) {
      case "home":
        return (
        <>
          <div className="btnSection-container">
            <button className="btnSection" onClick={()=>{dispatch({ type: "SHOW_CART" })}}>Cart</button>
          </div>
          {RenderProductsInBox({ dispatch,existsCartProducts:false })}
        </>
        )
        break;
      case "product":
        if (!state.selectedProduct) return null;
        const { selectedProduct } = state;
        console.log(selectedProduct);
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
        const {totalPrice}=useCart();
        return (
          <>
            <div className="btnSection-container">
              <button className="btnSection" onClick={()=>{dispatch({ type: "SHOW_CATALOG" })}}>Mas productos</button>
              {totalPrice &&<button>Confirmar compra(${totalPrice})</button>}
            </div>
            {RenderProductsInBox({ dispatch,existsCartProducts:true })}
          </>
        )
        break;
      default:
        return null;
        break;
    }
  };

  return fragment()
}
