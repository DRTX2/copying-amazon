import { useAuth } from "../context/AuthContext";

const Recomendations: React.FC = () => {
  const { user,logout } = useAuth();

  if (!user) {
    return (
      <div className="recomendations">
        <p>Ver recomendaciones personalizadas</p>
        <div>
          <a href="#" id="identificate" className="button">
            Identifícate
          </a>
        </div>
        <p>
          ¿Eres un cliente nuevo?{" "}
          <a href="#" className="link">
            Empieza aquí.
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Recomendations;
