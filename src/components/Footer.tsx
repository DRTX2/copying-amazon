import ColumnsFooterOtherProducts from "./ColumnsFooterOtherProducts";
import LanguageCurrencies from "./SectionLanguageCurrencies";
import MoreServices from "./MoreServices";
import ItemBarMenu from "./Menu/ItemBarMenu";

export default function Footer(){
    return (
      <footer className="w-full">
        {/* Back to top section */}
        <div className="text-center py-4 text-sm font-medium text-white hover:opacity-80 transition-opacity cursor-pointer" 
             style={{ backgroundColor: '#37475a' }}>
          <a href="#main-menu" className="text-white no-underline">
            Inicio de página
          </a>
        </div>
        
        {/* Main footer content */}
        <div className="text-white" style={{ backgroundColor: '#232f3e' }}>
          <ColumnsFooterOtherProducts />
          <LanguageCurrencies />
        </div>
        
        {/* Footer services and announcements */}
        <div className="text-white" style={{ backgroundColor: '#131a22' }}>
          <MoreServices />
          <div className="pb-20 md:pb-8">
            <div className="flex justify-center items-center gap-2 w-full max-w-full mx-auto py-8 overflow-x-auto" style={{ fontSize: '8px', whiteSpace: 'nowrap' }}>
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
            </div>
            <div className="text-center text-xs text-gray-400 pb-8">
              <span>© 1996-2024 Amazon.com, Inc. o sus afiliados</span>
            </div>
          </div>
        </div>
      </footer>
    );
}