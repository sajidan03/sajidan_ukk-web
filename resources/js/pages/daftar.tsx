import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Store, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

interface RegisterProps {
    status?: string;
    errors?: {
        nama?: string;
        username?: string;
        password?: string;
        kontak?: string;
    };
}

export default function Register({ status, errors }: RegisterProps) {
    const { data, setData, post, processing, reset } = useForm({
        nama: '',
        username: '',
        password: '',
        kontak: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password'),
        });
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
                    {/* Field Nama */}
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

                    {/* Field Username */}
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

                    {/* Field Password */}
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

                    {/* Field Kontak */}
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

                    {/* Tombol Daftar */}
                    <Button
                        type="submit"
                        className="w-full bg-[#30328b] hover:bg-[#26276f] text-white"
                        tabIndex={5}
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
                        tabIndex={6}
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
