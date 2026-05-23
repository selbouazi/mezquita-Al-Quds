# Layouts y Hooks

## MainLayout

**Archivo:** `Layouts/MainLayout.jsx`

Layout envolvente para todas las páginas públicas. Proporciona:
- `<html>` con atributos `lang` y `dir` dinámicos
  - `dir="rtl"` cuando el idioma es árabe
  - `dir="ltr"` para el resto
- Navbar en la parte superior
- Footer en la parte inferior
- Animaciones fade-in al cargar página (IntersectionObserver)
- Contenido principal con espaciado consistente

## AdminLayout

**Archivo:** `Layouts/AdminLayout.jsx`

Layout para todas las páginas del panel de administración. Proporciona:

**Sidebar de navegación** con enlaces a los 10 módulos:
- Dashboard, Donativos, Facturas, Clases, Noticias, Notificaciones, Contactos, Ubicación, Imam, Códigos, Horarios

Cada enlace tiene su icono SVG y nombre. El módulo activo se resalta visualmente.

**Características:**
- Selector de idioma en la cabecera
- Menú responsive: en móvil el sidebar se oculta y aparece con un botón hamburguesa (overlay)
- Indicador de usuario autenticado (nombre y email)
- Botón de cerrar sesión
- Contenedor principal con padding que se ajusta según el sidebar esté visible

**Estado activo:** Se determina comparando la ruta actual con la ruta de cada módulo usando `usePage().url` de Inertia.

## useTranslation

**Archivo:** `hooks/useTranslation.js`

Hook personalizado para el sistema multiidioma.

```js
function useTranslation() {
    const { locale } = usePage().props;
    const translations = {
        es: langEs,
        ca: langCa,
        en: langEn,
        ar: langAr,
    };
    const t = (section, key) => translations[locale]?.[section]?.[key] ?? key;
    const isRTL = locale === 'ar';
    return { t, locale, isRTL };
}
```

**Uso en componentes:**
```jsx
const { t, isRTL } = useTranslation();
<p>{t('nav', 'home')}</p>  // "Inicio" en español, "Home" en inglés, etc.
<div dir={isRTL ? 'rtl' : 'ltr'}>
```

**Funcionamiento:**
1. El locale viene de `HandleInertiaRequests` (compartido globalmente)
2. `t(section, key)` busca `lang/[locale].[section].[key]`
3. Si no encuentra la traducción, devuelve el key como fallback
4. `isRTL` permite a los componentes ajustar el layout para árabe
