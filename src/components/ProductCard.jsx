import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        width: "250px"
      }}>
        <img 
          src={product.image} 
          alt={product.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />

        <h3 style={{ margin: "8px 0" }}>{product.title}</h3>

        <p><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
