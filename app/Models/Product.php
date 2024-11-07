<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductDetails;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasApiTokens;
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
        'purchase_name',
        'code',
        'warranty',
        'purchase_qty',
        'details_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category');
    }
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand');
    }

    public function purchases(){
        return $this->hasMany(Purchase::class);
    }
    public function details(){
        return $this->belongsTo(ProductDetails::class, 'details_id');
    }
}
