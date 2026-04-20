<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('titulo')->nullable();
            $table->text('mensaje');
            $table->enum('prioridad', ['muy_alta', 'alta', 'normal', 'baja'])->default('normal');
            $table->boolean('activa')->default(true);
            $table->timestamp('fecha_publicacion')->useCurrent();
            $table->timestamp('fecha_expiracion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};