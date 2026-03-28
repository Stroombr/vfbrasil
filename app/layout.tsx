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
  description: 'Solucoes industriais com engenharia aplicada, confiabilidade e performance operacional.',
  openGraph: {
    type: 'website',
    title: 'VF Brasil',
    siteName: 'VF Brasil',
    locale: 'pt_BR',
    description: 'Engenharia industrial para siderurgia com foco em produtividade, qualidade e seguranca operacional.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-theme="dark" className="theme-dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const stored = localStorage.getItem('vf-theme');
                const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                const resolved = stored === 'light' || stored === 'dark'
                  ? stored
                  : (systemPrefersLight ? 'light' : 'dark');
                const root = document.documentElement;
                root.setAttribute('data-theme', resolved);
                root.classList.remove('theme-light', 'theme-dark');
                root.classList.add(resolved === 'light' ? 'theme-light' : 'theme-dark');
              } catch (_) {
                const root = document.documentElement;
                root.setAttribute('data-theme', 'dark');
                root.classList.remove('theme-light');
                root.classList.add('theme-dark');
              }
            })();`,
          }}
        />
      </head>
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


