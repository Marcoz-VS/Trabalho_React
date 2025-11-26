import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

/* eslint-disable react-hooks/purity */
export default function PixPayment({ total }) {
  const chave = `${Math.random().toString(36).slice(2)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chave);
  };

  return (
    <div>
      <div className="flex align-items-center gap-2 mb-3">
        <i className="pi pi-qrcode text-3xl" style={{ color: 'var(--primary-color)' }}></i>
        <h2 className="text-2xl font-bold m-0">Pagamento via PIX</h2>
      </div>

      <div className="surface-100 p-3 border-round mb-4">
        <div className="flex justify-content-between align-items-center">
          <span className="text-color-secondary">Total a pagar:</span>
          <span className="text-2xl font-bold text-primary">R${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-column gap-4">
        <Message 
          severity="info" 
          text="Copie a chave PIX abaixo ou escaneie o QR Code para realizar o pagamento"
          className="w-full"
        />

        <div className="field">
          <label htmlFor="pixKey" className="block mb-2 font-semibold">
            <i className="pi pi-key mr-2"></i>
            Chave PIX
          </label>
          <div className="p-inputgroup">
            <InputText
              id="pixKey"
              value={chave}
              readOnly
              className="w-full"
            />
            <Button 
              icon="pi pi-copy" 
              onClick={copyToClipboard}
              tooltip="Copiar chave"
              tooltipOptions={{ position: 'top' }}
            />
          </div>
        </div>

        <div className="surface-50 p-4 border-round text-center">
          <div className="flex justify-content-center mb-3">
            <div className="border-3 border-primary p-4 border-round">
              <i className="pi pi-qrcode" style={{ fontSize: '4rem', color: 'var(--primary-color)' }}></i>
            </div>
          </div>
          <p className="text-sm text-color-secondary m-0">
            Escaneie este QR Code com seu aplicativo de banco
          </p>
        </div>

        <Message 
          severity="warn" 
          text="Relaxa, é tudo fictício! Nenhum pagamento real será processado."
          className="w-full"
        />

        <div className="flex align-items-center gap-2 p-3 surface-100 border-round text-sm">
          <i className="pi pi-clock text-blue-500"></i>
          <span className="text-color-secondary">Pagamento processado instantaneamente após confirmação</span>
        </div>
      </div>
    </div>
  );
}