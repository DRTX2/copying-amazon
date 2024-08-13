import React from "react";
import ItemBarMenu from "./ItemBarMenu";

type ClickableItemBarMenuProps = {
  title: string;
  link?: string;
  myClass?: string;
  children?: React.ReactNode;
  onClick?: () => void; // Nueva prop para manejar el evento de clic
};

const ClickableItemBarMenu = ({
  title,
  link = "#",
  myClass = "item-menu",
  children = null,
  onClick = () => {}, // Función predeterminada que no hace nada
}: ClickableItemBarMenuProps) => {
  // Usamos el componente original y le añadimos un manejador de clics
  return (
    <div onClick={onClick}>
      <ItemBarMenu title={title} link={link} myClass={myClass}>
        {children}
      </ItemBarMenu>
    </div>
  );
};

export default ClickableItemBarMenu;