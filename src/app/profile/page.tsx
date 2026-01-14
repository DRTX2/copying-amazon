'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Store,
  ShoppingBag,
  Edit2,
  Save,
  X,
  Package,
  Settings,
  LogOut,
  ChevronRight,
  Camera,
  Star,
  TrendingUp,
  CreditCard,
  Heart,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Template from '@/layouts/Template';
import { useAuth } from '@/stores/auth.store';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { useUpdateUser } from '@/features/users/hooks/useUsers';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

function RoleBadge({ role }: { role: string }) {
  const roleConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode; label: string }> = {
    ADMIN: { 
      color: 'text-purple-700', 
      bgColor: 'bg-purple-100/80 border-purple-200', 
      icon: <Shield className="h-4 w-4" />, 
      label: 'Administrador' 
    },
    SELLER: { 
      color: 'text-amber-700', 
      bgColor: 'bg-amber-100/80 border-amber-200', 
      icon: <Store className="h-4 w-4" />, 
      label: 'Vendedor' 
    },
    USER: { 
      color: 'text-blue-700', 
      bgColor: 'bg-blue-100/80 border-blue-200', 
      icon: <ShoppingBag className="h-4 w-4" />, 
      label: 'Comprador' 
    },
    MODERATOR: { 
      color: 'text-green-700', 
      bgColor: 'bg-green-100/80 border-green-200', 
      icon: <Shield className="h-4 w-4" />, 
      label: 'Moderador' 
    },
  };

  const config = roleConfig[role] || roleConfig.USER;

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${config.bgColor} ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: 'amber' | 'blue' | 'green' | 'purple';
}

function QuickAction({ icon, title, description, href, color }: QuickActionProps) {
  const colorClasses = {
    amber: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700',
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
  };

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${colorClasses[color]}`}
    >
      <div className="p-2.5 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const logoutMutation = useLogout();
  const updateUserMutation = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    if (user?.id) {
      try {
        await updateUserMutation.mutateAsync({
          id: user.id,
          userData: {
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            address: data.address || '',
          },
        });
        updateUser({ name: data.name, email: data.email });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push('/');
  };

  const cancelEdit = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const isSeller = user?.role === 'SELLER';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Cover */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 relative">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 relative">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white">
                  <span className="text-5xl font-bold text-amber-600">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <button className="absolute bottom-2 right-0 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user?.name}</h1>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      ID: #{user?.id}
                    </span>
                  </div>
                </div>
                <RoleBadge role={user?.role || 'USER'} />
              </div>

              {/* Edit Form */}
              {isEditing && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Editar Perfil</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.email ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                      <input
                        type="text"
                        {...register('address')}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        placeholder="Tu dirección"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 justify-end">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={updateUserMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {updateUserMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Guardar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Stats Cards - Only for Seller */}
          {isSeller && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Package className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-sm text-gray-500">Productos</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-500">Ventas</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">Rating</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0.0</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-500">Órdenes</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isSeller && (
                <>
                  <QuickAction
                    icon={<Store className="h-5 w-5 text-amber-600" />}
                    title="Panel de Vendedor"
                    description="Gestiona tu tienda"
                    href="/seller/dashboard"
                    color="amber"
                  />
                  <QuickAction
                    icon={<Package className="h-5 w-5 text-blue-600" />}
                    title="Mis Productos"
                    description="Ver y editar productos"
                    href="/seller/products"
                    color="blue"
                  />
                </>
              )}
              
              {isAdmin && (
                <QuickAction
                  icon={<User className="h-5 w-5 text-purple-600" />}
                  title="Gestión de Usuarios"
                  description="Administrar usuarios"
                  href="/admin/users"
                  color="purple"
                />
              )}

              <QuickAction
                icon={<ShoppingBag className="h-5 w-5 text-green-600" />}
                title="Mis Pedidos"
                description="Historial de compras"
                href="/orders"
                color="green"
              />

              <QuickAction
                icon={<Heart className="h-5 w-5 text-amber-600" />}
                title="Favoritos"
                description="Productos guardados"
                href="/favorites"
                color="amber"
              />
            </div>
          </div>

          {/* Settings & Logout */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h2>
            <div className="space-y-2">
              <Link
                href="/profile/settings"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2.5 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Preferencias</h4>
                  <p className="text-sm text-gray-500">Configurar notificaciones y privacidad</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/profile/payment"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2.5 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Métodos de Pago</h4>
                  <p className="text-sm text-gray-500">Gestionar tarjetas y pagos</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group text-left"
              >
                <div className="p-2.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <LogOut className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-600">Cerrar Sesión</h4>
                  <p className="text-sm text-red-400">Salir de tu cuenta</p>
                </div>
                {logoutMutation.isPending && (
                  <Loader2 className="h-5 w-5 text-red-600 animate-spin" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
