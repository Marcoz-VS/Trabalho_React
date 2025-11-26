import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getAllProducts, getProduct } from "../services/productService";

export default function PanelAdministrador() {
    const [productos, setPanelAdministrador] = useState([]);
    const [form, setForm] = useState({
        titulo: "",
        preco: "",
    // descricao: "", //Se não for necessário, pode ser removido
        categoria: "",
        imagem: "",
        quantidade: "",
        avaliacao: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/products", form);
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
        console.log(form);
    }

    return (
        <div>
            <h1>Panel Administrador</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" onChange={handleChange} />
                <input type="text" name="preco" onChange={handleChange} />
                <input type="text" name="categoria" onChange={handleChange} />
                <input type="text" name="imagem" onChange={handleChange} />
                <input type="text" name="quantidade" onChange={handleChange} />
                <input type="text" name="avaliacao" onChange={handleChange} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )

//boton al centro del web site

    const style  = {
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
}