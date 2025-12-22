'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/features/products/hooks/useProducts';
import Template from '@/layouts/Template';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { ProductAdapter } from '@/shared/adapters/product.adapter';
import { Product } from '@/features/products/types/product.types';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  const { data: results, isLoading, error } = useSearchProducts(query);

  const adaptedResults = results ? ProductAdapter.toProducts(results) : [];

  return (
    <Template>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-gray-900">
            Resultados para <span className="font-bold text-orange-700">"{query}"</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {adaptedResults.length} productos encontrados
          </p>
        </div>

        <ProductGrid
          products={adaptedResults}
          loading={isLoading}
          error={error?.message || null}
          onProductSelect={(product: Product) => router.push(`/product/${product.id}`)}
          emptyMessage="No se encontraron productos que coincidan con tu búsqueda."
        />
      </div>
    </Template>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Template><div>Cargando resultados...</div></Template>}>
      <SearchResultsContent />
    </Suspense>
  );
}
