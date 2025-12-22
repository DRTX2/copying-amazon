'use client';

import Link from 'next/link';
import Template from '@/layouts/Template';

export default function NotFound() {
  return (
    <Template>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Vaya! No hemos podido encontrar esa página.
          </h1>
          <p className="text-lg text-gray-600">
            Lo sentimos, pero la dirección que has introducido no es una página válida de nuestro sitio.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-6xl text-gray-400">?</span>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-md">
                 <i className="fas fa-dog text-white text-xl"></i>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-medium mb-4">¿Buscas algo en concreto?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Vuelve a la página de inicio o comprueba la dirección que has escrito.
          </p>
          
          <Link 
            href="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md transition-colors shadow-sm"
          >
            Ir a la página de inicio
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          <p>© 1996-2025, Amazon Clone Inc. o sus filiales</p>
        </div>
      </div>
    </Template>
  );
}
