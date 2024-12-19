import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppProvider from "./components/AppProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider needProducts={true}>
        <Home/>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
