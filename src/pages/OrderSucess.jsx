import { Button } from "primereact/button";

export default function OrderSuccess() {
  return (
    <div className="flex flex-column justify-content-center align-items-center p-4" style={{ minHeight: "70vh" }}>
      
      <div className="text-center mb-4">
        <i className="pi pi-check-circle text-green-500" style={{ fontSize: "5rem" }}></i>
        <h1 className="text-3xl font-bold mt-3">Pagamento Concluído</h1>
        <p className="text-color-secondary mt-2 text-lg" style={{ maxWidth: 350 }}>
          Sua compra foi processada com sucesso. O pedido já está sendo preparado.
        </p>
      </div>

      <Button
        label="Voltar para a Home"
        icon="pi pi-home"
        severity="primary"
        className="p-3 mt-2"
        onClick={() => window.location.href = "/"}
      />
    </div>
  );
}
