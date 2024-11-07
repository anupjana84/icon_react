<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'customer_id',
        'salesman_id',
        'product_id',
        'quantity',
        'shipping_address',
        'shipping_pin',
        'order_status',
        'notes',
    ];
    // Define the relationship with the Customer model
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    // Define the relationship with the Salesman model
    public function salesman(){
        return $this->belongsTo(Salesman::class);
    }
    // Define the relationship with the Purchase model
    public function product(){
        return $this->hasMany(product::class);
    }
}
