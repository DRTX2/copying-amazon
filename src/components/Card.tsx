import React, { useState } from "react";
import data from "./../pages/products.json";

type CardData = {
  title: string;
  img: string;
  altImg: string;
  id?: string | number;
};
export default CardData;

type CardProps = CardData & {
  handleClick: (card: CardData) => void;
};

// esto le dice que espera recibir un objeto de tipo cardData como prop, mientras que el segundo parametro es una funcion que retorna un void
export const Card: React.FC<CardProps> = ({
  title,
  img,
  altImg,
  id,
  handleClick,
}: CardProps) => {
  // en ts los tipos siempre se declaran antes de asignarlos
  //  sobre el doble tipado en input/output. Aunque pueda parecer redundante, repetir cardData en ambas partes es una práctica recomendada en TypeScript para garantizar la seguridad, la legibilidad y la mantenibilidad de tu código.
  const searchProductId = (): void => {
    const api: CardData[] = data;
    const product = api.find((prod) => prod.id === id);

    if (product) {
      handleClick({ title, img, altImg, id });
      console.log("el producto ya cambio");
    }
  };

  return (
    <figure
      className="card"
      onClick={() => {
        searchProductId();
        console.log("ya taaaa" + id);
      }}
    >
      <img src={img} alt={altImg} />
      <figcaption>{title}</figcaption>
    </figure>
  );
};
