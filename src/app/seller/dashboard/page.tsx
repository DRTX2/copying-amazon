'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Plus,
  BarChart3,
  Settings,
  ArrowRight,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Store,
} from 'lucide-react';
import { useSellerGuard } from '@/features/auth/hooks/useSellerGuard';
import { useSellerProducts, useDeleteProduct } from '@/features/seller/hooks/useSellerProducts';
import Template from '@/layouts/Template';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: 'yellow' | 'green' | 'blue' | 'purple';
}

function StatCard({ title, value, icon, trend, trendUp, color }: StatCardProps) {
  const colorClasses = {
    yellow: 'from-amber-400 to-orange-500',
    green: 'from-emerald-400 to-teal-500',
    blue: 'from-blue-400 to-indigo-500',
    purple: 'from-purple-400 to-pink-500',
  };

  const bgColorClasses = {
    yellow: 'bg-amber-50',
    green: 'bg-emerald-50',
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${!trendUp && 'rotate-180'}`} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProductStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    ACTIVE: { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="h-3 w-3" />, label: 'Activo' },
    INACTIVE: { color: 'bg-gray-100 text-gray-700', icon: <Clock className="h-3 w-3" />, label: 'Inactivo' },
    PENDING: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="h-3 w-3" />, label: 'Pendiente' },
    ARCHIVED: { color: 'bg-red-100 text-red-700', icon: <AlertCircle className="h-3 w-3" />, label: 'Archivado' },
  };

  const config = statusConfig[status] || statusConfig.INACTIVE;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

export default function SellerDashboardPage() {
  const router = useRouter();
  const { isSeller, user } = useSellerGuard();
  const { data: products = [], isLoading } = useSellerProducts();
  const deleteProductMutation = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  if (!isSeller) {
    return null;
  }

  const activeProducts = products.filter((p: any) => p.status === 'ACTIVE' || !p.status).length;
  const totalProducts = products.length;

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setDeletingId(id);
      try {
        await deleteProductMutation.mutateAsync(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white">
                    <Store className="h-6 w-6" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">Panel de Vendedor</h1>
                </div>
                <p className="text-gray-600">
                  Bienvenido, <span className="font-semibold text-gray-900">{user?.name}</span>. Gestiona tus productos y ventas.
                </p>
              </div>
              <Link
                href="/seller/create-product"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5" />
                Nuevo Producto
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Productos"
              value={totalProducts}
              icon={<Package className="h-6 w-6" />}
              color="yellow"
            />
            <StatCard
              title="Productos Activos"
              value={activeProducts}
              icon={<CheckCircle className="h-6 w-6" />}
              trend="+12% este mes"
              trendUp={true}
              color="green"
            />
            <StatCard
              title="Ventas Totales"
              value="$0.00"
              icon={<DollarSign className="h-6 w-6" />}
              color="blue"
            />
            <StatCard
              title="Órdenes Pendientes"
              value={0}
              icon={<ShoppingCart className="h-6 w-6" />}
              color="purple"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/seller/products"
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mis Productos</h3>
                    <p className="text-sm text-gray-500">Gestiona tu catálogo</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link
              href="/seller/create-product"
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-100 transition-colors">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Nuevo Producto</h3>
                    <p className="text-sm text-gray-500">Agrega productos</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Estadísticas</h3>
                    <p className="text-sm text-gray-500">Próximamente</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Soon</span>
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Productos Recientes</h2>
              <Link
                href="/seller/products"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes productos aún</h3>
                <p className="text-gray-500 mb-6">Comienza agregando tu primer producto para empezar a vender</p>
                <Link
                  href="/seller/create-product"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Crear Primer Producto
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.slice(0, 5).map((product: any) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                              {product.images?.[0] ? (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            ${product.price?.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <ProductStatusBadge status={product.status || 'ACTIVE'} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">{product.category?.name || 'Sin categoría'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/product/${product.id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver producto"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/seller/products/edit/${product.id}`}
                              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Editar producto"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingId === product.id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Eliminar producto"
                            >
                              {deletingId === product.id ? (
                                <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Template>
  );
}
