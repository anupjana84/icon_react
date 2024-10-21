<?php

namespace App\Models;

use App\Models\Salesman;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'wpnumber',
        'address',
        'pin',
        'sales_ids',
        'salesman_id',
    ];

    // Define the relationship with the Order model
    public function salesman()
    {
        return $this->hasMany(Salesman::class);
    }
}

