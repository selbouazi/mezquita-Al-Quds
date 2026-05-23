# Vite and app.blade.php

## vite.config.js

**File:** `vite.config.js`

Configuration with 3 plugins:

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

**Inputs:** `app.css` (Tailwind) and `app.jsx` (React + Inertia).

**Note:** Uses `@vitejs/plugin-react@4` instead of v5 because v5 requires React 19, which is not compatible with this setup. `--legacy-peer-deps` was needed during npm install.

## app.blade.php

**File:** `resources/views/app.blade.php`

The only Blade view in the project. Its job is to load React.

### Structure

```html
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
      dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
```

`dir` is set dynamically: `rtl` for Arabic, `ltr` for everything else.

### The React "preamble" Problem

**Problem:** When migrating from Blade to React, the page was blank with:

```
Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong.
```

**Root cause:** `@vitejs/plugin-react` needs to inject a special script into HTML before any JSX loads (React HMR "preamble"). In normal Vite projects, Vite generates the HTML and injects it automatically. But in Laravel, Blade generates the HTML — so Vite can never inject the preamble on its own.

**Solution:** Add the preamble script manually in `app.blade.php`, only for local environment:

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

### Asset loading

```blade
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
@vite(['resources/css/app.css', 'resources/js/app.jsx'])
@inertiaHead
```

- **Inter** — main font for Spanish, Catalan, English
- **Cairo** — font for Arabic (supports Arabic characters)
- `@vite()` — loads compiled assets
- `@inertiaHead` — allows React to control `<head>`
