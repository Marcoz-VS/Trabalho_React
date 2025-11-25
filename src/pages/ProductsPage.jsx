import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [ search, setSearch ] = useState("");
  const [ filter, setFilter ] = useState("all");

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produtos.</p>;

  const filtrado = products.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
    }).filter((p) => p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header com botões de Login e Register */}
      <header style={{
 
      }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Loja Virtual</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/login">
            <button style={{
            }}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{

            }}>
              Register
            </button>
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "0 20px"
      }}>

        <input
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="men's clothing">Masculino</option>
          <option value="women's clothing">Feminino</option>
          <option value="jewelery">Bijuterias</option>
        </select>

        {filtrado.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
