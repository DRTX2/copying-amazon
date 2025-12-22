"use client";

import { useEffect, useRef, useState } from "react";
import SuperiorMenu from "../components/Menu/Superior-menu";
import SubMenu from "../components/Menu/SubMenu";
import ItemBarMenu from "../components/Menu/ItemBarMenu";
import SearchField from "../components/SearchField";
import Recomendations from "../components/SectionRecomendation";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

type content = {
  children: React.ReactNode;
};

const Template: React.FC<content> = ({ children }: content) => {
  const [MenuIsOpen, SetMenuIsOpen] = useState<boolean>(false);
  const [isSearchOpen, SetSearchOpen] = useState<boolean>(false);
  const navLinks = useRef<HTMLUListElement | null>(null);
  const btnSearchField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen && btnSearchField.current) btnSearchField.current.focus();
  }, [isSearchOpen]);

  return (
    <>
      <header>
        <SuperiorMenu SetMenuIsOpen={SetSearchOpen} />
        <nav className="flex justify-between items-center px-2 sm:px-4 py-2 text-white" style={{ backgroundColor: 'rgb(19, 26, 34)' }}>
          {/* Botón de menú hamburguesa principal */}
          <button
            className="bg-transparent border-none text-lg sm:text-xl cursor-pointer transition-colors px-2 sm:px-3 py-2 hover:bg-white/10 rounded"
            style={{ color: 'rgb(255, 224, 147)' }}
            aria-label="Toggle side menu"
            id="btn-menu-more-desktop"
            onClick={() => {
              SetMenuIsOpen(!MenuIsOpen);
            }}
          >
            &#9776; <span className="hidden sm:inline"></span>
          </button>
          
          <SubMenu MenuIsOpen={MenuIsOpen} SetMenuIsOpen={SetMenuIsOpen} />
          
          {/* Menú horizontal para desktop */}
          <div className="hidden md:flex flex-grow justify-end">
            <ul className="flex items-center space-x-2 lg:space-x-4 list-none m-0 p-0" ref={navLinks} style={{ listStyle: 'none' }}>
              <ItemBarMenu title="Ofertas del dia" />
              <ItemBarMenu title="Servicio al cliente" />
              <ItemBarMenu title="Listas" />
              <ItemBarMenu title="Tarjetas de regalo" />
              <ItemBarMenu title="Vender" />
            </ul>
          </div>
          
          {/* Espacio flexible para centrar en móviles */}
          <div className="flex-grow md:hidden"></div>
        </nav>
        
        {isSearchOpen && <SearchField ref={btnSearchField} />}
      </header>
      <PageTransition>
        {children}
      </PageTransition>
      <Recomendations />
      <Footer />
    </>
  );
};

export default Template;
