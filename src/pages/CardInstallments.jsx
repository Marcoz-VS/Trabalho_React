import { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Toast } from 'primereact/toast';

export default function CardInstallments({ total }) {
  const [number, setNumber] = useState("");
  const [installments, setInstallments] = useState(1);
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const toast = useRef();

  const juros = 0.02;
  const totalComJuros = total * Math.pow(1 + juros, installments - 1);
  const parcela = totalComJuros / installments;

  const installmentOptions = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}x de R$${(totalComJuros / (i + 1)).toFixed(2)}`,
    value: i + 1
  }));

  const handlePayment = () => {
    if (!number || number.length < 16) {
      toast.current.show({ severity: 'warn', summary: 'Ops', detail: 'Cartão inválido.' });
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

      <div className="flex align-items-center gap-2 mb-3">
        <i className="pi pi-credit-card text-3xl" style={{ color: 'var(--primary-color)' }}></i>
        <h2 className="text-2xl font-bold m-0">Pagamento Parcelado</h2>
      </div>

      <div className="surface-100 p-3 border-round mb-4">
        <div className="flex align-items-center gap-2 text-color-secondary">
          <i className="pi pi-info-circle"></i>
          <span>Total original: <strong className="text-primary">R${total.toFixed(2)}</strong></span>
        </div>
      </div>

      <div className="flex flex-column gap-4">
        <div className="field">
          <label htmlFor="cardNumber" className="block mb-2 font-semibold">
            <i className="pi pi-credit-card mr-2"></i>
            Número do Cartão
          </label>
          <InputText
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full"
            maxLength={19}
          />
        </div>

        <div className="field">
          <label htmlFor="installments" className="block mb-2 font-semibold">
            <i className="pi pi-calendar mr-2"></i>
            Número de Parcelas
          </label>
          <Dropdown
            id="installments"
            value={installments}
            onChange={(e) => setInstallments(e.value)}
            options={installmentOptions}
            className="w-full"
            placeholder="Selecione o parcelamento"
          />
        </div>

        <Divider />

        <div className="surface-50 p-4 border-round">
          <div className="flex flex-column gap-3">
            <div className="flex justify-content-between align-items-center">
              <span className="text-color-secondary">
                <i className="pi pi-money-bill mr-2"></i>
                Valor por parcela:
              </span>
              <span className="text-2xl font-bold text-primary">R${parcela.toFixed(2)}</span>
            </div>

            <div className="flex justify-content-between align-items-center">
              <span className="text-color-secondary">
                <i className="pi pi-calculator mr-2"></i>
                Total com juros ({installments}x):
              </span>
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
