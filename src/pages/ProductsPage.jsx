// src/pages/ProductsPage.jsx
import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // IMPORTANTE: pega o carrinho real

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const { items } = useCart(); // ← número real de itens no carrinho
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
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b">
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
              {/* Usuário (pode virar login depois) */}
              <Link
                to="/perfil"
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Perfil"
              />
            <Link to="/cart" className="relative" aria-label="Carrinho">
              <i className="pi pi-shopping-cart text-black text-2xl cursor-pointer hover:text-gray-700 transition"></i>
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