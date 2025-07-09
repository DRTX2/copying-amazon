import { useParams } from "react-router-dom";
import { useProducts, useProduct } from "../features/products";
import { ProductAdapter } from "../shared/adapters/product.adapter";
import Product from "../components/Product/Product";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  
  // Usar hook específico para detalles del producto
  const { data: productDetail, isLoading, error } = useProduct(productId);
  
  // Fallback: usar productos generales si no hay detalle específico
  const { products } = useProducts();
  
  // Convertir el producto a ProductData para compatibilidad
  let selectedProductData;
  if (productDetail) {
    selectedProductData = ProductAdapter.toProductData(productDetail);
  } else {
    // Los productos del useProducts ya son ProductData
    selectedProductData = products.find((p) => p.id === productId) || null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !selectedProductData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <Product
      id={selectedProductData.id}
      img={selectedProductData.img}
      altImg={selectedProductData.altImg}
      title={selectedProductData.title}
      category={selectedProductData.category}
      description={selectedProductData.description}
      marca={selectedProductData.marca}
      color={selectedProductData.color}
      estilo={selectedProductData.estilo}
      usos={selectedProductData.usos}
      precio={selectedProductData.precio}
      descuento={selectedProductData.descuento}
      cantidadDisponible={selectedProductData.cantidadDisponible}
      origenEnvio={selectedProductData.origenEnvio}
    />
  );
}
