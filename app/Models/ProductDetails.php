<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetails extends Model
{
    use HasFactory;

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
