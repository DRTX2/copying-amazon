import Template from '@/layouts/Template';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

export default function Loading() {
  return (
    <Template>
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 animate-pulse">Cargando contenido increíble para ti...</p>
        
        {/* Skeleton de grid de productos (simulación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 mt-12 opacity-50">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-64 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </Template>
  );
}
