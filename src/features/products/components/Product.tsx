import { useRef, useState } from "react";
import { useCart } from "../../features/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductData } from "@/types/products";
import ProductDetails from "./ProductDetails";
import ProductBuyBox from "./ProductBuyBox";
import ProductImage from "./ProductImage";
import Message, { MessageData } from "../Message/Message";
import { goToRoot } from "../../utils/navigation";

const Product = (product: ProductData) => {
  const { addProductData } = useCart();
  const quantityRef = useRef<HTMLSelectElement>(null);
  const [message, setMessage] = useState<MessageData | null>(null);
  const router = useRouter();

  const handleAddToCart = (buyNow: boolean = false) => {
    const quantity = parseInt(quantityRef.current?.value || "1");
    
    // Verificar disponibilidad
    if (product.cantidadDisponible < quantity) {
      setMessage({
        time: 20,
        title: "Stock insuficiente",
        content: "No hay suficiente stock disponible.",
        type: "dangerous",
      });
      return;
    }

    // Agregar al carrito usando el nuevo hook
    addProductData(product, quantity);
    
    setMessage({
      time: 20,
      title: "Producto agregado al carrito",
      content: "El producto ha sido agregado a tu carrito.",
      type: "success",
    });

    // Si es "comprar ahora", navegar al carrito
    if (buyNow) {
      router.push("/shopping-cart");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with categories and back button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-2 md:mb-0">
          <div className="text-sm text-gray-600 mb-1">
            {product.category.map((cat, index) => (
              <span key={index}>
                <Link href={`/category/${cat}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {cat}
                </Link>
                {index < product.category.length - 1 && ' > '}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        </div>
        <button
          className="ml-4 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 self-start md:self-center"
          onClick={() => goToRoot(router.push.bind(router))}
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
