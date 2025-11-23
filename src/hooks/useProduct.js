import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        const permitidos = ["men's clothing", "women's clothing", "jewelery"];
        const filtrado = data.filter(p => permitidos.includes(p.category));
        setProducts(filtrado);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
