import { Check, CheckCircle, X } from "phosphor-react";

import Image from 'next/image'
import gerdauLogo from '../public/gerdau.png'
import sinobrasLogo from '../public/sinobras.png'
import votorantimLogo from '../public/votorantim-metais.png'
import acerosLogo from '../public/aceros.png'

export function ClientList() {
    return (
        <section>
            <div className="pt-8 mx-auto max-w-4xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-yellow-600">Confiada por grandes empresas do mercado nacional e internacional</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">Tradição e confiança de grandes nomes no mercado</p>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Preencha os campos abaixo para que possamos te conhecer melhor e entender a demanda de seu consultório.</p> */}
          <section className='grid grid-cols-4 h-min items-center gap-4'>
            <Image
              src={gerdauLogo}
              alt="Mockup Demonstrativa - MacBook Pro 16" />
            <div className='max-w-80'>
              <Image
                src={sinobrasLogo}
                className='object-contain'
                alt="Mockup Demonstrativa - MacBook Pro 16" />
            </div>
              <Image
                src={votorantimLogo}
                className='object-contain'
                alt="Mockup Demonstrativa - MacBook Pro 16" />
              <Image
                src={acerosLogo}
                className='object-contain'
                alt="Mockup Demonstrativa - MacBook Pro 16" />
          </section>
        </div>
        </section>
    )
}