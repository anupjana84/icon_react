<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if the table name follows Laravel's naming convention)
    protected $table = 'expenses';

    // Define the attributes that are mass assignable
    protected $fillable = [
        'amount',
        'expense_date',
        'category',
        'payment_method',
        'note',
    ];

    // Define the attributes that should be cast to native types
    protected $casts = [
        'expense_date' => 'date', // Casts the expense_date as a date
        'amount' => 'decimal:2',  // Casts the amount as a decimal with 2 decimal places
    ];

}
