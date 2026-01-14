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
    const discountPercentage = Math.round(discount * 100);
    const finalPrice = price * (1 - discount);
    const originalPrice = price;
    
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
            -{discountPercentage}%
          </span>
          <span className="text-sm text-gray-600">Descuento</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-red-600">${finalPrice.toFixed(2)}</span>
          <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-2xl font-bold text-gray-900">
      ${price.toFixed(2)}
    </div>
  );
};
