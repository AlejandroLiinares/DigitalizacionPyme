# PWA Base con React + Vite

Este proyecto es una plantilla base para crear Progressive Web Apps (PWAs) utilizando React y Vite. Incluye todas las configuraciones necesarias para desarrollar una PWA moderna y funcional.

## Características

- ⚡️ **Vite** - Build tool ultrarrápido
- ⚛️ **React** - Biblioteca UI
- 📱 **PWA Ready** - Configuración completa de Progressive Web App
- 🔄 **Auto-actualización** - Service Worker con actualización automática
- 💻 **Desarrollo y Producción** - Soporte para PWA en ambos entornos

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Cristobal-Figueroa/PWA-Base.git

# Instalar dependencias
npm install
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npx serve dist
```

## Estructura del Proyecto

```
├── public/
│   ├── manifest.json     # Configuración PWA
│   └── vite.svg         # Iconos PWA
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada + Config SW
│   └── index.css        # Estilos globales
├── vite.config.js       # Configuración de Vite + PWA
└── package.json         # Dependencias y scripts
```

## Configuración PWA

El proyecto incluye una configuración completa de PWA:

- Service Worker con estrategia de cache
- Manifest con configuración de instalación
- Soporte para desarrollo y producción
- Auto-actualización de la aplicación

## Desarrollo vs Producción

### Desarrollo (`npm run dev`)
- Service Worker tipo "module"
- Hot Module Replacement (HMR)
- DevTools para PWA

### Producción (`npm run build`)
- Service Worker optimizado
- Assets minimizados
- Configuración de cache optimizada

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias y mejoras.

## Licencia

MIT
