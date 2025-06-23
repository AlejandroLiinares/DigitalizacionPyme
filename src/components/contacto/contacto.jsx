import React, { useState } from 'react';
import './contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('Gracias por contactarnos. Te responderemos a la brevedad.');
    // Resetear el formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  return (
    <div className="contacto-container">
      <section className="contacto-hero-section">
        <h1 className="contacto-title">Contáctanos</h1>
        <p className="contacto-subtitle">Estamos aquí para ayudarte a digitalizar tu negocio</p>
      </section>
      
      <section className="contacto-form-section">
        <div className="contacto-form-container">
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="contacto-form-group">
              <label className="contacto-form-label" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="contacto-form-input"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="contacto-form-group">
              <label className="contacto-form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="contacto-form-input"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="contacto-form-group">
              <label className="contacto-form-label" htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="contacto-form-input"
                placeholder="+56 9 XXXX XXXX"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="contacto-form-group">
              <label className="contacto-form-label" htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="contacto-form-textarea"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="contacto-form-submit">Enviar mensaje</button>
          </form>
        </div>
        
        <div className="contacto-info-container">
          <div className="contacto-info-card">
            <h3 className="contacto-info-title">Información de contacto</h3>
            <div className="contacto-info-item">
              <span className="contacto-info-icon">📧</span>
              <p className="contacto-info-text">info@digitalizacionpymes.cl</p>
            </div>
            <div className="contacto-info-item">
              <span className="contacto-info-icon">📱</span>
              <p className="contacto-info-text">+56 9 XXXX XXXX</p>
            </div>
            <div className="contacto-info-item">
              <span className="contacto-info-icon">🕒</span>
              <p className="contacto-info-text">Lunes a Viernes: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;