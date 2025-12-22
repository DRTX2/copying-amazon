'use client';

import Template from '@/layouts/Template';
import { useAuth } from '@/shared/stores/auth.store';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Template>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-6 border-b border-gray-200 flex items-center space-x-6">
            <div className="h-24 w-24 bg-yellow-100 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-600">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                Cliente Premium
              </span>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Información de la cuenta</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500">ID de Usuario</p>
                  <p className="font-medium">UID-{user?.id || '0000'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Rol</p>
                  <p className="font-medium">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
