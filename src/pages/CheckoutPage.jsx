import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import CardInstallments from "./CardInstallments";

export default function CheckoutPage() {
  const { items } = useCart();
  const [method, setMethod] = useState("");

  const total = items.reduce((acc, item) =>
    acc + item.price * item.quantity, 0
  );

  if (items.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/">Voltar para os produtos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pagamento</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Itens no carrinho:</h3>
        {items.map(item => (
          <div key={item.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
            <p><strong>{item.title}</strong></p>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço unitário: R${item.price.toFixed(2)}</p>
            <p>Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <h3>Total: R${total.toFixed(2)}</h3>

      <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ marginTop: "10px", padding: "8px" }}>
        <option value="">Selecione o método</option>
        <option value="pix">PIX (à vista)</option>
        <option value="card">Cartão (à vista)</option>
        <option value="installments">Cartão (parcelado)</option>
      </select>

      <div style={{ marginTop: "20px" }}>
        {method === "pix" && <PixPayment total={total} />}
        {method === "card" && <CardPayment total={total} />}
        {method === "installments" && <CardInstallments total={total} />}
      </div>

      <Link to="/cart" style={{ display: "inline-block", marginTop: "20px" }}>
        Voltar ao carrinho
      </Link>
    </div>
  );
}
