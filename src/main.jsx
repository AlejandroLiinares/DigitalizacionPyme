import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
// Importamos la configuración de Firebase
import './firebase/config';
// Importamos el proveedor de contexto del carrito
import { CarritoProvider } from './context/CarritoContext';
import Home from './components/home/home';
import Servicios from './components/servicios/servicios';
import Contacto from './components/contacto/contacto';
import Carrito from './components/carrito/carrito';
import Header from './components/header/header';
import WhatsAppButton from './components/whatsappButton/whatsappButton';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>
          <WhatsAppButton />
        </div>
      </Router>
    </CarritoProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);