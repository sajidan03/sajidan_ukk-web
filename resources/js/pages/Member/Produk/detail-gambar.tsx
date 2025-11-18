import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'
import { useState } from 'react'

interface BreadcrumbProps {
    productName: string
}

const breadcrumbs = ({ productName }: BreadcrumbProps): BreadcrumbItem[] => [
    {
        title: 'Kelola Produk',
        href: '/member/produk',
    },
    {
        title: `Detail ${productName}`,
        href: '#',
    },
]

interface GambarProduk {
    id: number
    nama_gambar: string
    url: string
    created_at: string
}

interface Kategori {
    id: number
    nama_kategori: string
}

interface Toko {
    id: number
    nama_toko: string
}

interface Produk {
    id: number
    encrypted_id: string
    nama_produk: string
    harga: string
    stok: number
    deskripsi: string
    url_wa: string
    tanggal_upload: string
    created_at: string
    updated_at: string
    gambar_produk: GambarProduk[]
    kategori: Kategori
    toko: Toko
}

export default function DetailProduk() {
    const { props } = usePage()
    const produk = props.produk as Produk

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [imageToDelete, setImageToDelete] = useState<GambarProduk | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const currentBreadcrumbs = breadcrumbs({ productName: produk.nama_produk })

    const handleDeleteImage = (image: GambarProduk) => {
        setImageToDelete(image)
        setIsDeleteModalOpen(true)
    }

    const confirmDeleteImage = async () => {
        if (!imageToDelete) return

        setIsDeleting(true)
        try {
            await router.delete(`/member/produk/${produk.encrypted_id}/gambar/${btoa(imageToDelete.id.toString())}`, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false)
                    setImageToDelete(null)
                    router.reload()
                },
                onError: (errors) => {
                    alert('Gagal menghapus gambar: ' + (errors.message || 'Terjadi kesalahan'))
                },
                onFinish: () => {
                    setIsDeleting(false)
                }
            })
        } catch (error) {
            console.error('Error deleting image:', error)
            setIsDeleting(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('URL berhasil disalin!')
        })
    }

    const getStokStatus = (stok: number) => {
        if (stok > 10) return { color: 'text-green-600', bg: 'bg-green-100', text: 'Stok Tersedia' }
        if (stok > 0) return { color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Stok Menipis' }
        return { color: 'text-red-600', bg: 'bg-red-100', text: 'Stok Habis' }
    }

    const stokStatus = getStokStatus(produk.stok)

    return (
        <AppLayout breadcrumbs={currentBreadcrumbs}>
            <Head title={`Detail ${produk.nama_produk}`} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Detail Produk</h1>
                                <p className="mt-2 text-gray-600">
                                    Informasi lengkap produk <strong>{produk.nama_produk}</strong>
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={`/member/produk/edit/${produk.encrypted_id}`}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Produk
                                </Link>
                                <Link
                                    href="/member/produk"
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Kolom Kiri - Gambar Produk */}
                        <div className="space-y-6">
                            {/* Gambar Utama */}
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gambar Utama</h3>
                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100">
                                    {produk.gambar_produk.length > 0 ? (
                                        <img
                                            src={produk.gambar_produk[selectedImageIndex].url}
                                            alt={`${produk.nama_produk} - Gambar ${selectedImageIndex + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/storage/assets/default-product.jpg'
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {produk.gambar_produk.length > 1 && (
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Galeri Gambar ({produk.gambar_produk.length})
                                    </h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {produk.gambar_produk.map((gambar, index) => (
                                            <div
                                                key={gambar.id}
                                                className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                                                    selectedImageIndex === index
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                                onClick={() => setSelectedImageIndex(index)}
                                            >
                                                <img
                                                    src={gambar.url}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDeleteImage(gambar)
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Kolom Kanan - Informasi Produk */}
                        <div className="space-y-6">
                            {/* Informasi Dasar */}
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Produk</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                        <p className="text-lg font-semibold text-gray-900">{produk.nama_produk}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                                            <p className="text-xl font-bold text-green-600">{produk.harga}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-semibold text-gray-900">{produk.stok} pcs</span>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stokStatus.bg} ${stokStatus.color}`}>
                                                    {stokStatus.text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                        <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                                            {produk.kategori?.nama_kategori || 'Tidak ada kategori'}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {produk.deskripsi || 'Tidak ada deskripsi'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Toko & URL */}
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Toko & URL</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Toko</label>
                                        <p className="text-gray-900 font-medium">{produk.toko?.nama_toko}</p>
                                    </div>

                                    {produk.url_wa && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">URL WhatsApp</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={produk.url_wa}
                                                    readOnly
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(produk.url_wa)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                                                >
                                                    Salin
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Informasi Tambahan */}
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Tanggal Upload</span>
                                        <span className="text-sm font-medium text-gray-900">{produk.tanggal_upload}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Dibuat Pada</span>
                                        <span className="text-sm font-medium text-gray-900">{produk.created_at}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Terakhir Diupdate</span>
                                        <span className="text-sm font-medium text-gray-900">{produk.updated_at}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Gambar</h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus gambar ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                    setImageToDelete(null)
                                }}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition duration-200"
                                disabled={isDeleting}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteImage}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
                                        </svg>
                                        Menghapus...
                                    </>
                                ) : (
                                    'Hapus Gambar'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    )
}
