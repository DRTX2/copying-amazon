import { BrowserRouter as Router} from "react-router-dom";
import AppProvider from "./components/AppProvider";
import "./App.css"
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <Router basename="/copying-amazon">
      <AppProvider>
        <AppRoutes/>
      </AppProvider>
    </Router>
  );
}

export default App;
