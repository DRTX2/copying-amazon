'use client';

import Link from 'next/link';
import Template from '@/layouts/Template';

export default function CheckoutSuccessPage() {
  return (
    <Template>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 max-w-2xl w-full">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-green-600 text-4xl"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Gracias por tu pedido!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico de confirmación con los detalles del envío en breve.
          </p>
          
          <div className="border-t border-b border-gray-100 py-6 mb-8 bg-gray-50 rounded-sm">
            <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Número de pedido</p>
            <p className="text-xl font-mono font-bold text-gray-800">#AMZN-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-lg transition-colors shadow-sm"
            >
              Seguir comprando
            </Link>
            <Link 
              href="/orders"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-10 rounded-lg transition-colors shadow-sm"
            >
              Ver mis pedidos
            </Link>
          </div>
        </div>
      </div>
    </Template>
  );
}
