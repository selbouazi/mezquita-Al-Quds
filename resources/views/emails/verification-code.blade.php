@component('mail::message')
# Verifica tu correo electrónico

Gracias por registrarte en **{{ config('app.name') }}**.

Tu código de verificación es:

# {{ $code }}

Introduce este código en la página de verificación para activar tu cuenta.

@component('mail::button', ['url' => url('/verify-email')])
Verificar cuenta
@endcomponent

Si no has solicitado este registro, ignora este mensaje.

Gracias,<br>
{{ config('app.name') }}
@endcomponent
