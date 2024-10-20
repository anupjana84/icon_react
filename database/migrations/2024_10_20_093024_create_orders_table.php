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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('lalesman_id')->nullable(); // Reference to the company if linked to a company
            $table->integer('quantity')->default(1); 
            $table->string('customer_name')->nullable();
            $table->string('customer_wp')->nullable();
            $table->string('customer_phone')->nullable();
             // Shipping address fields
            $table->string('shipping_address');
            $table->string('shipping_pin');

            // Order status
            $table->enum('order_status', ['pending', 'delivered', 'canceled', 'returned'])->default('pending');
            $table->string('order_number')->unique();
            $table->text('notes')->nullable(); // Special instructions or notes
            $table->softDeletes(); // Soft delete for historical records
            $table->timestamps();
            // Foreign key for user_id
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            // Foreign key for product_id
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
            // Foreign key for lalesman_id
            $table->foreign('lalesman_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
