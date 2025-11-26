import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../services/storage";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = getUsers();
        const found = users.find(u => u.username === formData.username);

        if (!found) {
            setError("Nenhum usuário cadastrado");
            return;
        }

        if (found.username !== formData.username) {
            setError("Usuário não encontrado");
            return;
        }

        if (found.password !== formData.password) {
            setError("Senha incorreta");
            return;
        }

        login(found);
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>

                <p style={{ marginTop: "1rem" }}>
                    Não tem conta criada? Vai se cadastrar <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
