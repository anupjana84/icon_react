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
        'discount',
        'shipping_address',
        'shipping_pin',
        'invoice_number',
        'gst',
        'gst_number',
        'total'
    ];
    // Define the relationship with the Customer model
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
    // Define the relationship with the Order model
    public function order(){
        return $this->belongsTo(Order::class);
    }
    
    // Define the relationship with the SalesItem model
    public function salesItems(){
        return $this->hasMany(SalesItem::class);
    }
    // Define the relationship with the SalesPayment model
    public function salesPayment(){
        return $this->hasOne(SalesPayment::class);
    }
}
