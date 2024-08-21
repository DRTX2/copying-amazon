import { ProductData } from "../types/products";
import { concatString, LinksCategorysProduct } from "./LinksCategorysProduct";
import { ProductCost } from "./Product-cost";
import SelectProduct from "./selectQuantityProduct";
import { useCart } from "../context/CartContext";
import { useRef, useState } from "react";
import Message, { MessageData } from "./Message/Message";
import { Action } from "../types/reducer";
import {useProducts} from "../context/ProductContext";

import "./watch-product.css";

const selectProduct = (
  quantity: number,
  product: ProductData,
  isOnlyProduct: boolean = false,
  addProduct: (product: ProductData) => void
): MessageData => {
  const { products } = useProducts();

  const updatedProd: ProductData | undefined = products.find(
    (prod) => (prod.id = product.id)
  );

  if (!updatedProd)
    return {
      time: 20,
      title: "Producto no disponible",
      content: "El producto no pudo agregarse a su pedido.",
      type: "dangerous",
    };

  const prod = { ...product, cantidadDisponible: quantity };
  product.cantidadDisponible -= quantity;
  updatedProd.cantidadDisponible = quantity;

  addProduct(prod);

  return {
    time: 20,
    title: isOnlyProduct ? "Compra realizada" : "Producto agregado al carrito",
    content: isOnlyProduct
      ? "Has comprado el producto exitosamente."
      : "El producto ha sido agregado a tu carrito.",
    type: isOnlyProduct ? "success" : "success",
  };
};

type ProdAndCartHandler = ProductData & {
  dispatch: (value: Action) => void;
};

const Product = ({ dispatch, ...product }: ProdAndCartHandler) => {
  const [message, setMessage] = useState<MessageData | null>(null);
  const { addProduct } = useCart();
  const quantityProd = useRef<HTMLSelectElement>(null);

  const handleAddToCart = (
    addProduct: (product: ProductData) => void,
    onlyProduct: boolean = false
  ) => {
    if (quantityProd.current) {
      const msg: MessageData = selectProduct(
        parseInt(quantityProd.current.value),
        product,
        onlyProduct,
        addProduct
      );
      setMessage(msg);
      if (onlyProduct) dispatch({ type: "SHOW_CART" });
    }
  };

  return (
    <>
      <section className="current-selection">
        {LinksCategorysProduct(product, " - ")}
      </section>
      <section className="current-product" id={product.id as string}>
        <figure className="img-box">
          <img src={product.img} alt={product.altImg} />
        </figure>
        <article className="informationProduct">
          <h3 className="title">{product.title}</h3>
          <ProductCost price={product.precio} discount={product.descuento} />
          <ul>
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <h3>Caracteristicas</h3>
          <p>
            <b>Marca:</b> {product.marca}
          </p>
          <p>
            <b>Color:</b> {product.color}
          </p>
          <p>
            <b>Estilo:</b> {product.estilo}
          </p>
          <p>
            <b>Usos:</b> {concatString(product.usos)}
          </p>
        </article>
        <article className="more-about-product">
          <p>Nuevo:</p>
          <p>${product.precio}</p>
          <p>Enviar a 'País Ejemplo'</p>

          {product.cantidadDisponible ? (
            <>
              <p>"Disponible"</p>
              <p>
                Cantidad:{" "}
                <SelectProduct
                  quantity={product.cantidadDisponible}
                  refInput={quantityProd}
                />
              </p>
              <button
                onClick={() => {
                  handleAddToCart(addProduct);
                }}
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => {
                  handleAddToCart(addProduct,true);
                }}
              >
                Comprar ahora
              </button>
            </>
          ) : (
            <>
              <p>"Agotado"</p>
              <button
                onClick={() => {
                  handleAddToCart(addProduct,true);
                }}
              >
                Agregar a lista de deseos
              </button>
            </>
          )}
          <p>Enviado desde {product.origenEnvio}</p>
        </article>
        {message && (
          <Message
            time={message.time}
            title={message.title}
            content={message.content}
            type={message.type}
          />
        )}
      </section>
    </>
  );
};

export default Product;
