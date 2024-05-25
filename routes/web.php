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
Route::get('/admin', function () {
    return Inertia::render('Admin');
})
    ->middleware(['auth', SuperAdmin::class])
    ->name('admin');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// categorys

Route::post('/category', [CategorysController::class, 'store']);
Route::delete('/category/delete:id', [CategorysController::class, 'destroy']);
Route::get('/category', [CategorysController::class, 'show']);

//  product

Route::post('/product', [ProductsController::class, 'store']);
Route::get('/product', [ProductsController::class, 'show']);
Route::get('/images/{filename}', [ProductsController::class, 'showImage']);

require __DIR__ . '/auth.php';
