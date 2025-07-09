import ItemBarMenu from "./ItemBarMenu";
import { useCart } from "../../features/cart";
import { useNavigate } from "react-router-dom";
import { pathRoute } from "../../utils/navigation";

type MenuData = {
  SetMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuperiorMenu = ({ SetMenuIsOpen }: MenuData) => {
  const nav = useNavigate();
  const { getItemCount } = useCart();

  const cartItemCount = getItemCount();

  console.log(pathRoute);

  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2" style={{ backgroundColor: 'rgb(19, 26, 34)', color: 'white' }}>
      <div className="w-16 sm:w-20 md:w-24 flex-shrink-0">
        <a href={import.meta.env.BASE_URL}>
          <img
            src={`${pathRoute}assets/img/png-transparent-amazon-dark-hd-logo.png`}
            alt="amazon logo"
            className="w-full h-auto"
          />
        </a>
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
          
          <ItemBarMenu
            title="Cuenta y Listas"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              event.preventDefault();
              nav("/auth/login");
              return;
            }}
          />
        </div>
        
        {/* Carrito - siempre visible */}
        <div className="ml-2 lg:ml-4 p-1 hover:bg-white/10 rounded transition-colors">
          <button
            className="bg-transparent border-none cursor-pointer px-1 sm:px-2 py-1 text-sm md:text-base relative"
            style={{ color: 'rgb(255, 224, 147)' }}
            aria-label="Shopping cart"
            onClick={() => {
              nav("/shopping-cart");
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-w-4">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Menú móvil para elementos ocultos */}
        <div className="block sm:hidden">
          <ItemBarMenu 
            title="⋮" 
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              event.preventDefault();
              nav("/auth/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SuperiorMenu;
