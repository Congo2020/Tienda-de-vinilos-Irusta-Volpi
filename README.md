# 🎵 Vinyl Store - Tienda de Vinilos

Monorepo completo con frontend (React + TypeScript) y backend (Go + MongoDB) para una tienda online de vinilos.

## 📋 Características

- ✅ Autenticación JWT con persistencia
- ✅ Catálogo público con filtros (búsqueda, género, precio)
- ✅ Carrito de compras y checkout
- ✅ Panel de administración con CRUD completo
- ✅ Arquitectura limpia (Handler → Service → Repository)
- ✅ Validaciones en frontend (Zod) y backend (validator)
- ✅ Tests básicos configurados (Vitest + Go tests)
- ✅ Cálculo de total en backend
- ✅ Seed idempotente
- ✅ CORS configurado
- ✅ Interceptor JWT con manejo de 401

## 📦 Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- **Go** 1.22 o superior ([descargar](https://go.dev/dl/))
- **Node.js** 18 o superior y **npm** ([descargar](https://nodejs.org/))
- **Docker** y **Docker Compose** ([descargar](https://www.docker.com/get-started))

Verificar instalación:
```bash
go version      # Debe mostrar go1.22.x o superior
node --version  # Debe mostrar v18.x.x o superior
docker --version # Debe mostrar Docker version 20.x.x o superior
```

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd Tienda-de-vinilos-Irusta-Volpi
```

### Paso 2: Configurar MongoDB con Docker

Iniciar MongoDB en un contenedor Docker:

```bash
docker-compose up -d
```

Verificar que MongoDB esté corriendo:
```bash
docker ps
# Deberías ver el contenedor "vinyl-store-mongo" corriendo
```

### Paso 3: Configurar Backend

1. **Crear archivo de configuración**:
```bash
cd backend
```

Crear archivo `.env` con el siguiente contenido:
```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=vinyl_store
JWT_SECRET=supersecret_change_in_production
JWT_EXPIRATION=2h
ALLOWED_ORIGIN=http://localhost:5173
PORT=8080
ENV=development
```

2. **Instalar dependencias de Go**:
```bash
go mod download
```

3. **Verificar que compile**:
```bash
go build ./cmd/api/main.go
```

4. **Iniciar el servidor backend**:
```bash
go run cmd/api/main.go
```

El servidor estará disponible en: `http://localhost:8080`

**Nota**: El seed se ejecuta automáticamente al iniciar el servidor. Verás mensajes en la consola indicando que se crearon los vinilos y el usuario admin.

### Paso 4: Configurar Frontend

1. **Crear archivo de configuración**:
```bash
cd ../frontend
```

Crear archivo `.env` con el siguiente contenido:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

2. **Instalar dependencias de Node.js**:
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🔐 Credenciales Demo

Después del seed automático, podés usar:

- **Email**: `admin@vinyl.local`
- **Contraseña**: `Admin123!`
- **Rol**: Admin (acceso completo al panel de administración)

## 📁 Estructura del Proyecto

```
Tienda-de-vinilos-Irusta-Volpi/
├── frontend/          # React + TypeScript + Vite
│   ├── src/           # Código fuente del frontend
│   ├── tests/         # Tests con Vitest
│   ├── package.json   # Dependencias de Node.js
│   └── vite.config.ts # Configuración de Vite
├── backend/           # Go + Gin + MongoDB
│   ├── cmd/api/       # Punto de entrada de la aplicación
│   ├── internal/      # Código interno del backend
│   │   ├── handlers/  # Controladores HTTP
│   │   ├── services/  # Lógica de negocio
│   │   ├── repository/# Acceso a datos
│   │   ├── models/    # Modelos de datos
│   │   ├── dto/       # Data Transfer Objects
│   │   └── ...
│   ├── go.mod         # Dependencias de Go
│   └── README.md      # Documentación del backend
├── docker-compose.yml # Configuración de MongoDB
└── README.md          # Este archivo
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

## 🧪 Ejecutar Tests

### Backend (Go)
```bash
cd backend
go test ./...
```

### Frontend (Vitest)
```bash
cd frontend
npm test
```

## 📝 Estructura de Rutas

### Rutas Públicas
- `/` - Página de inicio
- `/vinyls` - Catálogo de vinilos con filtros
- `/vinyls/:id` - Detalle de un vinilo
- `/login` - Iniciar sesión

### Rutas Privadas (requieren autenticación)
- `/cart` - Carrito de compras
- `/checkout` - Proceso de compra
- `/account` - Mi cuenta
- `/orders` - Mis pedidos

### Rutas Admin (requieren rol admin)
- `/admin` - Panel de administración
- `/admin/vinyls/new` - Crear nuevo vinilo
- `/admin/vinyls/:id` - Editar vinilo existente

## 🔌 Endpoints de la API

### Públicos
- `POST /api/v1/auth/login` - Iniciar sesión
- `GET /api/v1/vinyls` - Listar vinilos (con filtros: `?q=`, `?genre=`, `?minPrice=`, `?maxPrice=`)
- `GET /api/v1/vinyls/:id` - Obtener vinilo por ID

### Autenticados (requieren JWT)
- `POST /api/v1/orders` - Crear orden
- `GET /api/v1/orders` - Obtener mis órdenes

### Admin (requieren JWT + role=admin)
- `POST /api/v1/vinyls` - Crear vinilo
- `PUT /api/v1/vinyls/:id` - Actualizar vinilo
- `DELETE /api/v1/vinyls/:id` - Eliminar vinilo

## 🐛 Troubleshooting

### Backend no compila
```bash
cd backend
go clean -modcache
go mod tidy
go build ./cmd/api/main.go
```

**Error común**: Si ves errores de importación, ejecutá:
```bash
go mod download
go mod tidy
```

### Backend no se conecta a MongoDB
1. Verificar que Docker esté corriendo:
```bash
docker ps
```

2. Verificar que MongoDB esté activo:
```bash
docker logs vinyl-store-mongo
```

3. Reiniciar MongoDB:
```bash
docker-compose restart mongo
```

4. Verificar la URI en `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017
```

### Frontend no inicia
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Error común**: Si ves errores de módulos, ejecutá:
```bash
npm cache clean --force
npm install
```

### CORS errors
Verificá que `ALLOWED_ORIGIN` en `backend/.env` coincida con la URL del frontend:
```env
ALLOWED_ORIGIN=http://localhost:5173
```

Si usás otro puerto, actualizá esta variable.

### JWT inválido o sesión expirada
1. Abrir las herramientas de desarrollador (F12)
2. Ir a la pestaña "Application" (Chrome) o "Storage" (Firefox)
3. Limpiar `localStorage`
4. Recargar la página y hacer login nuevamente

### El seed no crea datos
El seed se ejecuta automáticamente al iniciar el backend. Si no ves los datos:
1. Verificar que MongoDB esté corriendo
2. Verificar los logs del backend para ver errores
3. Verificar que la base de datos esté vacía (el seed es idempotente, no duplica datos)

### Puerto ya en uso
Si el puerto 8080 o 5173 está ocupado:

**Backend**: Cambiar `PORT` en `backend/.env`:
```env
PORT=8081
```

**Frontend**: Vite usará automáticamente el siguiente puerto disponible, o podés especificarlo:
```bash
npm run dev -- --port 5174
```

## 📚 Recursos Adicionales

- [Documentación del Backend](./backend/README.md)
- [Documentación del Frontend](./frontend/README.md)
- [Documentación de Go](https://go.dev/doc/)
- [Documentación de React](https://react.dev/)
- [Documentación de MongoDB](https://www.mongodb.com/docs/)

## ✅ Checklist de Verificación

Antes de reportar un problema, verificá:

- [ ] MongoDB está corriendo (`docker ps`)
- [ ] Backend compila sin errores (`go build ./cmd/api/main.go`)
- [ ] Backend está corriendo en el puerto correcto (default: 8080)
- [ ] Frontend tiene las dependencias instaladas (`npm install`)
- [ ] Frontend está corriendo (default: http://localhost:5173)
- [ ] El archivo `.env` del backend existe y está configurado
- [ ] El archivo `.env` del frontend existe y tiene `VITE_API_URL` correcto
- [ ] Las credenciales de login son correctas (`admin@vinyl.local` / `Admin123!`)

## 🎯 Próximos Pasos

Una vez que todo esté corriendo:

1. **Explorar el catálogo**: Navegá a `/vinyls` para ver los vinilos disponibles
2. **Crear una cuenta**: Hacé login con las credenciales admin
3. **Agregar al carrito**: Seleccioná vinilos y agregalos al carrito
4. **Probar el checkout**: Completá una orden de prueba
5. **Panel admin**: Accedé a `/admin` para gestionar vinilos

¡Disfrutá explorando la tienda de vinilos! 🎵
