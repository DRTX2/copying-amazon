import { useAuth } from "../context/AuthContext";

const Recomendations: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center text-center my-12 p-1 border-t border-gray-400">
        <p className="mb-4">Ver recomendaciones personalizadas</p>
        <div className="mb-4">
          <a 
            href="#" 
            className="inline-block w-40 text-center bg-white text-teal-600 border-2 border-teal-600 rounded px-4 py-2 hover:bg-teal-50 transition-colors font-medium"
          >
            Identifícate
          </a>
        </div>
        <p className="text-sm">
          ¿Eres un cliente nuevo?{" "}
          <a href="#" className="text-teal-600 hover:underline">
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
