// Re-exportar desde Redux Toolkit slices para mantener compatibilidad
import { useAppDispatch, useAppSelector } from './hooks';
import { 
  setProducts as setProductsAction, 
  setLoading as setLoadingAction, 
  setError as setErrorAction, 
  setSelectedProduct as setSelectedProductAction,
} from './slices/productSlice';
import { ProductData } from '../../types/products';

// Hook interno
const useProductStoreInternal = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product);
  
  return {
    // Estado
    ...state,
    
    // Acciones adaptadas
    setProducts: (products: ProductData[]) => {
      dispatch(setProductsAction(products));
    },
    
    setLoading: (loading: boolean) => {
      dispatch(setLoadingAction(loading));
    },
    
    setError: (error: string | null) => {
      dispatch(setErrorAction(error));
    },
    
    setSelectedProduct: (product: ProductData | null) => {
      dispatch(setSelectedProductAction(product));
    },
    
    // Selectores computados
    getProductById: (id: number): ProductData | undefined => {
      return state.products.find(p => p.id === id);
    },
    
    getProductsByCategory: (category: string): ProductData[] => {
      return state.products.filter(p => p.category.includes(category));
    },
    
    getAvailableProducts: (): ProductData[] => {
      return state.products.filter(p => p.cantidadDisponible > 0);
    },
  };
};

// Hook compatible con la API anterior de Zustand (con selector)
export function useProductStore(): ReturnType<typeof useProductStoreInternal>;
export function useProductStore<T>(selector: (state: ReturnType<typeof useProductStoreInternal>) => T): T;
export function useProductStore<T>(selector?: (state: ReturnType<typeof useProductStoreInternal>) => T) {
  const store = useProductStoreInternal();
  
  if (selector) {
    return selector(store);
  }
  
  return store;
}
