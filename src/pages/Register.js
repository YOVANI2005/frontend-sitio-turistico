import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'publico'  // Fijamos el rol sin permitir cambiarlo
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        {/* Campo oculto para enviar el rol como 'publico' */}
        <input type="hidden" name="rol" value="publico" />
        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
