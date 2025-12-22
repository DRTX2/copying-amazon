import { ProductData } from "./products";

type View =  "home" | "product" | "cart" | "product_filter";

export interface State {
  view: View;
  selectedProduct?: ProductData;
}

export const initialState: State = { view: "home" };

export type Action =
  | { type: "SHOW_CATALOG" }
  | { type: "SHOW_PRODUCT"; payload: ProductData }
  | { type: "SHOW_CART" }
  | { type: "SHOW_PRODUCT_FILTER" };