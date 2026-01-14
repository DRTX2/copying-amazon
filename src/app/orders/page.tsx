'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Loader2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import Template from '@/layouts/Template';
import { useOrders, orderService, OrderResponse, OrderState } from '@/features/orders/hooks/useOrders';
import { useAuth } from '@/stores/auth.store';

function OrderStateBadge({ state }: { state: OrderState }) {
  const stateConfig: Record<OrderState, { color: string; icon: React.ReactNode; label: string }> = {
    PENDING: { 
      color: 'bg-amber-100 text-amber-700 border-amber-200', 
      icon: <Clock className="h-4 w-4" />, 
      label: 'Pendiente' 
    },
    CONFIRMED: { 
      color: 'bg-blue-100 text-blue-700 border-blue-200', 
      icon: <CheckCircle className="h-4 w-4" />, 
      label: 'Confirmada' 
    },
    SHIPPED: { 
      color: 'bg-purple-100 text-purple-700 border-purple-200', 
      icon: <Truck className="h-4 w-4" />, 
      label: 'En camino' 
    },
    DELIVERED: { 
      color: 'bg-green-100 text-green-700 border-green-200', 
      icon: <CheckCircle className="h-4 w-4" />, 
      label: 'Entregada' 
    },
    CANCELLED: { 
      color: 'bg-red-100 text-red-700 border-red-200', 
      icon: <XCircle className="h-4 w-4" />, 
      label: 'Cancelada' 
    },
  };

  const config = stateConfig[state] || stateConfig.PENDING;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const { data: orders = [], isLoading, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  if (!isAuthenticated) {
    return (
      <Template>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Inicia sesión para ver tus pedidos</h2>
            <p className="text-gray-600 mb-6">
              Accede a tu cuenta para ver el historial de tus pedidos.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </Template>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href={isAdmin ? "/admin/users" : "/profile"}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {isAdmin ? 'Volver a Admin' : 'Volver al Perfil'}
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl text-white">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isAdmin ? 'Todas las Órdenes' : 'Mis Pedidos'}
                </h1>
                <p className="text-gray-600">
                  {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando pedidos...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar pedidos</h3>
              <p className="text-gray-500">{error.message || 'Intenta de nuevo más tarde'}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isAdmin ? 'No hay órdenes registradas' : 'Aún no has realizado ningún pedido'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {isAdmin 
                  ? 'Las órdenes aparecerán aquí cuando los usuarios realicen compras.'
                  : 'Explora nuestro catálogo y encuentra los mejores productos.'}
              </p>
              {!isAdmin && (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Ir a comprar ahora
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Pedido</p>
                        <p className="font-semibold text-gray-900">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Fecha
                        </p>
                        <p className="font-medium text-gray-700">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Total
                        </p>
                        <p className="font-bold text-gray-900">${order.total?.toFixed(2)}</p>
                      </div>
                    </div>
                    <OrderStateBadge state={order.orderState} />
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={idx}
                              className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-white flex items-center justify-center"
                            >
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-12 h-12 bg-gray-200 rounded-lg border-2 border-white flex items-center justify-center text-sm font-medium text-gray-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} unidades en total
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        Ver detalles
                        <ChevronRight className={`h-4 w-4 transition-transform ${selectedOrder?.id === order.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder?.id === order.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-3">Detalle del pedido</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">Producto #{item.productId}</p>
                                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                        {order.deliveredAt && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">
                              <CheckCircle className="h-4 w-4 inline mr-1" />
                              Entregado el {formatDate(order.deliveredAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
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
