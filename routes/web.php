<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DaftarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailGambarController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TokoController;
use App\Http\Controllers\TokoSayaController;
use Illuminate\Support\Facades\Route;

//landing-page
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/menu', [WelcomeController::class, 'menu'])->name('menu');
Route::get('/categories', [WelcomeController::class, 'categories'])->name('categories');
Route::get('/stores', [WelcomeController::class, 'stores'])->name('stores');
Route::get('/toko/{id}', [WelcomeController::class, 'storeDetail'])->name('store.detail');
Route::post('/fax', [WelcomeController::class, 'fax'])->name('fax');
Route::get('/produk/{id}', [WelcomeController::class, 'productDetail'])->name('product.detail');
//daftar
Route::get('/daftar', [DaftarController::class, 'index'])->name('registerView');
Route::post('/daftar', [DaftarController::class, 'daftar'])->name('registerPost');
//login
Route::get('/login', [LoginController::class,'loginShow'])->name('login');
Route::post('/login', [LoginController::class,'login'])->name('loginPost');
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        //kelola-user
        Route::get('user', [UserController::class, 'index'])->name('userView');
        Route::get('user/tambah', [UserController::class, 'tambahView'])->name('userTambahView');
        Route::post('user/tambah', [UserController::class, 'simpan'])->name('userSimpan');
        Route::get('user/edit/{id}', [UserController::class, 'userEditView'])->name('userEditView');
        Route::post('user/edit/{id}', [UserController::class, 'editUser'])->name('userEdit');
        Route::delete('user/hapus/{id}', [UserController::class, 'hapusUser'])->name('userHapus');
        //kelola-toko
        Route::get('toko', [TokoController::class, 'index'])->name('admin.toko.index');
        Route::get('toko/tambah', [TokoController::class, 'simpanView'])->name('admin.toko.create');
        Route::post('toko/tambah', [TokoController::class, 'simpan'])->name('admin.toko.store');
        Route::get('toko/{id}', [TokoController::class, 'show'])->name('admin.toko.show');
        Route::get('toko/edit/{id}', [TokoController::class, 'editView'])->name('admin.toko.edit');
        Route::post('toko/edit/{id}', [TokoController::class, 'edit'])->name('admin.toko.update');
        Route::delete('toko/hapus/{id}', [TokoController::class, 'destroy'])->name('admin.toko.destroy');
        Route::get('toko/export', [TokoController::class, 'export'])->name('admin.toko.export');
        //kelola-kategori
        Route::get('kategori', [KategoriController::class, 'index'])->name('adminKategoriView');
        Route::get('kategori/tambah', [KategoriController::class, 'tambahView']);
        Route::post('kategori/tambah', [KategoriController::class, 'tambah']);
        Route::delete('kategori/hapus/{encrypted_id}', [KategoriController::class, 'destroy']);
        Route::get('kategori/edit/{id}', [KategoriController::class, 'editView']);
        Route::post('kategori/edit/{id}', [KategoriController::class, 'edit']);
    });

Route::middleware(['auth', 'verified'])
    ->prefix('member')
    ->group(function () {
        Route::get('dashboard', [MemberController::class, 'index'])->name('member.dashboard');
        //kelola-produk
        Route::get('produk', [ProdukController::class, 'index'])->name('memberProdukView');
        Route::get('produk/tambah', [ProdukController::class, 'simpanView'])->name('memberProdukSimpanView');
        Route::post('produk/tambah', [ProdukController::class, 'simpan'])->name('memberProdukSimpan');
        ROute::get('produk/edit/{id}', [ProdukController::class, 'editView'])->name('memberProdukEditView');
        Route::post('produk/edit/{id}', [ProdukController::class, 'edit'])->name('memberProdukEdit');
        Route::delete('produk/hapus/{id}', [ProdukController::class, 'destroy'])->name('memberProdukHapus');
        //kelola-toko
        Route::get('toko', [TokoSayaController::class, 'index'])->name('member.toko.index');
        Route::get('toko/edit/{id}', [TokoSayaController::class, 'editView'])->name('memberTokoSaya');
        Route::post('toko/edit/{id}', [TokoSayaController::class, 'edit'])->name('member.toko.edit');
        Route::delete('toko/hapus/{id}', [TokoSayaController::class, 'destroy'])->name('member.toko.hapus');
        Route::get('toko/buat', [TokoSayaController::class, 'create'])->name('member.toko.buat');
        //detail-gambar
        Route::get('produk/detail/{id}', [DetailGambarController::class, 'show'])->name('member.produk.detail');
        Route::delete('produk/{productId}/gambar/{imageId}', [DetailGambarController::class, 'deleteImage'])->name('member.produk.deleteImage');

        });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
