import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required />
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
