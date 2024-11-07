<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductDetails extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'description',
        'discount',
        'warranty',
        'status',
        'thumbnail_image',
        'image',
        'phone'
    ];

    public function product(){
        return $this->hasMany(Product::class);
    }
}
