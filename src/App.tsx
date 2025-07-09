import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./app/providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppProviders>
      <Router basename="/copying-amazon">
        <AppRoutes />
      </Router>
    </AppProviders>
  );
}

export default App;
