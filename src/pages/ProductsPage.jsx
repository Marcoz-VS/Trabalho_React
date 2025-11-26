// src/pages/ProductsPage.jsx
import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const { items } = useCart();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Carregando...
      </div>
    );

  const filtrado = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {/* HEADER NORMAL (não fixo, rola com a página) */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-black">
              HiFashion
            </Link>

            {/* Barra de busca - só aparece no desktop */}
            <div className="hidden md:block flex-1 max-w-xl mx-10">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black transition"
              />
            </div>

            {/* Ícones da direita */}
            <div className="flex items-center gap-8">
              {/* LOGIN ou PERFIL */}
              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-800 rounded-full text-sm hover:bg-gray-100 transition"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/perfil"
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center text-xs font-semibold"
                    aria-label="Perfil"
                  >
                    {user.username?.[0]?.toUpperCase()}
                  </Link>

                  <button
                    onClick={logout}
                    className="text-sm px-3 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-100 transition"
                  >
                    Sair
                  </button>
                </div>
              )}
{/*  */}
           
            </div>
          </div>
        </div>

        {/* Filtro (embaixo do header) */}
        <div className="border-t bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-10 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-black"
            >
              <option value="all">Todos</option>
              <option value="men's clothing">Masculino</option>
              <option value="women's clothing">Feminino</option>
              <option value="jewelery">Joias</option>
            </select>
          </div>
        </div>
      </header>

      {/* Produtos - começa logo abaixo do header */}
      <main className="pt-12 pb-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtrado.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtrado.length === 0 && (
          <p className="text-center text-gray-600 py-20 text-lg">
            Nenhum produto encontrado
          </p>
        )}
      </main>
    </>
  );
}