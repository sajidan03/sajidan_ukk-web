<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DaftarController extends Controller
{
    //
      public function index(){
        return Inertia::render('daftar');
    }

     public function daftar(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required',
            'kontak' => 'required|string|max:20',
            'nama_toko' => 'required|string|max:255',
            'deskripsi_toko' => 'required|string',
            'alamat_toko' => 'required|string',
            'gambar_toko' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $gambarToko = null;
        if ($request->hasFile('gambar_toko')) {
            $file = $request->file('gambar_toko');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move('storage/assets/toko', $fileName);
            $gambarToko = $fileName;
        } else {
            $gambarToko = 'default-toko.png';
        }

        $user = User::create([
            'nama' => $request->nama,
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'kontak' => $request->kontak,
            'role' => 'member',
        ]);

        $toko = Toko::create([
            'nama_toko' => $request->nama_toko,
            'deskripsi' => $request->deskripsi_toko,
            'gambar' => $gambarToko,
            'id_user' => $user->id,
            'kontak_toko' => $request->kontak,
            'alamat' => $request->alamat_toko,
        ]);


        return redirect()->route('member.dashboard')->with('success', 'Pendaftaran berhasil! Toko Anda sudah dibuat.');
    }
}
