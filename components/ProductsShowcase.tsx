'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronRight, Factory, MessageCircleMore, PackageCheck, Settings2, Wrench, X } from 'lucide-react'

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

const categoryIcons: Record<Exclude<ProductCategory, 'todos'>, typeof Factory> = {
  maquinas: Factory,
  pecas: PackageCheck,
  dispositivos: Wrench,
  engenharia: Settings2,
}

const products: Product[] = [
  {
    id: 'laminador',
    name: 'Conjunto para linha de laminacao',
    category: 'maquinas',
    leadTime: '45-60 dias',
    summary: 'Estrutura robusta para operacao continua em ambiente siderurgico de alta demanda.',
    specs: ['Projeto customizado por capacidade', 'Fabricacao com controle dimensional', 'Comissionamento assistido'],
    applications: ['Laminacao a quente', 'Upgrade de linhas existentes'],
    images: [
      { src: '/teste.jpg', position: 'center 22%' },
      { src: '/home-bg.jpg', position: 'center 32%' },
      { src: '/teste.jpg', position: 'center 58%' },
      { src: '/home-bg.jpg', position: 'center 74%' },
    ],
  },
  {
    id: 'transportador',
    name: 'Modulo transportador industrial',
    category: 'maquinas',
    leadTime: '30-45 dias',
    summary: 'Movimentacao segura de material com foco em disponibilidade e manutencao simplificada.',
    specs: ['Estrutura modular', 'Integra sensores e intertravamentos', 'Entrega com documentacao tecnica'],
    applications: ['Fluxo entre processos', 'Linhas com operacao 24/7'],
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
    summary: 'Substituicao de importados com desempenho equivalente e menor dependencia externa.',
    specs: ['Materiais conforme exigencia de carga', 'Rastreabilidade de lote', 'Inspecao final com relatorio'],
    applications: ['Manutencao preventiva', 'Reducao de parada por falta de reposicao'],
    images: [
      { src: '/teste.jpg', position: 'center 60%' },
      { src: '/home-bg.jpg', position: 'center 52%' },
      { src: '/teste.jpg', position: 'center 82%' },
      { src: '/home-bg.jpg', position: 'center 20%' },
    ],
  },
  {
    id: 'dispositivo',
    name: 'Dispositivo de ajuste e fixacao',
    category: 'dispositivos',
    leadTime: '12-20 dias',
    summary: 'Dispositivo de campo para setup rapido, repetibilidade e maior seguranca operacional.',
    specs: ['Projeto sob medida', 'Valido para uso continuo', 'Treinamento de uso na entrega'],
    applications: ['Trocas rapidas de ferramental', 'Padronizacao de setup'],
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
    summary: 'Levantamento tecnico completo para reproduzir componentes criticos com confiabilidade.',
    specs: ['Modelagem 3D e desenho tecnico', 'Analise de tolerancias', 'Plano de validacao funcional'],
    applications: ['Nacionalizacao de componentes', 'Recuperacao de pecas sem desenho original'],
    images: [
      { src: '/teste.jpg', position: 'center 32%' },
      { src: '/home-bg.jpg', position: 'center 36%' },
      { src: '/teste.jpg', position: 'center 66%' },
      { src: '/home-bg.jpg', position: 'center 80%' },
    ],
  },
  {
    id: 'retrofit',
    name: 'Retrofit de subconjuntos mecanicos',
    category: 'engenharia',
    leadTime: '25-40 dias',
    summary: 'Atualizacao de subconjuntos para elevar desempenho e vida util sem troca total da linha.',
    specs: ['Diagnostico de desgaste e risco', 'Plano tecnico com etapas', 'Implementacao com parada planejada'],
    applications: ['Aumento de confiabilidade', 'Modernizacao com investimento controlado'],
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
    eyebrow: 'Produtos e solucoes',
    title: 'Portfolio VF Brasil',
    description: 'Agora com galeria de fotos e drawer lateral com informacoes completas por produto.',
    catalogLabel: 'Catalogo',
    catalogHint: 'Clique em um item para trocar o destaque. Clique na foto para abrir o drawer.',
    detailsLabel: 'Detalhes da solucao',
    leadTime: 'Prazo',
    specs: 'Especificacoes',
    applications: 'Aplicacoes',
    quote: 'Solicitar proposta tecnica',
    whatsapp: 'Falar no WhatsApp',
    openDrawer: 'Mais informacoes',
    closeDrawer: 'Fechar painel',
    gallery: 'Galeria de fotos',
    viewDetails: 'Ver detalhes',
    backdrop: 'Fechar detalhes',
    whatsappTemplate: 'Ola, gostaria de cotar o produto: {product}.',
  },
  en: {
    eyebrow: 'Products and solutions',
    title: 'VF Brasil portfolio',
    description: 'Now with photo gallery and a side drawer with complete product details.',
    catalogLabel: 'Catalog',
    catalogHint: 'Click an item to highlight it. Click the image to open the drawer.',
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
    catalogHint: 'Haga clic en un item para destacarlo. Haga clic en la imagen para abrir el drawer.',
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
    catalogHint: 'Cliquez sur un element pour le mettre en avant. Cliquez sur l image pour ouvrir le drawer.',
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
    catalogHint: 'Clicca un elemento per evidenziarlo. Clicca l immagine per aprire il drawer.',
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
      className={`focus-ring group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition ${
        selected
          ? 'border-amber-300/45 bg-amber-400/10 shadow-[0_14px_30px_rgba(0,0,0,0.26)]'
          : 'border-white/15 bg-white/5 hover:border-amber-300/35 hover:bg-white/10'
      }`}
      aria-label={`${copy.viewDetails} ${product.name}`}
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:h-20 sm:w-24">
        <Image
          src={image.src}
          alt={`Foto de ${product.name}`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          style={{ objectPosition: image.position }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">{categoryLabel}</p>
        <p className="mt-1 text-sm font-semibold text-white sm:text-base">{product.name}</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">{product.summary}</p>
      </div>
    </button>
  )
}

export function ProductsShowcase({ locale = 'pt' }: ProductsShowcaseProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.pt

  const categoryLabelsByLocale: Record<Locale, Record<ProductCategory, string>> = {
    pt: { todos: 'Todos', maquinas: 'Maquinas', pecas: 'Pecas', dispositivos: 'Dispositivos', engenharia: 'Engenharia' },
    en: { todos: 'All', maquinas: 'Machines', pecas: 'Parts', dispositivos: 'Devices', engenharia: 'Engineering' },
    es: { todos: 'Todos', maquinas: 'Maquinas', pecas: 'Piezas', dispositivos: 'Dispositivos', engenharia: 'Ingenieria' },
    fr: { todos: 'Tous', maquinas: 'Machines', pecas: 'Pieces', dispositivos: 'Dispositifs', engenharia: 'Ingenierie' },
    it: { todos: 'Tutti', maquinas: 'Macchine', pecas: 'Parti', dispositivos: 'Dispositivi', engenharia: 'Ingegneria' },
  }

  const categoryLabels = categoryLabelsByLocale[locale]

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos')
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? '')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const [drawerProductId, setDrawerProductId] = useState<string | null>(null)
  const [drawerPhotoIndex, setDrawerPhotoIndex] = useState(0)

  const filteredProducts = useMemo(
    () => (activeCategory === 'todos' ? products : products.filter((item) => item.category === activeCategory)),
    [activeCategory],
  )

  const selectedProduct = filteredProducts.find((item) => item.id === selectedProductId) ?? filteredProducts[0]
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

  const selectedImage = selectedProduct.images[selectedPhotoIndex] ?? selectedProduct.images[0]
  const SelectedIcon = categoryIcons[selectedProduct.category]

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

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {(Object.keys(categoryLabels) as ProductCategory[]).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category)
              const nextProducts = category === 'todos' ? products : products.filter((item) => item.category === category)
              setSelectedProductId(nextProducts[0]?.id ?? '')
              setSelectedPhotoIndex(0)
            }}
            className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              category === activeCategory
                ? 'border-amber-300/45 bg-amber-400/12 text-amber-200'
                : 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
            aria-pressed={category === activeCategory}
          >
            <span>{categoryLabels[category]}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.02fr_1.18fr]">
        <aside className="surface-panel rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{copy.catalogLabel}</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">{copy.catalogHint}</p>

          <div className="mt-4 space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedProduct.id === product.id}
                categoryLabel={categoryLabels[product.category]}
                copy={copy}
                onClick={() => {
                  setSelectedProductId(product.id)
                  setSelectedPhotoIndex(0)
                }}
              />
            ))}
          </div>
        </aside>

        <article className="surface-panel rounded-2xl p-4 sm:p-6 xl:sticky xl:top-28 xl:h-fit">
          <button
            type="button"
            onClick={() => openDrawer(selectedProduct, selectedPhotoIndex)}
            className="focus-ring relative block h-56 w-full overflow-hidden rounded-xl text-left sm:h-72"
            aria-label={`${copy.openDrawer}: ${selectedProduct.name}`}
          >
            <Image
              src={selectedImage.src}
              alt={`Foto de ${selectedProduct.name}`}
              fill
              className="object-cover"
              style={{ objectPosition: selectedImage.position }}
            />
            <div className="media-dim-overlay absolute inset-0" />

            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
              <span className="media-label-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em]">
                <SelectedIcon className="h-3.5 w-3.5 text-amber-300" />
                {categoryLabels[selectedProduct.category]}
              </span>
              <span className="rounded-full border border-white/20 bg-[#04070f]/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-100">
                {copy.leadTime}: {selectedProduct.leadTime}
              </span>
            </div>
          </button>

          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {selectedProduct.images.map((image, index) => (
              <button
                key={`${selectedProduct.id}-${index}`}
                type="button"
                onClick={() => setSelectedPhotoIndex(index)}
                className={`focus-ring relative h-14 overflow-hidden rounded-lg border transition sm:h-16 ${
                  index === selectedPhotoIndex ? 'border-amber-300/45 ring-1 ring-amber-300/40' : 'border-white/20 hover:border-amber-300/35'
                }`}
                aria-label={`${copy.gallery} ${index + 1}`}
              >
                <Image src={image.src} alt={`${selectedProduct.name} ${index + 1}`} fill className="object-cover" style={{ objectPosition: image.position }} />
              </button>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{copy.detailsLabel}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProduct.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{selectedProduct.summary}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{copy.specs}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {selectedProduct.specs.map((spec) => (
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
                {selectedProduct.applications.map((item) => (
                  <span key={item} className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="#contato"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/45 hover:bg-amber-400/12"
            >
              {copy.quote}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={buildWhatsappLink(interpolate(copy.whatsappTemplate, { product: selectedProduct.name }))}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircleMore className="h-4 w-4 text-amber-300" />
              {copy.whatsapp}
            </Link>
            <button
              type="button"
              onClick={() => openDrawer(selectedProduct, selectedPhotoIndex)}
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              {copy.openDrawer}
              <ChevronRight className="h-4 w-4 text-amber-300" />
            </button>
          </div>
        </article>
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
