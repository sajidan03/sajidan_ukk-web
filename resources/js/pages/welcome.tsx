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
    encrypted_id?: string;
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentViewState, setCurrentViewState] = useState<PageView>(currentView as PageView);
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

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

    const renderFeaturedCategories = () => (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategori Pilihan</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Jelajahi berbagai kategori makanan dan minuman terbaik yang tersedia
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.slice(0, 8).map((kategori) => (
                        <div
                            key={kategori.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 p-6 text-center cursor-pointer group"
                            onClick={() => {
                                setCurrentViewState('menu');
                                setSelectedCategory(kategori.id);
                            }}
                        >
                            <div className="w-16 h-16 bg-[#3862a2] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl text-white">🍽️</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{kategori.nama_kategori}</h3>
                            <p className="text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1 inline-block">
                                {kategori.produks_count || 0} produk
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const renderHowItWorks = () => (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara Berbelanja</h2>
                    <p className="text-lg text-gray-600">Pesan makanan favoritmu dengan mudah dalam 3 langkah</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: "🔍", title: "1. Temukan Produk", desc: "Jelajahi menu dan pilih makanan favoritmu" },
                        { icon: "💬", title: "2. Pesan via WhatsApp", desc: "Hubungi penjual langsung melalui WhatsApp" },
                        { icon: "🎁", title: "3. Terima Pesanan", desc: "Pesanan diantar atau bisa diambil di tempat" }
                    ].map((step, index) => (
                        <div key={index} className="text-center group">
                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 border border-blue-100">
                                    <span className="text-2xl">{step.icon}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    // const renderTestimonials = () => (
    //     <section className="py-20 bg-gray-50">
    //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //             <div className="text-center mb-16">
    //                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan</h2>
    //                 <p className="text-lg text-gray-600">Testimoni dari pelanggan setia kami</p>
    //             </div>
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //                 {[
    //                     { name: "Andi Pratama", role: "Siswa", comment: "Makanannya enak-enak dan harganya terjangkau untuk siswa. Proses pesannya juga cepat!", avatar: "👨‍🎓" },
    //                     { name: "Sari Dewi", role: "Guru", comment: "Sangat praktis untuk makan siang. Tidak perlu antri lama, tinggal pesan via WhatsApp.", avatar: "👩‍🏫" },
    //                     { name: "Rizki Ahmad", role: "Siswa", comment: "Kimchi dan makanan Korea lainnya authentic banget rasanya. Recommended banget!", avatar: "👨‍🎓" }
    //                 ].map((testimonial, index) => (
    //                     <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    //                         <div className="flex items-center mb-4">
    //                             <div className="w-12 h-12 bg-[#3862a2] rounded-xl flex items-center justify-center text-xl text-white">
    //                                 {testimonial.avatar}
    //                             </div>
    //                             <div className="ml-4">
    //                                 <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
    //                                 <p className="text-[#3862a2] font-medium text-sm">{testimonial.role}</p>
    //                             </div>
    //                         </div>
    //                         <p className="text-gray-600 leading-relaxed">"{testimonial.comment}"</p>
    //                         <div className="flex text-yellow-400 mt-3">
    //                             {"★".repeat(5)}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </section>
    // );

    const renderStats = () => (
        <section className="py-20 bg-[#3862a2] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { number: popularFoods.length, label: "Produk Tersedia", icon: "📦" },
                        { number: stores.length, label: "Toko Aktif", icon: "🏪" },
                        { number: categories.length, label: "Kategori", icon: "📁" },
                        { number: "24/7", label: "Layanan", icon: "⏰" }
                    ].map((stat, index) => (
                        <div key={index} className="group">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold mb-2">{stat.number}+</div>
                            <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const renderHomeView = () => (
        <>
            {/* HERO SECTION DENGAN BACKGROUND IMAGE - DIKECILKAN */}
            <section
                className="w-full text-white overflow-hidden relative min-h-[70vh] flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(56, 98, 162, 0.8), rgba(56, 98, 162, 0.9)), url('/storage/assets/hero.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
               <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
        Selamat datang
    </h1>
    <p className="text-base lg:text-lg text-blue-100 mb-6 max-w-md mx-auto leading-relaxed">
        Temukan makanan dan minuman favorit dari berbagai toko di sekolah kami.
        Pesan via WhatsApp, lebih praktis dan cepat.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
            onClick={() => setCurrentViewState('menu')}
            className="bg-white text-[#3862a2] px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-200 font-semibold flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
            <span>🍽️ Lihat Menu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
        <button
            onClick={() => setCurrentViewState('stores')}
            className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white/20 transition duration-200 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
            🏪 Jelajahi Toko
        </button>
    </div>
</div>

                {/* Scroll indicator */}
                {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
                    </div>
                </div> */}
            </section>

            {/* POPULAR PRODUCTS SECTION */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Produk Terpopuler</h2>
                            <p className="text-gray-600">Produk yang paling banyak diminati oleh pelanggan</p>
                        </div>
                        <button
                            onClick={() => setCurrentViewState('menu')}
                            className="bg-[#3862a2] text-white px-5 py-2.5 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-semibold flex items-center gap-2 mt-4 lg:mt-0"
                        >
                            Lihat Semua
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularFoods.slice(0, 4).map((produk) => (
                            <div
                                key={produk.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden group"
                            >
                                <div className="relative overflow-hidden">
                                    <Link href={`/produk/${produk.id}`}>
                                        <img
                                            src={getProductImage(produk)}
                                            alt={produk.nama_produk}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        />
                                    </Link>
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-[#3862a2] text-white px-2 py-1 rounded text-xs font-semibold">
                                            🔥 Hot
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#3862a2] text-white px-2 py-1 rounded text-xs font-semibold">
                                            {produk.kategori?.nama_kategori}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <Link href={`/produk/${produk.id}`}>
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3862a2] transition-colors cursor-pointer">
                                            {produk.nama_produk}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {produk.deskripsi}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-lg font-bold text-[#3862a2]">
                                            {formatCurrency(produk.harga)}
                                        </span>
                                        <span className={`text-xs font-semibold ${produk.stok > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {produk.stok > 0 ? '✅ Stok Tersedia' : '❌ Stok Habis'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/produk/${produk.id}`}
                                            className="flex-1 bg-[#3862a2] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4f8a] transition duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Detail
                                        </Link>
                                        <a
                                            href={produk.url_wa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                            </svg>
                                            Pesan
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {renderFeaturedCategories()}
            {renderHowItWorks()}
            {renderStats()}
            {/* {renderTestimonials()} */}
        </>
    );

    const renderMenuView = () => (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Produk</h1>
                            <p className="text-gray-600">
                                Temukan semua produk terbaik dari berbagai toko
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full lg:w-80">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3862a2] focus:border-transparent"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mt-4">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    selectedCategory === 'all'
                                        ? 'bg-[#3862a2] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Semua Kategori
                            </button>
                            {categories.map((kategori) => (
                                <button
                                    key={kategori.id}
                                    onClick={() => setSelectedCategory(kategori.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                        selectedCategory === kategori.id
                                            ? 'bg-[#3862a2] text-white'
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((produk) => (
                            <div
                                key={produk.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden group"
                            >
                                <div className="relative">
                                    <Link href={`/produk/${produk.id}`}>
                                        <img
                                            src={getProductImage(produk)}
                                            alt={produk.nama_produk}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        />
                                    </Link>
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-[#3862a2] text-white px-2 py-1 rounded text-xs font-semibold">
                                            {produk.kategori?.nama_kategori}
                                        </span>
                                    </div>
                                    {produk.stok === 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                                            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                                Stok Habis
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <Link href={`/produk/${produk.id}`}>
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3862a2] transition-colors cursor-pointer">
                                            {produk.nama_produk}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {produk.deskripsi}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-lg font-bold text-[#3862a2]">
                                            {formatCurrency(produk.harga)}
                                        </span>
                                        <span className={`text-xs font-semibold ${produk.stok > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            Stok: {produk.stok}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/produk/${produk.id}`}
                                            className="flex-1 bg-[#3862a2] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4f8a] transition duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Detail
                                        </Link>
                                        <a
                                            href={produk.url_wa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 py-2 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 ${
                                                produk.stok > 0
                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                            </svg>
                                            {produk.stok > 0 ? 'Pesan' : 'Stok Habis'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
                            <div className="text-gray-300 text-6xl mb-4">🍽️</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-3">Produk tidak ditemukan</h3>
                            <p className="text-gray-500 mb-6">Coba ubah pencarian atau filter kategori</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className="bg-[#3862a2] text-white px-6 py-2 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-semibold"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );

    const renderCategoriesView = () => (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kategori Produk</h1>
                    <p className="text-gray-600">
                        Jelajahi berbagai kategori makanan dan minuman yang tersedia
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((kategori) => (
                        <div
                            key={kategori.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 p-6 text-center cursor-pointer group"
                            onClick={() => {
                                setCurrentViewState('menu');
                                setSelectedCategory(kategori.id);
                            }}
                        >
                            <div className="w-16 h-16 bg-[#3862a2] rounded-lg flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                {kategori.nama_kategori.charAt(0)}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{kategori.nama_kategori}</h3>
                            <p className="text-gray-500 text-sm bg-gray-50 rounded-full px-3 py-1 inline-block">
                                {/* {kategori.produks_count || 0} produk tersedia */}
                            </p>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <div className="text-gray-300 text-6xl mb-4">📁</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-3">Belum ada kategori</h3>
                        <p className="text-gray-500">Kategori produk akan segera tersedia</p>
                    </div>
                )}
            </div>
        </section>
    );

    const renderStoresView = () => (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Toko</h1>
                    <p className="text-gray-600">
                        Temukan berbagai toko terpercaya di SA Market
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map((toko) => (
                        <div
                            key={toko.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden group"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={getStoreImage(toko)}
                                    alt={toko.nama_toko}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iMC4zNWVtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5Ij5Ub2tvIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                    }}
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="bg-[#3862a2] text-white px-2 py-1 rounded text-xs font-semibold">
                                        {toko.produks_count || 0} Produk
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-[#3862a2] transition-colors">
                                        {toko.nama_toko}
                                    </h3>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {toko.deskripsi}
                                </p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M2.5 4.25C2.5 3.00736 3.50736 2 4.75 2H5.84884C6.56741 2 7.22286 2.421 7.5 3.09199L8.64882 5.90801C8.92596 6.579 9.58141 7 10.3 7H17.75C18.9926 7 20 8.00736 20 9.25V18.75C20 19.9926 18.9926 21 17.75 21H4.75C3.50736 21 2.5 19.9926 2.5 18.75V4.25Z"/>
                                            <path d="M8 12H16M8 16H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        <span className="font-medium">{toko.kontak_toko}</span>
                                    </div>

                                    <div className="flex items-start text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-[#3862a2] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                                        </svg>
                                        <span className="line-clamp-2">{toko.alamat}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                        <span className="font-semibold text-gray-700">{toko.produks_count || 0} Produk</span>
                                    </div>

                                    <Link
                                        href={`/toko/${toko.encrypted_id}`}
                                        className="bg-[#3862a2] text-white px-4 py-2 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-semibold flex items-center gap-2 group/btn"
                                    >
                                        <span>Lihat Toko</span>
                                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {stores.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <div className="text-gray-300 text-6xl mb-4">🏪</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-3">Belum Ada Toko</h3>
                        <p className="text-gray-500 mb-6">
                            Saat ini belum ada toko yang terdaftar. Silakan kembali lagi nanti.
                        </p>
                        <button
                            onClick={() => setCurrentViewState('home')}
                            className="bg-[#3862a2] text-white px-6 py-2 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-semibold"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-12 bg-[#3862a2] rounded-lg p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Ingin Membuka Toko?</h3>
                    <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        Bergabunglah dengan SA Market dan jual produk Anda kepada komunitas sekolah kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/login"
                            className="bg-white text-[#3862a2] px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-200 font-semibold"
                        >
                            Daftar Sekarang
                        </Link>
                        <button className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white/10 transition duration-200 font-semibold">
                            Pelajari Selengkapnya
                        </button>
                    </div>
                </div>
            </div>
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
            {/* NAVBAR */}
            <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo & Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/storage/assets/logo.png"
                                    alt="SA Market Logo"
                                    className="w-8 h-8 rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-lg text-gray-900 leading-tight">SA Market</h1>
                                    <p className="text-xs text-gray-500 leading-tight hidden sm:block">서울예술고등학교</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button
                                onClick={() => setCurrentViewState('home')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'home'
                                        ? 'text-[#3862a2]'
                                        : 'text-gray-700 hover:text-[#3862a2]'
                                }`}
                            >
                                Beranda
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#3862a2] transition-all duration-200 ${
                                    currentViewState === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('menu')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'menu'
                                        ? 'text-[#3862a2]'
                                        : 'text-gray-700 hover:text-[#3862a2]'
                                }`}
                            >
                                Menu
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#3862a2] transition-all duration-200 ${
                                    currentViewState === 'menu' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('categories')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'categories'
                                        ? 'text-[#3862a2]'
                                        : 'text-gray-700 hover:text-[#3862a2]'
                                }`}
                            >
                                Kategori
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#3862a2] transition-all duration-200 ${
                                    currentViewState === 'categories' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                            <button
                                onClick={() => setCurrentViewState('stores')}
                                className={`font-medium transition-all duration-200 relative group ${
                                    currentViewState === 'stores'
                                        ? 'text-[#3862a2]'
                                        : 'text-gray-700 hover:text-[#3862a2]'
                                }`}
                            >
                                Toko
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#3862a2] transition-all duration-200 ${
                                    currentViewState === 'stores' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-[#3862a2] transition duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Right Side - Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* <button className="relative p-2 text-gray-600 hover:text-[#3862a2] transition duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button> */}

                            {/* Always show Logged Out State */}
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="bg-[#3862a2] text-white px-4 py-2 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-medium"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-200 py-4">
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => {
                                        setCurrentViewState('home');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 rounded-lg ${
                                        currentViewState === 'home'
                                            ? 'bg-[#3862a2] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Beranda
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('menu');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 rounded-lg ${
                                        currentViewState === 'menu'
                                            ? 'bg-[#3862a2] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Menu
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('categories');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 rounded-lg ${
                                        currentViewState === 'categories'
                                            ? 'bg-[#3862a2] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Kategori
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentViewState('stores');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-medium transition duration-200 rounded-lg ${
                                        currentViewState === 'stores'
                                            ? 'bg-[#3862a2] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Toko
                                </button>

                                {/* Mobile Auth Buttons - Always show login */}
                                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                                    <Link
                                        href="/login"
                                        className="text-center bg-[#3862a2] text-white font-medium py-2 rounded-lg transition duration-200"
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
                                <li><button onClick={() => setCurrentViewState('home')} className="hover:text-white transition">Beranda</button></li>
                                <li><button onClick={() => setCurrentViewState('menu')} className="hover:text-white transition">Menu</button></li>
                                <li><button onClick={() => setCurrentViewState('categories')} className="hover:text-white transition">Kategori</button></li>
                                <li><button onClick={() => setCurrentViewState('stores')} className="hover:text-white transition">Toko</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Kontak</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>📍 Seoul Arts High School</li>
                                <li>📞 +62 878-834-751-584</li>
                                <li>✉️ sa-market@seoul.id</li>
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
    );
};

export default WelcomePage;
