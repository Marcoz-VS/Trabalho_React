import GoBack from './GoBack';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';

export default function ProductDetails({ product, onAddToCart }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="surface-ground" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-3">
          <GoBack />
        </div>

        <Card className="shadow-3">
          <div className="grid">
            {/* Coluna da Imagem */}
            <div className="col-12 md:col-5">
              <div 
                className="flex align-items-center justify-content-center surface-50 border-round p-4"
                style={{ minHeight: '400px' }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ 
                    width: "100%", 
                    maxHeight: "400px", 
                    objectFit: "contain" 
                  }}
                />
              </div>
            </div>

            {/* Coluna das Informações */}
            <div className="col-12 md:col-7">
              <div className="flex flex-column gap-3">
                {/* Categoria */}
                <div>
                  <Badge 
                    value={product.category} 
                    severity="info"
                  />
                </div>

                {/* Título */}
                <h1 className="text-4xl font-bold m-0 line-height-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex align-items-center gap-3">
                  <Rating 
                    value={product.rating.rate} 
                    readOnly 
                    cancel={false}
                  />
                  <span className="text-color-secondary">
                    <strong>{product.rating.rate}</strong> ({product.rating.count} avaliações)
                  </span>
                </div>

                <Divider />

                {/* Preço */}
                <div className="flex align-items-center gap-3">
                  <span className="text-5xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                {/* Informações Adicionais */}
                <div className="surface-50 p-3 border-round">
                  <div className="flex flex-column gap-2">
                    <div className="flex align-items-center gap-2 text-color-secondary">
                      <i className="pi pi-shield text-green-500"></i>
                      <span>Compra 100% segura</span>
                    </div>
                    <div className="flex align-items-center gap-2 text-color-secondary">
                      <i className="pi pi-truck text-blue-500"></i>
                      <span>Frete grátis para todo o Brasil</span>
                    </div>
                    <div className="flex align-items-center gap-2 text-color-secondary">
                      <i className="pi pi-replay text-orange-500"></i>
                      <span>Devolução grátis em 30 dias</span>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Botões de Ação */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    label="Adicionar ao Carrinho"
                    icon="pi pi-shopping-cart"
                    onClick={() => onAddToCart(product)}
                    className="flex-1"
                    size="large"
                    outlined
                  />
                  <Button
                    label="Comprar Agora"
                    icon="pi pi-bolt"
                    onClick={handleBuyNow}
                    className="flex-1"
                    size="large"
                    severity="success"
                  />
                </div>

                {/* Descrição (se houver) */}
                {product.description && (
                  <>
                    <Divider />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Descrição do Produto</h3>
                      <p className="text-color-secondary line-height-3">
                        {product.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}