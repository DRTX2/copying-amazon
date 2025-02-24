import ColumnsFooterOtherProducts from "./ColumnsFooterOtherProducts";
import LanguageCurrencies from "./SectionLanguageCurrencies";
import MoreServices from "./MoreServices";
import ItemBarMenu from "./Menu/ItemBarMenu";

export default function Footer(){
    return <footer>
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
}