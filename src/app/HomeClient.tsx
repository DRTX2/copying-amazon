'use client';

import { useRouter } from 'next/navigation';
import Template from '@/layouts/Template';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useCart } from '@/features/cart';
import { ProductAdapter } from '@/shared/adapters/product.adapter';
import { Product } from '@/features/products/types/product.types';

export default function HomeClient() {
  const router = useRouter();
  const { products, isLoading, error } = useProducts();
  const { getItemCount } = useCart();
  
  const cartItemCount = getItemCount();

  // Convertir productos usando el adapter
  const adaptedProducts = ProductAdapter.toProducts(products);

  return (
    <Template>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">Productos Destacados</h1>
        
        <button 
          className="relative bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          onClick={() => router.push('/shopping-cart')}
        >
          Ver Carrito
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      <ProductGrid 
        products={adaptedProducts}
        loading={isLoading}
        error={error?.message || null}
        onProductSelect={(product: Product) => router.push(`/product/${product.id}`)}
      />
    </Template>
  );
}
