import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
// import from "./pages/Product";
import "./App.css";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
