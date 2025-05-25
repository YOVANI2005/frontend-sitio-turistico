import React from 'react';

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <div>
      <h2>Bienvenido, {usuario?.nombre}</h2>
      <p>Rol: {usuario?.rol}</p>
      <button onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/';
      }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
