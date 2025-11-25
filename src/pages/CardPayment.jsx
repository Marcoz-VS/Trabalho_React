import { useState } from "react";

export default function CardPayment({ total }) {
  const [number, setNumber] = useState("");

  return (
    <div>
      <h2>Cartão (à vista)</h2>
      <p>Total: R${total.toFixed(2)}</p>

      <input
        placeholder="Número do cartão"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button>Pagar</button>
    </div>
  );
}