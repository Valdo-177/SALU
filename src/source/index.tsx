export interface SidebarItem {
    title: string;
    url: string;
}

export const itemSidebar: SidebarItem[] = [
    {
        title: 'Usuarios',
        url: '/dashboard/users'
    },
    {
        title: 'Medicos',
        url: '/dashboard/restaurant'
    },
    {
        title: 'Metricas',
        url: '/dashboard/delivery'
    },
]