// Re-exportar desde Redux Toolkit slices para mantener compatibilidad
import { useAppDispatch, useAppSelector } from './hooks';
import { 
  addItem as addItemAction, 
  removeItem as removeItemAction, 
  updateQuantity as updateQuantityAction, 
  clearCart as clearCartAction, 
  setDiscount as setDiscountAction,
} from './slices/cartSlice';
import type { CartItem } from './slices/cartSlice';
import { ProductData } from '../../types/products';

// Re-exportar tipos
export type { CartItem };

// Hook interno
const useCartStoreInternal = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cart);
  
  return {
    // Estado
    ...state,
    
    // Acciones adaptadas
    addItem: (product: ProductData, quantity: number = 1) => {
      dispatch(addItemAction({ product, quantity }));
    },
    
    removeItem: (productId: number) => {
      dispatch(removeItemAction(productId));
    },
    
    updateQuantity: (productId: number, quantity: number) => {
      dispatch(updateQuantityAction({ productId, quantity }));
    },
    
    clearCart: () => {
      dispatch(clearCartAction());
    },
    
    setDiscount: (discount: number) => {
      dispatch(setDiscountAction(discount));
    },
    
    calculateTotal: () => {
      // El total se calcula automáticamente en el reducer
    },
    
    // Selectores computados
    getItemCount: (): number => {
      return state.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    getItemById: (id: number): CartItem | undefined => {
      return state.items.find(item => item.id === id);
    },
    
    getTotalWithDiscount: (): number => {
      return state.totalPrice - (state.totalPrice * state.discount / 100);
    },
    
    isEmpty: (): boolean => {
      return state.items.length === 0;
    },
  };
};

// Hook compatible con la API anterior de Zustand (con selector)
export function useCartStore(): ReturnType<typeof useCartStoreInternal>;
export function useCartStore<T>(selector: (state: ReturnType<typeof useCartStoreInternal>) => T): T;
export function useCartStore<T>(selector?: (state: ReturnType<typeof useCartStoreInternal>) => T) {
  const store = useCartStoreInternal();
  
  if (selector) {
    return selector(store);
  }
  
  return store;
}
