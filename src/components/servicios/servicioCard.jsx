import React from 'react';
import { useCarrito } from '../../context/CarritoContext';
import './servicios.css';

// Componente para las tarjetas de servicios
const ServicioCard = ({ icono, titulo, descripcion, categoria, precio, onAgregar, agregando }) => {
  const { isInCart, getCartItem } = useCarrito();
  const enCarrito = isInCart(categoria, titulo);
  const itemCarrito = enCarrito ? getCartItem(categoria, titulo) : null;
  return (
    <div className="servicios-item-card">
      <div className="servicios-item-icon">{icono}</div>
      <h3 className="servicios-item-title">{titulo}</h3>
      <p className="servicios-item-description">{descripcion}</p>
      {enCarrito ? (
        <div className="servicios-in-cart">
          <span className="servicios-in-cart-text">En carrito: {itemCarrito?.cantidad}</span>
          <button 
            className="servicios-add-more" 
            onClick={() => onAgregar(titulo, categoria, precio)}
            disabled={agregando}
          >
            {agregando ? 'Agregando...' : '+ Agregar más'}
          </button>
        </div>
      ) : (
        <button 
          className="servicios-add-to-cart" 
          onClick={() => onAgregar(titulo, categoria, precio)}
          disabled={agregando}
        >
          {agregando ? 'Agregando...' : 'Agregar al carrito'}
        </button>
      )}
    </div>
  );
};

export default ServicioCard;
