<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index()
    {
        $produk = Produk::with(['kategori', 'toko', 'gambarProduk'])
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'encrypted_id' => encrypt($item->id),
                    'id_kategori' => $item->id_kategori,
                    'nama_produk' => $item->nama_produk,
                    'harga' => $item->harga,
                    'stok' => $item->stok,
                    'deskripsi' => $item->deskripsi,
                    'tanggal_upload' => $item->tanggal_upload,
                    'id_toko' => $item->id_toko,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                    'gambar_produk' => $item->gambarProduk->map(function ($gambar) {
                        return [
                            'id' => $gambar->id,
                            'id_produk' => $gambar->id_produk,
                            'nama_gambar' => $gambar->nama_gambar,
                        ];
                    }),
                    'kategori' => $item->kategori ? [
                        'id' => $item->kategori->id,
                        'nama_kategori' => $item->kategori->nama_kategori,
                    ] : null,
                    'toko' => $item->toko ? [
                        'id' => $item->toko->id,
                        'nama_toko' => $item->toko->nama_toko,
                    ] : null,
                ];
            });

        return Inertia::render('Member/Produk/index', [
            'produk' => $produk,
        ]);
    }

    public function destroy($id)
    {
        try {
            $decryptedId = decrypt($id);
            $produk = Produk::findOrFail($decryptedId);

            foreach ($produk->gambarProduk as $gambar) {
                $filePath = storage_path('app/assets/produk/' . $gambar->nama_gambar);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }

            // Hapus data gambar dari database
            $produk->gambarProduk()->delete();

            // Hapus produk
            $produk->delete();

            return redirect()->back()->with('success', 'Produk berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus produk.');
        }
    }

    // Method lainnya: create, store, edit, update, export, dll.
}
