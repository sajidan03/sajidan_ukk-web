import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useRef } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Toko',
    href: '/member/toko',
  },
  {
    title: 'Edit Toko',
    href: '/member/toko/edit',
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
  created_at: string
  updated_at: string
}

export default function EditToko() {
  const { props } = usePage()
  const toko = props.toko as Toko

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data, setData, post, processing, errors } = useForm({
    nama_toko: toko?.nama_toko || '',
    deskripsi: toko?.deskripsi || '',
    kontak_toko: toko?.kontak_toko || '',
    alamat: toko?.alamat || '',
    gambar: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/member/toko/edit/${toko.encrypted_id}`)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diizinkan')
      return
    }

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 2MB')
      return
    }

    setData('gambar', file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setPreviewImage(previewUrl)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setData('gambar', null)
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getImageUrl = () => {
    if (previewImage) {
      return previewImage
    }
    return toko?.gambar ? `/storage/assets/toko/${toko.gambar}` : '/storage/assets/default-store.jpg'
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Toko" />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Toko</h1>
                <p className="mt-1 text-gray-600">Ubah informasi toko Anda</p>
              </div>
              <Link
                href="/member/toko"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </Link>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Kolom Kiri - Form Input (3/4 width) */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Toko */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Toko <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={data.nama_toko}
                        onChange={e => setData('nama_toko', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan nama toko"
                      />
                      {errors.nama_toko && (
                        <p className="mt-1 text-sm text-red-600">{errors.nama_toko}</p>
                      )}
                    </div>

                    {/* Kontak Toko */}
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kontak Toko <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          value={data.kontak_toko}
                          onChange={e => setData('kontak_toko', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Contoh: 081234567890"
                        />
                      </div>
                      {errors.kontak_toko && (
                        <p className="mt-1 text-sm text-red-600">{errors.kontak_toko}</p>
                      )}
                    </div>

                    {/* Spacer untuk alignment */}
                    <div className="md:col-span-1"></div>

                    {/* Alamat Toko */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat Toko <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={data.alamat}
                        onChange={e => setData('alamat', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Masukkan alamat lengkap toko"
                      />
                      {errors.alamat && (
                        <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>
                      )}
                    </div>

                    {/* Deskripsi Toko */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi Toko <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={data.deskripsi}
                        onChange={e => setData('deskripsi', e.target.value)}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Deskripsikan toko Anda secara detail..."
                      />
                      {errors.deskripsi && (
                        <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan - Upload Gambar (1/4 width) */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Gambar Toko
                      <span className="text-gray-500 text-xs font-normal block mt-1">
                        Format: JPG, PNG, JPEG (Maks. 2MB)
                      </span>
                    </label>

                    {/* Preview Gambar */}
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-300 mb-4 bg-white">
                      <img
                        src={getImageUrl()}
                        alt="Preview Gambar Toko"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Upload Controls */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {data.gambar ? 'Ganti Gambar' : 'Upload Gambar'}
                      </button>

                      {(data.gambar || previewImage) && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="w-full px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus Gambar
                        </button>
                      )}
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/jpg"
                      className="hidden"
                    />

                    {errors.gambar && (
                      <p className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">{errors.gambar}</p>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Tips Edit Toko</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Gunakan nama toko yang mudah diingat</li>
                          <li>• Deskripsi yang jelas menarik pelanggan</li>
                          <li>• Pastikan kontak toko aktif</li>
                          <li>• Gambar toko meningkatkan kepercayaan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/member/toko"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
                      </svg>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Toko
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
