@extends('layouts.app')

@section('title', 'Noticias')

@section('content')
<section class="pt-28 pb-16 max-w-7xl mx-auto px-6">

    {{-- Título principal de la sección de noticias --}}
    <h1 class="text-3xl font-bold text-[#0F5132] mb-4">Noticias de la mezquita</h1>

    {{-- Breve descripción mientras el módulo real no está implementado --}}
    <p class="text-gray-600 mb-8">
        Aquí aparecerán las noticias y comunicados publicados por el imam.
    </p>

    {{-- Contenedor temporal hasta que se añada el sistema de publicaciones --}}
    <div class="p-6 bg-[#F8F8F8] border border-[#C9A227]/20 rounded-2xl text-gray-500 text-sm">
        Módulo de noticias en construcción.
    </div>
</section>
@endsection
