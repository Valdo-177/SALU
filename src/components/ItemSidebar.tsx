"use client"
import { SidebarItem } from '@/source'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const ItemSidebar = ({ data }: { data: SidebarItem }) => {
    const { title, url } = data;
    const path = usePathname()

    return (
        <Link href={url} className={`flex items-center h-[35px] w-full px-3 gap-2 hover:bg-muted/50 ${path?.includes(url) ? 'bg-muted/50' : 'bg-transparent'} rounded-[8px]`}>
            {/* <Image src={icon} alt='' className='w-[1.3rem]' /> */}
            {title} 
        </Link>
    )
}

export default ItemSidebar