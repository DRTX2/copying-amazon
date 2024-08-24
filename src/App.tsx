import Home from "./pages/Home";
import AppProvider from "./components/AppProvider";
import "./App.css";

function App() {
  return (
    <AppProvider needProducts={true}>
      <Home/>
    </AppProvider>
  );
}

export default App;
