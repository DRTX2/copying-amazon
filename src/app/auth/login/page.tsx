"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/features/auth";
import { useGuestGuard } from "@/features/auth/hooks/useAuthGuards";

const loginSchema = z.object({
  email: z.string().email("Por favor ingresa un email válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { isGuest } = useGuestGuard();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-sm p-6 shadow-sm">
        <h1 className="text-lg font-medium mb-4">Inicia sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Número de teléfono móvil o el correo electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="ejemplo@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="Introduce tu contraseña"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
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
            {loginMutation.isPending ? "Iniciando sesión..." : "Continuar"}
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

        <hr className="my-6" />

        <div className="text-sm text-center text-gray-700">
          <p>
            <strong>¿No tienes una cuenta?</strong>
          </p>

          <Link
            href="/auth/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Crea una ahora
          </Link>

          <p className="mt-2">
            ¿Comprando para el trabajo?{" "}
            <Link
              href="/auth/register?type=business"
              className="text-blue-600 hover:underline"
            >
              Crear una cuenta de empresa gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
