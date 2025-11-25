import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
