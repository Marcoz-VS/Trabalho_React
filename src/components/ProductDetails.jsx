import GoBack from './GoBack'
import { useNavigate } from 'react-router-dom';

export default function ProductDetails({ product, onAddToCart }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    onAddToCart(product);
    // Navega para o checkout
    navigate("/checkout");
  };

  return (
    <div>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
      />

      <h1>{product.title}</h1>

      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
      <p>
        ⭐ {product.rating.rate} ({product.rating.count} avaliações)
      </p>

      <GoBack />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={() => onAddToCart(product)}
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
