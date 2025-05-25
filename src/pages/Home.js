import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import './Home.css';

const Home = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    api.get('/tours').then(res => setTours(res.data));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Bienvenido a TayronaTours</h1>
          <p>Descubre los lugares más hermosos de nuestro país con guías expertos.</p>
          <img src="https://source.unsplash.com/800x300/?tayrona,beach,nature" alt="Tayrona" />
        </div>
      </section>

      <section className="about">
        <h2>Acerca del Parque Tayrona</h2>
        <p>El Parque Tayrona es uno de los destinos naturales más impresionantes de Colombia. Con playas vírgenes, selva tropical y montañas, es el lugar ideal para desconectarte del mundo y conectar con la naturaleza.</p>
        <img
          src="https://source.unsplash.com/800x300/?tayrona,park"
          alt="Parque Tayrona"
          className="about-image"
        style={{ width: '50%', borderRadius: '10px', marginTop: '1rem' }}
        />
      </section>

      <section className="contacto">
        <h2>¿Buscas guía para tu aventura?</h2>
        <p>Contáctanos para que un guía especializado te acompañe en tu próxima experiencia.</p>
        <a href="/register"><button>Contactar a un guía</button></a>
      </section>

      <section className="tours">
        <h2>Tours Disponibles</h2>
        <div className="tour-grid">
          {tours.map(t => (
            <div key={t.id} className="tour-card">
              <img
              src={`https://source.unsplash.com/400x200/?${t.nombre},tour`}ss
              alt=""
              style={{ width: '%', borderRadius: '10px', marginTop: '1rem' }}
              />
              <img src={`https://source.unsplash.com/400x200/?nature,travel,${t.id}`} alt={t.nombre} />
              <h3>{t.nombre}</h3>
              <p>{t.descripcion}</p>
              <p><strong>Precio:</strong> ${t.precio}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 TayronaTours. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
