'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Image as ImageIcon,
  MoreVertical,
  Star,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useSellerGuard } from '@/hooks/useSellerGuard';
import { useSellerProducts, useDeleteProduct } from '@/features/seller/hooks/useSellerProducts';
import Template from '@/layouts/Template';

function ProductStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    ACTIVE: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="h-3.5 w-3.5" />, label: 'Activo' },
    INACTIVE: { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: <Clock className="h-3.5 w-3.5" />, label: 'Inactivo' },
    PENDING: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="h-3.5 w-3.5" />, label: 'Pendiente' },
    ARCHIVED: { color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertCircle className="h-3.5 w-3.5" />, label: 'Archivado' },
  };

  const config = statusConfig[status] || statusConfig.ACTIVE;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

type ViewMode = 'grid' | 'list';

export default function SellerProductsPage() {
  const { isSeller } = useSellerGuard();
  const { data: products = [], isLoading } = useSellerProducts();
  const deleteProductMutation = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  if (!isSeller) {
    return null;
  }

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      setDeletingId(id);
      try {
        await deleteProductMutation.mutateAsync(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter || (!product.status && statusFilter === 'ACTIVE');
    return matchesSearch && matchesStatus;
  });

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/seller/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mis Productos</h1>
                <p className="text-gray-600 mt-1">
                  Gestiona tu catálogo de productos ({products.length} productos)
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

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="all">Todos los estados</option>
                  <option value="ACTIVE">Activos</option>
                  <option value="INACTIVE">Inactivos</option>
                  <option value="PENDING">Pendientes</option>
                  <option value="ARCHIVED">Archivados</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No se encontraron productos' : 'No tienes productos aún'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza agregando tu primer producto para empezar a vender en la plataforma'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  href="/seller/create-product"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Crear Primer Producto
                </Link>
              )}
            </div>
          ) : viewMode === 'list' ? (
            // List View
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                              {product.images?.[0] ? (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-0.5">{product.name}</h4>
                              <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-gray-900">
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
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium text-gray-900">{product.averageRating?.toFixed(1) || '0.0'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/product/${product.id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver producto"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <Link
                              href={`/seller/products/edit/${product.id}`}
                              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Editar producto"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingId === product.id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Eliminar producto"
                            >
                              {deletingId === product.id ? (
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
          ) : (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <ProductStatusBadge status={product.status || 'ACTIVE'} />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        href={`/seller/products/edit/${product.id}`}
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={deletingId === product.id}
                        className="p-3 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deletingId === product.id ? (
                          <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-gray-600">{product.averageRating?.toFixed(1) || '0.0'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
