"use client"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { RedirectTop } from '@/components/RedirectTop'
import marcosPhoto from '../../public/marcos.jpg'
import andrePhoto from '../../public/andre.jpg'
import { LinkedinLogo } from 'phosphor-react'

export default function Home() {
    return (
        <>
            <title>Sobre | VF Brasil</title>
            <div className="bg-image mx-auto min-h-[80vh]">
                <Header />
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="flex mx-auto items-center max-w-7xl py-32 max-sm:pt-10 sm:pb-32 sm:pt-4 md:py-32  max-md:flex-col-reverse">
                        <div className="text-left">
                            <h1 className="text-4xl font-bold tracking-tight  text-white sm:text-6xl">Sobre nós</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Conheça um pouco mais sobre nós</p>
                            <div className="mt-10 flex items-center">
                                <Link
                                    href={"#"}
                                    className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                                    Conheça a nossa história
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <FeatureHighlight /> */}
            <div className="isolate px-6 py-24 lg:px-8 bg-gray-950">
                <div className="mx-auto max-w-2xl lg:text-center pt-20">
                    <h2 className="text-base font-semibold leading-7 text-yellow-600">A liderança à frente de nossa companhia</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-50">Conheça a nossa equipe de responsáveis.</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Veja abaixo quem são os nossos representantes técnicos e comerciais.</p>
                </div>
                <section className='flex mx-auto justify-center pt-8 pb-4 gap-4'>
                    <div>
                        <Image
                            src={marcosPhoto}
                            alt="Foto de Marcos Jose Dosi"
                            className='grayscale-100 hover:grayscale-0' />
                        <div className='py-4'>
                            <h2 className='font-bold text-xl text-yellow-500 flex items-center gap-2'>Marcos Jose Dosi
                                <Link href={'https://www.linkedin.com/in/marcos-dosi-94a6b9141/'}><LinkedinLogo /></Link>
                            </h2>
                            <span className='text-white text-sm'>Responsável técnico</span>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={andrePhoto}
                            alt="Foto de Andre Dosi"
                            className='grayscale-100 hover:grayscale-0' />
                        <div className='py-4'>
                            <h2 className='font-bold text-xl text-yellow-500 flex items-center gap-2'>André Dosi
                                <Link href={'https://www.linkedin.com/in/marcos-dosi-94a6b9141/'}><LinkedinLogo /></Link>
                            </h2>
                            <span className='text-white text-sm'>Sales Manager</span>
                        </div>
                    </div>
                </section>
                {/* <ContactForm /> */}
            </div>
            {/*<Banner />*/}
            <RedirectTop />
            <Footer />
        </>
    )
}