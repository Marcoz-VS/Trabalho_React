import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';

export default function CartPage() {
  const { items, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', padding: '2rem' }}>
        <i className="pi pi-shopping-cart" style={{ fontSize: '4rem', color: 'var(--text-color-secondary)', marginBottom: '1rem' }}></i>
        <h1 className="text-4xl font-bold mb-3">Carrinho</h1>
        <p className="text-xl text-color-secondary mb-4">Seu carrinho está vazio.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button label="Voltar para os produtos" icon="pi pi-arrow-left" />
        </Link>
      </div>
    );
  }

  return (
    <div className="surface-ground" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex align-items-center mb-4">
          <i className="pi pi-shopping-cart text-4xl mr-3" style={{ color: 'var(--primary-color)' }}></i>
          <h1 className="text-4xl font-bold m-0">Carrinho</h1>
          <Badge value={items.length} severity="info" className="ml-3" style={{ fontSize: '1rem' }}></Badge>
        </div>

        <div className="grid">
          <div className="col-12 lg:col-8">
            {items.map(item => (
              <Card key={item.id} className="mb-3 shadow-2">
                <div className="flex flex-column md:flex-row gap-4">
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="text-2xl font-semibold mb-2 hover:text-primary cursor-pointer transition-colors transition-duration-200">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="text-color-secondary mb-3">
                      <div className="flex align-items-center gap-2 mb-2">
                        <i className="pi pi-tag"></i>
                        <span>Preço unitário: <strong>R${item.price.toFixed(2)}</strong></span>
                      </div>
                      <div className="flex align-items-center gap-2 mb-2">
                        <i className="pi pi-box"></i>
                        <span>Quantidade: <strong>{item.quantity}</strong></span>
                      </div>
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-calculator"></i>
                        <span>Subtotal: <strong className="text-primary">R${(item.price * item.quantity).toFixed(2)}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        label="Adicionar mais 1" 
                        icon="pi pi-plus" 
                        onClick={() => addToCart(item)}
                        severity="success"
                        size="small"
                      />
                      <Button 
                        label="Remover 1" 
                        icon="pi pi-minus" 
                        onClick={() => removeFromCart(item.id)}
                        severity="danger"
                        outlined
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="col-12 lg:col-4">
            <Card className="shadow-3 sticky" style={{ top: '2rem' }}>
              <h2 className="text-2xl font-bold mb-3">Resumo do Pedido</h2>
              <Divider />
              
              <div className="flex justify-content-between align-items-center mb-3">
                <span className="text-lg text-color-secondary">Subtotal:</span>
                <span className="text-xl">R${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-content-between align-items-center mb-4">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-primary">R${total.toFixed(2)}</span>
              </div>

              <Divider />

              {items.length > 0 && (
                <Button 
                  label="Finalizar Compra" 
                  icon="pi pi-check" 
                  onClick={() => navigate("/checkout")}
                  className="w-full mb-3"
                  size="large"
                  severity="success"
                />
              )}
              
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button 
                  label="Continuar Comprando" 
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