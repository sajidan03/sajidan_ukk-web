import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Shield, User } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Kelola User', href: '/admin/user' },
  { title: 'Tambah User', href: '#' },
]

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    nama: '',
    username: '',
    password: '',
    kontak: '',
    role: 'member',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/user/tambah')
  }

  const handleKontakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setData("kontak", value)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />
      case 'member': return <User className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200'
      case 'member': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah User" />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tambah User</h1>
              <p className="mt-1 text-gray-600">Tambah user baru ke dalam sistem</p>
            </div>
            <Link
              href="/admin/user"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama */}
              <div>
                <Label>Nama</Label>
                <Input
                  type="text"
                  value={data.nama}
                  onChange={(e) => setData("nama", e.target.value)}
                  className="mt-1"
                />
                {errors.nama && (
                  <div className="text-red-600 text-sm mt-1">{errors.nama}</div>
                )}
              </div>

              {/* Username */}
              <div>
                <Label>Username</Label>
                <Input
                  type="text"
                  value={data.username}
                  onChange={(e) => setData("username", e.target.value)}
                  className="mt-1"
                />
                {errors.username && (
                  <div className="text-red-600 text-sm mt-1">{errors.username}</div>
                )}
              </div>

              {/* Kontak */}
              <div>
                <Label>Kontak</Label>
                <Input
                  type="text"
                  value={data.kontak}
                  onChange={handleKontakChange}
                  placeholder="Masukkan nomor telepon"
                  inputMode="numeric"
                  className="mt-1"
                />
                {errors.kontak && (
                  <div className="text-red-600 text-sm mt-1">{errors.kontak}</div>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="mt-1"
                />
                {errors.password && (
                  <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {/* Role */}
              <div>
                <Label>Role</Label>
                <Select
                  value={data.role}
                  onValueChange={(value) => setData("role", value)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <div className="text-red-600 text-sm mt-1">{errors.role}</div>
                )}
              </div>


            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/admin/user"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Kembali
              </Link>
              <Button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {processing ? "Menyimpan..." : "Simpan User"}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </AppLayout>
  )
}
