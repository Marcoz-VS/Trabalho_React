import GoBack from './GoBack'
export default function ProductDetails({ product, onAddToCart }) {
  return (
    <div>
      <img 
        src={product.image} 
        alt={product.title}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
      />

      <h1>{product.title}</h1>

      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
      <p>
        ⭐ {product.rating.rate} ({product.rating.count} avaliações)
      </p>

      <GoBack/>
      <button onClick={() => onAddToCart(product)}>Adicionar ao carrinho</button>
    </div>
  );
}
