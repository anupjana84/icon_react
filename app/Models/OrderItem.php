<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        // Add any additional fields as needed
        // Example: 'total', 'discount'
    ];
    // Define the relationship with the Order model
    public function order(){
        return $this->belongsTo(Order::class);
    }
    // Define the relationship with the Product model
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
