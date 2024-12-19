import { ProductData } from "./products";

type View =  "home" | "product" | "cart" | "product_filter";

export interface State {
  view: View;
  selectedProduct?: ProductData|null;
}

export const initialState: State = { view: "home" , selectedProduct:null};

export type Action =
  | { type: "SHOW_HOME" }
  | { type: "SHOW_CATALOG" }
  | { type: "SHOW_PRODUCT"; payload: ProductData }
  | { type: "SHOW_CART" }
  | { type: "SHOW_PRODUCT_FILTER" };