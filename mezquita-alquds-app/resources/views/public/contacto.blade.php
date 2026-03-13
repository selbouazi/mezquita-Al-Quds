@extends('layouts.app')

@section('title', 'Contacto')

@section('content')
<section class="pt-28 pb-16 max-w-4xl mx-auto px-6">
    {{-- Título principal de la página de contacto --}}
    <h1 class="text-3xl font-bold text-[#0F5132] mb-4">Contacto</h1>

    {{-- Breve descripción para contextualizar el formulario --}}
    <p class="text-gray-600 mb-8">
        Envia un missatge a la comunitat de la mesquita.
    </p>

    {{-- Tarjeta que contiene el formulario, con borde y sombra suaves --}}
    <div class="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 sm:p-8">

        {{-- Formulario de contacto básico --}}
        <form class="space-y-4">

            {{-- Campos de nombre y correo, alineados en dos columnas en pantallas grandes --}}
            <div class="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nom complet"
                       class="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40">

                <input type="email" placeholder="Correu electrònic"
                       class="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40">
            </div>

            {{-- Campo de mensaje --}}
            <textarea placeholder="Missatge"
                      class="w-full p-3 border rounded-xl text-sm h-32 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40"></textarea>

            {{-- Botón principal del formulario --}}
            <button class="bg-[#0F5132] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#0c3f27] transition shadow-md">
                Enviar missatge
            </button>
        </form>
    </div>
</section>
@endsection
