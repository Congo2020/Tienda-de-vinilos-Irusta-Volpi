# Frontend - Vinyl Store

Frontend desarrollado en React con TypeScript, Vite y Material UI.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env y setear VITE_API_URL=http://localhost:8080/api/v1

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🧪 Tests

```bash
# Ejecutar tests
npm test

# Ejecutar tests con UI
npm run test:ui
```

## 📁 Estructura

```
frontend/
├── src/
│   ├── app/
│   │   ├── routes/          # Páginas/rutas
│   │   ├── components/      # Componentes reutilizables
│   │   ├── services/        # Servicios HTTP
│   │   ├── store/           # Contextos (Auth, Cart)
│   │   ├── validators/      # Schemas Zod
│   │   ├── types/           # Tipos TypeScript
│   │   └── theme/           # Tema MUI
│   ├── main.tsx
│   └── App.tsx
├── tests/                   # Tests con Vitest
└── package.json
```

## 🛠️ Tecnologías

- React 18.3+
- TypeScript 5.3+
- Vite 5+
- Material UI v5
- React Router v6
- Axios con interceptores JWT
- React Hook Form + Zod
- Vitest + React Testing Library

