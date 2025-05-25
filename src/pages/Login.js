import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
