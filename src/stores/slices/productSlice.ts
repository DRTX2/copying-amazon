import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '@/types/products';

// Tipos del store
interface ProductState {
  products: ProductData[];
  loading: boolean;
  error: string | null;
  selectedProduct: ProductData | null;
}

// Estado inicial
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    setSelectedProduct: (state, action: PayloadAction<ProductData | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { 
  setProducts, 
  setLoading, 
  setError, 
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
