import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { Reducer, useReducer } from "react";
import { Action, initialState, State } from "../types/reducer";
import { reducer } from "../hooks/pageHandler";


const ProductPage:React.FC=() =>{
    const[state,dispatch]= useReducer<Reducer<State,Action>>(
        reducer,
        initialState
    );
// esto es lo mismo
//const reducer: React.Reducer<State, Action> = (state, action) => { ... }
//const reducer = (state: State, action: Action): State => { ... };


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
}
