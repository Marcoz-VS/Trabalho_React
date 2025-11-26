import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../services/storage";
import { useAuth } from "../context/AuthContext";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';

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
        <div className="surface-ground flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="w-full" style={{ maxWidth: '450px' }}>
                <Card className="shadow-4">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <div className="flex justify-content-center mb-3">
                            <div 
                                className="flex align-items-center justify-content-center border-circle"
                                style={{ 
                                    width: '4rem', 
                                    height: '4rem', 
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white'
                                }}
                            >
                                <i className="pi pi-user" style={{ fontSize: '2rem' }}></i>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold m-0 mb-2">Bem-vindo de volta!</h2>
                        <p className="text-color-secondary m-0">Entre com suas credenciais para continuar</p>
                    </div>

                    <Divider />

                    {/* Error Message */}
                    {error && (
                        <Message 
                            severity="error" 
                            text={error}
                            className="w-full mb-4"
                        />
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                        <div className="field">
                            <label htmlFor="username" className="block mb-2 font-semibold">
                                <i className="pi pi-user mr-2"></i>
                                Usuário
                            </label>
                            <InputText
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Digite seu usuário"
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password" className="block mb-2 font-semibold">
                                <i className="pi pi-lock mr-2"></i>
                                Senha
                            </label>
                            <Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite sua senha"
                                className="w-full"
                                inputClassName="w-full"
                                toggleMask
                                feedback={false}
                                required
                            />
                        </div>

                        <Button 
                            type="submit"
                            label="Entrar" 
                            icon="pi pi-sign-in"
                            className="w-full"
                            size="large"
                        />
                    </form>

                    <Divider />

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-color-secondary m-0">
                            Não tem uma conta?{' '}
                            <Link 
                                to="/register" 
                                style={{ 
                                    color: 'var(--primary-color)', 
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                                className="hover:underline"
                            >
                                Cadastre-se agora
                            </Link>
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 p-3 surface-50 border-round">
                        <div className="flex align-items-center gap-2 text-sm text-color-secondary">
                            <i className="pi pi-shield text-green-500"></i>
                            <span>Seus dados estão seguros e protegidos</span>
                        </div>
                    </div>
                </Card>

                {/* Back to Store Link */}
                <div className="text-center mt-4">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button 
                            label="Voltar para a loja" 
                            icon="pi pi-arrow-left"
                            text
                            className="text-color-secondary"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;