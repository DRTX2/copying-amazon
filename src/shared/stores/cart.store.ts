import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProductData } from '../../types/products';

// Tipos del carrito
export interface CartItem extends ProductData {
  quantity: number;
}

interface CartStore {
  // Estado
  items: CartItem[];
  totalPrice: number;
  discount: number;
  currency: string;
  
  // Acciones
  addItem: (product: ProductData, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setDiscount: (discount: number) => void;
  calculateTotal: () => void;
  
  // Selectores computados
  getItemCount: () => number;
  getItemById: (id: number) => CartItem | undefined;
  getTotalWithDiscount: () => number;
  isEmpty: () => boolean;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        items: [],
        totalPrice: 0,
        discount: 0,
        currency: 'USD',
        
        // Acciones
        addItem: (product, quantity = 1) => {
          const { items } = get();
          const existingItem = items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Actualizar cantidad si ya existe
            set({
              items: items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            });
          } else {
            // Agregar nuevo item
            set({
              items: [...items, { ...product, quantity, cantidadDisponible: quantity }]
            });
          }
          
          // Recalcular total
          get().calculateTotal();
        },
        
        removeItem: (productId) => {
          set({
            items: get().items.filter(item => item.id !== productId)
          });
          get().calculateTotal();
        },
        
        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }
          
          set({
            items: get().items.map(item =>
              item.id === productId
                ? { ...item, quantity, cantidadDisponible: quantity }
                : item
            )
          });
          get().calculateTotal();
        },
        
        clearCart: () => {
          set({ items: [], totalPrice: 0, discount: 0 });
        },
        
        setDiscount: (discount) => {
          set({ discount });
          get().calculateTotal();
        },
        
        // Métodos privados
        calculateTotal: () => {
          const { items } = get();
          const total = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
          set({ totalPrice: total });
        },
        
        // Selectores computados
        getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),

        getItemById: (id) => get().items.find(item => item.id === id),
        
        getTotalWithDiscount: () => {
          const { totalPrice, discount } = get();
          return totalPrice - (totalPrice * discount / 100);
        },
        
        isEmpty: () => get().items.length === 0,
      }),
      {
        name: 'cart-storage', // Clave para localStorage
        partialize: (state) => ({
          items: state.items,
          discount: state.discount,
          currency: state.currency,
        }),
      }
    ),
    {
      name: 'cart-store',
    }
  )
);
