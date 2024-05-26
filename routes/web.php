<?php

use Inertia\Inertia;
use App\Http\Middleware\SuperAdmin;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategorysController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProductsController;

Route::get('/', function () {
    return Inertia::render('Products');
});
Route::get('/products', function () {
    return Inertia::render('Products');
});

Route::get('/product/{id}', function () {
    return Inertia::render('ProductPage');
});
Route::get('/admin', function () {
    return Inertia::render('Admin');
});

// /api
Route::post('/api/login', [AuthenticatedSessionController::class, 'store']);

// categorys

Route::post('/api/category', [CategorysController::class, 'store']);
Route::delete('/api/category/{id}', [CategorysController::class, 'destroy']);
Route::get('/api/category', [CategorysController::class, 'show']);

//  product

Route::post('/api/product', [ProductsController::class, 'store']);
Route::get('/api/product', [ProductsController::class, 'show']);
Route::get('/api/product/{id}', [
    ProductsController::class,
    'showSingleProduct',
]);
Route::delete('/api/product/{id}', [ProductsController::class, 'destroy']);
// image
Route::get('images/{filename}', [ProductsController::class, 'showImage']);
Route::get('product/images/{filename}', [
    ProductsController::class,
    'showImage',
]);

require __DIR__ . '/auth.php';
