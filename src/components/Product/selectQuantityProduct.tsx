import React from "react";

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
    <select 
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-20" 
      ref={refInput}
    >
      {items}
    </select>
  );
};

export default SelectProduct;
