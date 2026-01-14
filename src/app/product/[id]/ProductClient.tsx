'use client';

import { useProduct } from '@/features/products/hooks/useProducts';
import { ProductAdapter } from '@/shared/adapters/product.adapter';
import EnhancedProduct from '@/features/products/components/EnhancedProduct';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Template from '@/layouts/Template';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, PackageX } from 'lucide-react';

interface ProductClientProps {
  productId: number;
  initialProduct?: any;
}

export default function ProductClient({ productId, initialProduct }: ProductClientProps) {
  // Adaptar el producto inicial si existe
  const adaptedInitialProduct = initialProduct 
    ? ProductAdapter.toProduct(initialProduct) 
    : undefined;
  
  const { data: product, isLoading, error } = useProduct(productId, adaptedInitialProduct);

  if (isLoading) {
    return (
      <Template>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-500">Cargando producto...</p>
          </div>
        </div>
      </Template>
    );
  }

  if (error) {
    return (
      <Template>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Error al cargar el producto
            </h2>
            <p className="text-gray-600 mb-6">{(error as any).message}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </Template>
    );
  }

  if (!product) {
    return (
      <Template>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageX className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Producto no encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Explorar productos
            </Link>
          </div>
        </div>
      </Template>
    );
  }

  // Convertir de Product empresarial a ProductData para el componente
  const legacyProduct = ProductAdapter.toProductData(product);

  return (
    <Template>
      <EnhancedProduct 
        product={legacyProduct} 
        rating={product.rating || 4.5}
        reviewCount={Math.floor(Math.random() * 200) + 50} // Placeholder
      />
    </Template>
  );
}
