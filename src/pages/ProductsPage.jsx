import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produtos.</p>;

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px"
    }}>
      {products.map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}
