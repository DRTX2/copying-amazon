import React from "react";

type PriceData = {
  price: number;
  discount: number;
};

export const ProductCost: React.FC<PriceData> = ({
  price,
  discount,
}: PriceData) => {
  if (discount) {
    return (
      <p className="product-cost">
        <span>-{discount * 100}% . Ahora a:</span> ${price * (1 - discount)}
      </p>
    );
  }
  return <p className="product-cost"> ${price}</p>;
};
