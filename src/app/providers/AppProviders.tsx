import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { queryClient } from '../config/queryClient';
import ErrorBoundary from '../../shared/components/ErrorBoundary';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      {/* contexto global que requiere react query de forma que ahora podemos usar las querys con esa base dentro de este "arbol" */}
      <QueryClientProvider client={queryClient}> 
        {/* espera a que carguen los datos antes de renderizarse, mientras carga muestra el componente señalado */}
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
        
        {/* React Query DevTools solo en desarrollo */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools 
            initialIsOpen={false}
          />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
