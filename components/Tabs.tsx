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

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

export default function TabsIndustrial() {
  const [activeTab, setActiveTab] = useState<TabId>('email')
  const [form, setForm] = useState<FormData>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

  const messageLength = useMemo(() => form.message.trim().length, [form.message])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name || !form.email || messageLength < 20) {
      setFeedback('Preencha nome, email e uma descricao objetiva com ao menos 20 caracteres.')
      return
    }

    setIsSubmitting(true)
    setFeedback('')

    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setFeedback('Solicitacao registrada com sucesso. Nossa equipe retornara em breve.')
    setForm(initialForm)
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300">
          Retorno inicial em ate 1 dia util
        </span>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300">
          Atendimento tecnico e comercial
        </span>
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
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="Seu nome"
            />
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
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="contato@empresa.com"
            />
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
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder={companyProfile.phoneDisplay}
            />
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
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="Conte o contexto do projeto, prazo e objetivo esperado."
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar solicitacao'}
              <Send className="h-4 w-4" />
            </button>

            {feedback && (
              <p aria-live="polite" className="inline-flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                {feedback}
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/15 bg-[#0a1019]/75 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white">Atendimento rapido no WhatsApp</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Canal direto para triagem comercial e orientacao dos proximos passos tecnicos.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={buildWhatsappLink(`Ola, gostaria de falar com a equipe da ${companyProfile.brandName}.`)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Iniciar conversa no WhatsApp
              <MessageCircle className="h-4 w-4" />
            </Link>
            <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300">
              Telefone comercial: {companyProfile.phoneDisplay}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}


