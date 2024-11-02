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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2); // Expense amount
            $table->date('expense_date')->default(DB::raw('CURRENT_DATE')); // Automatically set to current date
            $table->string('category'); // Category of expense (e.g., utilities, travel)
            $table->string('payment_method')->nullable(); // Payment method (e.g., cash, credit card)
            $table->text('note')->nullable(); // Description of the expense
            $table->timestamps();
            $table->softDeletes(); // Deleted timestamp (for soft deletes)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
