import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './carrito.css';
import { useCarrito } from '../../context/CarritoContext';

const Carrito = () => {
  const { items, loading, error, total, actualizarCantidad, eliminarItem, vaciarCarrito, procesarCompra } = useCarrito();
  const [mensajeCompra, setMensajeCompra] = useState({ mostrar: false, texto: '', tipo: '' });
  
  // Manejar la finalización de compra
  const handleProcesarCompra = async () => {
    const resultado = await procesarCompra();
    
    setMensajeCompra({
      mostrar: true,
      texto: resultado.message,
      tipo: resultado.success ? 'exito' : 'error'
    });
    
    if (resultado.success) {
      // Ocultar el mensaje después de 5 segundos si fue exitoso
      setTimeout(() => {
        setMensajeCompra({ mostrar: false, texto: '', tipo: '' });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="carrito-container">
        <h2 className="carrito-titulo">Carrito de Compras</h2>
        <p className="carrito-cargando">Cargando carrito...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carrito-container">
        <h2 className="carrito-titulo">Carrito de Compras</h2>
        <div className="carrito-mensaje carrito-mensaje-error">{error}</div>
        <Link to="/servicios" className="carrito-volver-btn">Seguir comprando</Link>
      </div>
    );
  }
  
  if (mensajeCompra.mostrar) {
    return (
      <div className="carrito-container">
        <h2 className="carrito-titulo">Carrito de Compras</h2>
        <div className={`carrito-mensaje ${mensajeCompra.tipo === 'error' ? 'carrito-mensaje-error' : 'carrito-mensaje-exito'}`}>
          {mensajeCompra.texto}
        </div>
        <Link to="/servicios" className="carrito-volver-btn">Volver a Servicios</Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      
      {items.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
          <Link to="/servicios" className="carrito-volver-btn">Ver Servicios</Link>
        </div>
      ) : (
        <>
          <div className="carrito-items">
            {items.map(item => (
              <div key={item.id} className="carrito-item">
                <div className="carrito-item-info">
                  <h3 className="carrito-item-nombre">{item.nombre}</h3>
                  <p className="carrito-item-categoria">{item.categoria}</p>
                  <p className="carrito-item-precio">${item.precio.toLocaleString()}</p>
                </div>
                
                <div className="carrito-item-acciones">
                  <div className="carrito-item-cantidad">
                    <button 
                      className="carrito-cantidad-btn"
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button 
                      className="carrito-cantidad-btn"
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="carrito-eliminar-btn"
                    onClick={() => eliminarItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carrito-resumen">
            <div className="carrito-total">
              <h3>Total:</h3>
              <p>${total.toLocaleString()}</p>
            </div>
            
            <div className="carrito-botones">
              <button 
                className="carrito-vaciar-btn"
                onClick={vaciarCarrito}
              >
                Vaciar Carrito
              </button>
              
              <button 
                className="carrito-comprar-btn"
                onClick={handleProcesarCompra}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;