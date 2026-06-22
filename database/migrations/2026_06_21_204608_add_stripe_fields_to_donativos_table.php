<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donativos', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('stripe_session_id', 255)->nullable()->unique();
            $table->string('email_donante', 255)->nullable();
            $table->string('stripe_payment_intent', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('donativos', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'stripe_session_id', 'email_donante', 'stripe_payment_intent']);
        });
    }
};
