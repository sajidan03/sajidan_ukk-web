<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produk;
use App\Models\Kategori;
use App\Models\Toko;

class WelcomeController extends Controller
{
    public function index()
    {
        $popularFoods = Produk::with(['gambarProduk', 'kategori', 'toko'])
            ->where('stok', '>', 0)
            ->orderBy('tanggal_upload', 'desc')
            ->limit(8)
            ->get();

        $categories = Kategori::all();

        $stores = Toko::all();

                return inertia('welcome', [

            'popularFoods' => $popularFoods,
            'categories' => $categories,
            'stores' => $stores,
        ]);
    }

    public function menu()
    {
        $products = Produk::with(['gambarProduk', 'kategori', 'toko'])
            ->where('stok', '>', 0)
            ->orderBy('nama_produk')
            ->get();

        $categories = Kategori::all();

                return inertia('welcome', [

            'popularFoods' => $products,
            'categories' => $categories,
            'stores' => [],
            'currentView' => 'menu'
        ]);
    }

    public function categories()
    {
        $categories = Kategori::withCount(['produks' => function($query) {
            $query->where('stok', '>', 0);
        }])->get();

        return inertia('welcome', [
            'popularFoods' => [],
            'categories' => $categories,
            'stores' => [],
            'currentView' => 'categories'
        ]);
    }

    public function stores()
    {
        $stores = Toko::withCount(['produks' => function($query) {
            $query->where('stok', '>', 0);
        }])->get();

                return inertia('welcome', [

            'popularFoods' => [],
            'categories' => [],
            'stores' => $stores,
            'currentView' => 'stores'
        ]);
    }
}
