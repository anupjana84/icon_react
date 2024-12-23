<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id',
        'purchase_date',
        'purchase_receive_date',
        'purchase_invoice_no',
        'gst'
    ];

    public function products(){
        return $this->hasMany(Product::class);
    }
    public function company(){
        return $this->belongsTo(Company::class);
    }
}
