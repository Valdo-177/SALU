import Image from 'next/image'
import React from 'react'
import imgSecction2 from '../../assets/img/imagsection2.png'
import { FormUser } from './FormUser'

const Section1 = () => {
    return (
        <section className='mt-[4rem] pb-[5rem]'>
            <div className='container mx-auto flex items-center gap-10 flex-col'>
                <h2 className='text-4xl lg:text-5xl font-medium text-center sm:w-[max-content]'>¿Por qué SALU es diferente?</h2>
                <div className='flex flex-col p-5 gap-5 sm:flex-row items-center justify-between sm:w-[80rem] w-full'>
                    <Image src={imgSecction2} alt='' className='w-full sm:w-[35rem]' />
                    <div className='w-full sm:w-[40rem] leading-[1.5rem] text-md font-medium text-textColor flex items-center flex-col gap-4'>
                        <p>
                            En SALU, revolucionamos el acceso a la salud en Colombia. Olvídate de los largos tiempos de espera y las barreras económicas. Con nuestro modelo de microcréditos y ahorro digital, puedes:
                        </p>
                        <ul className='mt-3 flex items-start flex-col gap-2 pl-7'>
                            <li className='list-disc'>Elegir al médico especialista que necesitas.</li>
                            <li className='list-disc'>Solicitar un crédito en minutos.</li>
                            <li className='list-disc'>Asegurar tu tranquilidad financiera mientras cuidas tu bienestar.</li>
                        </ul>
                        <FormUser />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section1