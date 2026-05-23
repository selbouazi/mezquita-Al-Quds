# Páginas de autenticación

3 páginas React para el sistema de login/registro.

## Login (`/login`)

**Archivo:** `Pages/Auth/Login.jsx`

Formulario de inicio de sesión con:
- Campo email
- Campo contraseña
- Botón "Iniciar Sesión"
- Enlace a registro
- Validación en frontend con `useForm` de Inertia
- Manejo de errores de validación del servidor
- Rate limiting: 5 intentos por minuto (gestionado por Fortify)

## Register (`/register`)

**Archivo:** `Pages/Auth/Register.jsx`

Formulario de registro con:
- Nombre
- Email
- Contraseña + confirmación
- Código de activación (requerido)
- Validación del código contra BD
- El código se consume (desactiva) tras uso exitoso

**Decisión:** El código de activación evita registros automatizados. Solo personas con un código válido (entregado por el imam) pueden registrarse.

## AccessDenied

**Archivo:** `Pages/Auth/AccessDenied.jsx`

Página mostrada cuando un usuario autenticado pero sin rol `admin` intenta acceder a rutas admin. Mensaje claro indicando que no tiene permisos y enlace para volver al inicio.
