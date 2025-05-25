import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const GuiaPanel = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarTours();
  }, []);

  const cargarTours = () => {
    api.get('/tours')
      .then(res => {
        const propios = res.data.filter(t => t.guia_id === usuario.id);
        setTours(propios);
      })
      .catch(err => console.error('Error al cargar tours:', err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      api.put(`/tours/${editId}`, form)
        .then(() => {
          setForm({ nombre: '', descripcion: '', precio: '' });
          setEditId(null);
          cargarTours();
        });
    } else {
      api.post('/tours', form)
        .then(() => {
          setForm({ nombre: '', descripcion: '', precio: '' });
          cargarTours();
        });
    }
  };

  const handleEdit = (tour) => {
    setForm({ nombre: tour.nombre, descripcion: tour.descripcion, precio: tour.precio });
    setEditId(tour.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este tour?')) {
      api.delete(`/tours/${id}`).then(() => cargarTours());
    }
  };

  if (usuario.rol !== 'guia') return <p className="container">Acceso denegado.</p>;

  return (
    <div className="container">
      <h2>Mis Tours</h2>
      {tours.length === 0 && <p>No has creado ningún tour aún.</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>${t.precio}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Editar</button>{' '}
                <button onClick={() => handleDelete(t.id)} style={{ backgroundColor: '#e74c3c' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h3>{editId ? 'Editar Tour' : 'Crear Nuevo Tour'}</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required></textarea>
        <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && <button type="button" onClick={() => {
          setForm({ nombre: '', descripcion: '', precio: '' });
          setEditId(null);
        }}>Cancelar</button>}
      </form>
    </div>
  );
};

export default GuiaPanel;

