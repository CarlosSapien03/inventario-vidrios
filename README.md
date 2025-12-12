# Inventario de Vidrios

Sistema de inventario con autenticación usando Node.js, Express y Supabase.

## 🚀 Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Edita el archivo `.env` con tus credenciales de Supabase:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key_de_supabase
PORT=3000
```

**Dónde encontrar las credenciales:**
- Ve a tu proyecto en [Supabase](https://supabase.com)
- Settings → API
- Copia `Project URL` y `anon/public key`

### 3. Iniciar el servidor
```bash
npm start
```

O para desarrollo con auto-reload:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
inventario-vidrios/
├── config/
│   └── supabase.js          # Configuración de Supabase
├── public/
│   ├── login.html           # Página de login/registro
│   └── dashboard.html       # Dashboard principal
├── routes/
│   └── auth.js              # Rutas de autenticación
├── .env                     # Variables de entorno (no subir a git)
├── .env.example             # Ejemplo de variables de entorno
├── server.js                # Servidor Express
└── package.json             # Dependencias del proyecto
```

## 🔑 API Endpoints

### Autenticación

- **POST** `/api/auth/login` - Iniciar sesión
  ```json
  {
    "email": "usuario@email.com",
    "password": "contraseña"
  }
  ```

- **POST** `/api/auth/register` - Registrar nuevo usuario
  ```json
  {
    "email": "usuario@email.com",
    "password": "contraseña",
    "nombre": "Nombre Usuario"
  }
  ```

- **POST** `/api/auth/logout` - Cerrar sesión

- **GET** `/api/auth/session` - Verificar sesión actual

## 🎨 Características

- ✅ Sistema de login y registro
- ✅ Autenticación con Supabase
- ✅ Interfaz moderna y responsive
- ✅ Manejo de errores
- ✅ Sesiones persistentes
- ✅ Dashboard protegido

## 📝 Notas

- La tabla `usuarios` debe estar configurada en Supabase
- Supabase maneja automáticamente la autenticación
- Las sesiones se guardan en localStorage del navegador
