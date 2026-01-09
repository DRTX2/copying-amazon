'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  ArrowLeft,
  Shield,
  ShoppingBag,
  Store,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { useUsers, useDeleteUser } from '@/features/users/hooks/useUsers';
import Template from '@/layouts/Template';

function RoleBadge({ role }: { role: string }) {
  const roleConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    ADMIN: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: <Shield className="h-3.5 w-3.5" />, label: 'Admin' },
    SELLER: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Store className="h-3.5 w-3.5" />, label: 'Vendedor' },
    USER: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <ShoppingBag className="h-3.5 w-3.5" />, label: 'Comprador' },
    MODERATOR: { color: 'bg-green-100 text-green-700 border-green-200', icon: <UserCheck className="h-3.5 w-3.5" />, label: 'Moderador' },
  };

  const config = roleConfig[role] || roleConfig.USER;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

interface UserDetailsModalProps {
  user: any;
  onClose: () => void;
}

function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-amber-600">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-amber-100 text-sm">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ID Usuario</p>
                <p className="font-medium text-gray-900">#{user.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rol</p>
                <RoleBadge role={user.role} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            {user.phone && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Teléfono</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
            )}
            {user.address && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dirección</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="font-medium text-gray-900">{user.address}</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const { isAdmin } = useAdminGuard();
  const { data: users = [], isLoading } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (!isAdmin) {
    return null;
  }

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      setDeletingId(id);
      try {
        await deleteUserMutation.mutateAsync(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const userStats = {
    total: users.length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
    sellers: users.filter((u) => u.role === 'SELLER').length,
    buyers: users.filter((u) => u.role === 'USER').length,
  };

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Inicio
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <p className="text-gray-600">Administra los usuarios de la plataforma</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
                  <p className="text-xs text-gray-500">Total Usuarios</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.admins}</p>
                  <p className="text-xs text-gray-500">Administradores</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Store className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.sellers}</p>
                  <p className="text-xs text-gray-500">Vendedores</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userStats.buyers}</p>
                  <p className="text-xs text-gray-500">Compradores</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="all">Todos los roles</option>
                  <option value="ADMIN">Administradores</option>
                  <option value="SELLER">Vendedores</option>
                  <option value="USER">Compradores</option>
                  <option value="MODERATOR">Moderadores</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Cargando usuarios...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || roleFilter !== 'all' ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || roleFilter !== 'all'
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Los usuarios aparecerán aquí cuando se registren'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {user.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{user.name}</h4>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4 text-gray-400" />
                                {user.phone}
                              </div>
                            )}
                            {user.address && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 truncate max-w-xs">
                                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{user.address}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver detalles"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                            <Link
                              href={`/admin/users/edit/${user.id}`}
                              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Editar usuario"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={deletingId === user.id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Eliminar usuario"
                            >
                              {deletingId === user.id ? (
                                <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </Template>
  );
}
