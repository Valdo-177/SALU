import Logo from '@/assets/svg/Logo'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Nav = () => {
    return (
        <header className='bg-bgPrimary sm:h-16 p-1 flex items-center'>
            <div className='flex items-center mx-auto justify-between container'>
                <Link href="/">
                    <Logo className='scale-[0.7] sm:scale-1' />
                </Link>
                <Link href='/login'>
                    <Button className='border border-white rounded-[24px] text-sm bg-transparent hover:bg-transparent hover:bg-white hover:text-bgPrimary'>Inicia sesión</Button>
                </Link>
            </div>
        </header>
    )
}

export default Nav
