import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './servicios.css';
import { useCarrito } from '../../context/CarritoContext';
import ServicioCard from './servicioCard';

function Servicios() {
  const [agregandoIds, setAgregandoIds] = useState({});
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const { agregarAlCarrito: agregarServicioAlCarrito, isInCart } = useCarrito();
  
  // Función para agregar un servicio al carrito
  const agregarAlCarrito = async (nombre, categoria, precio = 50000) => {
    if (!nombre || !categoria) {
      console.error('Nombre o categoría no proporcionados');
      setMensaje({
        texto: 'Error: Datos del servicio incompletos',
        tipo: 'error'
      });
      return;
    }

    // Asegurarse de que el precio sea un número válido
    const precioNumerico = Number(precio);
    if (isNaN(precioNumerico)) {
      console.error('Precio no válido:', precio);
      setMensaje({
        texto: 'Error: Precio no válido',
        tipo: 'error'
      });
      return;
    }

    try {
      // Crear un ID único para este servicio basado en su nombre y categoría
      const servicioId = `${categoria}-${nombre}`.replace(/\s+/g, '-').toLowerCase();
      
      // Marcar este servicio específico como "agregando"
      setAgregandoIds(prev => ({ ...prev, [servicioId]: true }));
      
      // Agregar a través del contexto del carrito
      const resultado = await agregarServicioAlCarrito(nombre, categoria, precioNumerico);
      
      // Mostrar mensaje de resultado
      setMensaje({
        texto: resultado.message,
        tipo: resultado.success ? 'exito' : 'error'
      });
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 3000);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setMensaje({
        texto: 'Error al agregar al carrito. Intente nuevamente.',
        tipo: 'error'
      });
      
      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 5000);
    } finally {
      // Desmarcar este servicio específico como "agregando"
      const servicioId = `${categoria}-${nombre}`.replace(/\s+/g, '-').toLowerCase();
      setAgregandoIds(prev => {
        const newState = { ...prev };
        delete newState[servicioId];
        return newState;
      });
    }
  };
  return (
    <div className="servicios-container">
      <section className="servicios-hero-section">
        <h1 className="servicios-title">Nuestros Servicios</h1>
        <p className="servicios-subtitle">Soluciones digitales a medida para tu negocio</p>
        
        {mensaje.texto && (
          <div className={`servicios-mensaje ${mensaje.tipo === 'error' ? 'servicios-mensaje-error' : 'servicios-mensaje-exito'}`}>
            {mensaje.texto}
          </div>
        )}
      </section>
      
      <section className="servicios-categories">
        <div className="servicios-category">
          <h2 className="servicios-category-title">Digitalización</h2>
          <div className="servicios-items-grid">
            <ServicioCard 
              icono="🌐" 
              titulo="Página web sin carro" 
              descripcion="Ideal para presentar tu negocio y servicios en internet" 
              categoria="Digitalización" 
              precio={200000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-página-web-sin-carro']} 
            />
            
            <ServicioCard 
              icono="🛒" 
              titulo="Página web con carro" 
              descripcion="Vende tus productos en línea de manera sencilla" 
              categoria="Digitalización" 
              precio={350000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-página-web-con-carro']} 
            />
            
            <ServicioCard 
              icono="📱" 
              titulo="Landing informativo" 
              descripcion="Páginas optimizadas para convertir visitantes en clientes" 
              categoria="Digitalización" 
              precio={150000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-landing-informativo']} 
            />
            
            <ServicioCard 
              icono="💸" 
              titulo="Landing con carro" 
              descripcion="Captura leads y vende productos en una sola página" 
              categoria="Digitalización" 
              precio={250000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-landing-con-carro']} 
            />
            
            <ServicioCard 
              icono="🏠" 
              titulo="Hosting" 
              descripcion="Alojamiento para tu sitio web con alto rendimiento" 
              categoria="Digitalización" 
              precio={80000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-hosting']} 
            />
            
            <ServicioCard 
              icono="🌐" 
              titulo="Dominio" 
              descripcion="Tu nombre único en internet" 
              categoria="Digitalización" 
              precio={30000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-dominio']} 
            />
            
            <ServicioCard 
              icono="💻" 
              titulo="Aplicación web" 
              descripcion="Software personalizado accesible desde cualquier navegador" 
              categoria="Digitalización" 
              precio={500000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-aplicación-web']} 
            />
            
            <ServicioCard 
              icono="📱" 
              titulo="Aplicación móvil" 
              descripcion="Apps nativas para Android e iOS" 
              categoria="Digitalización" 
              precio={650000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['digitalización-aplicación-móvil']} 
            />
          </div>
        </div>
        
        <div className="servicios-category">
          <h2 className="servicios-category-title">Redes Sociales</h2>
          <div className="servicios-items-grid">
            <ServicioCard 
              icono="👤" 
              titulo="Creación de perfiles" 
              descripcion="Creamos y optimizamos tus perfiles en redes sociales" 
              categoria="Redes Sociales" 
              precio={100000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['redes-sociales-creación-de-perfiles']} 
            />
            
            <ServicioCard 
              icono="🎨" 
              titulo="Logos" 
              descripcion="Diseño profesional de logos para tu marca" 
              categoria="Redes Sociales" 
              precio={120000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['redes-sociales-logos']} 
            />
            
            <ServicioCard 
              icono="🖼️" 
              titulo="Isotipos" 
              descripcion="Símbolos gráficos que representan tu marca" 
              categoria="Redes Sociales" 
              precio={150000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['redes-sociales-isotipos']} 
            />
            
            <ServicioCard 
              icono="📘" 
              titulo="Manual de marca" 
              descripcion="Guía completa para el uso correcto de tu identidad visual" 
              categoria="Redes Sociales" 
              precio={180000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['redes-sociales-manual-de-marca']} 
            />
            
            <ServicioCard 
              icono="✏️" 
              titulo="Diseños" 
              descripcion="Creación de piezas gráficas para tus redes sociales" 
              categoria="Redes Sociales" 
              precio={90000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['redes-sociales-diseños']} 
            />
          </div>
        </div>
        
        <div className="servicios-category">
          <h2 className="servicios-category-title">Activar plataforma de administración</h2>
          <div className="servicios-items-grid">
            <ServicioCard 
              icono="📈" 
              titulo="Cotización" 
              descripcion="Sistema automatizado de cotizaciones para tus clientes" 
              categoria="Plataforma de administración" 
              precio={200000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-cotización']} 
            />
            
            <ServicioCard 
              icono="📁" 
              titulo="Administrador de documentos" 
              descripcion="Organiza y gestiona todos tus archivos digitales" 
              categoria="Plataforma de administración" 
              precio={250000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-administrador-de-documentos']} 
            />
            
            <ServicioCard 
              icono="✍️" 
              titulo="Firma de documentos" 
              descripcion="Firma electrónica avanzada para tus documentos" 
              categoria="Plataforma de administración" 
              precio={180000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-firma-de-documentos']} 
            />
            
            <ServicioCard 
              icono="📃" 
              titulo="Registro de operaciones" 
              descripcion="Control detallado de todas tus operaciones comerciales" 
              categoria="Plataforma de administración" 
              precio={220000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-registro-de-operaciones']} 
            />
            
            <ServicioCard 
              icono="📅" 
              titulo="Registros laborales" 
              descripcion="Gestión de personal, asistencia y turnos" 
              categoria="Plataforma de administración" 
              precio={200000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-registros-laborales']} 
            />
            
            <ServicioCard 
              icono="💰" 
              titulo="Ventas" 
              descripcion="Sistema completo para gestionar tus ventas" 
              categoria="Plataforma de administración" 
              precio={300000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-ventas']} 
            />
            
            <ServicioCard 
              icono="👍" 
              titulo="Post venta" 
              descripcion="Seguimiento y atención a clientes después de la compra" 
              categoria="Plataforma de administración" 
              precio={180000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-post-venta']} 
            />
            
            <ServicioCard 
              icono="🤖" 
              titulo="Chatbot" 
              descripcion="Atención automatizada para tus clientes 24/7" 
              categoria="Plataforma de administración" 
              precio={250000} 
              onAgregar={agregarAlCarrito} 
              agregando={agregandoIds['plataforma-de-administración-chatbot']} 
            />
          </div>
        </div>
      </section>
      
      <section className="servicios-cta-section">
        <h2 className="servicios-cta-title">¿Necesitas un servicio personalizado?</h2>
        <p className="servicios-cta-text">Contáctanos para discutir tus necesidades específicas</p>
        <div className="servicios-cta-buttons">
          <Link to="/contacto" className="servicios-cta-button">Solicitar cotización</Link>
        </div>
      </section>
    </div>
  );
}

export default Servicios;
