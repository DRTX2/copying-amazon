import Template from "../layouts/Template";
import { useCart } from "../context/CartContext";
import { RenderProductsInBox } from "../components/common";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Template>
      <div className="flex justify-between items-center mb-6 p-4">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          Más productos
        </button>
        {totalPrice > 0 && (
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200 shadow-md">
            Confirmar compra (${totalPrice})
          </button>
        )}
      </div>

      <RenderProductsInBox existsCartProducts={true} />
    </Template>
  );
}