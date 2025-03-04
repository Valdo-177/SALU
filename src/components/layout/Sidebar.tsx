import React from 'react'
import { Separator } from '../ui/separator'
import { itemSidebar } from '@/source'
import ItemSidebar from '../ItemSidebar'

const Sidebar = () => {
    return (
        <div className='py-5 px-4 min-w-[15pc] min-h-[93vh] border-r'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <span className='w-full text-lg font-semibold'>Acciones</span>
                {itemSidebar.map((item, index) => (
                    <ItemSidebar data={item} key={index} />
                ))}
                <Separator />
            </div>
        </div>
    )
}

export default Sidebar