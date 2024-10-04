<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'model',
        'quantity',
        'phone',
        'hsn_code',
        'product_gst',
        'point',
        'free_delivery',
        'purchase_address',
        'purchase_date',
        'purchase_receive_date',
        'discount',
        'status',
        'sale_price',
        'purchase_price',
        'purchase_phone',
        'purchase_gst',
        'purchase_invoice_no',
        'available_from',
        'thumbnail_image',
        'image',
        'category',
        'brand',
    ];
}
