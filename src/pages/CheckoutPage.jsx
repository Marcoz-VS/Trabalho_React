import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';

import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import CardInstallments from "./CardInstallments";

export default function CheckoutPage() {
  const { items } = useCart();
  const [method, setMethod] = useState("");
  const { user } = useAuth();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const paymentMethods = [
    { label: "Selecione um método de pagamento...", value: "" },
    { label: "PIX (à vista)", value: "pix", icon: "pi pi-qrcode" },
    { label: "Cartão (à vista)", value: "card", icon: "pi pi-credit-card" },
    { label: "Cartão (parcelado)", value: "installments", icon: "pi pi-credit-card" }
  ];

  if (items.length === 0) {
    return (
      <div className="flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', padding: '2rem' }}>
        <i className="pi pi-shopping-bag" style={{ fontSize: '4rem', color: 'var(--text-color-secondary)', marginBottom: '1rem' }}></i>
        <h1 className="text-4xl font-bold mb-3">Checkout</h1>
        <p className="text-xl text-color-secondary mb-4">Seu carrinho está vazio.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button label="Voltar para os produtos" icon="pi pi-arrow-left" />
        </Link>
      </div>
    );
  }

  return (
    <div className="surface-ground" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header com informações do usuário */}
        <Card className="mb-4 shadow-2">
          <div className="flex align-items-center gap-3">
            <Avatar 
              label={user.username?.[0]?.toUpperCase()} 
              size="large" 
              shape="circle"
              style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
            />
            <div>
              <h1 className="text-3xl font-bold m-0 mb-2">Finalizar Compra</h1>
              <p className="text-color-secondary m-0">
                <i className="pi pi-user mr-2"></i>
                Comprando como: <strong>{user.username}</strong>
              </p>
            </div>
          </div>
        </Card>

        <div className="grid">
          {/* Coluna dos itens */}
          <div className="col-12 lg:col-7">
            <Card className="shadow-2 mb-4">
              <h3 className="text-2xl font-semibold mb-3 flex align-items-center">
                <i className="pi pi-shopping-cart mr-2" style={{ color: 'var(--primary-color)' }}></i>
                Itens do Carrinho
              </h3>
              <Divider />

              <div className="flex flex-column gap-3">
                {items.map((item) => (
                  <Card key={item.id} className="surface-50">
                    <div className="flex flex-column gap-2">
                      <h4 className="text-xl font-semibold m-0 mb-2">{item.title}</h4>
                      
                      <div className="grid text-color-secondary">
                        <div className="col-12 md:col-4 flex align-items-center gap-2">
                          <i className="pi pi-box"></i>
                          <span>Qtd: <strong>{item.quantity}</strong></span>
                        </div>
                        <div className="col-12 md:col-4 flex align-items-center gap-2">
                          <i className="pi pi-tag"></i>
                          <span>Unit: <strong>R${item.price.toFixed(2)}</strong></span>
                        </div>
                        <div className="col-12 md:col-4 flex align-items-center gap-2">
                          <i className="pi pi-calculator"></i>
                          <span>Subtotal: <strong className="text-primary">R${(item.price * item.quantity).toFixed(2)}</strong></span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Método de pagamento */}
            <Card className="shadow-2">
              <h3 className="text-2xl font-semibold mb-3 flex align-items-center">
                <i className="pi pi-wallet mr-2" style={{ color: 'var(--primary-color)' }}></i>
                Método de Pagamento
              </h3>
              <Divider />

              <Dropdown
                value={method}
                onChange={(e) => setMethod(e.value)}
                options={paymentMethods}
                placeholder="Selecione um método de pagamento..."
                className="w-full"
                itemTemplate={(option) => (
                  <div className="flex align-items-center gap-2">
                    {option.icon && <i className={option.icon}></i>}
                    <span>{option.label}</span>
                  </div>
                )}
              />

              {/* Renderização dos componentes de pagamento */}
              {method && (
                <div className="mt-4 p-3 surface-50 border-round">
                  {method === "pix" && <PixPayment total={total} />}
                  {method === "card" && <CardPayment total={total} />}
                  {method === "installments" && <CardInstallments total={total} />}
                </div>
              )}
            </Card>
          </div>

          {/* Coluna do resumo */}
          <div className="col-12 lg:col-5">
            <Card className="shadow-3 sticky" style={{ top: '2rem' }}>
              <h3 className="text-2xl font-bold mb-3">Resumo do Pedido</h3>
              <Divider />
              
              <div className="flex flex-column gap-3">
                <div className="flex justify-content-between align-items-center">
                  <span className="text-lg text-color-secondary">Itens:</span>
                  <span className="text-lg font-semibold">{items.length}</span>
                </div>

                <div className="flex justify-content-between align-items-center">
                  <span className="text-lg text-color-secondary">Subtotal:</span>
                  <span className="text-xl">R${total.toFixed(2)}</span>
                </div>

                <Divider />

                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round">
                  <span className="text-2xl font-bold">Total:</span>
                  <span className="text-3xl font-bold text-primary">R${total.toFixed(2)}</span>
                </div>

                <Divider />

                <div className="flex flex-column gap-2">
                  <div className="flex align-items-center gap-2 text-color-secondary">
                    <i className="pi pi-shield text-green-500"></i>
                    <span className="text-sm">Compra 100% segura</span>
                  </div>
                  <div className="flex align-items-center gap-2 text-color-secondary">
                    <i className="pi pi-truck text-blue-500"></i>
                    <span className="text-sm">Entrega rápida</span>
                  </div>
                  <div className="flex align-items-center gap-2 text-color-secondary">
                    <i className="pi pi-replay text-orange-500"></i>
                    <span className="text-sm">Fácil devolução</span>
                  </div>
                </div>
              </div>

              <Divider />

              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Button 
                  label="Voltar ao Carrinho" 
                  icon="pi pi-arrow-left" 
                  className="w-full"
                  outlined
                />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}