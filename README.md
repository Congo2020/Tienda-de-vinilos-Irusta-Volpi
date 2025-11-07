# 🎵 Vinyl Store - Tienda de Vinilos

Monorepo completo con frontend (React + TypeScript) y backend (Go + MongoDB) para una tienda online de vinilos.

## 📋 Características

- ✅ Autenticación JWT con persistencia
- ✅ Catálogo público con filtros (búsqueda, género, precio)
- ✅ Carrito de compras y checkout
- ✅ Panel de administración con CRUD completo
- ✅ Arquitectura limpia (Handler → Service → Repository)
- ✅ Validaciones en frontend (Zod) y backend (validator)
- ✅ Tests básicos configurados

## 🚀 Quick Start

### 1. Iniciar MongoDB

```bash
docker-compose up -d
```

### 2. Backend (Go)

```bash
cd backend
cp .env.example .env
go mod download
go run cmd/api/main.go
```

Servidor disponible en: `http://localhost:8080`

### 3. Frontend (React)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

## 🔐 Credenciales Demo

Después del seed automático, podés usar:

- **Admin**: `admin@vinyl.local` / `Admin123!`

## 📁 Estructura del Proyecto

```
vinyl-store/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Go + Gin + MongoDB
├── docker-compose.yml # MongoDB containerizado
└── README.md
```

## 🛠️ Tecnologías

### Frontend
- React 18.3+ con TypeScript
- Vite 5+
- Material UI v5
- React Router v6
- Axios con interceptores JWT
- React Hook Form + Zod
- Vitest + React Testing Library

### Backend
- Go 1.22+
- Gin v1.10+
- MongoDB driver
- JWT (golang-jwt/jwt v5)
- Bcrypt
- Validator v10

## 📖 Documentación Adicional

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🐛 Troubleshooting

### Backend no compila
```bash
go clean -modcache
go mod tidy
go build ./...
```

### Frontend no inicia
```bash
rm -rf node_modules package-lock.json
npm install
```

### MongoDB no conecta
```bash
docker ps | grep mongo
docker logs vinyl-store-mongo
docker-compose restart mongo
```

### CORS errors
Verificá que `ALLOWED_ORIGIN` en backend `.env` coincida con la URL del frontend (default: `http://localhost:5173`)

### JWT inválido
Limpiar localStorage y hacer login nuevamente
