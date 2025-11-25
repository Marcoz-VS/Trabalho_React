import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import CardInstallments from "./CardInstallments";

export default function CheckoutPage() {
  const { items } = useCart();
  const location = useLocation();

  // Produto vindo do "Comprar Agora"
  const directProduct = location.state?.product || null;

  // Se tiver produto direto, ignora o carrinho nesta página
  const list = directProduct
    ? [{ ...directProduct, quantity: 1 }]
    : items;

  const total = list.reduce((acc, item) =>
    acc + item.price * item.quantity, 0
  );

  const [method, setMethod] = useState("");

  if (list.length === 0) {
    return <p>Seu carrinho está vazio.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pagamento</h1>

      {directProduct && (
        <p style={{ color: "#666" }}>
          Compra direta: <strong>{directProduct.name}</strong>
        </p>
      )}

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
