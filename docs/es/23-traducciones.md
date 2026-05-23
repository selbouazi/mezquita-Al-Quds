# Sistema de traducciones

4 idiomas: español, catalán, inglés, árabe.

## Archivos de idioma

Todos en `resources/js/lang/` como módulos JavaScript:

| Archivo | Idioma | Líneas | 
|---------|--------|--------|
| `es.js` | Español | 481 |
| `ca.js` | Catalán | 469 |
| `en.js` | Inglés | 504 |
| `ar.js` | Árabe | 502 |

### Estructura de cada archivo

```js
export default {
    nav: {
        home: 'Inicio',
        horarios: 'Horarios',
        noticias: 'Noticias',
        // ...
    },
    home: {
        title: 'Bienvenidos a la Mezquita Al-Quds',
        // ...
    },
    auth: {
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        // ...
    },
    // ... secciones para cada página/módulo
}
```

### Secciones disponibles

| Sección | Contenido |
|---------|-----------|
| `nav` | Navegación y menús |
| `home` | Página principal |
| `horarios` | Horarios de rezo |
| `noticias` | Noticias |
| `contacto` | Formulario de contacto |
| `ubicacion` | Ubicación |
| `imam` | Información del imam |
| `auth` | Login y registro |
| `admin` | Panel de administración (sidebar, acciones) |
| `donativos` | Donaciones |
| `facturas` | Facturas |
| `clases` | Clases |
| `notifications` | Notificaciones |
| `footer` | Pie de página |
| `common` | Botones genéricos, estados |

## Hook useTranslation

Ver `47-layouts-hooks.md` para la implementación del hook.

## Middleware SetLocale

Ver `31-middleware.md` para el middleware que establece el locale.

## RTL (Right-to-Left)

El árabe requiere soporte RTL. Se implementa en dos niveles:

**1. HTML:** `app.blade.php` establece `dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"`.

**2. Componentes:** `useTranslation` devuelve `isRTL` que los componentes pueden usar para ajustar estilos:
```jsx
<div className={isRTL ? 'rtl-support' : ''}>
```

## Cómo añadir un nuevo idioma

1. Crear `resources/js/lang/[codigo].js` siguiendo la estructura existente
2. Traducir todas las secciones
3. Añadir el código a los idiomas soportados en `SetLocale.php`
4. Añadir el código a la ruta `/lang/{lang}` en `web.php`
5. Añadir la bandera al selector de idioma en `Navbar.jsx`
