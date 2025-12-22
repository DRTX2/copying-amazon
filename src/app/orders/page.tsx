'use client';

import Link from 'next/link';
import Template from '@/layouts/Template';

export default function OrdersPage() {
  return (
    <Template>
      <div className="max-w-5xl mx-auto px-4 py-8 text-center pt-20">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
        
        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200">
           <div className="text-gray-300 mb-6 flex justify-center">
              <i className="fas fa-box-open text-6xl"></i>
           </div>
           <h2 className="text-xl font-bold mb-2">Aún no has realizado ningún pedido</h2>
           <p className="text-gray-500 mb-8">
             Explora nuestro catálogo y encuentra los mejores productos a los mejores precios.
           </p>
           <Link 
            href="/"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-lg transition-colors shadow-sm"
          >
            Ir a comprar ahora
          </Link>
        </div>
      </div>
    </Template>
  );
}
