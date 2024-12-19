import Home from "./pages/Home";
import AppProvider from "./components/AppProvider";
import "./App.css";
import { Routes, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <AppProvider needProducts={true}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/cart" element={<Home />} />
        <Route path="/receipt" element={<Home />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
