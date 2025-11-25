<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
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
            'password' => 'required', 'confirmed',
            'kontak' => 'required|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->nama,
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'kontak' => $request->kontak,
            'role' => 'pemilik_toko',
        ]);
        return redirect()->route('login')->with('success', 'Pendaftaran berhasil! Selamat datang.');
    }
}
