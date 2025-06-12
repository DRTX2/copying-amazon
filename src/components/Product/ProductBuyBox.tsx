import { ProductData } from "../../types/products";
import SelectProduct from "./selectQuantityProduct";
import { RefObject } from "react";

type Props = {
  product: ProductData;
  quantityRef: RefObject<HTMLSelectElement>;
  handleAddToCart: (buyNow?: boolean) => void;
};

const ProductBuyBox = ({ product, quantityRef, handleAddToCart }: Props) => {
  return (
    <div className="border rounded p-4 shadow-md w-full">
      <p className="text-sm mb-1">Nuevo:</p>
      <p className="font-bold text-lg mb-2">${product.precio}</p>
      <p className="text-sm text-gray-600">Envíar a 'País Ejemplo'</p>

      {product.cantidadDisponible > 0 ? (
        <>
          <p className="text-green-600 mt-2">Disponible</p>
          <label className="text-sm block mt-2 mb-1">Cantidad:</label>
          <SelectProduct quantity={product.cantidadDisponible} refInput={quantityRef} />

          <div className="flex flex-col gap-2 mt-4">
            <button
              className="bg-black text-white py-2 rounded"
              onClick={() => handleAddToCart()}
            >
              Agregar al carrito
            </button>
            <button
              className="border border-black py-2 rounded"
              onClick={() => handleAddToCart(true)}
            >
              Comprar ahora
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-red-600 mt-2">Agotado</p>
          <button className="mt-4 text-sm underline">
            Agregar a lista de deseos
          </button>
        </>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Enviado desde {product.origenEnvio}, incluye envío gratis.
      </p>
    </div>
  );
};

export default ProductBuyBox;
