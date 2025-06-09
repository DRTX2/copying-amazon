import { api } from "../config/axios";

export const getALlProducts = ()=> api.get('/products');
export const getProductById=(id:number)=> api.get(`/products/${id}`);
export const createProduct=(data:any)=> api.post('/products', data);
export const updateProduct=(id:number, data:any)=> api.put(`/products/${id}`, data);
export const deleteProduct=(id:number)=> api.delete(`/products/${id}`);

// todo: Reduce to an compacted filter function
export const getProductByCategory = (categoryId: number) => api.get(`/products/category/${categoryId}`);
export const getProductByName = (name: string) => api.get(`/products/name/${name}`);
export const getProductByPriceRange = (minPrice: number, maxPrice: number) => api.get(`/products/price?min=${minPrice}&max=${maxPrice}`);
export const getProductByRating = (rating: number) => api.get(`/products/rating/${rating}`);
export const getProductByBrand = (brand: string) => api.get(`/products/brand/${brand}`);
export const getProductBySearch = (query: string) => api.get(`/products/search?query=${query}`);
export const getProductByTags = (tags: string[]) => api.get(`/products/tags`, { params: { tags: tags.join(',') } });
export const getProductByDiscount = (discount: number) => api.get(`/products/discount/${discount}`);
export const getProductByAvailability = (available: boolean) => api.get(`/products/availability/${available}`);
