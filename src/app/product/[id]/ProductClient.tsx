'use client';

import { useProduct } from '@/features/products/hooks/useProducts';
import { ProductAdapter } from '@/shared/adapters/product.adapter';
import Product from '@/components/Product/Product';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Template from '@/layouts/Template';

interface ProductClientProps {
  productId: number;
}

export default function ProductClient({ productId }: ProductClientProps) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Template>
    );
  }

  if (error) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">Error al cargar el producto</p>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </Template>
    );
  }

  if (!product) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Producto no encontrado</p>
        </div>
      </Template>
    );
  }

  // Convertir de Product empresarial a ProductData legacy para el componente existente
  const legacyProduct = ProductAdapter.toProductData(product);

  return (
    <Template>
      <Product {...legacyProduct} />
    </Template>
  );
}
