import { useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../types/products";
import ProductDetails from "./ProductDetails";
import ProductBuyBox from "./ProductBuyBox";
import ProductImage from "./ProductImage";
import Message, { MessageData } from "../Message/Message";
import { searchProductById } from "../common";
import { goToRoot } from "../../utils/navigation";

const selectProduct = (
  quantity: number,
  product: ProductData,
  products: ProductData[],
  addProduct: (product: ProductData) => void
): MessageData => {
  const updatedProd = searchProductById(product.id as number, products);
  if (!updatedProd) {
    return {
      time: 20,
      title: "Producto no disponible",
      content: "El producto no pudo agregarse a su pedido.",
      type: "dangerous",
    };
  }

  const prod = { ...updatedProd, cantidadDisponible: quantity };
  addProduct(prod);

  return {
    time: 20,
    title: "Producto agregado al carrito",
    content: "El producto ha sido agregado a tu carrito.",
    type: "success",
  };
};

const Product = (product: ProductData) => {
  const { addProduct } = useCart();
  const { products, setProducts } = useProducts();
  const quantityRef = useRef<HTMLSelectElement>(null);
  const [message, setMessage] = useState<MessageData | null>(null);
  const navigate = useNavigate();

  const handleAddToCart = (buyNow: boolean = false) => {
    const quantity = parseInt(quantityRef.current?.value || "1");
    const msg = selectProduct(quantity, product, products, addProduct);
    setMessage(msg);

    // Actualiza cantidad disponible
    setProducts(
      products.map((prod) =>
        prod.id === product.id
          ? { ...prod, cantidadDisponible: prod.cantidadDisponible - quantity }
          : prod
      )
    );

    if (buyNow) navigate("/cart");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with categories and back button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-2 md:mb-0">
          <div className="text-sm text-gray-600 mb-1">
            {product.category.map((cat, index) => (
              <span key={index}>
                <a href={`/category/${cat}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {cat}
                </a>
                {index < product.category.length - 1 && ' > '}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        </div>
        <button
          className="ml-4 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 self-start md:self-center"
          onClick={() => goToRoot(navigate)}
        >
          Volver al catálogo
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <ProductImage img={product.img} altImg={product.altImg} />
        <ProductDetails product={product} />
        <ProductBuyBox
          product={product}
          quantityRef={quantityRef}
          handleAddToCart={handleAddToCart}
        />
      </div>

      {message && (
        <Message
          time={message.time}
          title={message.title}
          content={message.content}
          type={message.type}
        />
      )}
    </div>
  );
};

export default Product;
