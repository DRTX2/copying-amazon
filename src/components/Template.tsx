import { useEffect, useRef, useState } from "react";
import ItemBarMenu from "./ItemBarMenu";
import Recomendations from "./SectionRecomendation";
import ColumnsFooterOtherProducts from "./ColumnsFooterOtherProducts";
import LanguageCurrencies from "./SectionLanguageCurrencies";
import MoreServices from "./MoreServices";
import SubMenu from "./SubMenu";
import SuperiorMenu from "./Superior-menu";
import SearchField from "./SearchField";

type content = {
  children: React.ReactNode;
};

const Template: React.FC<content> = ({ children }: content) => {
  const [MenuIsOpen, SetMenuIsOpen] = useState<boolean>(false);
  const [isSearchOpen, SetSearchOpen] = useState<boolean>(false);
  const navLinks = useRef<HTMLUListElement | null>(null);
  const btnSearchField=useRef<HTMLInputElement|null>(null);

  useEffect(() => {
    if (isSearchOpen && btnSearchField.current)   btnSearchField.current.focus(); 
  }, [isSearchOpen]);

  return (
      <>
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
          <footer>
            <div className="come-back-home">
              <a href="#main-menu">Inicio de página</a>
            </div>
            <div className="columns-footer-container">
              <ColumnsFooterOtherProducts />
              <LanguageCurrencies />
            </div>
            <div className="configuring">
              <MoreServices />
              <div className="announcements">
                <ul className="announcements-list">
                  <ItemBarMenu title="Condiciones de uso" myClass="" />
                  <ItemBarMenu title="Aviso de privacidad" myClass="" />
                  <ItemBarMenu
                    title="Aviso de Privacidad de Datos de Salud del Consumidor"
                    myClass=""
                  />
                  <ItemBarMenu
                    title="Tus opciones de privacidad de los anuncios"
                    myClass=""
                  />
                </ul>
                <li>
                  <span>© 1996-2024 Amazon.com, Inc. o sus afiliados</span>
                </li>
              </div>
            </div>
          </footer>
      </>
  );
};

export default Template;
