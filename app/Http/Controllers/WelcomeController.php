<?php

namespace App\Http\Controllers;

use App\Models\Fax;
use Illuminate\Http\Request;
use App\Models\Produk;
use App\Models\Kategori;
use App\Models\Toko;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;

class WelcomeController extends Controller
{
    public function index()
    {
        $popularFoods = Produk::with(['gambarProduk', 'kategori', 'toko'])
            ->where('stok', '>', 0)
            ->orderBy('tanggal_upload', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($produk) {
                $produk->gambarProduk = $produk->gambar_produk;
                unset($produk->gambar_produk);
                return $produk;
            });

        $categories = Kategori::all();

        $stores = Toko::all()->map(function($toko) {
            $toko->encrypted_id = Crypt::encrypt($toko->id);
            return $toko;
        });

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
        }])->get()->map(function($toko) {
            $toko->encrypted_id = Crypt::encrypt($toko->id);
            return $toko;
        });

        return inertia('welcome', [
            'popularFoods' => [],
            'categories' => [],
            'stores' => $stores,
            'currentView' => 'stores'
        ]);
    }

  public function storeDetail($encryptedId)
{
    try {
        $id = Crypt::decrypt($encryptedId);

        $toko = Toko::with(['user', 'produks' => function($query) {
            $query->where('stok', '>', 0)
                  ->with(['gambarProduk', 'kategori']);
        }])
        ->withCount(['produks' => function($query) {
            $query->where('stok', '>', 0);
        }])
        ->findOrFail($id);

        $categories = Kategori::all();

        return Inertia::render('detail-toko', [
            'toko' => $toko,
            'categories' => $categories,
            'popularFoods' => $toko->produks,
        ]);

    } catch (\Exception $e) {
        abort(404, 'Toko tidak ditemukan');
    }
}
 public function fax(Request $request){
    $request->validate([
        'nama' => 'required|string',
        'pesan' => 'required|string',
    ]);
    Fax::create([
        'nama' => $request->input('nama'),
        'pesan' => $request->input('pesan'),
    ]);
    return redirect()->back()->with('success', 'Pesan berhasil dikirim!');
 }
 public function productDetail($id)
{
    $product = Produk::with(['gambarProduk', 'kategori', 'toko.user'])
        ->findOrFail($id);

    $relatedProducts = Produk::with(['gambarProduk', 'kategori'])
        ->where('id_kategori', $product->id_kategori)
        ->where('id', '!=', $product->id)
        ->limit(4)
        ->get();

    return Inertia::render('detail-produk', [
        'product' => $product,
        'relatedProducts' => $relatedProducts,
    ]);
}
}
