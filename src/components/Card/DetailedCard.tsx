import { ProductData } from "../../types/products";

export const DetailedCard = (product: ProductData) => {
  return (
    <section>
      <article className="detailed-card">
        <img src={product.img} alt={product.altImg} />
      </article>
      <article>
        <h3>{product.title}</h3>
        <p>{product.precio}</p>
        <button>Agregar al carrito</button>
      </article>
    </section>
  );
};
