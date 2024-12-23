<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->constrained('sales')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            // Payment method columns
            $table->boolean('online_payment')->default(false);
            $table->boolean('cash_payment')->default(false);
            $table->enum('finance', ['hdb_finance', 'bajaj_finance'])->nullable();
            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_payments');
    }
};
