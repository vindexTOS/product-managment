<?php

use Inertia\Inertia;
use App\Http\Middleware\SuperAdmin;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;

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

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name(
//         'profile.edit'
//     );
//     Route::patch('/profile', [ProfileController::class, 'update'])->name(
//         'profile.update'
//     );
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
//         'profile.destroy'
//     );
// });

require __DIR__ . '/auth.php';
