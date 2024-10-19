<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salesman extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'user_id',
        'point',
        'other_point',
        'address'
    ];

    protected $table = 'salesmen';
     
    public $timestamps = true;
    public function user(){
        return $this->belongsTo(User::class);
    }

}
