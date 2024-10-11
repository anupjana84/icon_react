<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'gst_number',
        'total_due',
    ];

    public function purchases(){
        return $this->hasMany(Purchase::class);
    }
    
}
