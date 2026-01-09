'use client';
import { useState, useEffect } from "react";
import ItemBarMenu from "./ItemBarMenu";
import { useCart } from "../../features/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pathRoute } from "../../utils/navigation";
import UserDropdown from "../UserDropdown";

type MenuData = {
  SetMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuperiorMenu = ({ SetMenuIsOpen }: MenuData) => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = getItemCount();

  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2" style={
      { 
        backgroundColor: 'rgb(19, 26, 34)', 
        color: 'white' 
      }
      }>
      <div className="w-16 sm:w-20 md:w-24 flex-shrink-0">
        <button onClick={() => router.push("/")}>
          <Image
            src={`/assets/img/png-transparent-amazon-dark-hd-logo.png`}
            alt="amazon logo"
            width={100}
            height={30}
            className="w-full h-auto"
            priority
          />
        </button>
      </div>
      
      {/* Elementos principales - siempre visibles */}
      <div className="flex items-center space-x-2 sm:space-x-4" style={{ listStyle: 'none' }}>
        {/* Búsqueda - siempre visible */}
        <div className="ml-2 lg:ml-4 p-1 hover:bg-white/10 rounded transition-colors">
          <button
            className="bg-transparent border-none cursor-pointer px-1 sm:px-2 py-1 text-sm md:text-base"
            style={{ color: 'rgb(255, 224, 147)' }}
            aria-label="Search"
            onClick={() => {
              SetMenuIsOpen((prev) => !prev);
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        {/* Elementos del menú - ocultos en móviles pequeños */}
        <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
          <ItemBarMenu title="Enviar a Ecuador" />
        </div>
        
        {/* User Dropdown - reemplaza el item de Cuenta y Listas */}
        <div className="hidden sm:block">
          <UserDropdown />
        </div>
        
        {/* Carrito - siempre visible */}
        <div className="ml-2 lg:ml-4 p-1 hover:bg-white/10 rounded transition-colors">
          <button
            className="bg-transparent border-none cursor-pointer px-1 sm:px-2 py-1 text-sm md:text-base relative"
            style={{ color: 'rgb(255, 224, 147)' }}
            aria-label="Shopping cart"
            onClick={() => {
              router.push("/shopping-cart");
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-w-4">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Menú móvil para elementos ocultos */}
        <div className="block sm:hidden">
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default SuperiorMenu;