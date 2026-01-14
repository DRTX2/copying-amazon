'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@/features/auth";
import { useGuestGuard } from "@/features/auth/hooks/useAuthGuards";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  confirmPassword: z.string(),
  role: z.enum(["USER", "SELLER"]).default("USER"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
}).refine((data) => !data.password.toLowerCase().includes(data.email.toLowerCase()), {
  message: "La contraseña no puede contener el correo electrónico",
  path: ["password"],
});

type RegisterFormData = z.input<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { isGuest } = useGuestGuard();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (!isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-sm p-6 shadow-sm">
        <h1 className="text-lg font-medium mb-4">
          Crear nueva cuenta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              type="text"
              {...register("name")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="Nombre y apellido"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
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
              type="email"
              {...register("email")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="ejemplo@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
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
              type="tel"
              {...register("phone")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
            )}
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
              type="text"
              {...register("address")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="Calle, número, ciudad, código postal"
            />
            {errors.address && (
              <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de cuenta
            </label>
            <select
              id="role"
              {...register("role")}
              className="mt-1 block w-full border border-gray-400 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="USER">Comprador</option>
              <option value="SELLER">Vendedor</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Selecciona "Vendedor" si deseas vender productos en la plataforma
            </p>
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
              type="password"
              {...register("password")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="Al menos 8 caracteres, 1 mayúscula y 1 número"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 8 caracteres, debe incluir una mayúscula y un número
            </p>
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
              type="password"
              {...register("confirmPassword")}
              className={`mt-1 block w-full border rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-400 focus:ring-red-500" : "border-gray-400 focus:ring-yellow-500"
              }`}
              placeholder="Confirma tu contraseña"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
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
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
