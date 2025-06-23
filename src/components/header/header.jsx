import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { getDocuments } from '../../firebase/config';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Cargar los productos del carrito desde Firestore
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const items = await getDocuments('carrito');
        setCartItems(items || []);
        setCartCount(items ? items.length : 0);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCartItems();
    
    // Actualizar el carrito cada 30 segundos para mantenerlo sincronizado
    const intervalId = setInterval(loadCartItems, 30000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/" className="header-logo-link">
            <span className="header-logo-text">DigitalizaciónPymes</span>
          </Link>
        </div>
        
        <button 
          className={`header-menu-toggle ${menuOpen ? 'header-menu-open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="header-menu-bar"></span>
          <span className="header-menu-bar"></span>
          <span className="header-menu-bar"></span>
        </button>
        
        <nav className={`header-nav ${menuOpen ? 'header-nav-open' : ''}`}>
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <Link to="/" className="header-nav-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
            </li>
            <li className="header-nav-item">
              <Link to="/servicios" className="header-nav-link" onClick={() => setMenuOpen(false)}>Servicios</Link>
            </li>
            <li className="header-nav-item">
              <Link to="/contacto" className="header-nav-link" onClick={() => setMenuOpen(false)}>Contacto</Link>
            </li>
            <li className="header-nav-item header-cart-item">
              <Link to="/carrito" className="header-nav-link header-cart-link" onClick={() => setMenuOpen(false)}>
                <div className="header-cart-icon">🛒</div>
                {!loading && cartCount > 0 && (
                  <span className="header-cart-count">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
