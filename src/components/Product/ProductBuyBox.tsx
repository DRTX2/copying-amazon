import { ProductData } from "../../types/products";
import SelectProduct from "./selectQuantityProduct";
import { RefObject } from "react";

type Props = {
  product: ProductData;
  quantityRef: RefObject<HTMLSelectElement | null>;
  handleAddToCart: (buyNow?: boolean) => void;
};

const ProductBuyBox = ({ product, quantityRef, handleAddToCart }: Props) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Nuevo:</p>
        <p className="font-bold text-2xl text-gray-900 mb-2">${product.precio}</p>
        <p className="text-sm text-gray-600">Envíar a 'País Ejemplo'</p>
      </div>

      {product.cantidadDisponible > 0 ? (
        <>
          <p className="text-green-600 font-semibold mt-2 mb-4">✓ Disponible</p>
          
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">Cantidad:</label>
            <SelectProduct quantity={product.cantidadDisponible} refInput={quantityRef} />
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
              onClick={() => handleAddToCart()}
            >
              Agregar al carrito
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm border border-gray-600"
              onClick={() => handleAddToCart(true)}
            >
              Comprar ahora
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-red-600 font-semibold mt-2 mb-4">✗ Agotado</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm underline font-medium">
            Agregar a lista de deseos
          </button>
        </>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          🚚 Enviado desde {product.origenEnvio}, incluye envío gratis.
        </p>
      </div>
    </div>
  );
};

export default ProductBuyBox;
