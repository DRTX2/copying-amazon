import { Reducer } from "react";
import { State, Action, initialState } from "../types/reducer";
import { ProductData } from "../types/products";
import Home from "../pages/Home";

export const pageReducer:Reducer<State,Action>=(state, action)=>{
    switch(action.type){
        case "SHOW_HOME":
            return {...state, view:"home", selectedProduct:null};
        case "SHOW_CART":
                return {...state, view:"cart"};
        case "SHOW_PRODUCT":
            return {...state, view:"product", selectedProduct:action.payload};
        case "SHOW_CATALOG":
            return {...state,view:"home"};
        // case "SHOW_PRODUCT_FILTER":        
        default:
            // const _exhaustiveCheck: never = action;
            throw new Error("Undefined state for pageReducer");
    }
}
