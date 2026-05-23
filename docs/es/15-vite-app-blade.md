# Vite y app.blade.php

## vite.config.js

**Archivo:** `vite.config.js`

Configuración con 3 plugins:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
});
```

**Inputs:** `app.css` (Tailwind) y `app.jsx` (React + Inertia).

**Nota:** Se usa `@vitejs/plugin-react@4` en lugar de v5 porque v5 requiere React 19, que no es compatible con esta configuración. Se necesitó `--legacy-peer-deps` durante npm install.

## app.blade.php

**Archivo:** `resources/views/app.blade.php`

Única vista Blade del proyecto. Su función es cargar React.

### Estructura

```html
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
      dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
```

El `dir` se establece dinámicamente: `rtl` para árabe, `ltr` para el resto.

### El problema del "preamble" de React

**Problema:** Al migrar de Blade a React, la página aparecía en blanco con el error:

```
Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong.
```

**Causa raíz:** `@vitejs/plugin-react` necesita inyectar un script especial en el HTML antes de que cargue cualquier JSX (el "preamble" de React HMR). En proyectos Vite normales, Vite genera el HTML y lo inyecta automáticamente. Pero en Laravel, el HTML lo genera Blade — así que Vite nunca puede inyectar el preamble por su cuenta.

**Solución:** Añadir el script del preamble manualmente en `app.blade.php`, solo para entorno local:

```blade
@if(app()->environment('local'))
    <script type="module">
        import RefreshRuntime from 'http://localhost:5173/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => { }
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
@endif
```

### Carga de assets

```blade
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
@vite(['resources/css/app.css', 'resources/js/app.jsx'])
@inertiaHead
```

- **Inter** — fuente principal para español, catalán, inglés
- **Cairo** — fuente para árabe (soporta caracteres árabes)
- `@vite()` — carga los assets compilados
- `@inertiaHead` — permite que React controle el `<head>`
