import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
    window.location.reload();
  };

  return (
    <header style={{
      backgroundColor: '#2c3e50',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <h2 style={{ margin: 0 }}>TayronaTours</h2>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        {!usuario && (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Iniciar sesión</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Registrarse</Link>
          </>
        )}
        {usuario && (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Perfil</Link>
            {usuario.rol === 'guia' && <Link to="/guia" style={{ color: 'white', textDecoration: 'none' }}>Guía</Link>}
            {usuario.rol === 'administrador' && <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>}
            <button onClick={handleLogout} style={{
              background: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '0.4rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Cerrar sesión</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
