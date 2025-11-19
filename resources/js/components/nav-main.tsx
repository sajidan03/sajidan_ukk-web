// import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link, usePage } from '@inertiajs/react';

// export function NavMain({ items = [] }: { items: NavItem[] }) {
//     const page = usePage();
//     return (
//         <SidebarGroup className="px-2 py-0">
//             <SidebarGroupLabel>Platform</SidebarGroupLabel>
//             <SidebarMenu>
//                 {items.map((item) => (
//                     <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton
//                             asChild
//                             isActive={page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url)}
//                             tooltip={{ children: item.title }}
//                         >
//                             <Link href={item.href} prefetch>
//                                 {item.icon && <item.icon />}
//                                 <span>{item.title}</span>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 ))}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }


import { Link } from '@inertiajs/react';
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { type LucideIcon } from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    disabled?: boolean;
}

interface NavMainProps {
    items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild={!item.disabled}
                        disabled={item.disabled}
                        className={
                            item.disabled
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                        }
                        title={item.disabled ? 'Toko belum aktif. Hubungi admin untuk mengaktifkan.' : ''}
                    >
                        {item.disabled ? (
                            <span className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </span>
                        ) : (
                            <Link href={item.href}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </Link>
                        )}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
