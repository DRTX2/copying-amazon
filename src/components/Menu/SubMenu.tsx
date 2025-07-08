import React, { useEffect, useRef } from "react";
import ItemSubmenu from "./ItemSubmenu";

type SubMenuAtt = {
  MenuIsOpen: boolean;
  SetMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubMenu = ({ MenuIsOpen, SetMenuIsOpen }: SubMenuAtt) => {
  const SubMenuContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const menuContainer = SubMenuContainer.current;
    if (menuContainer) {
      if (MenuIsOpen) {
        menuContainer.classList.remove("hidden");
        menuContainer.classList.add("block");
        // Añadir animación de entrada
        setTimeout(() => {
          menuContainer.classList.add("opacity-100");
        }, 10);
      } else {
        menuContainer.classList.remove("opacity-100");
        // Esperar a que termine la animación antes de ocultar
        setTimeout(() => {
          menuContainer.classList.add("hidden");
          menuContainer.classList.remove("block");
        }, 300);
      }
    }
  }, [MenuIsOpen]);

  const handleClose = () => {
    SetMenuIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm hidden opacity-0 transition-all duration-300 ease-in-out z-50" 
      ref={SubMenuContainer}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-in-out" style={{ backgroundColor: 'rgb(19, 26, 34)' }}>
        {/* Header del menú */}
        <div className="text-white p-4 sm:p-5 flex justify-between items-center shadow-md" style={{ backgroundColor: 'rgb(35, 47, 62)' }}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-sm sm:text-lg"></i>
            </div>
            <div>
              <span className="font-medium text-sm sm:text-base">Hola, Identifícate</span>
              <p className="text-xs text-white/80 mt-0.5 hidden sm:block">Administra tu perfil y preferencias</p>
            </div>
          </div>
          <button
            aria-label="Close menu"
            onClick={handleClose}
            className="text-white hover:bg-white/20 text-lg sm:text-xl font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="h-full overflow-y-auto pb-16 sm:pb-20 px-1 pt-2">
          <ItemSubmenu title="Contenido y dispositivos digitales">
            <p>Amazon Music</p>
            <p>E-readers Kindle y Libros</p>
            <p>Amazon Appstore</p>
            <p>Audible</p>
          </ItemSubmenu>
          
          <ItemSubmenu title="Buscar por departamento">
            <p>Electrónicos</p>
            <p>Computadoras</p>
            <p>Smart Home</p>
            <p>Arte y artesanías</p>
            <p>Bebé</p>
            <p>Deportes y aire libre</p>
            <p>Herramientas y mejoras del hogar</p>
            <p>Salud y cuidado personal</p>
            <p>Ver todo</p>
          </ItemSubmenu>
          
          <ItemSubmenu title="Programas y funcionalidades">
            <p>Tarjetas de regalo</p>
            <p>Comprar por interés</p>
            <p>Amazon live</p>
            <p>Tienda internacional</p>
            <p>Amazon Segunda Mano</p>
            <p>Recargas de celular</p>
            <p>Ver todo</p>
          </ItemSubmenu>
          
          <ItemSubmenu title="Ayuda y configuración">
            <p>Tu cuenta</p>
            <p>Español</p>
            <p>Estados Unidos</p>
            <p>Atención al cliente</p>
            <p>Cerrar sesión</p>
          </ItemSubmenu>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
