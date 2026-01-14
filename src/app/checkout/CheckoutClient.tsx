'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Template from '@/layouts/Template';
import { useCart } from '@/features/cart';
import { useAuth } from '@/stores/auth.store';

export default function CheckoutClient() {
  const router = useRouter();
  const { items: cartProducts, getCartStats, clearCart } = useCart();
  const { user } = useAuth();
  
  const { totalItems, totalPrice, isEmpty } = getCartStats();

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Ecuador'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulación de proceso de pedido
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setIsProcessing(false);
    router.push('/checkout/success');
  };

  if (isEmpty) {
    return (
      <Template>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">No hay productos para procesar</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md"
          >
            Volver a la tienda
          </button>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Proceso de Pago</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Formularios */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sección 1: Dirección de Envío */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">1</span> Dirección de envío
                </h2>
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={shippingData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Dirección de calle</label>
                    <input 
                      type="text" 
                      name="address"
                      value={shippingData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Calle, número, departamento..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input 
                      type="text" 
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500" 
                    />
                  </div>
                </form>
              </div>

              {/* Sección 2: Método de Pago (Placeholder) */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-75">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">2</span> Método de pago
                </h2>
                <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center">
                  <i className="fas fa-credit-card text-gray-400 mr-3 text-2xl"></i>
                  <span className="text-gray-500 italic">Pago con tarjeta de crédito (simulado)</span>
                </div>
              </div>

              {/* Sección 3: Revisar Productos */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">3</span> Revisar productos
                </h2>
                <div className="space-y-4">
                  {cartProducts.map((item, index) => {
                    const product = item as any; // CartItem extends ProductData which has these properties
                    return (
                    <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                      <div className="h-16 w-16 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded">
                        <img src={product.img} alt={product.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">${(product.precio * item.quantity).toFixed(2)}</p>
                    </div>
                  )})}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
                <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>
                <div className="space-y-2 text-sm border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Productos ({totalItems}):</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Envío y manejo:</span>
                    <span>¡GRATIS!</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos estimados:</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold text-red-700 mb-6">
                  <span>Total del pedido:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-all text-center mb-4"
                >
                  {isProcessing ? 'Procesando...' : 'Finalizar pedido'}
                </button>
                
                <p className="text-[10px] text-gray-500 text-center">
                  Al finalizar tu pedido, confirmas que has leído y aceptado nuestras Condiciones de uso y nuestro Aviso de privacidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
