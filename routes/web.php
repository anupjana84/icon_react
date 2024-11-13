<?php

use Inertia\Inertia;
use App\Http\Middleware\AuthCheck;
use App\Http\Middleware\RoleCheck;
use App\Http\Middleware\LoginCheck;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CompanyCntroller;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SalesmanController;



// Route::get('/', function () {
//     return Inertia::render('Home');
// }); 
Route::middleware([LoginCheck::class])->group(function () {
    //login 
    Route::get('/', function () {
        return Inertia::render('auth/Login');
    })->name('login'); 
   Route::post('/login', [AuthController::class, 'login']);
});


Route::get('/about', function () {  
    return Inertia::render('About');
});


Route::get('/customers/search', [CustomerController::class, 'search'])->name('customers.search');
Route::get('/code/{code}', [ProductController::class, 'getProductByCode']);
Route::get('/sales/{id}/invoice', [SaleController::class, 'invoice']);

Route::middleware([AuthCheck::class])->group(function () {
     
    Route::middleware([RoleCheck::class . ':admin'])->group(function () {
    Route::resource('/brands', BrandController::class);
    Route::resource('/products', ProductController::class);
    Route::get('/settings/product',[ProductController::class, 'allBarcode'])->name('settings.products');
    Route::resource('/items', CategoryController::class);
    Route::resource('/companies', CompanyCntroller::class);
    Route::resource('/customers', CustomerController::class);
    Route::resource('/sales', SaleController::class);
    Route::resource('/expenses', ExpenseController::class);
    Route::get('/product-stocks/{role?}', [ProductController::class, 'stock']);
    Route::get('/salesmans', [SalesmanController::class, 'index']);
    Route::post('/salesmans', [SalesmanController::class,'store']);
    Route::put('/salesmans/{id}', [SalesmanController::class, 'update']);
    Route::delete('/salesmans/{id}', [SalesmanController::class, 'destroy']);
    Route::get('/products/details', [ProductController::class, 'show']);
    });
    Route::get('/users/{role?}', [UserController::class, 'index'])->name('users.index');
    Route::post('/create-multiple', [ProductController::class, 'storeChunk']);
    Route::get('/purchase/create', [PurchaseController::class, 'create']);
    Route::post('/purchase/store', [PurchaseController::class,'store']);
    Route::get('/purchase', [PurchaseController::class, 'index']);
    Route::get('/purchases/{id}/', [PurchaseController::class, 'show']);
    Route::patch('/products-update/{id}', [ProductController::class, 'updateProduct']);
    Route::get('/settings/profile', fn() => Inertia::render('backend/settings/pages/ProfileSettings'));
    
    Route::get('/settings/payment', fn() => Inertia::render('backend/settings/pages/PaymentSettings'));

    //logout
    Route::get('/logout', [AuthController::class, 'logout']);
});









// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
