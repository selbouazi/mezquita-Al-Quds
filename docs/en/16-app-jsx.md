# React Entry Point

## app.jsx

**File:** `resources/js/app.jsx`

React application entry point. Configures Inertia and mounts the app.

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

**How it works:**
1. `createInertiaApp` scans `Pages/` and maps page names to files
2. When Laravel renders a route with `Inertia::render('Home')`, it looks for `Pages/Home.jsx`
3. `setup()` mounts React on the `#app` DOM element (defined in `app.blade.php`)

## bootstrap.js

**File:** `resources/js/bootstrap.js`

Axios setup:

```js
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
```

Adds `X-Requested-With` header so Laravel recognizes AJAX requests. No additional customization.
