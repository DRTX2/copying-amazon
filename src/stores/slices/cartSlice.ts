import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '@/types/products';
import { CartItem } from '@/features/cart/types';

interface CartState {
  items: CartItem[];
  totalPrice: number;
  discount: number;
  currency: string;
}

// Estado inicial
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  discount: 0,
  currency: 'USD',
};

// Función para cargar estado desde localStorage
const loadStateFromStorage = (): Partial<CartState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('cart-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        items: parsed.items || [],
        discount: parsed.discount || 0,
        currency: parsed.currency || 'USD',
      };
    }
  } catch {
    // Ignorar errores de parsing
  }
  return {};
};

// Función para guardar estado en localStorage
const saveStateToStorage = (state: CartState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const toStore = {
      items: state.items,
      discount: state.discount,
      currency: state.currency,
    };
    localStorage.setItem('cart-storage', JSON.stringify(toStore));
  } catch {
    // Ignorar errores de localStorage
  }
};

// Función helper para calcular el total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: ProductData; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
      
      if (productId === undefined) return;

      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ 
          ...product, 
          id: productId as number,
          quantity, 
          cantidadDisponible: quantity 
        });
      }
      
      state.totalPrice = calculateTotal(state.items);
      saveStateToStorage(state);
    },
    
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = calculateTotal(state.items);
      saveStateToStorage(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const item = state.items.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
          item.cantidadDisponible = quantity;
        }
      }
      
      state.totalPrice = calculateTotal(state.items);
      saveStateToStorage(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.discount = 0;
      saveStateToStorage(state);
    },
    
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      saveStateToStorage(state);
    },
    
    hydrateFromStorage: (state) => {
      const stored = loadStateFromStorage();
      if (stored.items) state.items = stored.items;
      if (stored.discount !== undefined) state.discount = stored.discount;
      if (stored.currency) state.currency = stored.currency;
      state.totalPrice = calculateTotal(state.items);
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setDiscount,
  hydrateFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
