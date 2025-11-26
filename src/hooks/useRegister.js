// src/hooks/useRegister.js
import { useState } from 'react';
import { getUsers, addUser } from "../services/storage";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const users = getUsers();

    // Verifica username repetido
    const exists = users.some(u => u.username === formData.username);
    if (exists) {
      setError('Esse nome de usuário já está sendo usado');
      return;
    }

    // Cria o usuário no storage local
    addUser(formData);

    // Faz login automático
    login(formData);

    // Redireciona
    navigate('/');
  }

  return { formData, error, handleChange, handleSubmit };
}
