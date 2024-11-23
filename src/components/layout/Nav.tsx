import Logo from '@/assets/svg/Logo'
import React from 'react'
import { Button } from '../ui/button'

const Nav = () => {
    return (
        <header className='bg-bgPrimary sm:h-20 p-1 flex items-center'>
            <div className='flex items-center mx-auto justify-between container'>
            <Logo className='scale-[0.7] sm:scale-1'/>
            <Button className='scale-[0.8] sm:scale-1 border border-white rounded-[24px] h-[3rem] w-[10rem] bg-transparent hover:bg-transparent'>Inicia sesión</Button>
        </div>
        </header>
    )
}

export default Nav
