import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProductData } from '../../types/products';

// Tipos del store
interface ProductStore {
  // Estado
  products: ProductData[];
  loading: boolean;
  error: string | null;
  selectedProduct: ProductData | null;
  
  // Acciones
  setProducts: (products: ProductData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedProduct: (product: ProductData | null) => void;
  
  // Selectores computados
  getProductById: (id: number) => ProductData | undefined;
  getProductsByCategory: (category: string) => ProductData[];
  getAvailableProducts: () => ProductData[];
}

export const useProductStore = create<ProductStore>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      products: [],
      loading: false,
      error: null,
      selectedProduct: null,
      
      // Acciones
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
      
      // Selectores computados
      getProductById: (id) => get().products.find(p => p.id === id),
      getProductsByCategory: (category) => 
        get().products.filter(p => p.category.includes(category)),
      getAvailableProducts: () => 
        get().products.filter(p => p.cantidadDisponible > 0),
    }),
    {
      name: 'product-store', // Para DevTools
    }
  )
);
