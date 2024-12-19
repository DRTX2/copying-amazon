import { useReducer } from "react";
import Product from "../components/Product";
import { RenderProductsInBox } from "../components/common";
import { reducer } from "../hooks/pageHandler";
import { State, Action, initialState } from "../types/reducer";
import { useCart } from "../context/CartContext";
import { pageReducer } from "../context/pageReducer";
import "./home.css"

export default function Home() {
  // Una función que recibe un estado de tipo State y una acción de tipo Action, y devuelve un nuevo estado de tipo State.
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  
  const {totalPrice}=useCart();

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
      case "cart":
        
        return (
          <>
            <div className="btnSection-container">
              <button className="btnSection" onClick={()=>{dispatch({ type: "SHOW_CATALOG" })}}>Mas productos</button>
              {totalPrice &&<button>Confirmar compra(${totalPrice})</button>}
            </div>
            {RenderProductsInBox({ dispatch,existsCartProducts:true })}
          </>
        )
      default:
        return null;
    }
  };

  return fragment()
}
