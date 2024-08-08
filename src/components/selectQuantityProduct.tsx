import React from "react";
import "./selectQuantity.css";
// Definir la interfaz de las props
type SelectProductProps = {
  quantity: number; // quantity es opcional y tiene un valor por defecto
};

// Definir el componente funcional con React.FC
const SelectProduct: React.FC<SelectProductProps> = ({
  quantity,
}: SelectProductProps) => {
  if (quantity < 1) return;
  const items = [];
  for (let i: number = 1; i <= quantity; i++) {
    items.push(<option key={i}>{i}</option>);
  }

  return (
    <>
      <select className="select-quantity">{items}</select>;
    </>
  );
};

export default SelectProduct;
