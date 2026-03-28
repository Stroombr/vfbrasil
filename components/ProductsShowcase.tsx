'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Factory, PackageCheck, Settings2, Wrench } from 'lucide-react'

import { buildWhatsappLink } from '@/data/company'

type ProductCategory = 'todos' | 'maquinas' | 'pecas' | 'dispositivos' | 'engenharia'

type Product = {
  id: string
  name: string
  category: Exclude<ProductCategory, 'todos'>
  image: string
  imagePosition: string
  leadTime: string
  summary: string
  specs: string[]
  applications: string[]
}

const categoryLabels: Record<ProductCategory, string> = {
  todos: 'Todos',
  maquinas: 'Maquinas',
  pecas: 'Pecas',
  dispositivos: 'Dispositivos',
  engenharia: 'Engenharia',
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
    image: '/teste.jpg',
    imagePosition: 'center 22%',
    leadTime: '45-60 dias',
    summary: 'Estrutura robusta para operacao continua em ambiente siderurgico de alta demanda.',
    specs: ['Projeto customizado por capacidade', 'Fabricacao com controle dimensional', 'Comissionamento assistido'],
    applications: ['Laminacao a quente', 'Upgrade de linhas existentes'],
  },
  {
    id: 'transportador',
    name: 'Modulo transportador industrial',
    category: 'maquinas',
    image: '/teste.jpg',
    imagePosition: 'center 42%',
    leadTime: '30-45 dias',
    summary: 'Movimentacao segura de material com foco em disponibilidade e manutencao simplificada.',
    specs: ['Estrutura modular', 'Integra sensores e intertravamentos', 'Entrega com documentacao tecnica'],
    applications: ['Fluxo entre processos', 'Linhas com operacao 24/7'],
  },
  {
    id: 'roletes',
    name: 'Kit de roletes e eixos nacionalizados',
    category: 'pecas',
    image: '/teste.jpg',
    imagePosition: 'center 60%',
    leadTime: '15-25 dias',
    summary: 'Substituicao de importados com desempenho equivalente e menor dependencia externa.',
    specs: ['Materiais conforme exigencia de carga', 'Rastreabilidade de lote', 'Inspecao final com relatorio'],
    applications: ['Manutencao preventiva', 'Reducao de parada por falta de reposicao'],
  },
  {
    id: 'dispositivo',
    name: 'Dispositivo de ajuste e fixacao',
    category: 'dispositivos',
    image: '/teste.jpg',
    imagePosition: 'center 74%',
    leadTime: '12-20 dias',
    summary: 'Dispositivo de campo para setup rapido, repetibilidade e maior seguranca operacional.',
    specs: ['Projeto sob medida', 'Valido para uso continuo', 'Treinamento de uso na entrega'],
    applications: ['Trocas rapidas de ferramental', 'Padronizacao de setup'],
  },
  {
    id: 'reversa',
    name: 'Pacote de engenharia reversa',
    category: 'engenharia',
    image: '/teste.jpg',
    imagePosition: 'center 32%',
    leadTime: '20-35 dias',
    summary: 'Levantamento tecnico completo para reproduzir componentes criticos com confiabilidade.',
    specs: ['Modelagem 3D e desenho tecnico', 'Analise de tolerancias', 'Plano de validacao funcional'],
    applications: ['Nacionalizacao de componentes', 'Recuperacao de pecas sem desenho original'],
  },
  {
    id: 'retrofit',
    name: 'Retrofit de subconjuntos mecanicos',
    category: 'engenharia',
    image: '/teste.jpg',
    imagePosition: 'center 50%',
    leadTime: '25-40 dias',
    summary: 'Atualizacao de subconjuntos para elevar desempenho e vida util sem troca total da linha.',
    specs: ['Diagnostico de desgaste e risco', 'Plano tecnico com etapas', 'Implementacao com parada planejada'],
    applications: ['Aumento de confiabilidade', 'Modernizacao com investimento controlado'],
  },
]

function ProductCard({
  product,
  isActive,
  onSelect,
}: {
  product: Product
  isActive: boolean
  onSelect: () => void
}) {
  const Icon = categoryIcons[product.category]

  return (
    <article
      className={`group rounded-2xl border p-4 transition duration-300 ${
        isActive
          ? 'border-amber-300/45 bg-amber-400/8 shadow-[0_18px_34px_rgba(0,0,0,0.28)]'
          : 'border-white/15 bg-white/5 hover:border-amber-300/35 hover:bg-white/10'
      }`}
    >
      <div className="relative h-40 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={`Foto ilustrativa de ${product.name}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: product.imagePosition }}
        />
        <div className="media-dim-overlay absolute inset-0" />
        <span className="media-label-badge absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.13em]">
          <Icon className="h-3.5 w-3.5 text-amber-300" />
          {categoryLabels[product.category]}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm leading-6 text-slate-300">{product.summary}</p>
        <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Lead time: {product.leadTime}</span>
          <button
            type="button"
            onClick={onSelect}
            className="focus-ring inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-200 transition hover:bg-white/10"
            aria-label={`Ver detalhes de ${product.name}`}
          >
            Ver detalhes
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductsShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos')
  const [activeProductId, setActiveProductId] = useState(products[0]?.id ?? '')

  const filteredProducts = useMemo(
    () => (activeCategory === 'todos' ? products : products.filter((product) => product.category === activeCategory)),
    [activeCategory],
  )

  const selectedProduct = filteredProducts.find((product) => product.id === activeProductId) ?? filteredProducts[0]

  return (
    <section id="produtos" className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="surface-panel rounded-3xl p-6 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Produtos e solucoes</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Escopos de fabricacao e engenharia prontos para cotar</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            Selecione a categoria, compare opcoes e avance para proposta tecnica-comercial.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(Object.keys(categoryLabels) as ProductCategory[]).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                category === activeCategory
                  ? 'border-amber-300/45 bg-amber-400/12 text-amber-200'
                  : 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
              }`}
              aria-pressed={category === activeCategory}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={selectedProduct?.id === product.id}
                onSelect={() => setActiveProductId(product.id)}
              />
            ))}
          </div>

          {selectedProduct && (
            <aside className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6 xl:sticky xl:top-28 xl:h-fit">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Detalhes do produto</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{selectedProduct.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{selectedProduct.summary}</p>
              <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200">
                Prazo estimado: {selectedProduct.leadTime}
              </p>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Especificacoes principais</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {selectedProduct.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Aplicacoes indicadas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProduct.applications.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="#contato"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Solicitar proposta deste escopo
                </Link>
                <Link
                  href={buildWhatsappLink(`Ola, gostaria de cotar o produto: ${selectedProduct.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Falar no WhatsApp
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
