import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="home-hero-section">
        <div className="home-hero-image-container">
          <img src="/pyme.jpg" alt="Digitalización de pyme" className="home-hero-image" />
        </div>
        <h2 className="home-tagline">Armamos tu empresa, software y todo lo demás a la medida de tu pyme</h2>
        <div className="home-cta-primary">
          <Link to="/servicios" className="home-cta-link">Automatiza tu Pyme</Link>
        </div>
      </section>
      
      <section className="home-features-section">
        <h2 className="home-features-title">Características Destacadas</h2>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon">📱</div>
            <h3 className="home-feature-title">Diseño responsivo</h3>
            <p className="home-feature-description">Adaptado a celulares y todo tipo de dispositivos</p>
          </div>
          
          <div className="home-feature-card">
            <div className="home-feature-icon">🔗</div>
            <h3 className="home-feature-title">Integración con redes sociales</h3>
            <p className="home-feature-description">Conecta con tus clientes en todas las plataformas</p>
          </div>
          
          <div className="home-feature-card">
            <div className="home-feature-icon">⚙️</div>
            <h3 className="home-feature-title">Panel de administración</h3>
            <p className="home-feature-description">Personalizado para tus necesidades</p>
          </div>
        </div>
      </section>
      
      <section className="home-cta-section">
        <h2 className="home-cta-title">¿Listo para dar el salto digital?</h2>
        <div className="home-cta-buttons">
          <Link to="/contacto" className="home-cta-button home-cta-primary">Solicita tu cotización gratis</Link>
          <a href="https://wa.me/123456789?text=Hola%20,%20quiero%20digitalizar%20mi%20pyme%20con%20ustedes" 
             className="home-cta-button home-cta-secondary" 
             target="_blank" 
             rel="noopener noreferrer">
            Quiero digitalizar mi negocio
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;