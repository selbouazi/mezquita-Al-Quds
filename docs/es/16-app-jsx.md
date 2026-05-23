# Entry Point React

## app.jsx

**Archivo:** `resources/js/app.jsx`

Punto de entrada de la aplicación React. Configura Inertia y monta la app.

```jsx
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
```

**Funcionamiento:**
1. `createInertiaApp` escanea `Pages/` y mapea nombres de página a archivos
2. Cuando Laravel renderiza una ruta con `Inertia::render('Home')`, busca `Pages/Home.jsx`
3. `setup()` monta React en el elemento `#app` del DOM (definido en `app.blade.php`)

## bootstrap.js

**Archivo:** `resources/js/bootstrap.js`

Configuración de Axios:

```js
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
```

Añade el header `X-Requested-With` para que Laravel identifique peticiones AJAX. Sin personalizaciones adicionales.
