import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        getProduct(id).then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Carregando...</p>;

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
            <button onClick={() => navigation(-1)}>
                Voltar
            </button>
        </div>
    )
}