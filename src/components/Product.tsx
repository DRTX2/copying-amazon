import {ProductData} from "../types/products";
import "./watch-product.css";
import "../pages/products.json";
import {concatString, LinksCategorysProduct} from "./LinksCategorysProduct";
import {ProductCost} from "./Product-cost"
import SelectProduct from "./selectQuantityProduct";

const Product = ({ ...product }: ProductData) => {
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
        <ProductCost price={product.precio} discount={product.descuento}/>
        <ul>
          {product.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
        <h3>Caracteristicas</h3>
        <p><b>Marca:</b> {product.marca}</p>
        <p><b>Color:</b> {product.color}</p>
        <p><b>Estilo:</b> {product.estilo}</p>
        <p><b>Usos:</b> {concatString(product.usos)}</p>
      </article>
      <article className="more-about-product">
        <p>Nuevo:</p>
        <p>${product.precio}</p>
        <p>Enviar a 'Pais Ejemplo'</p>
        <p>
        {
          product.cantidadDisponible?"Disponible": "Agotado"
        }
        </p>
        <p>Cantidad: <SelectProduct quantity={product.cantidadDisponible}/></p>
        <button>Agregar al carrito</button>
        <button>Comprar ahora</button>
        <p>Enviado desde {product.origenEnvio}</p>
      </article>
    </section>
    </>
  );
};

export default Product;