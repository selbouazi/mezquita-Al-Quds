@extends('layouts.app')

@section('title', 'Cómo llegar')

@section('content')
<section class="pt-28 pb-16 max-w-7xl mx-auto px-6 text-center">

    {{-- Título principal de la página de ubicación --}}
    <h1 class="text-3xl font-bold text-[#0F5132] mb-4">Cómo llegar</h1>

    {{-- Breve explicación para orientar al visitante --}}
    <p class="text-gray-600 mb-8">
        Consulta la ubicación de la mezquita en el mapa.
    </p>

    {{-- Botón que abre directamente Google Maps con la ubicación --}}
    <a href="https://maps.google.com"
       class="inline-block bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c3f27] transition shadow-md">
        Abrir en Google Maps
    </a>
</section>
@endsection
