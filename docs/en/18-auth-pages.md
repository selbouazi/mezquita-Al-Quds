# Auth Pages

3 React pages for the auth system.

## Login (`/login`)

**File:** `Pages/Auth/Login.jsx`

Login form with:
- Email field
- Password field
- "Sign In" button
- Link to registration
- Frontend validation with Inertia `useForm`
- Server validation error handling
- Rate limiting: 5 attempts per minute (managed by Fortify)

## Register (`/register`)

**File:** `Pages/Auth/Register.jsx`

Registration form with:
- Name
- Email
- Password + confirmation
- Activation code (required)
- Code validation against DB
- Code is consumed (deactivated) after successful use

**Decision:** Activation codes prevent automated registrations. Only people with a valid code (given by the imam) can register.

## AccessDenied

**File:** `Pages/Auth/AccessDenied.jsx`

Page displayed when an authenticated user without `admin` role tries to access admin routes. Clear message about insufficient permissions and link to go back home.
