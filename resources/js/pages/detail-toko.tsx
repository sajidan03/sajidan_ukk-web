import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";

interface User {
    id: number;
    nama: string;
    username: string;
    role: string;
    kontak: string;
}

interface Kategori {
    id: number;
    nama_kategori: string;
    produks_count?: number;
}

interface Produk {
    id: number;
    id_kategori: number;
    nama_produk: string;
    harga: number;
    stok: number;
    deskripsi: string;
    tanggal_upload: string;
    id_toko: number;
    url_wa: string;
    gambar_produk?: GambarProduk[];
    kategori?: Kategori;
    toko?: Toko;
}

interface GambarProduk {
    id: number;
    id_produk: number;
    nama_gambar: string;
}

interface Toko {
    id: number;
    nama_toko: string;
    deskripsi: string;
    gambar: string;
    id_user: number;
    kontak_toko: string;
    alamat: string;
    user?: User;
    produks?: Produk[];
    produks_count?: number;
}

interface StoreDetailProps {
    toko: Toko;
    categories: Kategori[];
    popularFoods: Produk[];
}

const StoreDetail: React.FC<StoreDetailProps> = ({
    toko,
    categories = [],
    popularFoods = []
}) => {
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getProductImage = (produk: Produk) => {
        if (produk.gambar_produk && produk.gambar_produk.length > 0) {
            return `/storage/assets/produk/${produk.gambar_produk[0].nama_gambar}`;
        }
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iMC4zNWVtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5Qcm9kdWs8L3RleHQ+PC9zdmc+';
    };

    const getStoreImage = (toko: Toko) => {
        if (toko.gambar) {
            return `/storage/assets/toko/${toko.gambar}`;
        }
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iMC4zNWVtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5Ij5Ub2tvIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    };

    // Filter dan sort produk
    const filteredProducts = popularFoods
        .filter(produk => {
            const matchesCategory = selectedCategory === 'all' || produk.id_kategori === selectedCategory;
            const matchesSearch = produk.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                produk.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.nama_produk.localeCompare(b.nama_produk);
                case 'price':
                    return a.harga - b.harga;
                case 'newest':
                default:
                    return new Date(b.tanggal_upload).getTime() - new Date(a.tanggal_upload).getTime();
            }
        });

    return (
        <>
            <Head title={`${toko.nama_toko} - SA Market`} />

            <div className="min-h-screen bg-gray-50">
                {/* Professional Header */}
                <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/storage/assets/logo.png"
                                        alt="SA Market Logo"
                                        className="w-10 h-10 rounded-xl shadow-md"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xl text-gray-900">SA Market</span>
                                        <span className="text-xs text-gray-500">Official Store</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                                    Beranda
                                </Link>
                                <Link href="/menu" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                                    Semua Produk
                                </Link>
                                <Link href="/stores" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                                    Toko Lain
                                </Link>
                            </nav>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/stores"
                                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>
                                <Link
                                    href="/login"
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Store Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Store Image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={getStoreImage(toko)}
                                        alt={toko.nama_toko}
                                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        ⭐ Verified
                                    </div>
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                    <div>
                                        <h1 className="text-4xl lg:text-5xl font-bold mb-2">{toko.nama_toko}</h1>
                                        <p className="text-blue-100 text-lg mb-4 max-w-2xl">
                                            {toko.deskripsi}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20">
                                        <div className="text-2xl font-bold">{toko.produks_count || 0}</div>
                                        <div className="text-blue-100 text-sm">Produk Tersedia</div>
                                    </div>
                                </div>

                                {/* Store Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Kontak</div>
                                            <div className="text-blue-100">{toko.kontak_toko}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Lokasi</div>
                                            <div className="text-blue-100 line-clamp-1">{toko.alamat}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Pemilik</div>
                                            <div className="text-blue-100">{toko.user?.nama || 'Tidak tersedia'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a
                                        href={`https://wa.me/${toko.kontak_toko.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                        </svg>
                                        Hubungi Toko
                                    </a>
                                    <button className="bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg hover:bg-white/30 transition duration-200 font-semibold backdrop-blur-sm">
                                        Bagikan Toko
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Products Header */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h2>
                                <p className="text-gray-600">
                                    Jelajahi {toko.produks_count || 0} produk berkualitas dari {toko.nama_toko}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="name">Nama A-Z</option>
                                    <option value="price">Harga Terendah</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mt-6">
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                        selectedCategory === 'all'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Semua Kategori
                                </button>
                                {categories.map((kategori) => (
                                    <button
                                        key={kategori.id}
                                        onClick={() => setSelectedCategory(kategori.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                            selectedCategory === kategori.id
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {kategori.nama_kategori}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((produk) => (
                                <div
                                    key={produk.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={getProductImage(produk)}
                                            alt={produk.nama_produk}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                {produk.kategori?.nama_kategori}
                                            </span>
                                        </div>
                                        {produk.stok === 0 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                                    Stok Habis
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 left-3">
                                            {produk.stok > 0 && (
                                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                                    Stok: {produk.stok}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {produk.nama_produk}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {produk.deskripsi}
                                        </p>

                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {formatCurrency(produk.harga)}
                                            </span>
                                        </div>

                                        <a
                                            href={produk.url_wa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-2 ${
                                                produk.stok > 0
                                                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                            onClick={(e) => {
                                                if (produk.stok === 0) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                            </svg>
                                            {produk.stok > 0 ? 'Pesan via WhatsApp' : 'Stok Habis'}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border">
                            <div className="text-gray-300 text-8xl mb-6">🍽️</div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                                {searchTerm || selectedCategory !== 'all' ? 'Produk tidak ditemukan' : 'Belum Ada Produk'}
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Coba ubah pencarian atau filter kategori'
                                    : `Saat ini ${toko.nama_toko} belum memiliki produk yang tersedia.`}
                            </p>
                            {(searchTerm || selectedCategory !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                    }}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
                                >
                                    Reset Pencarian
                                </button>
                            )}
                        </div>
                    )}
                </section>

                {/* Store Info Section */}
                <section className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Store Description */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tentang {toko.nama_toko}</h3>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="leading-relaxed">
                                        {toko.deskripsi}
                                    </p>
                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Produk berkualitas terjamin</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Respon cepat via WhatsApp</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Terpercaya di SA Market</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-100 p-3 rounded-xl">
                                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Kontak Toko</h4>
                                            <p className="text-gray-600 mt-1">{toko.kontak_toko}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-100 p-3 rounded-xl">
                                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Alamat</h4>
                                            <p className="text-gray-600 mt-1">{toko.alamat}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-100 p-3 rounded-xl">
                                            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Pemilik Toko</h4>
                                            <p className="text-gray-600 mt-1">{toko.user?.nama || 'Tidak tersedia'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">SA Market</h3>
                                <p className="text-gray-400 text-sm">
                                    Platform jual beli makanan dan minuman untuk komunitas Seoul Arts High School.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
                                    <li><Link href="/menu" className="hover:text-white transition">Menu</Link></li>
                                    <li><Link href="/categories" className="hover:text-white transition">Kategori</Link></li>
                                    <li><Link href="/stores" className="hover:text-white transition">Toko</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>📍 Seoul Arts High School</li>
                                    <li>📞 +82 10-1234-5678</li>
                                    <li>✉️ hello@samarket.co.kr</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Jam Operasional</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>Senin - Jumat: 07:00 - 17:00</li>
                                    <li>Sabtu: 08:00 - 15:00</li>
                                    <li>Minggu: Libur</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                            <p>© 2024 SA Market. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default StoreDetail;
