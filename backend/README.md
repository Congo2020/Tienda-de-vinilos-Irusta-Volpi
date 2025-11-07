# Backend - Vinyl Store

Backend desarrollado en Go con Gin y MongoDB.

## 🚀 Inicio Rápido

```bash
# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
go mod download

# Ejecutar servidor
go run cmd/api/main.go
```

El servidor estará disponible en `http://localhost:8080`

## 📁 Estructura

```
backend/
├── cmd/api/main.go          # Punto de entrada
├── internal/
│   ├── config/              # Configuración
│   ├── db/                  # Conexión MongoDB
│   ├── errors/              # Errores de dominio
│   ├── dto/                 # Data Transfer Objects
│   ├── models/              # Modelos de datos
│   ├── auth/                # JWT y hash
│   ├── middleware/          # Middlewares (auth, CORS)
│   ├── repository/          # Capa de acceso a datos
│   ├── services/            # Lógica de negocio
│   ├── handlers/            # Controladores HTTP
│   ├── server/              # Configuración del router
│   └── seed/                # Datos iniciales
└── go.mod
```

## 🔌 Endpoints

### Públicos
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/vinyls` - Listar vinilos (con filtros)
- `GET /api/v1/vinyls/:id` - Obtener vinilo por ID

### Autenticados (requiere JWT)
- `POST /api/v1/orders` - Crear orden
- `GET /api/v1/orders` - Obtener mis órdenes

### Admin (requiere JWT + role=admin)
- `POST /api/v1/vinyls` - Crear vinilo
- `PUT /api/v1/vinyls/:id` - Actualizar vinilo
- `DELETE /api/v1/vinyls/:id` - Eliminar vinilo

## 🔐 Credenciales Demo

- **Admin**: `admin@vinyl.local` / `Admin123!`

## 🧪 Tests

```bash
go test ./...
```

