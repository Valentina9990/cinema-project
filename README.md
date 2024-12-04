# Backend del Sistema de Gestión de Cines 🎥

Este proyecto corresponde al backend del sistema de gestión de cines, desarrollado como parte de la asignatura **"Ingeniería de Software"**. El objetivo principal es gestionar funciones básicas de un cine, como la administración de salas y accesos de usuarios. 

El backend fue implementado en **TypeScript** utilizando **Express.js** como framework principal y **PostgreSQL** como base de datos, apoyado en una arquitectura de capas que asegura una estructura modular y fácil de mantener.

---

## 🛠️ **Características principales**
- **Gestión de componentes de cine**: Creación, edición, consulta y eliminación.
- **Control de accesos**: Autenticación y autorización de usuarios mediante JWT.
- **Cifrado de contraseñas**: Uso de `bcryptjs` para proteger las credenciales de los usuarios.
- **Manejo de errores**: Implementado con la ayuda de `morgan` para seguimiento en tiempo real.
- **CORS**: Configuración para limitar el acceso al backend.
- **Automatización de procesos**: Uso de `nodemon` para facilitar el desarrollo.
  
---

## ⚙️ **Tecnologías utilizadas**
- **Lenguaje**: TypeScript.
- **Framework**: Express.js.
- **Base de datos**: PostgreSQL, gestionada con `pg-promise`.
- **Desarrollo y depuración**:
  - `nodemon` para recarga automática.
  - `morgan` para seguimiento de errores en el servidor.
  - Jest para pruebas unitarias.
- **Configuración**:
  - `dotenv` para manejar variables de entorno.

