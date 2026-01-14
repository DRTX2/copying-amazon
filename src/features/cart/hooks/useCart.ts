import { useCartStore } from '../../../stores/cart.store';
import { ProductData } from '@/types/products';
import { Product } from '@/features/products/types';
import { ProductAdapter } from '../../../shared/adapters/product.adapter';

/**
 * Hook para el carrito con funcionalidades avanzadas
 */
export const useCart = () => {
  const store = useCartStore();

  // Método para agregar producto desde ProductData
  const addProductData = (product: ProductData, quantity: number = 1) => {
    store.addItem(product, quantity);
  };

  // Método para agregar producto desde Product
  const addProduct = (product: Product, quantity: number = 1) => {
    const productData = ProductAdapter.toProductData(product);
    store.addItem(productData, quantity);
  };

  // Obtener productos del carrito como Product[]
  const getProducts = (): Product[] => {
    return store.items.map((item) => ProductAdapter.toProduct(item as unknown as ProductData));
  };

  // Obtener productos del carrito como ProductData[]
  const getProductsData = (): ProductData[] => {
    // CartItem extiende ProductData, así que podemos hacer cast directo
    return store.items as unknown as ProductData[];
  };

  // Verificar si un producto está en el carrito
  const hasProduct = (productId: number): boolean => {
    return store.getItemById(productId) !== undefined;
  };

  // Obtener cantidad de un producto específico
  const getProductQuantity = (productId: number): number => {
    const item = store.getItemById(productId);
    return item?.quantity || 0;
  };

  // Estadísticas del carrito
  const getCartStats = () => {
    const totalItems = store.getItemCount();
    const totalPrice = store.getTotalWithDiscount();
    const subtotal = store.totalPrice;
    const savings = subtotal - totalPrice;
    
    return {
      totalItems,
      totalPrice,
      subtotal,
      savings,
      discount: store.discount,
      isEmpty: store.isEmpty(),
    };
  };

  return {
    // Estado del carrito
    items: store.items,
    totalPrice: store.totalPrice,
    discount: store.discount,
    currency: store.currency,
    
    // Acciones básicas
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    setDiscount: store.setDiscount,
    
    // Métodos de conveniencia
    addProduct,
    addProductData,
    getProducts,
    getProductsData,
    hasProduct,
    getProductQuantity,
    
    // Selectores computados
    getItemCount: store.getItemCount,
    getItemById: store.getItemById,
    getTotalWithDiscount: store.getTotalWithDiscount,
    isEmpty: store.isEmpty,
    getCartStats,
  };
};

export default useCart;
