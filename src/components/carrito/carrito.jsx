import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './carrito.css';
import { db, addDocument, getDocuments, updateDocument, deleteDocument } from '../../firebase/config';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  // Cargar items del carrito desde Firestore
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        setLoading(true);
        const carritoItems = await getDocuments('carrito');
        setItems(carritoItems);
        calcularTotal(carritoItems);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        setError('No se pudo cargar el carrito. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    cargarCarrito();
  }, []);

  // Calcular el total del carrito
  const calcularTotal = (items) => {
    const nuevoTotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    setTotal(nuevoTotal);
  };

  // Actualizar cantidad de un item
  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const itemActualizado = { ...items[itemIndex], cantidad: nuevaCantidad };
        await updateDocument('carrito', id, { cantidad: nuevaCantidad });
        
        const nuevosItems = [...items];
        nuevosItems[itemIndex] = itemActualizado;
        setItems(nuevosItems);
        calcularTotal(nuevosItems);
      }
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      setError('No se pudo actualizar el producto. Intente nuevamente.');
    }
  };

  // Eliminar un item del carrito
  const eliminarItem = async (id) => {
    try {
      await deleteDocument('carrito', id);
      const nuevosItems = items.filter(item => item.id !== id);
      setItems(nuevosItems);
      calcularTotal(nuevosItems);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setError('No se pudo eliminar el producto. Intente nuevamente.');
    }
  };

  // Vaciar el carrito
  const vaciarCarrito = async () => {
    try {
      // Eliminar todos los documentos del carrito
      const promesas = items.map(item => deleteDocument('carrito', item.id));
      await Promise.all(promesas);
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      setError('No se pudo vaciar el carrito. Intente nuevamente.');
    }
  };

  // Procesar la compra
  const procesarCompra = async () => {
    try {
      // Aquí se podría implementar la lógica para procesar la compra
      // Por ejemplo, crear un documento de pedido y vaciar el carrito
      await addDocument('pedidos', {
        items: items,
        total: total,
        fecha: new Date(),
        estado: 'pendiente'
      });
      
      await vaciarCarrito();
      alert('¡Compra realizada con éxito! Nos pondremos en contacto contigo pronto.');
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      setError('No se pudo procesar la compra. Intente nuevamente.');
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
        <p className="carrito-error">{error}</p>
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
                onClick={procesarCompra}
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