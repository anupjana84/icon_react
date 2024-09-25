<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;

Route::resource('/brands', BrandController::class);
Route::resource('/products', ProductController::class);

Route::get('/', function () {
    return Inertia::render('Home');
}); 
Route::get('/about', function () {  
    return Inertia::render('About');
});
// Route::get('user1','App\Http\Controllers\HomeController@index')->name('wolecome');




// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
