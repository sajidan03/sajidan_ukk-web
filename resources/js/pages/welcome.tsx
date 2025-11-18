import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

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

interface WelcomePageProps {
    popularFoods: Produk[];
    categories: Kategori[];
    stores: Toko[];
    currentView?: string;
    auth?: {
        user?: User;
    };
}

type PageView = 'home' | 'menu' | 'categories' | 'stores';

const WelcomePage: React.FC<WelcomePageProps> = ({
    popularFoods = [],
    categories = [],
    stores = [],
    currentView = 'home',
}) => {
    // const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentViewState, setCurrentViewState] = useState<PageView>(currentView as PageView);
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // const user = null; // Force non-login state

    useEffect(() => {
        setCurrentViewState(currentView as PageView);
    }, [currentView]);

    const filteredProducts = popularFoods.filter(produk => {
        const matchesCategory = selectedCategory === 'all' || produk.id_kategori === selectedCategory;
        const matchesSearch = produk.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            produk.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

   const getProductImage = (produk: Produk) => {
    console.log('Product:', produk.nama_produk);
    console.log('Gambar Produk:', produk.gambar_produk);

    if (produk.gambar_produk && produk.gambar_produk.length > 0) {
        const imagePath = `/storage/assets/produk/${produk.gambar_produk[0].nama_gambar}`;
        console.log('Image Path:', imagePath);
        return imagePath;
    }
    console.log('Using default image for:', produk.nama_produk);
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iMC4zNWVtIiB0ZXh0LWFuY2hvcj0ibWkdZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5Qcm9kdWs8L3RleHQ+PC9zdmc+';
};

    const getStoreImage = (toko: Toko) => {
        if (toko.gambar) {
            return `/storage/assets/produk/${toko.gambar}`;
        }
        return '/storage/assets/default-store.jpg';
    };
console.log('Popular Foods Data:', popularFoods);
console.log('Categories Data:', categories);
console.log('Stores Data:', stores);
    const renderHomeView = () => (
        <>
            {/* HERO SECTION */}
            <section className="w-full bg-white overflow-hidden shadow-lg">
                <div className="relative">
                    <img
                        src="/storage/assets/kimchi.png"
                        alt="Korean Food Banner"
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/30 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-40">
                        <div className="max-w-md text-white">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Welcome to SA Market!</h2>
                            <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Temukan makanan dan minuman favorit kamu setiap hari. Pesan lebih cepat via WhatsApp,
                                antrian lebih cepat ^^
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <p>{}</p>
            {/* POPULAR PRODUCTS SECTION */}
            <section className="mt-6 sm:mt-8 md:mt-10 mx-auto w-full px-3 sm:px-4 md:px-6 flex-1 max-w-7xl">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Produk Terpopuler</h3>
                    <span className="text-xs sm:text-sm text-white bg-yellow-600 px-2 sm:px-3 py-1 rounded-full">
                        Banyak diminati!
                    </span>
                </div>

                <div className="bg-[#D9A84E] p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-yellow-200">
                        {popularFoods.length > 0 ? (
                            popularFoods.map((produk) => (
                                <div
                                    key={produk.id}
                                    className="bg-white text-black rounded-lg shadow-md w-32 sm:w-36 md:w-40 flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative">
                                        <img
                                            src={getProductImage(produk)}
                                            alt={produk.nama_produk}
                                            className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
                                            onError={(e) => {
                                                e.currentTarget.src = '/storage/assets/default-product.jpg';
                                            }}
                                        />
                                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                            Hot
                                        </div>
                                    </div>
                                    <div className="p-2 sm:p-3">
                                        <h4 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1">{produk.nama_produk}</h4>
                                        <p className="text-blue-600 text-xs sm:text-sm font-bold mb-2 sm:mb-3">{formatCurrency(produk.harga)}</p>

                                        {/* Primary Action */}
                                        <button className="w-full bg-[#075E54] text-white py-1.5 sm:py-2 rounded text-xs font-medium hover:bg-[#128C7E] transition duration-200 shadow-md hover:shadow-lg mb-1.5 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                            </svg>
                                            <a href={produk.url_wa} target="_blank" rel="noopener noreferrer">Pesan Sekarang</a>
                                        </button>

                                        {/* Secondary Action */}
                                        <button className="w-full bg-transparent text-blue-600 py-1 sm:py-1.5 rounded text-xs hover:bg-blue-50 transition duration-200 border border-blue-200">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-6 sm:py-8">
                                <p className="text-gray-600 text-sm sm:text-base">Sedang tidak ada produk populer</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* INFO SECTION */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm">🚚</span>
                            </div>
                            <h4 className="font-semibold text-sm sm:text-base">Gratis Ongkir</h4>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">Area sekolah gratis ongkir untuk pembelian di atas ₩10.000</p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm">⏰</span>
                            </div>
                            <h4 className="font-semibold text-sm sm:text-base">Cepat Saji</h4>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">Pesanan diproses maksimal 15 menit, ready to eat!</p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm">💬</span>
                            </div>
                            <h4 className="font-semibold text-sm sm:text-base">WhatsApp Order</h4>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">Pesan via WhatsApp, lebih praktis dan cepat responnya</p>
                    </div>
                </div>
            </section>
        </>
    );

    // Render Menu View
    const renderMenuView = () => (
        <section className="mt-6 sm:mt-8 md:mt-10 mx-auto w-full px-3 sm:px-4 md:px-6 flex-1 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Menu Produk</h2>

                {/* Search Bar */}
                <div className="w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedCategory === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Semua
                </button>
                {categories.map((kategori) => (
                    <button
                        key={kategori.id}
                        onClick={() => setSelectedCategory(kategori.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                            selectedCategory === kategori.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {kategori.nama_kategori}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((produk) => (
                        <div
                            key={produk.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            <div className="relative">
                                <img
                                    src={getProductImage(produk)}
                                    alt={produk.nama_produk}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    {produk.kategori?.nama_kategori}
                                </div>
                                {produk.stok === 0 && (
                                    <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Stok Habis
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{produk.nama_produk}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{produk.deskripsi}</p>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-blue-600 font-bold text-lg">{formatCurrency(produk.harga)}</span>
                                    <span className={`text-sm ${produk.stok > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        Stok: {produk.stok}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-[#075E54] text-white py-2 rounded-lg font-medium hover:bg-[#128C7E] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={produk.stok === 0}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                        </svg>
                                        Pesan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Produk tidak ditemukan</h3>
                        <p className="text-gray-500">Coba ubah pencarian atau filter kategori</p>
                    </div>
                )}
            </div>
        </section>
    );

    // Render Categories View
    const renderCategoriesView = () => (
        <section className="mt-6 sm:mt-8 md:mt-10 mx-auto w-full px-3 sm:px-4 md:px-6 flex-1 max-w-7xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Kategori Produk</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((kategori) => (
                    <div
                        key={kategori.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 p-6 text-center cursor-pointer group"
                        onClick={() => {
                            setCurrentViewState('menu');
                            setSelectedCategory(kategori.id);
                        }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            {kategori.nama_kategori.charAt(0)}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{kategori.nama_kategori}</h3>
                        <p className="text-gray-500 text-sm">
                            {kategori.produks_count || 0} produk tersedia
                        </p>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📁</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada kategori</h3>
                    <p className="text-gray-500">Kategori produk akan segera tersedia</p>
                </div>
            )}
        </section>
    );

    // Render Stores View
    const renderStoresView = () => (
        <section className="mt-6 sm:mt-8 md:mt-10 mx-auto w-full px-3 sm:px-4 md:px-6 flex-1 max-w-7xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Daftar Toko</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((toko) => (
                    <div
                        key={toko.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                    >
                        <img
                            src={getStoreImage(toko)}
                            alt={toko.nama_toko}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="font-semibold text-xl mb-2">{toko.nama_toko}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{toko.deskripsi}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="mr-2">📞</span>
                                    {toko.kontak_toko}
                                </div>
                                <div className="flex items-start text-sm text-gray-500">
                                    <span className="mr-2 mt-1">📍</span>
                                    <span className="line-clamp-2">{toko.alamat}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-yellow-600 font-semibold">
                                    ⭐ {toko.produks_count || 0} Produk
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                                    Kunjungi Toko
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {stores.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏪</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada toko</h3>
                    <p className="text-gray-500">Toko akan segera tersedia</p>
                </div>
            )}
        </section>
    );

    // Main render function
    const renderCurrentView = () => {
        switch (currentViewState) {
            case 'menu':
                return renderMenuView();
            case 'categories':
                return renderCategoriesView();
            case 'stores':
                return renderStoresView();
            case 'home':
            default:
                return renderHomeView();
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
            {/* PROFESSIONAL NAVBAR */}
            <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo & Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/storage/assets/logo.png"
                                    alt="SA Market Logo"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-sm"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-base sm:text-lg text-gray-900 leading-tight">SA Market</h1>
                                    <p className="text-xs text-gray-500 leading-tight hidden sm:block">서울예술고등학교</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => setCurrentViewState('home')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'home'
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Beranda
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                                    currentViewState === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('menu')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'menu'
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Menu
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                                    currentViewState === 'menu' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('categories')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'categories'
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Kategori
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                                    currentViewState === 'categories' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('stores')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'stores'
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Toko
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                                    currentViewState === 'stores' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Right Side - Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Cart Icon */}
                            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition duration-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>

                            {/* Always show Logged Out State */}
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-200 py-4">
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={() => {
                                        setCurrentViewState('home');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 ${
                                        currentViewState === 'home'
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                >
                                    Beranda
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('menu');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 ${
                                        currentViewState === 'menu'
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                >
                                    Menu
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('categories');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 ${
                                        currentViewState === 'categories'
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                >
                                    Kategori
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('stores');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 ${
                                        currentViewState === 'stores'
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                >
                                    Toko
                                </button>

                                {/* Mobile Auth Buttons - Always show login */}
                                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                                    <Link
                                        href="/login"
                                        className="text-center bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* MAIN CONTENT */}
            {renderCurrentView()}

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white mt-8 sm:mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Store Info */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/storage/assets/logo.png"
                                    alt="SA Market Logo"
                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                />
                                <h3 className="text-lg sm:text-xl font-bold">SA Market</h3>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                Toko makanan Korea terpercaya di Seoul Arts High School.
                                Menyediakan berbagai kebutuhan makanan dan minuman dengan kualitas terbaik.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-200">
                                    <span className="flex items-center gap-1">
                                        <span className="text-sm">📷</span>
                                        <span className="text-xs sm:text-sm">@samarket_official</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="font-semibold text-base sm:text-lg">Kontak Kami</h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">📍</span>
                                    <span>Gedung A, Lantai 1<br />Seoul Arts High School, Seoul</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">📞</span>
                                    <span>+82 10-1234-5678</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">✉️</span>
                                    <span>hello@samarket.co.kr</span>
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="font-semibold text-base sm:text-lg">Jam Operasional</h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span>Senin - Jumat</span>
                                    <span>07:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sabtu</span>
                                    <span>08:00 - 15:00</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Minggu</span>
                                    <span>Libur</span>
                                </div>
                            </div>
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 sm:p-3">
                                <p className="text-xs text-yellow-200">
                                   <strong>Tips:</strong> Pesan via WhatsApp sebelum jam istirahat untuk menghindari antrian!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                            © 2024 SA Market. All rights reserved.
                        </p>
                        <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-200 text-xs sm:text-sm">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-200 text-xs sm:text-sm">
                                Syarat & Ketentuan
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;
