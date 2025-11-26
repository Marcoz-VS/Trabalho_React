import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import CardInstallments from "./CardInstallments";

export default function CheckoutPage() {
  const { items } = useCart();
  const [method, setMethod] = useState("");
  const { user } = useAuth();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
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
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Finalizar compra</h1>

      {/* ITENS */}
      <div style={{ marginBottom: "25px" }}>
        <div>
          <h1>Checkout</h1>
          <p>Comprando como: {user.username}</p>
        </div>
        <h3>Itens do carrinho:</h3>

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "12px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          >
            <p><strong>{item.title}</strong></p>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço unitário: R${item.price.toFixed(2)}</p>
            <p>Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <h3>Total: R${total.toFixed(2)}</h3>

      {/* SELETOR DE MÉTODO */}
      <div style={{ marginTop: "20px" }}>
        <label>Método de pagamento:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px"
          }}
        >
          <option value="">Selecione...</option>
          <option value="pix">PIX (à vista)</option>
          <option value="card">Cartão (à vista)</option>
          <option value="installments">Cartão (parcelado)</option>
        </select>
      </div>

      {/* RENDER DOS MÉTODOS */}
      <div style={{ marginTop: "25px" }}>
        {method === "pix" && <PixPayment total={total} />}
        {method === "card" && <CardPayment total={total} />}
        {method === "installments" && <CardInstallments total={total} />}
      </div>

      <Link
        to="/cart"
        style={{ display: "inline-block", marginTop: "25px" }}
      >
        Voltar ao carrinho
      </Link>
    </div>
  );
}
