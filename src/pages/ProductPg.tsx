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
        <p>Producto no encontrado</p>
      </Template>
    );
  }

  return (
    <Template>
      <Product {...product} />
    </Template>
  );
}
