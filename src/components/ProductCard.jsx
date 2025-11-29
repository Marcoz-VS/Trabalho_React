import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useRef();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);

    toast.current.show({
      severity: 'success',
      summary: 'Adicionado',
      life: 2000
    });
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);

    toast.current.show({
      severity: 'info',
      summary: 'Indo para o checkout',
      life: 1500
    });

    setTimeout(() => navigate('/checkout'), 300);
  };

  const header = (
    <img
      src={product.image}
      alt={product.title}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "contain",
        padding: "10px"
      }}
    />
  );

  const footer = (
    <div className="flex flex-column mt-3" style={{ gap: "8px" }}>
      <Button
        label="Adicionar ao carrinho"
        icon="pi pi-shopping-cart"
        className="p-button-sm p-button-outlined w-full"
        onClick={handleAddToCart}
      />

      <Button
        label="Comprar Agora"
        icon="pi pi-credit-card"
        className="p-button-sm w-full"
        onClick={handleBuyNow}
      />
    </div>
  );


  return (
    <>
      <Toast ref={toast} />

      <Card
        header={header}
        footer={footer}
        className="shadow-2 border-round-lg"
        style={{
          width: "260px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3
            className="mt-2 mb-2"
            style={{ fontSize: "1rem", fontWeight: "600", minHeight: "48px" }}
          >
            {product.title}
          </h3>

          <p style={{ margin: 0, fontSize: "1rem" }}>
            <strong>Preço:</strong> R${product.price.toFixed(2)}
          </p>
        </Link>
      </Card>
    </>
  );
}
