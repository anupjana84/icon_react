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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id')->nullable(); // Reference to the order if linked to an order
            $table->unsignedBigInteger('product_id')->nullable(); // Reference to the product being sold
            $table->unsignedBigInteger('user_id')->nullable(); // Reference to the user making the sale (salesperson)
            $table->string('customer_name')->nullable();
            $table->string('customer_wp')->nullable();
            $table->string('customer_phone')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 10, 2); 
            $table->decimal('discount', 10, 2);

            // Shipping information
            $table->string('shipping_address');
            $table->string('shipping_pin');

            // Refund information
            $table->decimal('refund', 10, 2)->nullable(); 
            $table->string('refund_reason')->nullable(); // Reason for refund if applicable

            // Return information
            $table->string('return_reason')->nullable(); // Reason for return if applicable
            $table->integer('return_quantity')->default(0); // Quantity returned by the customer

            // Invoice information
            $table->string('invoice_number')->nullable(); // Invoice number for the sale
            $table->string('invoice_url')->nullable(); // URL to the invoice for the sale

            // Payment information
            $table->enum('payment_status', ['pending', 'completed', 'parts'])->default('pending');
            $table->enum('payment_method', ['cash', 'online', 'emi'])->nullable(); // Payment method used for the sale
            $table->decimal('paid_amount', 10, 2)->nullable(); // Amount paid by the customer for the sale
            $table->softDeletes(); // Soft delete for historical records
            $table->timestamps();
            // Foreign key for order_id
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('set null');
            // Foreign key for product_id
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
            // Foreign key for user_id
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
