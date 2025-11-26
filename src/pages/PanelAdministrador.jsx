import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getAllProducts, getProduct } from "../services/productService";

export default function PanelAdministrador() {
    const [productos, setProductos] = useState([]); 
    const [form, setForm] = useState({
        titulo: "",
        preco: "",
        categoria: "",
        imagem: "",
        quantidade: "",
        avaliacao: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/products", form);
            console.log("Produto adicionado:", response.data); 
            setForm({
                titulo: "",
                preco: "",
                categoria: "",
                imagem: "",
                quantidade: "",
                avaliacao: "",
            });
        } catch (e) {
            console.error("Erro ao adicionar produto:", e); 
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }

    return (
        <div style={style}>
            <h1>Panel Administrador</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
                <input type="text" name="preco" placeholder="Preço" value={form.preco} onChange={handleChange} />
                <input type="text" name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
                <input type="text" name="imagem" placeholder="URL da Imagem" value={form.imagem} onChange={handleChange} />
                <input type="text" name="quantidade" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} />
                <input type="text" name="avaliacao" placeholder="Avaliação" value={form.avaliacao} onChange={handleChange} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}