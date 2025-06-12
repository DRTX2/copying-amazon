import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPg'
import ShoppingCart from '../pages/ShoppingCart'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
    </Routes>
  )
}

export default AppRoutes