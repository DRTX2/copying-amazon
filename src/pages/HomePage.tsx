import Template from '../layouts/Template'
import { RenderProductsInBox } from '../components/common'

const HomePage = () => {

  return (
    <Template>
        <div className="flex justify-end p-2 pr-4">
            <button className="ml-4 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                <a href="/cart" className="text-white no-underline">Ver Carrito</a>
            </button>
          </div>
        {RenderProductsInBox({ existsCartProducts:false })}

{/* 
        <Hero />
      <CategoryGrid />
      <ProductSection title="Más vendidos" filter="top-sellers" />
      <ProductSection title="Ofertas de la semana" filter="discounted" /> */}
    </Template>
  )
}

export default HomePage