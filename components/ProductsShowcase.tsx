'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, MessageCircleMore, X } from 'lucide-react'

import { interpolate, type Locale } from '@/data/i18n'
import { buildWhatsappLink } from '@/data/company'

type ProductCategory = 'todos' | 'maquinas' | 'pecas' | 'dispositivos' | 'engenharia'

type ProductImage = {
  src: string
  position: string
}

type Product = {
  id: string
  name: string
  category: Exclude<ProductCategory, 'todos'>
  leadTime: string
  summary: string
  specs: string[]
  applications: string[]
  images: ProductImage[]
}

type Copy = {
  eyebrow: string
  title: string
  description: string
  catalogLabel: string
  catalogHint: string
  detailsLabel: string
  leadTime: string
  specs: string
  applications: string
  quote: string
  whatsapp: string
  openDrawer: string
  closeDrawer: string
  gallery: string
  viewDetails: string
  backdrop: string
  whatsappTemplate: string
}

const products: Product[] = [
  {
    id: 'laminador',
    name: 'Conjunto para linha de laminação',
    category: 'maquinas',
    leadTime: '45-60 dias',
    summary: 'Estrutura robusta para operação contínua em ambiente siderúrgico de alta demanda.',
    specs: ['Projeto customizado por capacidade', 'Fabricação com controle dimensional', 'Comissionamento assistido'],
    applications: ['Laminação a quente', 'Upgrade de linhas existentes'],
    images: [
      { src: '/teste.jpg', position: 'center 22%' },
      { src: '/home-bg.jpg', position: 'center 32%' },
      { src: '/teste.jpg', position: 'center 58%' },
      { src: '/home-bg.jpg', position: 'center 74%' },
    ],
  },
  {
    id: 'transportador',
    name: 'Módulo transportador industrial',
    category: 'maquinas',
    leadTime: '30-45 dias',
    summary: 'Movimentação segura de material com foco em disponibilidade e manutenção simplificada.',
    specs: ['Estrutura modular', 'Integra sensores e intertravamentos', 'Entrega com documentação técnica'],
    applications: ['Fluxo entre processos', 'Linhas com operação 24/7'],
    images: [
      { src: '/home-bg.jpg', position: 'center 40%' },
      { src: '/teste.jpg', position: 'center 42%' },
      { src: '/home-bg.jpg', position: 'center 18%' },
      { src: '/teste.jpg', position: 'center 78%' },
    ],
  },
  {
    id: 'roletes',
    name: 'Kit de roletes e eixos nacionalizados',
    category: 'pecas',
    leadTime: '15-25 dias',
    summary: 'Substituição de importados com desempenho equivalente e menor dependência externa.',
    specs: ['Materiais conforme exigência de carga', 'Rastreabilidade de lote', 'Inspeção final com relatório'],
    applications: ['Manutenção preventiva', 'Redução de parada por falta de reposição'],
    images: [
      { src: '/produto-roletes.jpg', position: 'center 50%' },
      { src: '/produto-discos-estoque.jpg', position: 'center 50%' },
      { src: '/teste.jpg', position: 'center 82%' },
      { src: '/home-bg.jpg', position: 'center 20%' },
    ],
  },
  {
    id: 'dispositivo',
    name: 'Dispositivo de ajuste e fixação',
    category: 'dispositivos',
    leadTime: '12-20 dias',
    summary: 'Dispositivo de campo para setup rápido, repetibilidade e maior segurança operacional.',
    specs: ['Projeto sob medida', 'Válido para uso contínuo', 'Treinamento de uso na entrega'],
    applications: ['Trocas rápidas de ferramental', 'Padronização de setup'],
    images: [
      { src: '/home-bg.jpg', position: 'center 72%' },
      { src: '/teste.jpg', position: 'center 70%' },
      { src: '/home-bg.jpg', position: 'center 30%' },
      { src: '/teste.jpg', position: 'center 46%' },
    ],
  },
  {
    id: 'reversa',
    name: 'Pacote de engenharia reversa',
    category: 'engenharia',
    leadTime: '20-35 dias',
    summary: 'Levantamento técnico completo para reproduzir componentes críticos com confiabilidade.',
    specs: ['Modelagem 3D e desenho técnico', 'Análise de tolerâncias', 'Plano de validação funcional'],
    applications: ['Nacionalização de componentes', 'Recuperação de peças sem desenho original'],
    images: [
      { src: '/teste.jpg', position: 'center 32%' },
      { src: '/home-bg.jpg', position: 'center 36%' },
      { src: '/teste.jpg', position: 'center 66%' },
      { src: '/home-bg.jpg', position: 'center 80%' },
    ],
  },
  {
    id: 'retrofit',
    name: 'Retrofit de subconjuntos mecânicos',
    category: 'engenharia',
    leadTime: '25-40 dias',
    summary: 'Atualização de subconjuntos para elevar desempenho e vida útil sem troca total da linha.',
    specs: ['Diagnóstico de desgaste e risco', 'Plano técnico com etapas', 'Implementação com parada planejada'],
    applications: ['Aumento de confiabilidade', 'Modernização com investimento controlado'],
    images: [
      { src: '/home-bg.jpg', position: 'center 50%' },
      { src: '/teste.jpg', position: 'center 50%' },
      { src: '/home-bg.jpg', position: 'center 24%' },
      { src: '/teste.jpg', position: 'center 84%' },
    ],
  },
]

const copyByLocale: Record<Locale, Copy> = {
  pt: {
    eyebrow: 'Soluções industriais',
    title: 'Nossas Soluções Industriais',
    description: 'Selecione um card para visualizar detalhes técnicos, aplicações e galeria completa de cada produto.',
    catalogLabel: 'Linha de soluções',
    catalogHint: 'Clique em um card para abrir os detalhes no drawer.',
    detailsLabel: 'Detalhes da solução',
    leadTime: 'Prazo',
    specs: 'Especificações',
    applications: 'Aplicações',
    quote: 'Solicitar proposta técnica',
    whatsapp: 'Falar no WhatsApp',
    openDrawer: 'Mais informações',
    closeDrawer: 'Fechar painel',
    gallery: 'Galeria de fotos',
    viewDetails: 'Ver detalhes',
    backdrop: 'Fechar detalhes',
    whatsappTemplate: 'Olá, gostaria de cotar o produto: {product}.',
  },
  en: {
    eyebrow: 'Products and solutions',
    title: 'VF Brasil portfolio',
    description: 'Now with photo gallery and a side drawer with complete product details.',
    catalogLabel: 'Catalog',
    catalogHint: 'Click an item to open details in the drawer.',
    detailsLabel: 'Solution details',
    leadTime: 'Lead time',
    specs: 'Specifications',
    applications: 'Applications',
    quote: 'Request technical proposal',
    whatsapp: 'Talk on WhatsApp',
    openDrawer: 'More details',
    closeDrawer: 'Close panel',
    gallery: 'Photo gallery',
    viewDetails: 'View details',
    backdrop: 'Close details',
    whatsappTemplate: 'Hello, I would like to request a quote for the product: {product}.',
  },
  es: {
    eyebrow: 'Productos y soluciones',
    title: 'Portafolio VF Brasil',
    description: 'Ahora con galeria de fotos y drawer lateral con informacion completa por producto.',
    catalogLabel: 'Catalogo',
    catalogHint: 'Haga clic en un item para abrir los detalles en el drawer.',
    detailsLabel: 'Detalles de la solucion',
    leadTime: 'Plazo',
    specs: 'Especificaciones',
    applications: 'Aplicaciones',
    quote: 'Solicitar propuesta tecnica',
    whatsapp: 'Hablar por WhatsApp',
    openDrawer: 'Mas informacion',
    closeDrawer: 'Cerrar panel',
    gallery: 'Galeria de fotos',
    viewDetails: 'Ver detalles',
    backdrop: 'Cerrar detalles',
    whatsappTemplate: 'Hola, me gustaria cotizar el producto: {product}.',
  },
  fr: {
    eyebrow: 'Produits et solutions',
    title: 'Portefeuille VF Brasil',
    description: 'Desormais avec galerie photo et drawer lateral avec details complets par produit.',
    catalogLabel: 'Catalogue',
    catalogHint: 'Cliquez sur un element pour ouvrir les details dans le drawer.',
    detailsLabel: 'Details de la solution',
    leadTime: 'Delai',
    specs: 'Specifications',
    applications: 'Applications',
    quote: 'Demander une proposition technique',
    whatsapp: 'Parler sur WhatsApp',
    openDrawer: 'Plus d informations',
    closeDrawer: 'Fermer le panneau',
    gallery: 'Galerie photo',
    viewDetails: 'Voir details',
    backdrop: 'Fermer les details',
    whatsappTemplate: 'Bonjour, je souhaite obtenir un devis pour le produit : {product}.',
  },
  it: {
    eyebrow: 'Prodotti e soluzioni',
    title: 'Portafoglio VF Brasil',
    description: 'Ora con galleria foto e drawer laterale con dettagli completi per prodotto.',
    catalogLabel: 'Catalogo',
    catalogHint: 'Clicca un elemento per aprire i dettagli nel drawer.',
    detailsLabel: 'Dettagli della soluzione',
    leadTime: 'Tempi',
    specs: 'Specifiche',
    applications: 'Applicazioni',
    quote: 'Richiedi proposta tecnica',
    whatsapp: 'Parla su WhatsApp',
    openDrawer: 'Piu informazioni',
    closeDrawer: 'Chiudi pannello',
    gallery: 'Galleria foto',
    viewDetails: 'Vedi dettagli',
    backdrop: 'Chiudi dettagli',
    whatsappTemplate: 'Ciao, vorrei richiedere un preventivo per il prodotto: {product}.',
  },
}

type ProductsShowcaseProps = {
  locale?: Locale
}

function ProductCard({
  product,
  selected,
  categoryLabel,
  copy,
  onClick,
}: {
  product: Product
  selected: boolean
  categoryLabel: string
  copy: Copy
  onClick: () => void
}) {
  const image = product.images[0]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring group relative flex h-full w-full flex-col overflow-visible rounded-2xl border text-left transition ${
        selected
          ? 'border-amber-300/45 bg-white/[0.03] shadow-[0_14px_30px_rgba(0,0,0,0.26)]'
          : 'border-white/15 bg-white/5 hover:-translate-y-0.5 hover:border-amber-300/35 hover:bg-white/10'
      }`}
      aria-label={`${copy.viewDetails} ${product.name}`}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl border-b border-white/10 bg-white/5 sm:h-48">
        <Image
          src={image.src}
          alt={`Foto de ${product.name}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: image.position }}
        />
        <div className="media-dim-overlay absolute inset-0 opacity-55" />
      </div>

      <div className="relative -mt-7 mx-4 mb-4 flex w-[calc(100%-2rem)] flex-1 flex-col rounded-xl border border-white/20 bg-[#f7f8fa] px-4 pb-4 pt-5 shadow-[0_16px_26px_rgba(0,0,0,0.28)] min-h-[186px]">
        <span className="absolute left-4 top-0 h-1.5 w-24 -translate-y-1/2 rounded-full bg-amber-500" />
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          <span>{categoryLabel}</span>
          <span>{copy.leadTime}: {product.leadTime}</span>
        </div>

        <p className="mt-2 text-lg font-semibold text-slate-900">{product.name}</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{product.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
          {copy.openDrawer}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  )
}

export function ProductsShowcase({ locale = 'pt' }: ProductsShowcaseProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.pt

  const categoryLabelsByLocale: Record<Locale, Record<ProductCategory, string>> = {
    pt: { todos: 'Todos', maquinas: 'Máquinas', pecas: 'Peças', dispositivos: 'Dispositivos', engenharia: 'Engenharia' },
    en: { todos: 'All', maquinas: 'Machines', pecas: 'Parts', dispositivos: 'Devices', engenharia: 'Engineering' },
    es: { todos: 'Todos', maquinas: 'Maquinas', pecas: 'Piezas', dispositivos: 'Dispositivos', engenharia: 'Ingenieria' },
    fr: { todos: 'Tous', maquinas: 'Machines', pecas: 'Pieces', dispositivos: 'Dispositifs', engenharia: 'Ingenierie' },
    it: { todos: 'Tutti', maquinas: 'Macchine', pecas: 'Parti', dispositivos: 'Dispositivi', engenharia: 'Ingegneria' },
  }

  const categoryLabels = categoryLabelsByLocale[locale]

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? '')

  const [drawerProductId, setDrawerProductId] = useState<string | null>(null)
  const [drawerPhotoIndex, setDrawerPhotoIndex] = useState(0)

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? products[0]
  const drawerProduct = drawerProductId ? products.find((item) => item.id === drawerProductId) ?? null : null

  useEffect(() => {
    if (!drawerProduct) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerProductId(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerProduct])

  if (!selectedProduct) {
    return null
  }

  const openDrawer = (product: Product, photoIndex = 0) => {
    setDrawerProductId(product.id)
    setDrawerPhotoIndex(photoIndex)
  }

  return (
    <section id="produtos" className="vf-shell pb-12 sm:pb-16">
      <div className="vf-heading-center">
        <p className="vf-eyebrow">{copy.eyebrow}</p>
        <h2 className="vf-title sm:text-4xl">{copy.title}</h2>
        <p className="vf-copy mx-auto max-w-3xl">{copy.description}</p>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{copy.catalogLabel}</p>
          <p className="text-xs leading-5 text-slate-300">{copy.catalogHint}</p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                selected={selectedProduct.id === product.id}
                categoryLabel={categoryLabels[product.category]}
                copy={copy}
                onClick={() => {
                  setSelectedProductId(product.id)
                  openDrawer(product)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {drawerProduct ? (
        <div className="fixed inset-0 z-[95] flex">
          <button type="button" onClick={() => setDrawerProductId(null)} className="h-full flex-1 bg-black/55 backdrop-blur-[1px]" aria-label={copy.backdrop} />

          <aside role="dialog" aria-modal="true" aria-label={copy.detailsLabel} className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#070b12]/98 p-4 sm:p-6">
            <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-4 flex items-center justify-between border-b border-white/10 bg-[#070b12]/98 px-4 py-3 sm:-mx-6 sm:-mt-6 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-300">{drawerProduct.name}</p>
              <button type="button" onClick={() => setDrawerProductId(null)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-slate-100 transition hover:bg-white/10" aria-label={copy.closeDrawer}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-64 overflow-hidden rounded-xl border border-white/10 sm:h-80">
              <Image src={drawerProduct.images[drawerPhotoIndex]?.src ?? drawerProduct.images[0].src} alt={`Foto de ${drawerProduct.name}`} fill className="object-cover" style={{ objectPosition: drawerProduct.images[drawerPhotoIndex]?.position ?? drawerProduct.images[0].position }} />
              <div className="media-dim-overlay absolute inset-0" />
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {drawerProduct.images.map((image, index) => (
                <button key={`${drawerProduct.id}-drawer-${index}`} type="button" onClick={() => setDrawerPhotoIndex(index)} className={`focus-ring relative h-14 overflow-hidden rounded-lg border transition sm:h-16 ${index === drawerPhotoIndex ? 'border-amber-300/45 ring-1 ring-amber-300/40' : 'border-white/20 hover:border-amber-300/35'}`} aria-label={`${copy.gallery} ${index + 1}`}>
                  <Image src={image.src} alt={`${drawerProduct.name} ${index + 1}`} fill className="object-cover" style={{ objectPosition: image.position }} />
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{copy.specs}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {drawerProduct.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{copy.applications}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {drawerProduct.applications.map((item) => (
                    <span key={item} className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="#contato" onClick={() => setDrawerProductId(null)} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/45 hover:bg-amber-400/12">
                {copy.quote}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={buildWhatsappLink(interpolate(copy.whatsappTemplate, { product: drawerProduct.name }))} target="_blank" rel="noreferrer" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                <MessageCircleMore className="h-4 w-4 text-amber-300" />
                {copy.whatsapp}
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  )
}
