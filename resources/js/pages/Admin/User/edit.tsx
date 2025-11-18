import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { Label } from "@radix-ui/react-label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface User {
  id: number
  nama: string
  username: string
  role: string
  kontak: string
}

export default function Edit({ user }: { user: User }) {
  const { data, setData, post, processing, errors } = useForm({
    nama: user.nama || "",
    username: user.username || "",
    role: user.role || "",
    kontak: user.kontak || "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/admin/user/edit/${user.id}`)
  }

  const handleKontakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Hanya menerima angka
    if (/^\d*$/.test(value)) {
      setData("kontak", value)
    }
  }

  return (
    <AppLayout>
      <Head title="Edit User" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nama */}
          <div>
            <Label>Nama</Label>
            <Input
              type="text"
              value={data.nama}
              onChange={(e) => setData("nama", e.target.value)}
            />
            {errors.nama && (
              <div className="text-red-600 text-sm">{errors.nama}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
            />
            {errors.username && (
              <div className="text-red-600 text-sm">{errors.username}</div>
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
            />
            {errors.kontak && (
              <div className="text-red-600 text-sm">{errors.kontak}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <Label>Password (opsional)</Label>
            <Input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Kosongkan jika tidak ingin diubah"
            />
            {errors.password && (
              <div className="text-red-600 text-sm">{errors.password}</div>
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
              <div className="text-red-600 text-sm">{errors.role}</div>
            )}
          </div>

          {/* Tombol */}
          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
            <Link
              href="/admin/user"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Kembali
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {processing ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
