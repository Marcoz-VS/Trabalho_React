import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const total = items.reduce((acc, p) => acc + p.price, 0);

  if (items.length === 0)
    return <p>Seu carrinho está vazio.</p>;

  return (
    <div>
      <h1>Carrinho</h1>
      <h3>Total: R$ {total.toFixed(2)}</h3>

      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: "20px" }}>
            <Link to={`/product/${item.id}`}>
              {item.title} - R$ {item.price}
            </Link>

            <button onClick={() => removeFromCart(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
