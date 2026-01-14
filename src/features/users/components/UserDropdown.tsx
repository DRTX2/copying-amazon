'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ChevronDown,
  Store,
  Package,
  Users,
  Settings,
  LogOut,
  ShoppingBag,
  Heart,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/stores/auth.store';
import { useLogout } from '@/features/auth/hooks/useAuth';

export default function UserDropdown() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsOpen(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:inline">Iniciar Sesión</span>
      </Link>
    );
  }

  const isSeller = user?.role === 'SELLER';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs text-gray-300">Hola,</p>
          <p className="font-semibold text-white truncate max-w-[100px]">{user?.name}</p>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${
              isAdmin ? 'bg-purple-100 text-purple-700' :
              isSeller ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {isAdmin ? <Shield className="h-3 w-3" /> :
               isSeller ? <Store className="h-3 w-3" /> :
               <ShoppingBag className="h-3 w-3" />}
              {isAdmin ? 'Administrador' : isSeller ? 'Vendedor' : 'Comprador'}
            </span>
          </div>

          {/* Seller Options */}
          {isSeller && (
            <div className="py-2 border-b border-gray-100">
              <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vendedor</p>
              <Link
                href="/seller/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Store className="h-4 w-4 text-amber-500" />
                Panel de Vendedor
              </Link>
              <Link
                href="/seller/products"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package className="h-4 w-4 text-amber-500" />
                Mis Productos
              </Link>
              <Link
                href="/seller/create-product"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package className="h-4 w-4 text-amber-500" />
                Crear Producto
              </Link>
            </div>
          )}

          {/* Admin Options */}
          {isAdmin && (
            <div className="py-2 border-b border-gray-100">
              <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
              <Link
                href="/admin/users"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Users className="h-4 w-4 text-purple-500" />
                Gestión de Usuarios
              </Link>
              <Link
                href="/admin/categories"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package className="h-4 w-4 text-purple-500" />
                Categorías
              </Link>
            </div>
          )}

          {/* General Options */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="h-4 w-4 text-gray-500" />
              Mi Perfil
            </Link>
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="h-4 w-4 text-gray-500" />
              Mis Pedidos
            </Link>
            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Heart className="h-4 w-4 text-gray-500" />
              Favoritos
            </Link>
          </div>

          {/* Logout */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {logoutMutation.isPending ? 'Cerrando...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
