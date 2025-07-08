import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Product from "../components/Product/Product";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();

  const selectedProduct = products.find((p) => p.id === id);

  if (!selectedProduct) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <Product
      id={selectedProduct.id}
      img={selectedProduct.img}
      altImg={selectedProduct.altImg}
      title={selectedProduct.title}
      category={selectedProduct.category}
      description={selectedProduct.description}
      marca={selectedProduct.marca}
      color={selectedProduct.color}
      estilo={selectedProduct.estilo}
      usos={selectedProduct.usos}
      precio={selectedProduct.precio}
      descuento={selectedProduct.descuento}
      cantidadDisponible={selectedProduct.cantidadDisponible}
      origenEnvio={selectedProduct.origenEnvio}
    />
  );
}
