<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Toko extends Model
{
    use HasFactory;

    protected $table = 'tokos';

    protected $guarded = [];


    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function produks()
    {
        return $this->hasMany(Produk::class, 'id_toko');
    }


    public function scopeWithAvailableProducts($query)
    {
        return $query->withCount(['produks' => function($query) {
            $query->where('stok', '>', 0);
        }]);
    }
     const STATUS_AKTIF = 'aktif';
    const STATUS_NONAKTIF = 'non-aktif';
}
