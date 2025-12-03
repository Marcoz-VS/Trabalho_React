import { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Toast } from 'primereact/toast';

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

export default function CardPayment({ total }) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const navigate = useNavigate();
  const { clearCart } = useCart();
  const toast = useRef();

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

    toast.current.show({ severity: 'success', summary: 'Pagamento aprovado', detail: 'Obrigado pela compra!' });

    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div>
      <Toast ref={toast} />

      <h2 className="text-2xl font-bold mb-4">Cartão de Crédito</h2>

      <div className="surface-100 p-3 border-round mb-4">
        <div className="flex justify-content-between align-items-center">
          <span className="text-color-secondary">Total a pagar:</span>
          <span className="text-2xl font-bold text-primary">R${total.toFixed(2)}</span>
        </div>
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

        <Button
          label="Pagar Agora"
          icon="pi pi-check-circle"
          className="w-full"
          size="large"
          severity="success"
          onClick={handlePayment}
        />
      </div>
    </div>
  );
}
