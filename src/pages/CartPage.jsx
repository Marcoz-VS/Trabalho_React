import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/">Voltar para os produtos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Carrinho</h1>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px"
          }}
        >
          <Link to={`/product/${item.id}`}>
            <h3>{item.title}</h3>
          </Link>

          <p>Quantidade: {item.quantity}</p>
          <p>Preço unitário: R${item.price.toFixed(2)}</p>
          <p>Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ color: 'white'}} onClick={() => addToCart(item)}>
              + Adicionar mais 1
            </button>

            <button style={{ color: 'white'}} onClick={() => removeFromCart(item.id)}>
              - Remover 1
            </button>
          </div>
        </div>
      ))}

      <h2>Total geral: R${total.toFixed(2)}</h2>

      {items.length > 0 && (
        <button style={{ color: 'white'}} onClick={() => navigate("/checkout")}>
          Finalizar compra
        </button>
      )}
      <Link to="/">Voltar para os produtos</Link>
    </div>
  );
}
