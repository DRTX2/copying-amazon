import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
      {/* <Route path="/product:id" element={} /> */}
      {/* <Route path="/list-product:id" element={}/> */}
      {/* <Route path="/shopping-car" element={<Navigate to="/acerca" />} /> */}
      {/* <Route path="/about-us" element={<Contacto />} /> */}
      {/* <Route path="/language" element={<Contacto />} /> */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
