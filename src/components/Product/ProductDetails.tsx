import { ProductData } from "../../types/products";
import { concatString, LinksCategorysProduct } from "../LinksCategorysProduct";
import { ProductCost } from "./Product-cost";

const ProductDetails = ({ product }: { product: ProductData }) => (
  <div>
    {LinksCategorysProduct(product, " / ")}
    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
    <ProductCost price={product.precio} discount={product.descuento} />

    <ul className="mt-4 text-sm list-disc list-inside">
      {product.description.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>

    <h3 className="mt-4 font-semibold">Características</h3>
    <p><b>Marca:</b> {product.marca}</p>
    <p><b>Color:</b> {product.color}</p>
    <p><b>Estilo:</b> {product.estilo}</p>
    <p><b>Usos:</b> {concatString(product.usos)}</p>
  </div>
);

export default ProductDetails;
