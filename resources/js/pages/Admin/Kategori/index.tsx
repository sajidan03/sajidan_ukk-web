import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Kategori',
    href: '/admin/kategori',
  },
]

interface Kategori {
  id: number
  nama_kategori: string
  encrypted_id: string
  created_at: string
  updated_at: string
}

export default function KategoriIndex() {
  const { props } = usePage()
  const kategoris = props.kategoris as Kategori[]

  const handleDelete = (encryptedId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      router.delete(`/admin/kategori/hapus/${encryptedId}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Kategori" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Kategori</h1>

          {/* Tombol Tambah Kategori */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/kategori/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              + Tambah Kategori
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Kategori</th>
                <th className="px-4 py-3 text-left">Dibuat</th>
                <th className="px-4 py-3 text-left">Diupdate</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {kategoris.length > 0 ? (
                kategoris.map((kategori, index) => (
                  <tr key={kategori.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{kategori.nama_kategori}</td>
                    <td className="px-4 py-3">{kategori.created_at}</td>
                    <td className="px-4 py-3">{kategori.updated_at}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/kategori/edit/${kategori.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(kategori.encrypted_id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data kategori
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
