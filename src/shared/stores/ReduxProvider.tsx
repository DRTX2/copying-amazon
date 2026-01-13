'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect, useRef } from 'react';
import { hydrateFromStorage as hydrateAuth } from './slices/authSlice';
import { hydrateFromStorage as hydrateCart } from './slices/cartSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Hidratar el estado desde localStorage solo una vez
    if (!initialized.current) {
      store.dispatch(hydrateAuth());
      store.dispatch(hydrateCart());
      initialized.current = true;
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
