<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Products');
});

Route::get('/admin', function () {
    return Inertia::render('Admin');
})
    ->middleware(['auth', 'verified'])
    ->name('Login');

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
