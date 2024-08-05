import React, { useEffect, useRef } from "react";
import ItemSubmenu from "./ItemSubmenu";

type SubMenuAtt = {
  MenuIsOpen: boolean;
  SetMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function enableSubMenu(SubMenuContainer: React.RefObject<HTMLDivElement>) {
  const menuContainer = SubMenuContainer.current;
  if (menuContainer) {
    menuContainer.classList.toggle("active");
    if (!menuContainer.classList.contains("size")) {
      menuContainer.classList.add("size");
      menuContainer.style.height = document.documentElement.scrollHeight + "px";
    }
  }
}

const SubMenu = ({ MenuIsOpen, SetMenuIsOpen }: SubMenuAtt) => {
  
  const SubMenuContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(MenuIsOpen){  
      enableSubMenu(SubMenuContainer);
      SetMenuIsOpen(!MenuIsOpen);
    }
  }, [MenuIsOpen]);

  return (
    <div className="submenu" ref={SubMenuContainer}>
      <article className="main-menu-more" id="main-menu-more">
        <button
          id="close-menu-more"
          aria-label="Toggle navigation"
          onClick={()=>SetMenuIsOpen(!MenuIsOpen)}
        >
          X
        </button>
        <span className="usser-icon"></span>

        <ItemSubmenu title="Contenido y dispositivos digitales">
          <p>Amazon Music</p>
          <p>E-readers Kindle y Libros</p>
          <p>Amazon Appstore</p>
        </ItemSubmenu>
        <ItemSubmenu title="Buscar por departamento">
          <p>Electrónicos</p>
          <p>Computadoras</p>
          <p>Smart Home</p>
          <p>Arte y artesanías</p>
          <p>Ver todo</p>
        </ItemSubmenu>
        <ItemSubmenu title="Programas y funcionalidades">
          <p>Tarjetas de regalo</p>
          <p>Comprar por interés</p>
          <p>Amazon live</p>
          <p>Tienda internacional</p>
          <p>Ver todo</p>
        </ItemSubmenu>
        <ItemSubmenu title="Ayuda y configuracion">
          <p>Tu cuenta</p>
          <p>Español</p>
          <p>Estados Unidos</p>
          <p>Identificate</p>
        </ItemSubmenu>
      </article>
    </div>
  );

};

export default SubMenu;
