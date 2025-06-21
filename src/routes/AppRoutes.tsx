import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPg";
import ShoppingCart from "../pages/ShoppingCart";
import { Login } from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/auth/login" element={<Login/>}/>
    </Routes>
  );
};

export default AppRoutes;
