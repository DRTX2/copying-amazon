import { ProductData } from '@/types/products';
import { PaginatedResponse } from '../shared/types/api-response.types';
import { ApiProductQueryParams as GetProductsParams } from '@/types/api.types';
import productsJson from '../__mocks__/products.mock.json';

/**
 * Mock service para productos usando JSON local
 * Útil para desarrollo y versión offline
 */
class ProductServiceMock {
  private products: ProductData[] = productsJson as ProductData[];

  // Simular delay de red
  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener productos con filtros y paginación
  async getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<ProductData>> {
    await this.delay();

    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = params;

    let filteredProducts = [...this.products];

    // Filtrar por categoría
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.includes(category)
      );
    }

    // Filtrar por precio
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.precio >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.precio <= maxPrice
      );
    }

    // Buscar por título
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.some(desc => 
          desc.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Ordenar
    filteredProducts.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'price':
          aValue = a.precio;
          bValue = b.precio;
          break;
        case 'name':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'rating':
          aValue = 0; // Default rating
          bValue = 0;
          break;
        case 'createdAt':
          aValue = a.id; // Usar ID como proxy para fecha
          bValue = b.id;
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: endIndex < filteredProducts.length,
        hasPrev: page > 1,
      },
      message: 'Productos obtenidos correctamente',
      status: 200,
    };
  }

  // Obtener producto por ID
  async getProductById(id: number): Promise<ProductData> {
    await this.delay();

    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  // Buscar productos
  async searchProducts(query: string): Promise<ProductData[]> {
    await this.delay();

    return this.products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.some(desc => 
        desc.toLowerCase().includes(query.toLowerCase())
      ) ||
      product.marca.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<ProductData[]> {
    await this.delay();

    return this.products.filter(product => 
      product.category.includes(category)
    );
  }

  // Obtener productos populares
  async getPopularProducts(limit: number = 10): Promise<ProductData[]> {
    await this.delay();

    // Simular productos populares (los primeros en el JSON)
    return this.products.slice(0, limit);
  }

  // Obtener productos en oferta
  async getDealsProducts(): Promise<ProductData[]> {
    await this.delay();

    return this.products.filter(product => product.descuento > 0);
  }

  // Obtener categorías disponibles
  async getCategories(): Promise<string[]> {
    await this.delay();

    const categories = new Set<string>();
    this.products.forEach(product => {
      product.category.forEach(cat => categories.add(cat));
    });

    return Array.from(categories);
  }

  // Obtener marcas disponibles
  async getBrands(): Promise<string[]> {
    await this.delay();

    const brands = new Set<string>();
    this.products.forEach(product => {
      if (product.marca) {
        brands.add(product.marca);
      }
    });

    return Array.from(brands);
  }
}

export const productServiceMock = new ProductServiceMock();
