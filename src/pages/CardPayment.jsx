import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function CardPayment({ total }) {
  const [number, setNumber] = useState("");

  return (
    <div>
      <div className="flex align-items-center gap-2 mb-3">
        <i className="pi pi-credit-card text-3xl" style={{ color: 'var(--primary-color)' }}></i>
        <h2 className="text-2xl font-bold m-0">Cartão de Crédito</h2>
      </div>

      <div className="surface-100 p-3 border-round mb-4">
        <div className="flex justify-content-between align-items-center">
          <span className="text-color-secondary">Total a pagar:</span>
          <span className="text-2xl font-bold text-primary">R${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-column gap-4">
        <div className="field">
          <label htmlFor="cardNumberVista" className="block mb-2 font-semibold">
            <i className="pi pi-credit-card mr-2"></i>
            Número do Cartão
          </label>
          <InputText
            id="cardNumberVista"
            placeholder="0000 0000 0000 0000"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full"
            maxLength={19}
          />
        </div>

        <div className="flex align-items-center gap-2 p-3 surface-50 border-round text-sm text-color-secondary">
          <i className="pi pi-shield text-green-500"></i>
          <span>Pagamento à vista • Sem juros</span>
        </div>

        <Button 
          label="Pagar Agora" 
          icon="pi pi-check-circle" 
          className="w-full"
          size="large"
          severity="success"
        />
      </div>
    </div>
  );
}