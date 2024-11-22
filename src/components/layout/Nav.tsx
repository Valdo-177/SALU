import Logo from '@/assets/svg/Logo'
import React from 'react'
import { Button } from '../ui/button'

const Nav = () => {
    return (
        <header className='bg-bgPrimary h-20 flex items-center'>
            <div className='flex items-center mx-auto justify-between container'>
            <Logo />
            <Button className='border border-white rounded-[24px] h-[3rem] w-[10rem] bg-transparent hover:bg-transparent'>Inicia sesión</Button>
        </div>
        </header>
    )
}

export default Nav
