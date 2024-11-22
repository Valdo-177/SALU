import React from 'react'
import Image from 'next/image'
import HeroImage from '../../assets/img/ImagenHero.png'
import Pines from './Pines'
import { FormUser } from './FormUser'

const HeroSection = () => {
    return (
        <section className='mt-[5rem] flex items-center flex-col gap-3'>
            <div className='flex flex-col w-[max-content] gap-4 items-center'>
                <h1 className='text-4xl lg:text-6xl font-light text-center w-[max-content]'>Facilitamos tu acceso  <br /> a la <span className='font-bold text-bgPrimary'>salud que mereces</span></h1>
                <p className='text-xl text-textColor font-medium'>Microcréditos y ahorro digital para que tus consultas <br />
                    médicas y odontológicas sean más accesibles.</p>
                    <FormUser/>
            </div>
            <div className='mt-[3rem]'>
                <div className='flex items-center justify-start'>
                    <Pines color='red' />
                </div>
                <Image src={HeroImage} className='w-[45rem]' alt='Imagen de un doctor atendiendo a una paciente' />
                <div className='flex items-center justify-end'>
                    <Pines color='blue' />
                </div>
            </div>
        </section>
    )
}

export default HeroSection