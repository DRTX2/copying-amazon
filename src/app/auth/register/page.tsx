'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/features/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: ""
  });
  
  const router = useRouter();
  const registerMutation = useRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-sm p-6 shadow-sm">
        <h1 className="text-lg font-medium mb-4">
          Crear nueva cuenta
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tu nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nombre y apellido"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Número de teléfono móvil
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="+1 234 567 8900"
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Calle, número, ciudad, código postal"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Al menos 6 caracteres"
              minLength={6}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Vuelve a escribir la contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirma tu contraseña"
              minLength={6}
              required
            />
          </div>

          {registerMutation.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-sm text-sm">
              {registerMutation.error.message}
            </div>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full !bg-yellow-400 hover:!bg-yellow-500 disabled:!bg-yellow-300 text-sm font-medium py-2 rounded-sm mt-2 transition-colors"
          >
            {registerMutation.isPending ? "Creando cuenta..." : "Crear tu cuenta de Amazon"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          Al crear una cuenta, aceptas las{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Condiciones de uso
          </a>{" "}
          y el{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Aviso de privacidad
          </a>{" "}
          de Amazon.
        </p>

        <hr className="my-6" />

        <div className="text-sm text-center">
          <span className="text-gray-700">¿Ya tienes una cuenta? </span>
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Demo: Todos los campos son requeridos para el registro</p>
        </div>
      </div>
    </div>
  );
}
