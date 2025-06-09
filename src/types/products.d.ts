export type CardData = {
  title: string;
  img: string;
  altImg: string;
  id?: string | number;
};

export type ProductData = CardData & {
  category: string[];
  description: string[];
  marca: string;
  color: string;
  estilo: string;
  usos: string[];
  precio: number;
  descuento: number;
  cantidadDisponible: number;
  origenEnvio: string;
};



// new types

export interface Category{
  id:number;
  name:string;
}

export interface ProductImage{
  id: number;
  url: string;
  alt?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  averageRating: number;
  images: ProductImage[];
}