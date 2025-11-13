<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\GambarProduk;
class Produk extends Model
{
    //
    protected $guarded = [];
    public function gambarProduk()
    {
        return $this->hasMany(GambarProduk::class, 'id');
    }
}
