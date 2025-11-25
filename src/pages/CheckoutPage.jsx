import { useState } from "react";
import { useCart } from "../context/CartContext";
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
    return <p>Seu carrinho está vazio.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pagamento</h1>
      <h3>Total: R${total.toFixed(2)}</h3>

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
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
    </div>
  );
}
