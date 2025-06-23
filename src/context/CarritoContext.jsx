import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../firebase/config';

// Crear el contexto
export const CarritoContext = createContext();

// Hook personalizado para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Cargar items del carrito desde Firestore
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        setLoading(true);
        setError(null); // Limpiar errores anteriores
        const carritoItems = await getDocuments('carrito');
        
        // Verificar si los datos son válidos
        if (Array.isArray(carritoItems)) {
          setItems(carritoItems);
          calcularTotal(carritoItems);
          setItemCount(carritoItems.length);
        } else {
          console.error('Formato de datos incorrecto:', carritoItems);
          setItems([]);
          setItemCount(0);
          setTotal(0);
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        setError('No se pudo cargar el carrito. Intente nuevamente.');
        setItems([]);
        setItemCount(0);
        setTotal(0);
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

  // Verificar si un servicio ya está en el carrito
  const isInCart = (categoria, nombre) => {
    const servicioId = `${categoria}-${nombre}`.replace(/\s+/g, '-').toLowerCase();
    return items.some(item => 
      `${item.categoria}-${item.nombre}`.replace(/\s+/g, '-').toLowerCase() === servicioId
    );
  };

  // Obtener un item del carrito por su ID único (categoria-nombre)
  const getCartItem = (categoria, nombre) => {
    const servicioId = `${categoria}-${nombre}`.replace(/\s+/g, '-').toLowerCase();
    return items.find(item => 
      `${item.categoria}-${item.nombre}`.replace(/\s+/g, '-').toLowerCase() === servicioId
    );
  };

  // Agregar un servicio al carrito
  const agregarAlCarrito = async (nombre, categoria, precio) => {
    try {
      if (!nombre || !categoria || precio === undefined) {
        console.error('Datos incompletos para agregar al carrito');
        return { success: false, message: 'Datos incompletos para agregar al carrito' };
      }

      // Verificar si el servicio ya está en el carrito
      const itemExistente = getCartItem(categoria, nombre);
      
      if (itemExistente) {
        // Si ya existe, incrementar la cantidad
        const nuevaCantidad = itemExistente.cantidad + 1;
        
        await updateDocument('carrito', itemExistente.id, { 
          cantidad: nuevaCantidad
        });
        
        const nuevosItems = items.map(item => 
          item.id === itemExistente.id 
            ? { ...item, cantidad: nuevaCantidad } 
            : item
        );
        
        setItems(nuevosItems);
        calcularTotal(nuevosItems);
        return { success: true, message: `¡${nombre} actualizado en el carrito!` };
      } else {
        // Si no existe, crear nuevo item
        const servicio = {
          nombre,
          categoria,
          precio: Number(precio), // Asegurar que el precio sea un número
          cantidad: 1,
          fechaAgregado: new Date()
        };
        
        const nuevoItem = await addDocument('carrito', servicio);
        
        if (!nuevoItem || !nuevoItem.id) {
          throw new Error('No se pudo crear el item en Firestore');
        }
        
        const nuevosItems = [...items, nuevoItem];
        
        setItems(nuevosItems);
        setItemCount(prevCount => prevCount + 1);
        calcularTotal(nuevosItems);
        return { success: true, message: `¡${nombre} agregado al carrito!` };
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      return { success: false, message: 'Error al agregar al carrito. Intente nuevamente.' };
    }
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
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      return false;
    }
  };

  // Eliminar un item del carrito
  const eliminarItem = async (id) => {
    try {
      await deleteDocument('carrito', id);
      const nuevosItems = items.filter(item => item.id !== id);
      setItems(nuevosItems);
      setItemCount(prevCount => prevCount - 1);
      calcularTotal(nuevosItems);
      return true;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return false;
    }
  };

  // Vaciar el carrito
  const vaciarCarrito = async () => {
    try {
      // Eliminar todos los documentos del carrito
      const promesas = items.map(item => deleteDocument('carrito', item.id));
      await Promise.all(promesas);
      setItems([]);
      setItemCount(0);
      setTotal(0);
      return true;
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      return false;
    }
  };

  // Procesar la compra
  const procesarCompra = async () => {
    try {
      // Crear un documento de pedido y vaciar el carrito
      await addDocument('pedidos', {
        items: items,
        total: total,
        fecha: new Date(),
        estado: 'pendiente'
      });
      
      await vaciarCarrito();
      return { success: true, message: '¡Compra realizada con éxito! Nos pondremos en contacto contigo pronto.' };
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      return { success: false, message: 'No se pudo procesar la compra. Intente nuevamente.' };
    }
  };

  const value = {
    items,
    loading,
    error,
    total,
    itemCount,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarItem,
    vaciarCarrito,
    procesarCompra,
    isInCart,
    getCartItem
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
