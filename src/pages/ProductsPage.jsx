// src/pages/ProductsPage.jsx
import useProducts from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import Header from "../components/Header";

export default function ProductsPage() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Carregando...
      </div>
    );
  }

  const filtrado = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

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
