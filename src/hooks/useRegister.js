import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser, getUser } from '../services/storage';

export const useRegister = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // já tem usuário no localStorage?
    const existing = getUser();
    if (existing) {
      setError('Já existe um usuário cadastrado nesta máquina');
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      setError('Preencha todos os campos');
      return;
    }

    // salva
    setUser(formData);
    navigate('/');
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit
  };
};
