<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class KategoriController extends Controller
{
    public function index()
    {
        try {
            $kategoris = Kategori::all()->map(function ($kategori) {
                return [
                    'id' => $kategori->id,
                    'nama_kategori' => $kategori->nama_kategori,
                    'encrypted_id' => Crypt::encrypt($kategori->id),
                    'created_at' => $kategori->created_at->format('d-m-Y H:i:s'),
                    'updated_at' => $kategori->updated_at->format('d-m-Y H:i:s'),
                ];
            });

            return inertia('Admin/Kategori/Index', [
                'kategoris' => $kategoris,
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function create()
    {
        return inertia('Admin/Kategori/tambah');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_kategori' => 'required|string|max:255|unique:kategoris,nama_kategori',
            ]);

            Kategori::create([
                'nama_kategori' => $request->nama_kategori,
            ]);

            return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil ditambahkan.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan kategori: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        try {
            $decryptedId = Crypt::decrypt($id);
            $kategori = Kategori::findOrFail($decryptedId);

            return inertia('Admin/Kategori/Edit', [
                'kategori' => [
                    'id' => $kategori->id,
                    'nama_kategori' => $kategori->nama_kategori,
                    'encrypted_id' => $id,
                ],
            ]);

        } catch (\Exception $e) {
            return redirect()->route('admin.kategori.index')->with('error', 'Kategori tidak ditemukan.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $decryptedId = Crypt::decrypt($id);
            $kategori = Kategori::findOrFail($decryptedId);

            $request->validate([
                'nama_kategori' => 'required|string|max:255|unique:kategoris,nama_kategori,' . $kategori->id,
            ]);

            $kategori->update([
                'nama_kategori' => $request->nama_kategori,
            ]);

            return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil diperbarui.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui kategori: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $decryptedId = Crypt::decrypt($id);
            $kategori = Kategori::findOrFail($decryptedId);

            // Cek apakah kategori digunakan oleh produk
            if ($kategori->produk()->exists()) {
                return redirect()->back()->with('error', 'Tidak dapat menghapus kategori karena masih digunakan oleh produk.');
            }

            $kategori->delete();

            return redirect()->route('admin.kategori.index')->with('success', 'Kategori berhasil dihapus.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus kategori: ' . $e->getMessage());
        }
    }
}
