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
      <QueryClientProvider client={queryClient}>
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
