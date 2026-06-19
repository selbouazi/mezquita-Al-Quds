<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->boolean('leido')->default(false)->after('user_agent');
        });

        Schema::dropIfExists('contactos');
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropColumn('leido');
        });

        Schema::create('contactos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->string('telefono')->nullable();
            $table->text('mensaje');
            $table->string('tipo')->default('web');
            $table->boolean('leido')->default(false);
            $table->timestamps();
        });
    }
};
