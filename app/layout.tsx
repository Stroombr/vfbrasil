import './globals.css'
import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'

import { PageProgressBar } from '@/components/PageProgressBar'
import { companyProfile } from '@/data/company'

const heading = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
})

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: companyProfile.legalName,
  brand: companyProfile.brandName,
  url: 'https://www.linkedin.com/company/vf-do-brasil-ltda/',
  foundingDate: `${companyProfile.foundedYear}`,
  telephone: companyProfile.phoneRaw,
  industry: companyProfile.industry,
  image: '/vflogo.png',
  sameAs: [companyProfile.linkedinCompanyUrl],
  areaServed: 'BR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. Marginal, 300 - Setor Industrial',
    addressLocality: 'Varzea Paulista',
    addressRegion: 'SP',
    postalCode: '13224-000',
    addressCountry: 'BR',
  },
}

export const metadata: Metadata = {
  title: {
    default: 'VF Brasil',
    template: '%s | VF Brasil',
  },
  description: 'VF Brasil: engenharia industrial para reduzir paradas, elevar disponibilidade e executar com prazo.',
  keywords: [
    'engenharia industrial',
    'siderurgia',
    'engenharia reversa',
    'fabricacao de maquinas',
    'nacionalizacao de pecas',
    'manutencao industrial',
  ],
  openGraph: {
    type: 'website',
    title: 'VF Brasil',
    siteName: 'VF Brasil',
    locale: 'pt_BR',
    description: 'Solucoes tecnicas para disponibilidade operacional, prazo e confiabilidade.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-theme="dark" className="theme-dark">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <PageProgressBar />
        <a
          href="#conteudo-principal"
          className="focus-ring sr-only absolute left-3 top-3 z-[100] rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-950 focus:not-sr-only"
        >
          Pular para o conteudo principal
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}


