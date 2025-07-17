import { HashRouter as Router } from "react-router-dom";
import AppProviders from "./app/providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppProviders>
      <Router basename={import.meta.env.PROD ? "/copying-amazon" : "/"}>
        <AppRoutes />
      </Router>
    </AppProviders>
  );
}

export default App;
