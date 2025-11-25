/* eslint-disable react-hooks/purity */
export default function PixPayment({ total }) {
  const chave = `chave-pix-fake-${Math.random().toString(36).slice(2)}`;

  return (
    <div>
      <h2>Pagamento via PIX</h2>
      <p>Total: R${total.toFixed(2)}</p>
      <p>Chave PIX:</p>
      <input value={chave} readOnly style={{ width: "100%" }} />
      <p>Use essa chave para “pagar”. Relaxa, é tudo fictício.</p>
    </div>
  );
}
