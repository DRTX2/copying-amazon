import { useEffect, useRef, useState } from "react";
import ItemBarMenu from "./Menu/ItemBarMenu";
import Recomendations from "./SectionRecomendation";
import SubMenu from "./Menu/SubMenu";
import SuperiorMenu from "./Menu/Superior-menu";
import SearchField from "./SearchField";
import Footer from "./Footer";
import { CartItems } from "./Cart/CartItems";
import { useCart } from "../context/CartContext";

type templateProps = {
  children: React.ReactNode;
};

const Template: React.FC<templateProps> = ({ children }: templateProps) => {
  const [MenuIsOpen, SetMenuIsOpen] = useState<boolean>(false);
  const [isSearchOpen, SetSearchOpen] = useState<boolean>(false);
  const navLinks = useRef<HTMLUListElement | null>(null);
  const btnSearchField=useRef<HTMLInputElement|null>(null);
  const {showCart}=useCart();

  useEffect(() => {
    if (isSearchOpen && btnSearchField.current)   btnSearchField.current.focus(); 
  }, [isSearchOpen]);

  return (
      <div className={`page-container ${showCart? "show-cart-side":""}`}>
        <div className="page-wrapper">
          <header>
            <SuperiorMenu SetMenuIsOpen={SetSearchOpen}/>
            <nav className="main-menu" id="main-menu">
              <button
                className="icon-toggle-main-menu more"
                aria-label="Toggle navigation"
                id="btn-menu-more"
                onClick={() => {
                  SetMenuIsOpen(!MenuIsOpen);
                }}
              >
                &#9776;
              </button>
              <SubMenu MenuIsOpen={MenuIsOpen} SetMenuIsOpen={SetMenuIsOpen} />
              <ul className="items-main-menu" ref={navLinks}>
                <ItemBarMenu title="Ofertas del dia" />
                <ItemBarMenu title="Servicio al cliente" />
                <ItemBarMenu title="Listas" />
                <ItemBarMenu title="Tarjetas de regalo" />
                <ItemBarMenu title="Vender" />
              </ul>
              <button
                className="icon-toggle-main-menu"
                aria-label="Toggle navigation"
                id="btn-toggle-menu"
                onClick={() => {
                  navLinks.current?.classList.toggle("active");
                }}
              >
                &#9776;
              </button>
            </nav>
            {isSearchOpen && <SearchField ref={btnSearchField}/>}
          </header>
          {children}
          <Recomendations />
          <Footer/>
        </div>
        { showCart && <CartItems/>}
      </div>
  );
};

export default Template;
