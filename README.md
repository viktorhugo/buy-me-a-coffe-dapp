# Buy Me a Coffee DApp

Una aplicación full-stack moderna construida con React Router, TypeScript y herramientas de desarrollo modernas, diseñada para implementar un DApp de "Buy Me a Coffee".

## Herramientas y Tecnologías Base

- **[React Router](https://reactrouter.com/):** Enrutamiento avanzado para aplicaciones React.
- **[React](https://react.dev/):** Biblioteca principal para la UI.
- **[TypeScript](https://www.typescriptlang.org/):** Tipado estático para JavaScript.
- **[Vite](https://vitejs.dev/):** Bundler ultrarrápido para desarrollo y producción.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilidades CSS para estilos rápidos y responsivos.
- **[Docker](https://www.docker.com/):** Contenerización para despliegue consistente.
- **[Bun](https://bun.sh/):** Alternativa rápida a npm/yarn para gestión de dependencias (opcional).
- **[Node.js](https://nodejs.org/):** Entorno de ejecución para el servidor.
- **[React Router Framework](https://github.com/remix-run/react-router):** Plantilla y utilidades para SSR y estructura de rutas.
- **[StackBlitz](https://stackblitz.com/):** Desarrollo en la nube (opcional, ver badge arriba).

## Estructura del Proyecto

```
buy-me-a-coffe-dapp/
├── app/                # Código fuente principal (componentes, hooks, layouts, rutas, etc.)
├── public/             # Archivos estáticos públicos
├── .react-router/      # Tipos y configuraciones generadas por React Router
├── Dockerfile          # Configuración para Docker
├── package.json        # Dependencias y scripts
├── vite.config.ts      # Configuración de Vite
├── tsconfig.json       # Configuración de TypeScript
├── bun.lock            # Lockfile para Bun (si se usa)
└── README.md           # Este archivo
```

## Instalación

Instala las dependencias:

```bash
npm install
# o usando bun
bun install
```

## Desarrollo

Inicia el servidor de desarrollo con HMR:

```bash
npm run dev
# o usando bun
bun run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Construcción para Producción

Crea un build de producción:

```bash
npm run build
# o usando bun
bun run build
```

## Despliegue

### Docker

Construye y ejecuta usando Docker:

```bash
docker build -t buy-me-a-coffee-dapp .
docker run -p 3000:3000 buy-me-a-coffee-dapp
```

### DIY

Despliega el contenido de la carpeta `build/` en tu plataforma preferida de Node.js.

## Estilos

Este proyecto usa [Tailwind CSS](https://tailwindcss.com/) por defecto, pero puedes usar cualquier framework CSS que prefieras.

---

Construido con ❤️ usando React Router, Vite, TypeScript y# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
