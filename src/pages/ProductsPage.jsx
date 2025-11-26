// src/pages/ProductsPage.jsx
import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // IMPORTANTE: pega o carrinho real
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const { items } = useCart(); // ← número real de itens no carrinho
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
            {/* Perfil */}
            <Link
              to="/perfil"
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              aria-label="Perfil"
            />

            {/* Carrinho com contador */}
            <Link to="/cart" className="relative" aria-label="Carrinho">
              <i className="pi pi-shopping-cart text-3xl text-black hover:text-gray-700 transition"></i>
              
              {/* Bolinha vermelha com número de itens */}
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {items.length}
                </span>
              )}
            </Link>
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
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center text-xs"
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

              {/* CARRINHO */}
              <Link to="/cart" className="relative group" aria-label="Carrinho">
                <svg
                  className="w-9 h-9 text-gray-800 group-hover:text-black transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 3h2l.4 2M7.5 13h9l3.5-8H6.5M7.5 13L5.2 5M7.5 13l-1.3 5.2c-.4 1.6 1 3 2.7 3h10.8c1.7 0 3.1-1.4 2.7-3l-1.4-5.6M16.5 21a2 2 0 100-4 2 2 0 000 4zm-9 0a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>

                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                    {items.length}
                  </span>
                )}
              </Link>
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

