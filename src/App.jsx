import useProducts from  './hooks/useProduct'
import ProductsPage from './pages/ProductsPage';

function App() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Deu ruim: {error.message}</p>;

  return (
    <div>
      <ProductsPage/>
    </div>
  );
}

export default App;