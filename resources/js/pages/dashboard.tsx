import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  Calendar,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  BarChart3,
  Store,
  User,
  Clock,
  Star,
  MessageSquare,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface StoreStats {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  total_customers: number;
  monthly_sales: { month: string; sales: number }[];
  product_categories: { category: string; count: number }[];
  recent_orders: {
    id: number;
    customer_name: string;
    product_name: string;
    amount: string;
    status: string;
    created_at: string;
  }[];
  top_products: {
    id: number;
    name: string;
    sales: number;
    revenue: string;
  }[];
}

interface StoreInfo {
  id: number;
  store_name: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  logo: string;
  operating_hours: string;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  storeInfo?: StoreInfo;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

// Static data for the store
const staticStoreStats: StoreStats = {
  total_products: 156,
  total_orders: 892,
  total_revenue: 45680000,
  total_customers: 324,
  monthly_sales: [
    { month: 'Jan', sales: 45 },
    { month: 'Feb', sales: 52 },
    { month: 'Mar', sales: 48 },
    { month: 'Apr', sales: 60 },
    { month: 'May', sales: 75 },
    { month: 'Jun', sales: 82 },
    { month: 'Jul', sales: 78 },
    { month: 'Aug', sales: 85 },
    { month: 'Sep', sales: 90 },
    { month: 'Oct', sales: 88 },
    { month: 'Nov', sales: 92 },
    { month: 'Dec', sales: 95 },
  ],
  product_categories: [
    { category: 'Makanan Korea', count: 45 },
    { category: 'Minuman', count: 32 },
    { category: 'Snack', count: 28 },
    { category: 'Bahan Masak', count: 25 },
    { category: 'Lainnya', count: 26 },
  ],
  recent_orders: [
    {
      id: 1,
      customer_name: 'Kim Soo-hyun',
      product_name: 'Bibimbap Special',
      amount: '₩25,000',
      status: 'Completed',
      created_at: '2024-01-15 14:30:00',
    },
    {
      id: 2,
      customer_name: 'Park Min-young',
      product_name: 'Kimchi Set',
      amount: '₩35,000',
      status: 'Processing',
      created_at: '2024-01-15 13:15:00',
    },
    {
      id: 3,
      customer_name: 'Lee Min-ho',
      product_name: 'Bulgogi Bowl',
      amount: '₩18,000',
      status: 'Completed',
      created_at: '2024-01-15 12:45:00',
    },
    {
      id: 4,
      customer_name: 'Ji Chang-wook',
      product_name: 'Tteokbokki Combo',
      amount: '₩22,000',
      status: 'Pending',
      created_at: '2024-01-15 11:20:00',
    },
  ],
  top_products: [
    { id: 1, name: 'Kimchi Fresh', sales: 156, revenue: '₩3,120,000' },
    { id: 2, name: 'Bibimbap Bowl', sales: 142, revenue: '₩3,550,000' },
    { id: 3, name: 'Bulgogi Set', sales: 128, revenue: '₩3,840,000' },
    { id: 4, name: 'Tteokbokki Spicy', sales: 115, revenue: '₩2,530,000' },
    { id: 5, name: 'Korean Ramyeon', sales: 98, revenue: '₩1,470,000' },
  ],
};

const staticStoreInfo: StoreInfo = {
  id: 1,
  store_name: 'SA Market - Seoul Arts High School',
  address: 'Gedung A, Lantai 1, Seoul Arts High School, Seoul, South Korea',
  email: 'hello@samarket.co.kr',
  phone: '+82 10-1234-5678',
  description: 'Toko makanan Korea terpercaya di Seoul Arts High School. Menyediakan berbagai kebutuhan makanan dan minuman dengan kualitas terbaik untuk siswa dan staf sekolah.',
  logo: '/storage/assets/logo.png',
  operating_hours: 'Senin - Jumat: 07:00 - 17:00 | Sabtu: 08:00 - 15:00 | Minggu: Libur',
  created_at: '2024-01-01',
  updated_at: '2024-01-15',
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('id-ID').format(num);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

  // Sales Chart Data
  const salesChartData = {
    labels: staticStoreStats.monthly_sales.map((item) => item.month),
    datasets: [
      {
        label: 'Penjualan Bulanan',
        data: staticStoreStats.monthly_sales.map((item) => item.sales),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Trend Penjualan Bulanan - Total: ${formatNumber(staticStoreStats.total_orders)} Pesanan`,
      },
    },
  };

  // Product Categories Chart
  const categoriesChartData = {
    labels: staticStoreStats.product_categories.map((item) => item.category),
    datasets: [
      {
        label: 'Jumlah Produk',
        data: staticStoreStats.product_categories.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoriesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const },
      title: {
        display: true,
        text: `Distribusi Produk per Kategori - Total: ${staticStoreStats.total_products} Produk`,
      },
    },
  };

  if (!isClient) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Dashboard - ${staticStoreInfo.store_name}`} />
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Store className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dashboard Toko</h1>
              <p className="text-muted-foreground">{staticStoreInfo.store_name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-2xl text-blue-600">
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

        {/* Store Information */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Informasi Toko</h2>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{staticStoreInfo.store_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{staticStoreInfo.operating_hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>{staticStoreInfo.phone} | {staticStoreInfo.email}</span>
                </div>
                <p className="text-blue-700 mt-2">{staticStoreInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-200">
              <img
                src={staticStoreInfo.logo}
                alt="Store Logo"
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.8/5.0</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating Pelanggan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Statistik */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total Produk"
            value={staticStoreStats.total_products}
            icon={<Package />}
            color="blue"
            description="Produk tersedia"
          />
          <StatCard
            title="Total Pesanan"
            value={staticStoreStats.total_orders}
            icon={<ShoppingCart />}
            color="green"
            description="Pesanan masuk"
          />
          <StatCard
            title="Total Pendapatan"
            value={formatCurrency(staticStoreStats.total_revenue)}
            icon={<DollarSign />}
            color="amber"
            description="Revenue total"
          />
          <StatCard
            title="Total Pelanggan"
            value={staticStoreStats.total_customers}
            icon={<Users />}
            color="purple"
            description="Customer aktif"
          />
          <StatCard
            title="Rating Toko"
            value="4.8/5"
            icon={<Star />}
            color="yellow"
            description="Ulasan pelanggan"
          />
          <StatCard
            title="Kategori"
            value={staticStoreStats.product_categories.length}
            icon={<BarChart3 />}
            color="red"
            description="Jenis kategori"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <ChartBox
            title="Trend Penjualan Bulanan"
            data={salesChartData}
            options={salesChartOptions}
            type="bar"
          />
          <ChartBox
            title="Distribusi Kategori Produk"
            data={categoriesChartData}
            options={categoriesChartOptions}
            type="doughnut"
          />
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pesanan Terbaru */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Pesanan Terbaru</h2>
            </div>
            {staticStoreStats.recent_orders.length > 0 ? (
              <div className="space-y-3">
                {staticStoreStats.recent_orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{order.product_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(order.created_at)} {formatTime(order.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada pesanan</p>
              </div>
            )}
          </div>

          {/* Produk Terlaris */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Produk Terlaris</h2>
            </div>
            {staticStoreStats.top_products.length > 0 ? (
              <div className="space-y-3">
                {staticStoreStats.top_products.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} penjualan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{product.revenue}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada data produk</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon, color, description }: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  description: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={`rounded-full p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartBox({ title, data, options, type = 'bar' }: any) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="h-80">
        {type === 'bar' ? (
          <Bar options={options} data={data} />
        ) : (
          <Doughnut options={options} data={data} />
        )}
      </div>
    </div>
  );
}
