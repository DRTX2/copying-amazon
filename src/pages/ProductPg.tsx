import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Product from "../components/Product/Product";
import Template from "../layouts/Template";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Producto no encontrado</p>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <Product {...product} />
    </Template>
  );
}
