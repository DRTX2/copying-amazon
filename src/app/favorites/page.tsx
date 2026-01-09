'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  ArrowLeft,
  Package,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Template from '@/layouts/Template';
import { useFavorites, useRemoveFavorite } from '@/features/favorites/hooks/useFavorites';
import { useCart } from '@/features/cart';
import { useAuth } from '@/shared/stores/auth.store';

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: favorites = [], isLoading, error } = useFavorites();
  const removeFavoriteMutation = useRemoveFavorite();
  const { addItem } = useCart();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemoveFavorite = async (productId: number) => {
    setRemovingId(productId);
    try {
      await removeFavoriteMutation.mutateAsync(productId);
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      title: product.name,
      precio: product.price,
      img: product.images?.[0] || '/assets/img/placeholder-product.png',
      altImg: product.name,
      cantidadDisponible: product.stockQuantity || 10,
      category: [product.category?.name || 'Sin categoría'],
      description: [product.description || ''],
      marca: '',
      color: '',
      estilo: '',
      usos: [],
      descuento: 0,
      origenEnvio: 'Local',
    });
  };

  if (!isAuthenticated) {
    return (
      <Template>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Inicia sesión para ver tus favoritos</h2>
            <p className="text-gray-600 mb-6">
              Guarda tus productos favoritos y accede a ellos desde cualquier dispositivo.
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
              <div className="p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl text-white">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
                <p className="text-gray-600">
                  {favorites.length} {favorites.length === 1 ? 'producto guardado' : 'productos guardados'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Loader2 className="h-10 w-10 text-red-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando favoritos...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar favoritos</h3>
              <p className="text-gray-500">{error.message || 'Intenta de nuevo más tarde'}</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes favoritos aún</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Explora nuestros productos y guarda tus favoritos haciendo clic en el corazón.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
              >
                <Package className="h-5 w-5" />
                Explorar Productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFavorite(product.id);
                        }}
                        disabled={removingId === product.id}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Eliminar de favoritos"
                      >
                        {removingId === product.id ? (
                          <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
                        ) : (
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        )}
                      </button>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {product.category?.name || 'Sin categoría'}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= (product.averageRating || 0)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.averageRating?.toFixed(1) || '0.0'})
                      </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price?.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-lg transition-colors"
                        title="Agregar al carrito"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
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
