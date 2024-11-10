<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Purchase;
use App\Models\ProductDetails;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'model',
        'quantity',
        'point',
        'free_delivery',
        'discount',
        'sale_price',
        'purchase_price',
        'category',
        'brand',
        'code',
        'purchase_qty',
        'details_id',
        'purchase_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category');
    }
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand');
    }
    public function details(){
        return $this->belongsTo(ProductDetails::class, 'details_id');
    }
    public function purchase(){
        return $this->belongsTo(Purchase::class, 'purchase_id');
    }
}
