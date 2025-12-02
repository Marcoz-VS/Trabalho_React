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

    const exists = users.some(u => u.username === formData.username);
    if (exists) {
      setError('Esse nome de usuário já está sendo usado');
      return;
    }
    if (formData.password.length < 3) {
      setError('A senha deve ter pelo menos 3 caracteres');
      return;
    }
    
    // monta o usuário completo
    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user"
    };

    const createdUser = addUser(newUser);
    login(createdUser);
    navigate('/');
  }

  return { formData, error, handleChange, handleSubmit };
}
