import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Store, ArrowLeft, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface RegisterProps {
    status?: string;
    errors?: {
        nama?: string;
        username?: string;
        password?: string;
        kontak?: string;
        nama_toko?: string;
        deskripsi_toko?: string;
        alamat_toko?: string;
        gambar_toko?: string;
    };
}

export default function Register({ status, errors }: RegisterProps) {
    const { data, setData, post, processing, reset } = useForm({
        nama: '',
        username: '',
        password: '',
        kontak: '',
        nama_toko: '',
        deskripsi_toko: '',
        alamat_toko: '',
        gambar_toko: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('gambar_toko', file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('gambar_toko', null);
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Buat FormData manual
        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('kontak', data.kontak);
        formData.append('nama_toko', data.nama_toko);
        formData.append('deskripsi_toko', data.deskripsi_toko);
        formData.append('alamat_toko', data.alamat_toko);
        if (data.gambar_toko) {
            formData.append('gambar_toko', data.gambar_toko);
        }

        // @ts-ignore - bypass TypeScript error
        post('/daftar', formData);
    };

    const handleBackToLogin = () => {
        window.location.href = '/login';
    };

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            alert('Pendaftaran gagal! Silakan periksa data yang dimasukkan.');
        }
    }, [errors]);

    return (
        <AuthLayout
            title="Daftar Pemilik Toko"
            description="Buat akun baru untuk mengelola toko Anda."
        >
            <Head title="Register" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    {/* Data Pribadi */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            Data Pribadi
                        </h3>

                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama Lengkap</Label>
                            <Input
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                placeholder="Masukkan nama lengkap"
                            />
                            <InputError message={errors?.nama} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                tabIndex={2}
                                autoComplete="username"
                                placeholder="Masukkan username"
                            />
                            <InputError message={errors?.username} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                placeholder="Masukkan password"
                            />
                            <InputError message={errors?.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="kontak">Kontak</Label>
                            <Input
                                id="kontak"
                                type="text"
                                name="kontak"
                                value={data.kontak}
                                onChange={(e) => setData('kontak', e.target.value)}
                                required
                                tabIndex={4}
                                autoComplete="tel"
                                placeholder="Masukkan nomor telepon/WhatsApp"
                            />
                            <InputError message={errors?.kontak} />
                        </div>
                    </div>

                    {/* Data Toko */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            Data Toko
                        </h3>

                        {/* Upload Gambar Toko */}
                        <div className="grid gap-2">
                            <Label htmlFor="gambar_toko">Gambar Toko</Label>
                            <div className="space-y-3">
                                {previewImage ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Upload gambar toko
                                        </p>
                                        <p className="text-xs text-gray-500 mb-3">
                                            PNG, JPG, GIF max 2MB
                                        </p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Pilih File
                                        </Button>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    id="gambar_toko"
                                    type="file"
                                    name="gambar_toko"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <InputError message={errors?.gambar_toko} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nama_toko">Nama Toko</Label>
                            <Input
                                id="nama_toko"
                                type="text"
                                name="nama_toko"
                                value={data.nama_toko}
                                onChange={(e) => setData('nama_toko', e.target.value)}
                                required
                                tabIndex={5}
                                placeholder="Masukkan nama toko"
                            />
                            <InputError message={errors?.nama_toko} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="deskripsi_toko">Deskripsi Toko</Label>
                            <textarea
                                id="deskripsi_toko"
                                name="deskripsi_toko"
                                value={data.deskripsi_toko}
                                onChange={(e) => setData('deskripsi_toko', e.target.value)}
                                required
                                tabIndex={6}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30328b] focus:border-transparent"
                                placeholder="Deskripsikan toko Anda"
                            />
                            <InputError message={errors?.deskripsi_toko} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="alamat_toko">Alamat Toko</Label>
                            <textarea
                                id="alamat_toko"
                                name="alamat_toko"
                                value={data.alamat_toko}
                                onChange={(e) => setData('alamat_toko', e.target.value)}
                                required
                                tabIndex={7}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30328b] focus:border-transparent"
                                placeholder="Masukkan alamat lengkap toko"
                            />
                            <InputError message={errors?.alamat_toko} />
                        </div>
                    </div>

                    {/* Tombol Daftar */}
                    <Button
                        type="submit"
                        className="w-full bg-[#30328b] hover:bg-[#26276f] text-white"
                        tabIndex={8}
                        disabled={processing}
                    >
                        {processing ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                            <Store className="mr-2 h-4 w-4" />
                        )}
                        Daftar Pemilik Toko
                    </Button>

                    {/* Tombol Kembali ke Login */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        onClick={handleBackToLogin}
                        tabIndex={9}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Login
                    </Button>
                </div>
            </form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
