import Template from "../layouts/Template";
import { useCart } from "../context/CartContext";
import { RenderProductsInBox } from "../components/common";
import { useNavigate } from "react-router-dom";
import './home.css';

export default function ShoppingCart() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Template>
      <div className="flex justify-between items-center mb-4">
        <button
          className="btnSection"
          onClick={() => navigate("/")}
        >
          Más productos
        </button>
        {totalPrice > 0 && (
          <button className="btnSection">
            Confirmar compra (${totalPrice})
          </button>
        )}
      </div>

      <RenderProductsInBox existsCartProducts={true} />
    </Template>
  );
}