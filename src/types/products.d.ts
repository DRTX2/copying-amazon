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
