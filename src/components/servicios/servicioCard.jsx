import React from 'react';
import './servicios.css';

// Componente para las tarjetas de servicios
const ServicioCard = ({ icono, titulo, descripcion, categoria, precio, onAgregar, agregando }) => {
  return (
    <div className="servicios-item-card">
      <div className="servicios-item-icon">{icono}</div>
      <h3 className="servicios-item-title">{titulo}</h3>
      <p className="servicios-item-description">{descripcion}</p>
      <button 
        className="servicios-add-to-cart" 
        onClick={() => onAgregar(titulo, categoria, precio)}
        disabled={agregando}
      >
        {agregando ? 'Agregando...' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ServicioCard;
