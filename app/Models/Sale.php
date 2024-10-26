<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $table = 'sales';
    protected $fillable = [
        'customer_id',
        'order_id',
        'product_id',
        'quantity',
        'total_price',
        'discount',
        'shipping_address',
        'shipping_pin',
        'refund',
        'refund_reason',
        'return_reason',
        'return_quantity',
        'invoice_number',
        'payment_status',
        'paid_amount',
        'payment_method'
    ];
    // Define the relationship with the Customer model
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    // Define the relationship with the Order model
    public function order(){
        return $this->belongsTo(Order::class);
    }
    // Define the relationship with the Product model
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
