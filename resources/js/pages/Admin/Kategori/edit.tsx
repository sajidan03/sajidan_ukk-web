import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'

interface Kategori {
  id: number
  nama_kategori: string
  encrypted_id: string
}

export default function KategoriEdit() {
  const { props } = usePage()
  const kategori = props.kategori as Kategori

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Kelola Kategori',
      href: '/admin/kategori',
    },
    {
      title: `Edit ${kategori.nama_kategori}`,
      href: `/admin/kategori/edit/${kategori.encrypted_id}`,
    },
  ]

  const { data, setData, post, processing, errors } = useForm({
    nama_kategori: kategori.nama_kategori,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/admin/kategori/edit/${kategori.encrypted_id}`)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${kategori.nama_kategori}`} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Edit Kategori</h1>
            <Link
              href="/admin/kategori"
              className="text-gray-600 hover:text-gray-800 transition duration-200"
            >
              Kembali
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  value={data.nama_kategori}
                  onChange={e => setData('nama_kategori', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama kategori"
                />
                {errors.nama_kategori && (
                  <p className="mt-1 text-sm text-red-600">{errors.nama_kategori}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href="/admin/kategori"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition duration-200"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                >
                  {processing ? 'Menyimpan...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
