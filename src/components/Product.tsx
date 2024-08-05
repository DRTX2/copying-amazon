import React from "react";
import CardData from "./Card";
import "./watch-product.css";
import "../pages/products.json";

export type ProductData = CardData & {
  category: string[];
  description: string[];
  marca: string;
  color: string;
  estilo: string;
  usos: string[];
  precio: number;
  descuento: number;
  cantidadDisponible: number;
  origenEnvio: string;
};

// type cardDataAndFunction=ProductData & {searchProd:({...rest}:ProductData) => void;}

const concatString = (array: string[]): string => {
  const concatCategorys: string = array.join(", ");
  return concatCategorys.substring(0, concatCategorys.length - 2);
};

const Product = ({ ...product }: ProductData) => {
  return (
    <section className="current-product" id={product.id as string}>
      <figure>
        <img src={product.img} alt={product.altImg} />
      </figure>
      <article className="informationProduct">
        <h3 className="title">{product.title}</h3>
        <p>Categoria: {concatString(product.category)}</p>
        <ul>
          {product.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
        <h3>Caracteristicas</h3>
        <p>Marca: {product.marca}</p>
        <p>Color: {product.color}</p>
        <p>Estilo: {product.estilo}</p>
        <p>Usos: {concatString(product.usos)}</p>
        {/* <p>{product.description}</p> */}
      </article>
      <article className="more-about-product">
        <p>Precio: {product.precio}</p>
        <p>Descuento: {product.descuento}</p>
        <p>Cantidad Disponible: {product.cantidadDisponible}</p>
        <p>Enviado desde {product.origenEnvio}</p>
      </article>
    </section>
  );
};

export default Product;