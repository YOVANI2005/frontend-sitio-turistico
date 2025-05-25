import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const AdminPanel = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'guia' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    cargarGuias();
  }, []);

  const cargarGuias = () => {
    api.get('/users')
      .then(res => {
        const guias = res.data.filter(u => u.rol === 'guia');
        setUsuarios(guias);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      api.put(`/users/${editId}`, form)
        .then(() => {
          setEditId(null);
          setForm({ nombre: '', email: '', password: '', rol: 'guia' });
          cargarGuias();
        });
    } else {
      api.post('/auth/register', form)
        .then(() => {
          setForm({ nombre: '', email: '', password: '', rol: 'guia' });
          cargarGuias();
        });
    }
  };

  const handleEdit = (guia) => {
    setForm({ nombre: guia.nombre, email: guia.email, password: '', rol: guia.rol });
    setEditId(guia.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este guía?')) {
      api.delete(`/users/${id}`)
        .then(() => cargarGuias());
    }
  };

  if (usuario.rol !== 'administrador') return <p className="container">Acceso denegado.</p>;

  return (
    <div className="container">
      <h2>Gestión de Guías</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>{' '}
                <button onClick={() => handleDelete(u.id)} style={{ backgroundColor: '#e74c3c' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h3>{editId ? 'Editar Guía' : 'Crear Nuevo Guía'}</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required={editId === null} />
        <button type="submit">{editId ? 'Actualizar' : 'Crear guía'}</button>
        {editId && <button type="button" onClick={() => {
          setEditId(null);
          setForm({ nombre: '', email: '', password: '', rol: 'guia' });
        }}>Cancelar</button>}
      </form>
    </div>
  );
};

export default AdminPanel;

