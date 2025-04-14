import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
        { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
      );
      console.log('Service Worker registrado con éxito:', registration);
    } catch (error) {
      console.error('Error al registrar el Service Worker:', error);
    }
  });
}
