import { memo } from 'react';
import { useCartStore } from '../../../shared/stores/cart.store';
import { usePrefetchProduct } from '../hooks/useProducts';
import { ProductCardProps } from '../types/product.types';
import { ProductAdapter } from '../../../shared/adapters/product.adapter';

export const ProductCard = memo<ProductCardProps>(({ 
  product, 
  onSelect, 
  showQuickActions = true, 
  className = '' 
}) => {
  const addItem = useCartStore(state => state.addItem);
  const { prefetchProduct } = usePrefetchProduct();

  const handleMouseEnter = () => {
    // Prefetch del producto cuando el usuario hace hover
    prefetchProduct(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convertir Product a ProductData para el store
    const productData = ProductAdapter.toProductData(product);
    addItem(productData, 1);
    
    // Opcional: mostrar toast de confirmación
    // toast.success(`${product.title} agregado al carrito`);
  };

  const handleProductClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  const discountPrice = product.discount 
    ? product.precio * (1 - product.discount / 100)
    : null;

  return (
    <div 
      className={`group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleProductClick}
    >
      {/* Badge de descuento */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{product.discount}%
        </div>
      )}

      {/* Badge de stock bajo */}
      {product.cantidadDisponible > 0 && product.cantidadDisponible <= 5 && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          ¡Últimas {product.cantidadDisponible}!
        </div>
      )}

      {/* Imagen del producto */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
        <img
          src={product.img}
          alt={product.altImg || product.title}
          className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Contenido del producto */}
      <div className="p-4">
        {/* Categorías */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.category.slice(0, 2).map((cat, index) => (
            <span 
              key={index}
              className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Título */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${discountPrice ? discountPrice.toFixed(2) : product.precio.toFixed(2)}
            </span>
            {discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.precio.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Stock */}
        <div className="mb-3">
          {product.cantidadDisponible > 0 ? (
            <span className="text-xs text-green-600 font-medium">
              En stock ({product.cantidadDisponible} disponibles)
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              Agotado
            </span>
          )}
        </div>

        {/* Acciones rápidas */}
        {showQuickActions && product.cantidadDisponible > 0 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
