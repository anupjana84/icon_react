<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesPayment extends Model
{
    use HasFactory;

    protected $table = 'sales_payments';

    protected $fillable = [
        'sale_id',
        'amount',
        'payment_date',
        'online_payment',
        'cash_payment',
        'finance',
    ];

    /**
     * Get the sale that owns the payment.
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
