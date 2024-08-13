import { ProductData } from "./products";

export interface CartData {
    to: string;
    from: string;
    currency: string;
    totalPrice: number;
    products: ProductData[];
    discount: number;
}

export class Cart implements CartData {
    readonly to: string;
    readonly from: string;
    readonly currency: string;
    products: ProductData[];
    totalPrice: number;
    discount: number;

    constructor(to: string, from: string, products: ProductData[] = [], discount: number = 0, currency: string = "USD") {
        this.to = to;
        this.from = from;
        this.products = products;
        this.totalPrice = this.calculateTotalPrice();
        this.discount = discount;
        this.currency = currency;
    }

    addProduct(product: ProductData) {
        this.products.push(product);
        this.totalPrice += product.precio;
    }

    removeProduct(prodId: string) {
        this.products = this.products.filter(p => p.id !== prodId);
        this.totalPrice = this.calculateTotalPrice();
    }

    private calculateTotalPrice(): number {
        return this.products.reduce((sum, product) => sum + product.precio, 0);
    }
}
