@component('mail::message')
# Nuevo donativo recibido

Se ha recibido un donativo de **{{ number_format($donativo->cantidad, 2) }} €**.

- **Donante:** {{ $donativo->nombre }}
@if($donativo->email_donante)
- **Email:** {{ $donativo->email_donante }}
@endif
- **Fecha:** {{ $donativo->created_at->format('d/m/Y H:i') }}

@component('mail::button', ['url' => url('/admin/donativos')])
Ver donativos
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent
