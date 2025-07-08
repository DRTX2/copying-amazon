import { ProductData } from "../../types/products";
import { concatString } from "../LinksCategorysProduct";
import { ProductCost } from "./Product-cost";

const ProductDetails = ({ product }: { product: ProductData }) => (
  <div className="space-y-6">
    {/* Product cost prominently displayed */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <ProductCost price={product.precio} discount={product.descuento} />
    </div>

    {/* Product description */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción del producto</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {product.description.map((desc, i) => (
          <li key={i} className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Product characteristics */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex">
          <span className="font-medium text-gray-700 w-16">Marca:</span>
          <span className="text-gray-900">{product.marca}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-16">Color:</span>
          <span className="text-gray-900">{product.color}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-16">Estilo:</span>
          <span className="text-gray-900">{product.estilo}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-16">Usos:</span>
          <span className="text-gray-900">{concatString(product.usos)}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetails;
