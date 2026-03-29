"use client"

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { CheckCircle2, Mail, MessageCircle, Send } from 'lucide-react'

import { buildWhatsappLink, companyProfile } from '@/data/company'

const tabs = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
] as const

type TabId = (typeof tabs)[number]['id']

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

const quickBriefs = [
  {
    label: 'Parada nao planejada',
    text: 'Temos parada nao planejada na linha e precisamos de diagnostico tecnico com urgencia.',
  },
  {
    label: 'Nacionalizacao de peca',
    text: 'Precisamos nacionalizar componentes importados para reduzir lead time de reposicao.',
  },
  {
    label: 'Start-up de projeto',
    text: 'Estamos iniciando projeto industrial e buscamos suporte tecnico para implantacao e comissionamento.',
  },
] as const

export default function TabsIndustrial() {
  const [activeTab, setActiveTab] = useState<TabId>('email')
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

  const messageLength = useMemo(() => form.message.trim().length, [form.message])
  const briefingReadiness = useMemo(() => {
    let score = 0

    if (form.name.trim()) score += 20
    if (form.email.trim()) score += 20
    if (form.phone.trim()) score += 10
    if (form.company.trim()) score += 10
    score += Math.min(Math.round((messageLength / 140) * 40), 40)

    return Math.min(score, 100)
  }, [form.company, form.email, form.name, form.phone, messageLength])

  const briefingSummary = useMemo(() => {
    const lines = [
      `Nome: ${form.name || 'Nao informado'}`,
      `Empresa: ${form.company || 'Nao informado'}`,
      `Email: ${form.email || 'Nao informado'}`,
      `Telefone: ${form.phone || 'Nao informado'}`,
      `Mensagem: ${form.message || 'Nao informada'}`,
    ]

    return lines.join('\n')
  }, [form.company, form.email, form.message, form.name, form.phone])

  const whatsappBriefingLink = useMemo(
    () =>
      buildWhatsappLink(
        `Ola, gostaria de solicitar proposta com este briefing:\n\n${briefingSummary}`,
      ),
    [briefingSummary],
  )

  const validateForm = () => {
    const nextErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = form.phone.replace(/\D/g, '')

    if (!form.name.trim()) {
      nextErrors.name = 'Informe seu nome.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Informe seu email.'
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Informe um email valido.'
    }

    if (form.phone.trim() && phoneDigits.length < 10) {
      nextErrors.phone = 'Telefone incompleto.'
    }

    if (messageLength < 20) {
      nextErrors.message = 'Descreva a necessidade com ao menos 20 caracteres.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      setFeedback('Revise os campos destacados e tente novamente.')
      return
    }

    setIsSubmitting(true)
    setFeedback('')

    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setFeedback('Solicitacao registrada com sucesso. Nossa equipe retornara em breve.')
    setForm(initialForm)
  }

  const applyBrief = (text: string) => {
    setActiveTab('email')
    setFeedback('')
    setErrors({})
    setForm((prev) => ({
      ...prev,
      message: prev.message.trim().length > 0 ? `${prev.message}\n${text}` : text,
    }))
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300">
          Retorno inicial em ate 1 dia util
        </span>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300">
          Atendimento tecnico dedicado
        </span>
      </div>

      <div className="mb-5 rounded-xl border border-white/15 bg-white/5 p-3 sm:p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">Atalhos de briefing</p>
        <p className="mt-2 text-sm text-slate-300">Clique para preencher rapido o contexto da sua demanda.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickBriefs.map((brief) => (
            <button
              key={brief.label}
              type="button"
              onClick={() => applyBrief(brief.text)}
              className="focus-ring rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-amber-300/40 hover:bg-amber-400/10 hover:text-amber-200"
            >
              {brief.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/15 bg-white/5 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id)
                setFeedback('')
              }}
              className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                isActive ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'email' ? (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-2xl border border-white/15 bg-[#0a1019]/75 p-4 sm:grid-cols-2 sm:p-6">
          <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-[0.14em] text-amber-300">Briefing pronto</span>
              <span className="text-slate-300">{briefingReadiness}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${briefingReadiness}%` }}
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, name: event.target.value }))
                setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="Seu nome"
            />
            {errors.name ? <p className="mt-1 text-xs text-amber-300">{errors.name}</p> : null}
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-200">
              Empresa
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="Nome da empresa"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, email: event.target.value }))
                setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="contato@empresa.com"
            />
            {errors.email ? <p className="mt-1 text-xs text-amber-300">{errors.email}</p> : null}
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, phone: event.target.value }))
                setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder={companyProfile.phoneDisplay}
            />
            {errors.phone ? <p className="mt-1 text-xs text-amber-300">{errors.phone}</p> : null}
          </div>

          <div className="sm:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="message" className="block text-sm font-medium text-slate-200">
                Descreva sua necessidade
              </label>
              <span className="text-xs text-slate-400">{messageLength}/500</span>
            </div>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={500}
              required
              value={form.message}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, message: event.target.value }))
                setErrors((prev) => ({ ...prev, message: undefined }))
              }}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="Conte o contexto do projeto, prazo e objetivo esperado."
            />
            {errors.message ? <p className="mt-1 text-xs text-amber-300">{errors.message}</p> : null}
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar proposta'}
              <Send className="h-4 w-4" />
            </button>
            <Link
              href={whatsappBriefingLink}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Enviar briefing no WhatsApp
              <MessageCircle className="h-4 w-4" />
            </Link>

            {feedback && (
              <p aria-live="polite" className="inline-flex items-center gap-2 text-sm text-amber-300">
                <CheckCircle2 className="h-4 w-4" />
                {feedback}
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/15 bg-[#0a1019]/75 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white">Atendimento direto no WhatsApp</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Canal direto para triagem da demanda e orientacao dos proximos passos.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={buildWhatsappLink(`Ola, gostaria de falar com a equipe da ${companyProfile.brandName}.`)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Iniciar conversa no WhatsApp
              <MessageCircle className="h-4 w-4" />
            </Link>
            <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300">
              Telefone de contato: {companyProfile.phoneDisplay}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}


