import React, { RefObject } from "react";
import "./selectQuantity.css";

type SelectProductProps = {
  refInput:React.RefObject<HTMLSelectElement> 
  quantity: number;
};

// Definir el componente funcional con React.FC
const SelectProduct: React.FC<SelectProductProps> = ({
  quantity, refInput
}: SelectProductProps) => {
  if (quantity < 1) return;
  const items = [];
  for (let i: number = 1; i <= quantity; i++) {
    items.push(<option key={i}>{i}</option>);
  }

  return (
    <>
      <select className="select-quantity" ref={refInput}>{items}</select>
    </>
  );
};

export default SelectProduct;
