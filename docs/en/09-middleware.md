# Middleware

4 custom middleware that handle authentication, language, and shared data.

## AdminMiddleware

**File:** `app/Http/Middleware/AdminMiddleware.php`

**Purpose:** Restrict admin panel routes to users with `admin` role only.

**Behavior:**
- If user is not authenticated → redirect to login
- If user is authenticated but `rol` is not `admin` → redirect to `/` with flash error message (HTTP redirect)
- If admin → allow access

**Change:** Previously rendered an Inertia `Auth/AccessDenied` page with HTTP 200. Now redirects with HTTP 302 and error message — semantically correct HTTP behavior.

**Route usage:**
```php
Route::middleware(['auth', 'admin'])->group(function () {
    // admin routes
});
```

## HandleInertiaRequests

**File:** `app/Http/Middleware/HandleInertiaRequests.php`

**Purpose:** Share global data with all React pages through Inertia.

**Shared data:**
- `locale` — active language (from session)
- `auth.user` — authenticated user (or null)
- `flash` — session flash messages
- `tiemposEspera` — prayer wait times (cached)

**Technical decision:** Wait times are shared globally because they're needed on all pages that display schedules (Header, Clock, etc.), avoiding a DB call on every render.

## SetLocale

**File:** `app/Http/Middleware/SetLocale.php`

**Purpose:** Set the application language based on session.

**Behavior:**
```php
$locale = session('locale', 'es');
app()->setLocale($locale);
```

The locale is saved to session when the user visits `/lang/{locale}`. Default: `es`.

**Supported languages:** `es`, `ca`, `ar`, `en`

## RedirectIfAuthenticated

**File:** `app/Http/Middleware/RedirectIfAuthenticated.php`

**Purpose:** Redirect already authenticated users away from login/register pages.

**Behavior:**
- If user is authenticated → redirect to `/admin`
- If not → allow access to the route

**Registered as alias** `guest` in `bootstrap/app.php`.
