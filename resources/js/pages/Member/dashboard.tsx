import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Package,
  Store,
  Users,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  nama: string;
  harga: string;
  stok: number;
  deskripsi: string;
  tgl_upload: string;
  gambar?: string;
  status: 'active' | 'inactive';
}

interface Store {
  id: number;
  nama: string;
  deskripsi: string;
  gambar: string;
  id_user: number;
  kontak_toko: string;
  alamat: string;
  status: 'active' | 'inactive';
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard Admin',
    href: dashboard().url,
  },
];

// Data statis produk
const staticProducts: Product[] = [
  {
    id: 1,
    nama: 'Kimchi Premium',
    harga: '₩25,000',
    stok: 50,
    deskripsi: 'Kimchi tradisional Korea dengan rasa yang autentik',
    tgl_upload: '2024-01-15',
    gambar: '/storage/assets/kimchi.png',
    status: 'active'
  },
  {
    id: 2,
    nama: 'Bibimbap Special',
    harga: '₩35,000',
    stok: 25,
    deskripsi: 'Nasi campur Korea dengan berbagai sayuran segar',
    tgl_upload: '2024-01-14',
    gambar: '/storage/assets/bibimbap.png',
    status: 'active'
  },
  {
    id: 3,
    nama: 'Tteokbokki Pedas',
    harga: '₩18,000',
    stok: 0,
    deskripsi: 'Kue beras pedas khas Korea',
    tgl_upload: '2024-01-13',
    status: 'inactive'
  },
  {
    id: 4,
    nama: 'Bulgogi Beef',
    harga: '₩45,000',
    stok: 15,
    deskripsi: 'Daging sapi marinasi dengan saus spesial',
    tgl_upload: '2024-01-12',
    status: 'active'
  }
];

// Data statis toko
const staticStores: Store[] = [
  {
    id: 1,
    nama: 'SA Market Official',
    deskripsi: 'Toko makanan Korea terpercaya di Seoul Arts High School',
    gambar: '/storage/assets/logo.png',
    id_user: 1,
    kontak_toko: '+82 10-1234-5678',
    alamat: 'Gedung A, Lantai 1, Seoul Arts High School, Seoul',
    status: 'active'
  },
  {
    id: 2,
    nama: 'Korean Food Corner',
    deskripsi: 'Specialist makanan street food Korea',
    gambar: '/storage/assets/store2.jpg',
    id_user: 2,
    kontak_toko: '+82 10-8765-4321',
    alamat: 'Gedung B, Lantai 1, Seoul Arts High School, Seoul',
    status: 'active'
  }
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'stores'>('overview');
  const [products] = useState<Product[]>(staticProducts);
  const [stores] = useState<Store[]>(staticStores);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Statistik overview
  const stats = {
    total_products: products.length,
    total_stores: stores.length,
    active_products: products.filter(p => p.status === 'active').length,
    out_of_stock: products.filter(p => p.stok === 0).length,
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  if (!isClient) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Admin SA Market" />
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Admin SA Market</h1>
            <p className="text-muted-foreground">Manajemen Produk dan Toko</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-blue-600">
              {currentTime.toLocaleTimeString('id-ID')}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'products', name: 'Produk', icon: <Package className="w-4 h-4" /> },
              { id: 'stores', name: 'Toko', icon: <Store className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content berdasarkan tab */}
        {activeTab === 'overview' && (
          <>
            {/* Grid Statistik */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Produk"
                value={stats.total_products}
                icon={<Package />}
                color="blue"
              />
              <StatCard
                title="Total Toko"
                value={stats.total_stores}
                icon={<Store />}
                color="green"
              />
              <StatCard
                title="Produk Aktif"
                value={stats.active_products}
                icon={<TrendingUp />}
                color="amber"
              />
              <StatCard
                title="Stok Habis"
                value={stats.out_of_stock}
                icon={<Package />}
                color="red"
              />
            </div>

            {/* Recent Products */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Produk Terbaru</h2>
                  <button className="text-blue-600 text-sm font-medium">Lihat Semua</button>
                </div>
                <div className="space-y-3">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex gap-3 items-center">
                        {product.gambar ? (
                          <img
                            src={product.gambar}
                            alt={product.nama}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{product.nama}</p>
                          <p className="text-xs text-muted-foreground">{product.harga}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          product.stok > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          Stok: {product.stok}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(product.tgl_upload)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Stores */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Toko Aktif</h2>
                  <button className="text-blue-600 text-sm font-medium">Lihat Semua</button>
                </div>
                <div className="space-y-3">
                  {stores.slice(0, 3).map((store) => (
                    <div key={store.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex gap-3 items-center">
                        <img
                          src={store.gambar}
                          alt={store.nama}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{store.nama}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{store.deskripsi}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          store.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {store.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manajemen Produk</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Tambah Produk
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Upload</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.gambar ? (
                            <img
                              src={product.gambar}
                              alt={product.nama}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                              <Package className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.nama}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{product.deskripsi}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.harga}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.stok > 10
                            ? 'bg-green-100 text-green-800'
                            : product.stok > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stok}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(product.tgl_upload)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manajemen Toko</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Tambah Toko
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toko</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={store.gambar}
                            alt={store.nama}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{store.nama}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{store.deskripsi}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{store.kontak_toko}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="line-clamp-2">{store.alamat}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{store.id_user}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          store.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {store.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
