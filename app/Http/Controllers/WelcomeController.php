<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(){
        $data['popularFoods'] = Produk::with('gambarProduk')
            ->where('stok', '>', 0)
            ->limit(5)
            ->get()
            ->map(function ($produk) {
                $gambar = $produk->gambarProduk->first();

                return [
                    'id' => $produk->id,
                    'nama' => $produk->nama_produk,
                    'harga' => '₩' . number_format($produk->harga, 0, ',', '.'),
                    'img' => $gambar ? asset('storage/assets/' . $gambar->nama_gambar) : '/images/default-product.jpg'
                ];
            });

        return Inertia::render('welcome', $data);
    }
}
