import { useAuth } from "../stores/auth.store";
import { useRouter } from "next/navigation";

const Recomendations: React.FC = () => {
  const { user, logoutUser, getDisplayName } = useAuth();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleLogoutClick = () => {
    logoutUser();
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center text-center my-12 p-4 border-t border-gray-300">
        <p className="mb-4 text-gray-700 font-medium">Ver recomendaciones personalizadas</p>
        <div className="mb-4">
          <button
            onClick={handleLoginClick}
            className="inline-block w-40 text-center bg-white text-teal-600 border-2 border-teal-600 rounded px-4 py-2 hover:bg-teal-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Identifícate
          </button>
        </div>
        <p className="text-sm text-gray-600">
          ¿Eres un cliente nuevo?{" "}
          <button
            onClick={handleLoginClick}
            className="text-teal-600 hover:underline focus:outline-none focus:underline"
          >
            Empieza aquí.
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Hola, {getDisplayName()}
        </h2>
        <button
          onClick={handleLogoutClick}
          className="text-sm text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:text-red-600"
        >
          Cerrar sesión
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Productos recomendados</h3>
          <p className="text-sm text-gray-600">Basado en tu historial de compras</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Ofertas para ti</h3>
          <p className="text-sm text-gray-600">Descuentos especiales seleccionados</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Continuar comprando</h3>
          <p className="text-sm text-gray-600">Productos que viste recientemente</p>
        </div>
      </div>
    </div>
  );
};

export default Recomendations;
