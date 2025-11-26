import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';

function Register() {
    const { formData, error, handleChange, handleSubmit } = useRegister();

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
                                <i className="pi pi-user-plus" style={{ fontSize: '2rem' }}></i>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold m-0 mb-2">Criar Conta</h2>
                        <p className="text-color-secondary m-0">Preencha os dados para se cadastrar</p>
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
                    <div onSubmit={handleSubmit} className="flex flex-column gap-4">
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
                                placeholder="Escolha um nome de usuário"
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="block mb-2 font-semibold">
                                <i className="pi pi-envelope mr-2"></i>
                                E-mail
                            </label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
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
                                placeholder="Crie uma senha segura"
                                className="w-full"
                                inputClassName="w-full"
                                toggleMask
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                required
                            />
                        </div>

                        <Button 
                            type="submit"
                            onClick={handleSubmit}
                            label="Cadastrar" 
                            icon="pi pi-user-plus"
                            className="w-full"
                            size="large"
                        />
                    </div>

                    <Divider />

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-color-secondary m-0">
                            Já tem uma conta?{' '}
                            <Link 
                                to="/login" 
                                style={{ 
                                    color: 'var(--primary-color)', 
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                                className="hover:underline"
                            >
                                Faça login
                            </Link>
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 p-3 surface-50 border-round">
                        <div className="flex flex-column gap-2">
                            <div className="flex align-items-center gap-2 text-sm text-color-secondary">
                                <i className="pi pi-shield text-green-500"></i>
                                <span>Seus dados estão seguros e protegidos</span>
                            </div>
                            <div className="flex align-items-center gap-2 text-sm text-color-secondary">
                                <i className="pi pi-check-circle text-blue-500"></i>
                                <span>Cadastro rápido e gratuito</span>
                            </div>
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

export default Register;