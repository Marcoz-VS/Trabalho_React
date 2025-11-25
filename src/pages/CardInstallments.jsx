import { useState } from "react";

export default function CardInstallments({ total }) {
  const [number, setNumber] = useState("");
  const [installments, setInstallments] = useState(1);

  const juros = 0.02; // 2% ao mês

  const totalComJuros = total * Math.pow(1 + juros, installments - 1);
  const parcela = totalComJuros / installments;

  return (
    <div>
      <h2>Pagamento parcelado</h2>
      <p>Total original: R${total.toFixed(2)}</p>

      <label>Número do cartão:</label>
      <input
        placeholder="Número do cartão"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <label>Parcelamento:</label>
      <select
        value={installments}
        onChange={(e) => setInstallments(Number(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
          <option key={n} value={n}>{n}x</option>
        ))}
      </select>

      <p>Valor por parcela: R${parcela.toFixed(2)}</p>
      <p>Total com juros: R${totalComJuros.toFixed(2)}</p>

      <button>Confirmar Pagamento</button>
    </div>
  );
}
