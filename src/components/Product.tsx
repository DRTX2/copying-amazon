import React from 'react';
import CardData from './Card'; 
import "./watch-product.css"


const Product = ({id,img,altImg,title}:CardData) => {
  
  return (
    <section className='current-product'>
      <figure id={id as string}>
        <img src={img} alt={altImg} />
        <figcaption>{title}</figcaption>
      </figure>
    </section>
  )
}

export default Product