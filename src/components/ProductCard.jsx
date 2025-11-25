import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Previne a navegação do Link
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault(); // Aqui tambem
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "16px",
      borderRadius: "8px",
      width: "250px",
      display: "flex",
      flexDirection: "column"
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />

        <h3 style={{ margin: "8px 0" }}>{product.title}</h3>

        <p><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
        <button
          onClick={handleAddToCart}
          style={{
          }}
        >
          Adicionar ao carrinho
        </button>
        <button
          onClick={handleBuyNow}
          style={{
          }}
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}
