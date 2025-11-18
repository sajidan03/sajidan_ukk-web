<?php

namespace App\Http\Controllers;

use App\Models\GambarProduk;
use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class DetailGambarController extends Controller
{
    public function show($id)
    {
        try {
            $decryptedId = decrypt($id);
            $produk = Produk::with(['kategori', 'toko', 'gambarProduk'])
                ->where('id', $decryptedId)
                ->firstOrFail();

            // Format tanggal dengan aman
            $tanggalUpload = $produk->tanggal_upload;
            $createdAt = $produk->created_at;
            $updatedAt = $produk->updated_at;

            $produkDetail = [
                'id' => $produk->id,
                'encrypted_id' => encrypt($produk->id),
                'nama_produk' => $produk->nama_produk,
                'harga' => 'Rp.' . number_format($produk->harga, 0, ',', '.'),
                'stok' => $produk->stok,
                'deskripsi' => $produk->deskripsi,
                'url_wa' => $produk->url_wa,
                'kategori' => $produk->kategori ? [
                    'id' => $produk->kategori->id,
                    'nama_kategori' => $produk->kategori->nama_kategori,
                ] : null,
                'toko' => $produk->toko ? [
                    'id' => $produk->toko->id,
                    'nama_toko' => $produk->toko->nama_toko,
                ] : null,
                'gambar_produk' => $produk->gambarProduk->sortBy('id')->values()->map(function ($gambar) {
                    return [
                        'id' => $gambar->id,
                        'nama_gambar' => $gambar->nama_gambar,
                        'url' => Storage::url('assets/produk/' . $gambar->nama_gambar),
                        'created_at' => $gambar->created_at->format('d M Y'),
                    ];
                })->toArray(),
                'tanggal_upload' => $this->formatDateSafely($tanggalUpload, 'd F Y'),
                'created_at' => $createdAt->format('d M Y'),
                'updated_at' => $updatedAt->format('d M Y'),
            ];

            return Inertia::render('Member/Produk/detail-gambar', [
                'produk' => $produkDetail,
            ]);

        } catch (\Exception $e) {
            Log::error('Error in product detail: ' . $e->getMessage());
            return redirect()->route('memberProdukView')->with('error', 'Produk tidak ditemukan.');
        }
    }

    /**
     * Helper function to format date safely
     */
    private function formatDateSafely($date, $format = 'd F Y')
    {
        try {
            if (is_string($date)) {
                return Carbon::parse($date)->format($format);
            }

            if ($date instanceof \Carbon\Carbon) {
                return $date->format($format);
            }

            return 'Tanggal tidak valid';
        } catch (\Exception $e) {
            Log::error('Error formatting date: ' . $e->getMessage());
            return 'Tanggal tidak valid';
        }
    }

    /**
     * Delete single image from product
     */
    public function deleteImage(Request $request, $productId, $imageId)
    {
        try {
            $decryptedProductId = decrypt($productId);
            $decryptedImageId = decrypt($imageId);

            $produk = Produk::findOrFail($decryptedProductId);
            $userToko = Toko::where('id_user', Auth::id())->first();

            if ($produk->id_toko != $userToko->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk menghapus gambar ini.'
                ], 403);
            }

            $gambar = GambarProduk::where('id_produk', $produk->id)
                ->where('id', $decryptedImageId)
                ->firstOrFail();

            // Delete physical file
            $filePath = storage_path('app/assets/produk/' . $gambar->nama_gambar);
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            // Delete database record
            $gambar->delete();

            return response()->json([
                'success' => true,
                'message' => 'Gambar berhasil dihapus.'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting image: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus gambar: ' . $e->getMessage()
            ], 500);
        }
    }
}
