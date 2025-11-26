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
      {/* HEADER FIXO – igual HiFashion */}
      <header className="sticky top-0 left-0 right-0 bg-white z-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
              HiFashion
            </Link>

            {/* Barra de busca (desktop) */}
            <div className="hidden md:block flex-1 max-w-xl mx-10">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black transition text-sm"
              />
            </div>

            {/* Ícones da direita */}
            <div className="flex items-center gap-6">
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

        {/* Filtro */}
        <div className="border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
            >
              <option value="all">Todos</option>
              <option value="men's clothing">Masculino</option>
              <option value="women's clothing">Feminino</option>
              <option value="jewelery">Joias</option>
            </select>
          </div>
        </div>
      </header>

      {/* Lista de produtos */}
      <main className="pt-32 pb-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtrado.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtrado.length === 0 && (
          <p className="text-center text-gray-500 py-20 text-lg">
            Nenhum produto encontrado
          </p>
        )}
      </main>
    </>
  );
}