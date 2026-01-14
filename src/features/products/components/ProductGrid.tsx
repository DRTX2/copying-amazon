import { memo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductGridProps } from '../types';
import ErrorBoundary from '../../../shared/components/ErrorBoundary';

export const ProductGrid = memo<ProductGridProps>(({
  products,
  loading = false,
  error = null,
  onProductSelect,
  emptyMessage = 'No se encontraron productos',
  className = ''
}) => {
  // Componente de error específico para el grid
  const ErrorFallback = () => (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar productos</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );

  // Componente de estado vacío
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
      <p className="text-gray-600">{emptyMessage}</p>
    </div>
  );

  // Skeleton loading para productos
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-lg mb-4"></div>
      <div className="space-y-2 px-4 pb-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  if (error) {
    return <ErrorFallback />;
  }

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
        {[...Array(12)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
        {products.map((product) => (
          <ProductCard
            key={`product-${product.id}`}
            product={product}
            onSelect={onProductSelect}
            showQuickActions={true}
            className="h-full"
          />
        ))}
      </div>
    </ErrorBoundary>
  );
});

ProductGrid.displayName = 'ProductGrid';
