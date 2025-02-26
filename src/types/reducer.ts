import { ProductData } from "./products";

type View = "home" | "product" | "cart" | "product_filter" | "payment_gateway" | "offer_extra_service";

export interface State {
  view: View;
  selectedProduct?: ProductData;
}

export const initialState: State = { view: "home" };

export type Action =
  | { type: "SHOW_CATALOG" }
  | { type: "SHOW_PRODUCT"; payload: ProductData }
  | { type: "SHOW_CART" }
  | { type: "PAYMENT_GATEWAY" }
  | { type: "OFFER_EXTRA_SERVICE" }
  | { type: "SHOW_PRODUCT_FILTER" };
