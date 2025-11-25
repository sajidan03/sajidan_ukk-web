import React from 'react';
import { Head, Link } from '@inertiajs/react';

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
    gambar_produk?: GambarProduk[];  // snake_case
    kategori?: Kategori;
    toko?: Toko;
}

interface ProductDetailProps {
    product: Produk;
    relatedProducts: Produk[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={product.nama_produk} />

            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/storage/assets/logo.png"
                                alt="SA Market Logo"
                                className="w-8 h-8 rounded-lg"
                            />
                            <span className="font-bold text-gray-900">SA Market</span>
                        </Link>
                        <Link
                            href="/menu"
                            className="text-[#3862a2] hover:text-[#2d4f8a] font-medium"
                        >
                            ← Kembali ke Menu
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Product Detail Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={getProductImage(product)}
                                    alt={product.nama_produk}
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            </div>
                            {/* PERBAIKAN: gunakan gambar_produk di sini juga */}
                            {product.gambar_produk && product.gambar_produk.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.gambar_produk.map((gambar, index) => (
                                        <img
                                            key={gambar.id}
                                            src={`/storage/assets/produk/${gambar.nama_gambar}`}
                                            alt={`${product.nama_produk} ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="inline-block bg-[#3862a2] text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    {product.kategori?.nama_kategori}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.nama_produk}
                                </h1>
                                <p className="text-2xl font-bold text-[#3862a2] mb-4">
                                    {formatCurrency(product.harga)}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    product.stok > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.stok > 0 ? '✅ Stok Tersedia' : '❌ Stok Habis'}
                                </span>
                                <span className="text-gray-600">
                                    Stok: {product.stok}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {product.deskripsi}
                                </p>
                            </div>

                            {/* Store Info */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Toko</h3>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={getStoreImage(product.toko!)}
                                        alt={product.toko?.nama_toko}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">
                                            {product.toko?.nama_toko}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {product.toko?.deskripsi}
                                        </p>
                                        <div className="flex items-center mt-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M2.5 4.25C2.5 3.00736 3.50736 2 4.75 2H5.84884C6.56741 2 7.22286 2.421 7.5 3.09199L8.64882 5.90801C8.92596 6.579 9.58141 7 10.3 7H17.75C18.9926 7 20 8.00736 20 9.25V18.75C20 19.9926 18.9926 21 17.75 21H4.75C3.50736 21 2.5 19.9926 2.5 18.75V4.25Z"/>
                                                <path d="M8 12H16M8 16H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            <span>{product.toko?.kontak_toko}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4">
                                <a
                                    href={product.url_wa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 py-3 px-6 rounded-lg font-semibold text-center transition duration-200 flex items-center justify-center gap-2 ${
                                        product.stok > 0
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
                                    </svg>
                                    {product.stok > 0 ? 'Pesan via WhatsApp' : 'Stok Habis'}
                                </a>

                                <Link
                                    href={`/toko/${product.toko?.encrypted_id}`}
                                    className="bg-[#3862a2] text-white py-3 px-6 rounded-lg hover:bg-[#2d4f8a] transition duration-200 font-semibold flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                    Lihat Toko
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={getProductImage(relatedProduct)}
                                            alt={relatedProduct.nama_produk}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-[#3862a2] text-white px-2 py-1 rounded text-xs font-semibold">
                                                {relatedProduct.kategori?.nama_kategori}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3862a2] transition-colors">
                                            {relatedProduct.nama_produk}
                                        </h3>
                                        <p className="text-lg font-bold text-[#3862a2] mb-2">
                                            {formatCurrency(relatedProduct.harga)}
                                        </p>
                                        <Link
                                            href={`/produk/${relatedProduct.id}`}
                                            className="w-full bg-[#3862a2] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4f8a] transition duration-200 flex items-center justify-center gap-2"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
