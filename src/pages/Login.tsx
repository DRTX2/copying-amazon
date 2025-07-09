import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../features/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      navigate('/');
    } catch (error) {
      // El error ya se maneja en el mutation
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-sm p-6 shadow-sm">
        <h1 className="text-lg font-medium mb-4">Inicia sesión o crea una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Introduce el número de teléfono móvil o el correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          {loginMutation.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-sm text-sm">
              {loginMutation.error.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full !bg-yellow-400 hover:!bg-yellow-500 disabled:!bg-yellow-300 text-sm font-medium py-2 rounded-sm mt-2 transition-colors"
          >
            {loginMutation.isPending ? 'Iniciando sesión...' : 'Continuar'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          Al continuar, aceptas las{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Condiciones de uso
          </a>{" "}
          y el{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Aviso de privacidad
          </a>{" "}
          de Amazon.
        </p>

        <div className="mt-6 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            ¿Necesitas ayuda?
          </a>
        </div>

        <hr className="my-6" />

        <div className="text-sm text-gray-700">
          <strong>¿Comprando para el trabajo?</strong>
          <br />
          <a href="#" className="text-blue-600 hover:underline">
            Crear una cuenta de empresa gratis
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Demo: Usa cualquier email y contraseña para iniciar sesión</p>
        </div>
      </div>
    </div>
  );
};
