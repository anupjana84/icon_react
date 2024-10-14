<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CompanyCntroller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PurchaseController;

Route::resource('/brands', BrandController::class);
Route::resource('/products', ProductController::class);
Route::resource('/items', CategoryController::class);
Route::resource('/companies', CompanyCntroller::class);

Route::get('/', function () {
    return Inertia::render('Home');
}); 
Route::get('/about', function () {  
    return Inertia::render('About');
});

Route::post('/create-multiple', [ProductController::class, 'storeChunk']);
Route::get('/purchase/create', [PurchaseController::class, 'create']);
Route::post('/purchase/store', [PurchaseController::class,'store']);
Route::get('/purchase', [PurchaseController::class, 'index']);
Route::get('/purchases/{company_id}/{date}', [PurchaseController::class, 'show']);





// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
