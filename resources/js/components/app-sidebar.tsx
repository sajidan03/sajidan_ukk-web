// import { NavMain } from '@/components/nav-main';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { dashboard, logout } from '@/routes';
// import { type NavItem } from '@/types';
// import { Link, router, usePage } from '@inertiajs/react';
// import {
//     User,
//     Users,
//     LogOut,
//     ShoppingCart,
//     ShoppingBagIcon,
//     ChartArea
// } from 'lucide-react';
// import AppLogo from './app-logo';

// const adminNavItems: NavItem[] = [
//     // {
//     //     title: 'Dashboard',
//     //     href: dashboard(),
//     //     icon: LayoutGrid,
//     // },
//     {
//         title: 'User',
//         href: '/admin/user',
//         icon: Users,
//     },
//     {
//         title: 'Toko',
//         href: '/admin/toko',
//         icon: ShoppingCart,
//     },
//     {
//         title: 'Kategori produk',
//         href: '/admin/kategori',
//         icon: ChartArea
//     },

// ];

// const memberNavItems: NavItem[] = [
//     // {
//     //     title: 'Dashboard',
//     //     href: dashboard(),
//     //     icon: LayoutDashboard,
//     // },
//     {
//         title: 'Produk',
//         href: '/member/produk',
//         icon: ShoppingCart,
//     },
//     {
//         title: 'Toko saya',
//         href: '/member/toko',
//         icon: ShoppingBagIcon,
//     }
// ];

// // const footerNavItems: NavItem[] = [];

// interface User {
//     id: number;
//     name: string;
//     username: string;
//     role: string;
// }

// interface PageProps {
//     auth: {
//         user: User;
//     };
//     [key:string] : unknown
// }


// export function AppSidebar() {
//     const { props } = usePage<PageProps>();
//     const { user } = props.auth;

//     const getNavItems = (): NavItem[] => {
//         if (user.role === 'admin') {
//             return adminNavItems;
//         } else if (user.role === 'member') {
//             return memberNavItems;
//         }

//         return memberNavItems;
//     };

//     const mainNavItems = getNavItems();

//     const handleLogout = (e: React.MouseEvent) => {
//         e.preventDefault();
//         logout();
//         router.post('/logout');
//         console.log('Logout clicked');
//     };

//     return (
//         <Sidebar collapsible="icon" variant="inset">
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href={dashboard()} prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={mainNavItems} />
//             </SidebarContent>

//             <SidebarFooter>
//                 <SidebarMenu>
//                     {/* Informasi User */}
//                     <SidebarMenuItem>
//                         <SidebarMenuButton className="flex flex-col items-start gap-1 py-3">
//                             <div className="text-sm font-medium text-foreground">
//                                 {user.name}
//                             </div>
//                             <div className="text-xs text-muted-foreground capitalize">
//                                 {user.role}
//                             </div>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>

//                     {/* Tombol Logout */}
//                     <SidebarMenuItem>
//                         <SidebarMenuButton
//                             asChild
//                             className="text-red-700 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50"
//                         >
//                             <button onClick={handleLogout} className="w-full">
//                                 <LogOut className="h-4 w-4" />
//                                 <span>Logout</span>
//                             </button>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarFooter>
//         </Sidebar>
//     );
// }


import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard, logout } from '@/routes';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Users,
    LogOut,
    ShoppingCart,
    ShoppingBagIcon,
    ChartArea,
    AlertTriangle,
    MessageCircle
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import AppLogo from './app-logo';

// Define NavItem langsung di sini
interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    disabled?: boolean;
}

const adminNavItems: NavItem[] = [
    {
        title: 'User',
        href: '/admin/user',
        icon: Users,
    },
    {
        title: 'Toko',
        href: '/admin/toko',
        icon: ShoppingCart,
    },
    {
        title: 'Kategori produk',
        href: '/admin/kategori',
        icon: ChartArea
    },
];

const memberNavItems: NavItem[] = [
    {
        title: 'Produk',
        href: '/member/produk',
        icon: ShoppingCart,
    },
    {
        title: 'Toko saya',
        href: '/member/toko',
        icon: ShoppingBagIcon,
    }
];

interface User {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface Toko {
    id: number;
    encrypted_id: string;
    nama_toko: string;
    deskripsi: string;
    gambar: string;
    id_user: number;
    kontak_toko: string;
    alamat: string;
    status: 'aktif' | 'non-aktif';
    created_at: string;
    updated_at: string;
}

interface PageProps {
    auth: {
        user: User;
    };
    toko?: Toko;
    [key: string]: unknown;
}

export function AppSidebar() {
    const { props } = usePage<PageProps>();
    const { user } = props.auth;
    const toko = props.toko as Toko;

    const adminWhatsApp = '+82 10-1234-5678';

    const handleContactAdmin = () => {
        const message = `Halo Admin SA Market, saya ingin mengaktifkan toko saya. Nama toko: ${toko?.nama_toko || 'Toko Saya'}`;
        const whatsappUrl = `https://wa.me/${adminWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const getNavItems = (): NavItem[] => {
        if (user.role === 'admin') {
            return adminNavItems;
        } else if (user.role === 'member') {
            if (toko && toko.status === 'non-aktif') {
                return memberNavItems.map(item => ({
                    ...item,
                    disabled: true
                }));
            }
            return memberNavItems;
        }
        return memberNavItems;
    };

    const mainNavItems = getNavItems();
    const isSidebarDisabled = user.role === 'member' && toko && toko.status === 'non-aktif';

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        router.post('/logout');
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isSidebarDisabled && (
                    <div className="mx-3 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs font-medium text-amber-800 mb-1">
                                    Toko Belum Aktif
                                </p>
                                <p className="text-xs text-amber-700 mb-2">
                                    Hubungi admin untuk mengaktifkan toko
                                </p>
                                <button
                                    onClick={handleContactAdmin}
                                    className="w-full text-xs bg-green-600 text-white py-1 px-2 rounded flex items-center justify-center gap-1 hover:bg-green-700 transition-colors"
                                >
                                    <MessageCircle className="w-3 h-3" />
                                    Hubungi Admin
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="flex flex-col items-start gap-1 py-3">
                            <div className="text-sm font-medium text-foreground">
                                {user.name}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                                {user.role}
                            </div>
                            {user.role === 'member' && toko && (
                                <div className={`text-xs px-1.5 py-0.5 rounded-full ${
                                    toko.status === 'aktif'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {toko.status === 'aktif' ? 'Toko Aktif' : 'Toko Nonaktif'}
                                </div>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="text-red-700 hover:text-red-800 hover:bg-red-50"
                        >
                            <button onClick={handleLogout} className="w-full">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
