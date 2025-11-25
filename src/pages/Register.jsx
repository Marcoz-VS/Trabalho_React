import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

function Register() {
    const { formData, error, handleChange, handleSubmit } = useRegister();

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
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
                    <button type="submit">Cadastrar</button>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    Já criou uma conta? Vai fazer login <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
