import React, { useState } from "react";

type CardData = {
  title: string;
  img: string;
  altImg: string;
  id?: string | number;
};
export default CardData;

type CardProps = CardData & {
  handleClick: (id: number) => void;
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

  return (
    <figure
      className="card"
      onClick={() => {
        handleClick(id as number);
      }}
    >
      <img src={img} alt={altImg} />
      <figcaption>{title}</figcaption>
    </figure>
  );
};
