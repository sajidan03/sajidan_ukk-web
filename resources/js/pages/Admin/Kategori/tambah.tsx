import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Kategori',
    href: '/admin/kategori',
  },
  {
    title: 'Tambah Kategori',
    href: '/admin/kategori/tambah',
  },
]

export default function KategoriCreate() {
  const { data, setData, post, processing, errors } = useForm({
    nama_kategori: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/kategori/tambah')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Kategori" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Tambah Kategori</h1>
              <Link
                href="/admin/kategori"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </Link>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-8">
          <div className="max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Kategori Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.nama_kategori}
                  onChange={e => setData('nama_kategori', e.target.value)}
                  className="w-full max-w-2xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama kategori"
                />
                {errors.nama_kategori && (
                  <p className="mt-2 text-sm text-red-600">{errors.nama_kategori}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Link
                  href="/admin/kategori"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
