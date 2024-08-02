import React, { useState } from 'react';

type cardData={
  title:string,
  img:string,
  altImg:string
  // children: React.ReactNode
}
// esto le dice que espera recibir un objeto de tipo cardData como prop
export const Card:React.FC<cardData>= ({title,img,altImg}:cardData) => {
// en ts los tipos siempre se declaran antes de asignarlos
//  sobre el doble tipado en input/output. Aunque pueda parecer redundante, repetir cardData en ambas partes es una práctica recomendada en TypeScript para garantizar la seguridad, la legibilidad y la mantenibilidad de tu código.
  return (
    <figure className="card">
        <img src={img} alt={altImg} />
        <figcaption>{title}</figcaption>
    </figure>
  )
}
