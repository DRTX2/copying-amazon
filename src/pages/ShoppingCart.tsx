import Template from "../layouts/Template";
import { useCart } from "../features/cart";
import { useNavigate } from "react-router-dom";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { Product } from "../features/products/types/product.types";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { getProducts, getCartStats } = useCart();

  const cartProducts = getProducts();
  const { totalItems, totalPrice, isEmpty } = getCartStats();

  return (
    <Template>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
          
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            Continuar Comprando
          </button>
        </div>

        {isEmpty ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">¡Agrega algunos productos para empezar!</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-gray-600">
                    Total de productos: <span className="font-semibold">{totalItems}</span>
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                  </p>
                </div>
                
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md">
                  Proceder al Pago
                </button>
              </div>
            </div>

            <ProductGrid
              products={cartProducts}
              loading={false}
              error={null}
              onProductSelect={(product: Product) => navigate(`/product/${product.id}`)}
              emptyMessage="No hay productos en el carrito"
              className="mb-8"
            />
          </>
        )}
      </div>
    </Template>
  );
}