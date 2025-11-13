<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EkskulController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\OperatorBerita;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\OperatorEskul;
use App\Http\Controllers\OperatorGaleri;
use App\Http\Controllers\OperatorMapel;
use App\Http\Controllers\OperatorGuru;
use App\Http\Controllers\OperatorProfilSekolah;
use App\Http\Controllers\OperatorSiswa;
use App\Http\Controllers\ProfilSekolahController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\FaxController;
use App\Http\Controllers\LoginController;
use App\Models\Ekstrakulikuler;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
//login
Route::get('/login', [LoginController::class,'loginShow'])->name('loginShow');
Route::post('/login', [LoginController::class,'login'])->name('loginPost');
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    });

// Route::middleware(['auth', 'verified'])
//     ->prefix('operator')
//     ->group(function () {
//         Route::get('dashboard', [OperatorController::class, 'index'])->name('operator.dashboard');
//         });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
