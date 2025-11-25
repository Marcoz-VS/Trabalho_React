import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    Não tem conta criada? Vai se cadastrar <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
