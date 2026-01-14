import ColumnsFooterOtherProducts from "@/features/products/components/ColumnsFooterOtherProducts";
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
          <div className="pb-8">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 w-full max-w-6xl mx-auto py-6 px-4">
              <div className="text-xs sm:text-sm">
                <ItemBarMenu title="Condiciones de uso" myClass="" />
              </div>
              <div className="text-xs sm:text-sm">
                <ItemBarMenu title="Aviso de privacidad" myClass="" />
              </div>
              <div className="text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap">
                <ItemBarMenu
                  title="Aviso de Privacidad de Datos de Salud del Consumidor"
                  myClass=""
                />
              </div>
              <div className="text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap">
                <ItemBarMenu
                  title="Tus opciones de privacidad de los anuncios"
                  myClass=""
                />
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 pb-8 px-4">
              <span>© 1996-2024 Amazon.com, Inc. o sus afiliados</span>
            </div>
          </div>
        </div>
      </footer>
    );
}