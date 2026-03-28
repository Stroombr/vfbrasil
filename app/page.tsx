"use client"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { RedirectTop } from '@/components/RedirectTop'
import { ServicesHighlight } from '@/components/ServicesHighlights'
import { ClientList } from '@/components/Clients'
import Tabs from '@/components/Tabs'

export default function Home() {
  return (
    <>
      <title>Home | VF Brasil</title>
      <div className="bg-image mx-auto lg:min-h-[80vh]">
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="flex mx-auto items-center max-w-7xl py-32 max-sm:pt-10 sm:pb-16 sm:pt-32 md:py-32  max-md:flex-col-reverse">
            <div className="flex justify-center flex-col items-center w-full">
              <h1 className="text-5xl font-bold tracking-tight  text-white sm:text-5xl">Sem fronteiras para a sua produtividade</h1>
              {/* Subtitulo*/}
              {/* <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"></p> */}
              <div className="mt-10 flex items-center">
                <Link
                  href={"#"}
                  className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                  Conheça a VF
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='bg-gray-950 mx-auto max-w-7xl'>
        <ServicesHighlight />
      </section>
      <div className="isolate px-6 py-20 lg:px-8 bg-gray-950">
        <ClientList />
        <div className="pt-32 mx-auto max-w-7xl lg:text-center">
          <h3 className="text-base font-semibold leading-7 text-yellow-600">Fale Conosco</h3>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">Entre em contato conosco por e-mail ou WhatsApp</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Preencha os campos abaixo para que possamos te conhecer melhor e entender a demanda da sua empresa.</p>
        </div>
        <Tabs />
      </div>
      {/*<Banner />*/}
      <RedirectTop />
      <Footer />
    </>
  )
}