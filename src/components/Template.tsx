import { useState } from "react";
import { Card } from "./Card";
import ItemBarMenu from "./ItemBarMenu";
import Recomendations from "./SectionRecomendation";
import ColumnsFooterOtherProducts from "./ColumnsFooterOtherProducts";
import LanguageCurrencies from "./SectionLanguageCurrencies";
import MoreServices from "./MoreServices";
import SubMenu from "./SubMenu";
import "./Template.css";

//  this simulate the response of an api
const cardData = [
  {
    title: "Chaqueta",
    img: "src/assets/img/chaqueta.jpg",
    altImg: "Producto en oferta",
  },
  {
    title: "Chaqueta de cuero",
    img: "src/assets/img/chaqueta-cuero.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Equipo de entrenamiento",
    img: "src/assets/img/equipo.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Laptop ASUS",
    img: "src/assets/img/laptop.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Laptop HP",
    img: "src/assets/img/laptop2.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Libros interesantes",
    img: "src/assets/img/new-books.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Libros en oferta",
    img: "src/assets/img/offert-book.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Pantalon dama",
    img: "src/assets/img/pantalon.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Tablet",
    img: "src/assets/img/talbet.jpg",
    altImg: "Producto en oferta",
  },
  {
    title: "Libro: Liberando la bestia",
    img: "src/assets/img/training-book.jpeg",
    altImg: "Producto en oferta",
  },
  {
    title: "Xbox 360",
    img: "src/assets/img/xbox.jpeg",
    altImg: "Producto en oferta",
  },
];

function Template() {
  return (
    <>
      <header>
        <nav className="main-menu" id="main-menu">
          <button
            className="icon-toggle-main-menu more"
            aria-label="Toggle navigation"
            id="btn-menu-more"
          >
            &#9776;
          </button>
          <SubMenu/>
          <ul className="items-main-menu">
            <ItemBarMenu title='Ofertas del dia'/>
            <ItemBarMenu title='Servicio al cliente'/>
            <ItemBarMenu title='Listas'/>
            <ItemBarMenu title='Tarjetas de regalo'/>
            <ItemBarMenu title='Vender'/>
          </ul>
          <button
            className="icon-toggle-main-menu"
            aria-label="Toggle navigation"
            id="btn-toggle-menu"
          >
            &#9776;
          </button>
        </nav>
      </header>
      <div className="cards">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            img={card.img}
            altImg={card.altImg}
          />
        ))}
      </div>
      <Recomendations/>
      <footer>
        <div className="come-back-home">
          <a href="#main-menu">Inicio de página</a>
        </div>
        <div className="columns-footer-container">
          <ColumnsFooterOtherProducts/>
          <LanguageCurrencies/>
        </div>
        <div className="configuring">
        <MoreServices/>
          <div className="announcements">
            <ul className="announcements-list">
            <ItemBarMenu title="Condiciones de uso" myClass=""/>
            <ItemBarMenu title="Aviso de privacidad" myClass=""/>
            <ItemBarMenu title="Aviso de Privacidad de Datos de Salud del Consumidor" myClass=""/>
            <ItemBarMenu title="Tus opciones de privacidad de los anuncios" myClass=""/>
            </ul>
            <li>
              <span>© 1996-2024 Amazon.com, Inc. o sus afiliados</span>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Template;
