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
        Schema::create('product_details', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->text('description'); // Product description
            $table->decimal('discount', 5, 2)->default(0); // Discount percentage (e.g., 10.50%)
            $table->boolean('status')->default(1); // Status: 1 for active, 0 for inactive
            $table->string('warranty')->nullable(); // Warranty information (e.g., "1 year")
            $table->string('thumbnail_image')->nullable(); // Path to the thumbnail image
            $table->json('image')->nullable(); // JSON column to store multiple image paths
            $table->string('phone')->nullable(); // Phone number related to the product
            $table->timestamps(); // Created and updated timestamps
            $table->softDeletes(); // Deleted timestamp (for soft deletes)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_details');
    }
};
