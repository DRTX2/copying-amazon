import React, { useEffect, useState } from "react";
import Template from "../components/Template";
import CardData, { Card } from "../components/Card";
import Product from "../components/Product";
import data from "./products.json";
//  this simulate the response of an api

const selectedProd = {
  title: "",
  img: "",
  altImg: "",
  id: 0,
};


export default function Home() {
  const myCarData: CardData[] = data;
  const [product, setproduct] = useState<CardData>(selectedProd);

  return (
    <Template>
      {product.id ? (
        <Product id={product.id}  img={product.img} altImg={product.altImg} title={product.title}/>
      ) : (
        <div className="cards">
          {myCarData!.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              img={card.img}
              altImg={card.altImg}
              id={card.id}
              handleClick={setproduct}
            />
          ))}
        </div>
      )}
    </Template>
  );
}
