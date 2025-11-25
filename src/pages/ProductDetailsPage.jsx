import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import ProductDetails from "../components/ProductDetails";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <ProductDetails
      product={product}
      onAddToCart={addToCart}
    />
  );
}
