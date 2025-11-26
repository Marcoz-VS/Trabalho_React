import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <Card className="shadow-2 hover:shadow-4 transition-duration-200 h-full flex flex-column">
      <Link 
        to={`/product/${product.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
        className="flex flex-column flex-1"
      >
        {/* Imagem do Produto */}
        <div className="flex align-items-center justify-content-center mb-3" style={{ height: '200px' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ 
              width: "100%", 
              height: "200px", 
              objectFit: "contain",
              transition: 'transform 0.3s'
            }}
            className="hover:scale-105"
          />
        </div>

        {/* Título do Produto */}
        <h3 
          className="text-lg font-semibold mb-2 line-height-3" 
          style={{ 
            minHeight: '3rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.title}
        </h3>

        {/* Preço */}
        <div className="flex align-items-center gap-2 mb-3">
          <Tag 
            value={`R$ ${product.price.toFixed(2)}`} 
            severity="success"
            style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          />
        </div>
      </Link>

      {/* Botões */}
      <div className="flex flex-column gap-2 mt-auto">
        <Button
          label="Adicionar ao Carrinho"
          icon="pi pi-shopping-cart"
          onClick={handleAddToCart}
          className="w-full"
          outlined
        />
        <Button
          label="Comprar Agora"
          icon="pi pi-bolt"
          onClick={handleBuyNow}
          className="w-full"
          severity="success"
        />
      </div>
    </Card>
  );
}