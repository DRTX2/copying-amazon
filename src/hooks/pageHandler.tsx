import { State, Action } from "../types/reducer";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW_CATALOG":
      return { ...state, view: "home" };
    case "SHOW_PRODUCT":
      return { ...state, view: "product", selectedProduct: action.payload  };
    case "SHOW_CART":
      return { ...state, view: "cart"};
    default:
      throw new Error("This operation is not allow");
  }
};

