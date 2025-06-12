import React, { useReducer } from 'react'
import Template from '../layouts/Template'
import { RenderProductsInBox } from '../components/common'
import { Action, initialState, State } from '../types/reducer';
import { reducer } from '../hooks/pageHandler';

const HomePage = () => {
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
        reducer,
        initialState
      );

  return (
    <Template>
        <div className="btnSection-container">
            <button className="btnSection">
                <a href="/cart">Ver Carrito</a>
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