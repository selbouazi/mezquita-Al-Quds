@component('mail::message')
# Nuevo comentario

**{{ $comentario->autorNombre() }}** ha escrito un comentario en la noticia **{{ $comentario->noticia?->titulo }}**.

> {{ $comentario->contenido }}

@component('mail::button', ['url' => url('/admin/comentarios')])
Gestionar comentarios
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent
