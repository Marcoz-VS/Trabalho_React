import { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Toast } from 'primereact/toast';

const juros = 0.02;

// Verifica a bandeira do cartão
function getCardBrand(number) {
  const n = number.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-7])/.test(n)) return "MasterCard";
  if (/^3[47]/.test(n)) return "Amex";
  return "Other";
}

// Luhn
function luhnCheck(num) {
  const arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));

  const sum = arr.reduce((acc, val, idx) => {
    if (idx % 2 === 1) {
      let dbl = val * 2;
      if (dbl > 9) dbl -= 9;
      return acc + dbl;
    }
    return acc + val;
  }, 0);

  return sum % 10 === 0;
}

// Validade MM/AA
function validateExpiry(value) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;

  const [mm, yy] = value.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const current = new Date();
  const year = current.getFullYear() % 100;
  const month = current.getMonth() + 1;

  if (yy < year || (yy === year && mm < month)) return false;

  return true;
}

export default function CardInstallments({ total }) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [installments, setInstallments] = useState(1);

  const navigate = useNavigate();
  const { clearCart } = useCart();
  const toast = useRef();

  // Calcula as opções de parcelamento corretamente
  const installmentOptions = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const totalComJurosLocal = total * Math.pow(1 + juros, n - 1);
    const parcelaLocal = totalComJurosLocal / n;

    return {
      label: `${n}x de R$${parcelaLocal.toFixed(2)}`,
      value: n,
      totalComJurosLocal,
      parcelaLocal
    };
  });

  const selected = installmentOptions.find(o => o.value === installments);

  const totalComJuros = selected.totalComJurosLocal;
  const parcela = selected.parcelaLocal;

  const handleNumberChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    const withSpaces = clean.replace(/(.{4})/g, "$1 ").trim();
    setNumber(withSpaces.substring(0, 19));
  };

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 4) v = v.substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + "/" + v.substring(2);
    setExpiry(v);
  };

  const handleCvcChange = (e) => {
    let clean = e.target.value.replace(/\D/g, "");
    clean = clean.substring(0, 4);
    setCvc(clean);
  };

  const handlePayment = () => {
    const clean = number.replace(/\D/g, "");
    const brand = getCardBrand(clean);

    if (clean.length < 13 || clean.length > 19 || !luhnCheck(clean)) {
      toast.current.show({ severity: 'warn', summary: 'Ops', detail: 'Número de cartão inválido.' });
      return;
    }

    if (!validateExpiry(expiry)) {
      toast.current.show({ severity: 'warn', summary: 'Ops', detail: 'Data de validade inválida.' });
      return;
    }

    if ((brand === "Amex" && cvc.length !== 4) || (brand !== "Amex" && cvc.length !== 3)) {
      toast.current.show({ severity: 'warn', summary: 'Ops', detail: 'CVC inválido.' });
      return;
    }

    toast.current.show({ severity: 'success', summary: 'Pagamento aprovado', detail: 'Compra parcelada realizada!' });

    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div>
      <Toast ref={toast} />

      <h2 className="text-2xl font-bold mb-3">Pagamento Parcelado</h2>

      <div className="surface-100 p-3 border-round mb-4">
        <span className="text-color-secondary">
          Total original: <strong className="text-primary">R${total.toFixed(2)}</strong>
        </span>
      </div>

      <div className="flex flex-column gap-4">
        <div className="field">
          <label className="block mb-2 font-semibold">Número do Cartão</label>
          <InputText
            placeholder="0000 0000 0000 0000"
            value={number}
            onChange={handleNumberChange}
            className="w-full"
            maxLength={19}
          />
        </div>

        <div className="field">
          <label className="block mb-2 font-semibold">Validade (MM/AA)</label>
          <InputText
            placeholder="MM/AA"
            value={expiry}
            onChange={handleExpiryChange}
            className="w-full"
            maxLength={5}
          />
        </div>

        <div className="field">
          <label className="block mb-2 font-semibold">CVC</label>
          <InputText
            placeholder="123"
            value={cvc}
            onChange={handleCvcChange}
            className="w-full"
            maxLength={4}
          />
        </div>

        <div className="field">
          <label className="block mb-2 font-semibold">Número de Parcelas</label>
          <Dropdown
            value={installments}
            onChange={(e) => setInstallments(e.value)}
            options={installmentOptions}
            className="w-full"
          />
        </div>

        <Divider />

        <div className="surface-50 p-4 border-round">
          <div className="flex flex-column gap-3">
            <div className="flex justify-content-between">
              <span className="text-color-secondary">Valor por parcela:</span>
              <span className="text-2xl font-bold text-primary">R${parcela.toFixed(2)}</span>
            </div>

            <div className="flex justify-content-between">
              <span className="text-color-secondary">Total com juros:</span>
              <span className="text-xl font-semibold">R${totalComJuros.toFixed(2)}</span>
            </div>

            {installments > 1 && (
              <div className="flex align-items-center gap-2 text-orange-600 text-sm">
                <i className="pi pi-exclamation-triangle"></i>
                <span>Juros de 2% ao mês aplicados</span>
              </div>
            )}
          </div>
        </div>

        <Button
          label="Confirmar Pagamento"
          icon="pi pi-check"
          className="w-full"
          size="large"
          severity="success"
          onClick={handlePayment}
        />
      </div>
    </div>
  );
}