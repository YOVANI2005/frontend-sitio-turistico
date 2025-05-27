import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      setExito('✅ Registro exitoso. Redirigiendo...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000); // redirige después de 2 segundos
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>{exito}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
