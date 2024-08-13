import { useState } from "react";
import Template from "../components/Template";
import {CardData, ProductData} from "../types/products";
import { Card } from "../components/Card";
import Product from "../components/Product";
import data from "./products.json";
//  this simulate the response of an api

const selectedProd = {
  title: "",
  img: "",
  altImg: "",
  id: 0,
  category: [],
  description: [],
  marca: "",
  color: "",
  estilo: "",
  usos: [],
  precio: 0,
  descuento: 0,
  cantidadDisponible: 0,
  origenEnvio: "",
};

export default function Home() {
  const myCarData: CardData[] = data;
  const [product, setproduct] = useState<ProductData>(selectedProd);

  const searchProductId = (id: number): void => {
    const api: ProductData[] = data;
    const product = api.find((prod) => prod.id === id);
    
    if (product) {
      setproduct(product);
    }
  };

  return (
    <Template>
      {product.id ? (
        <Product
          id={product.id}
          img={product.img}
          altImg={product.altImg}
          title={product.title}
          category={product.category}
          description={product.description}
          marca={product.marca}
          color={product.color}
          estilo={product.estilo}
          usos={product.usos}
          precio={product.precio}
          descuento={product.descuento}
          cantidadDisponible={product.cantidadDisponible}
          origenEnvio={product.origenEnvio}
        />
      ) : (
        <div className="cards">
          {myCarData!.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              img={card.img}
              altImg={card.altImg}
              id={card.id}
              handleClick={searchProductId}
            />
          ))}
        </div>
      )}
    </Template>
  );
}
