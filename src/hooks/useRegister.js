import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../services/storage';

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
    setUser(formData);
    navigate('/');
    setError('');
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit
  };
};
