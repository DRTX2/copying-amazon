import { State, Action } from "../types/reducer";
import { ProductData } from "../types/products";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW_CATALOG":
      return { ...state, view: "home" };
    case "SHOW_PRODUCT":
      return { ...state, view: "product", selectedProduct: action.payload };
    case "SHOW_CART":
      return { ...state, view: "cart" };
    default:
      throw new Error("This operation is not allow");
  }
};

export const changeView = (
  dispatch: (action: Action) => void,
  typeAction: Action,
  payload?: ProductData
) => {
  if (typeAction.type === "SHOW_PRODUCT" && payload) {
    dispatch({ type: "SHOW_PRODUCT", payload });
    // no funcionaria dispatch({...typeAction,payload}); Esto debido a que si bien el tipo que se usa tiene payload lo lleva, el resto no lo hace, asi que hay q especificarlo mas 
  } else {
    dispatch(typeAction);
  }
};
