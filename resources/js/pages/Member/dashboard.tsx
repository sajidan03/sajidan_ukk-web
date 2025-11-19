import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'
import { MessageCircle, AlertTriangle, Store } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Toko',
    href: '/member/toko',
  },
]

interface Toko {
  id: number
  encrypted_id: string
  nama_toko: string
  deskripsi: string
  gambar: string
  id_user: number
  kontak_toko: string
  alamat: string
  status: 'aktif' | 'non-aktif' // Tambahkan status
  created_at: string
  updated_at: string
}

export default function KelolaToko() {
  const { props } = usePage()
  const toko = props.toko as Toko

  // Nomor WhatsApp admin (fake)
  const adminWhatsApp = '+82 10-1234-5678'

  const handleContactAdmin = () => {
    const message = `Halo Admin SA Market, saya ingin mengaktifkan toko saya. Nama toko: ${toko?.nama_toko || 'Toko Saya'}`
    const whatsappUrl = `https://wa.me/${adminWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus toko ini? Tindakan ini tidak dapat dibatalkan!')) {
      router.delete(`/member/toko/hapus/${toko.encrypted_id}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Jika toko ada tapi status non-aktif, tampilkan pesan aktivasi
  if (toko && toko.status === 'non-aktif') {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Aktivasi Toko" />

        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Kelola Toko</h1>
                  <p className="text-gray-600 mt-2">Kelola informasi toko Anda di SA Market</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Pesan Aktivasi Toko */}
            <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-amber-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-amber-800 mb-4">
                Toko Belum Aktif
              </h2>

              <p className="text-amber-700 mb-4 text-lg">
                Toko "<span className="font-semibold">{toko.nama_toko}</span>" Anda saat ini belum aktif.
              </p>

              <p className="text-amber-600 mb-8">
                Untuk mengaktifkan toko dan mulai berjualan, silakan hubungi admin SA Market.
              </p>

              {/* Informasi Kontak Admin */}
              <div className="bg-amber-50 rounded-lg p-6 max-w-md mx-auto mb-8 border border-amber-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-amber-800">Hubungi Admin</span>
                </div>

                <div className="text-center mb-4">
                  <p className="text-amber-700 mb-2">Nomor WhatsApp Admin:</p>
                  <p className="text-xl font-mono font-bold text-amber-900">{adminWhatsApp}</p>
                </div>

                <button
                  onClick={handleContactAdmin}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hubungi via WhatsApp
                </button>
              </div>

              <div className="text-sm text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="font-semibold mb-2">Proses Aktivasi:</p>
                <ul className="text-left space-y-1">
                  <li>• Hubungi admin via WhatsApp di atas</li>
                  <li>• Berikan nama toko Anda: <span className="font-semibold">{toko.nama_toko}</span></li>
                  <li>• Admin akan memverifikasi data toko Anda</li>
                  <li>• Toko akan diaktifkan dalam 1x24 jam</li>
                </ul>
              </div>
            </div>

            {/* Informasi Toko (Read-only) */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Informasi Toko Anda</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Informasi Utama */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Toko</label>
                    <div className="text-lg font-semibold text-gray-900">{toko.nama_toko}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Toko</label>
                    <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {toko.kontak_toko}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                      Non-Aktif
                    </span>
                  </div>
                </div>

                {/* Informasi Tambahan */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Toko</label>
                    <div className="text-gray-900 leading-relaxed">{toko.alamat}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Toko</label>
                    <div className="text-gray-900 leading-relaxed whitespace-pre-line">{toko.deskripsi}</div>
                  </div>
                </div>
              </div>

              {/* Gambar Toko */}
              <div className="mt-6 pt-6 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-4">Gambar Toko</label>
                <div className="max-w-xs">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-50">
                    <img
                      src={toko.gambar || '/storage/assets/default-store.jpg'}
                      alt={toko.nama_toko}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/storage/assets/default-store.jpg'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <Store className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Setelah Aktivasi:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Anda dapat menambah dan mengelola produk</li>
                    <li>• Toko akan muncul di pencarian SA Market</li>
                    <li>• Dapat menerima pesanan dari pelanggan</li>
                    <li>• Akses ke semua fitur penjualan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  // Jika toko aktif atau belum ada toko, tampilkan halaman normal
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Toko" />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Kelola Toko</h1>
                <p className="text-gray-600 mt-2">Kelola informasi toko Anda di SA Market</p>
              </div>

              <div className="flex gap-3 mt-4 lg:mt-0">
                <Link
                  href={`/member/toko/edit/${toko.encrypted_id}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Toko
                </Link>

                {!toko && (
                  <Link
                    href="/member/toko/buat"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Buat Toko
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {toko ? (
            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              {/* Kolom Kiri - Informasi Toko */}
              <div className="flex-1 max-w-2xl">
                <div className="space-y-6">
                  {/* Card Informasi Utama */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Toko</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Toko</label>
                        <div className="text-lg font-semibold text-gray-900">{toko.nama_toko}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Toko</label>
                        <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {toko.kontak_toko}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Toko</label>
                        <div className="text-gray-900 leading-relaxed">{toko.alamat}</div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Toko</label>
                        <div className="text-gray-900 leading-relaxed whitespace-pre-line">{toko.deskripsi}</div>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Tambahan */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Dibuat Pada</label>
                        <div className="text-sm text-gray-900">{formatDate(toko.created_at)}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Terakhir Diupdate</label>
                        <div className="text-sm text-gray-900">{formatDate(toko.updated_at)}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          toko.status === 'aktif'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {toko.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan - Gambar & Aksi */}
              <div className="flex-1 max-w-md">
                <div className="space-y-6">
                  {/* Gambar Toko */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Gambar Toko</h3>

                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50">
                      <img
                        src={toko.gambar || '/storage/assets/default-store.jpg'}
                        alt={toko.nama_toko}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/storage/assets/default-store.jpg'
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>

                    <div className="space-y-3">
                      <Link
                        href="/member/produk"
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Kelola Produk
                      </Link>

                      <Link
                        href="/member/produk/tambah"
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Produk
                      </Link>

                      <button
                        onClick={handleDelete}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus Toko
                      </button>
                    </div>
                  </div>

                  {/* Statistik Toko */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Toko</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-blue-700">Total Produk</div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-green-700">Produk Aktif</div>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-amber-600">0</div>
                        <div className="text-sm text-amber-700">Stok Habis</div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-sm text-purple-700">Total Penjualan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State - Belum Punya Toko */
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Anda Belum Memiliki Toko</h2>
                <p className="text-gray-600 mb-8">
                  Mulai jualan dengan membuat toko terlebih dahulu. Toko Anda akan menjadi tempat untuk mengelola semua produk yang ingin dijual.
                </p>

                <Link
                  href="/member/toko/buat"
                  className="inline-flex px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-lg font-semibold items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Buat Toko Pertama
                </Link>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Keuntungan Memiliki Toko:</h4>
                  <ul className="text-sm text-blue-700 space-y-1 text-left">
                    <li>• Kelola produk dengan mudah</li>
                    <li>• Terima pesanan dari pelanggan</li>
                    <li>• Pantau statistik penjualan</li>
                    <li>• Bangun brand toko Anda</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
