"use client"

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Phone, Send } from 'lucide-react'

import { interpolate, type Locale } from '@/data/i18n'
import { buildWhatsappLink, companyProfile } from '@/data/company'

type TabId = 'email' | 'whatsapp'

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

type LocaleCopy = {
  tabs: Array<{ id: TabId; label: string; icon: typeof Mail }>
  quickBriefs: Array<{ label: string; text: string }>
  badges: [string, string]
  quickBriefingTitle: string
  quickBriefingDesc: string
  readiness: string
  labels: { name: string; company: string; email: string; phone: string; message: string }
  placeholders: { name: string; company: string; email: string; message: string }
  errors: { name: string; emailRequired: string; emailInvalid: string; phone: string; message: string }
  feedbackValidation: string
  feedbackSuccess: string
  feedbackError: string
  submitIdle: string
  submitSending: string
  sendBriefing: string
  whatsappTitle: string
  whatsappDesc: string
  whatsappStart: string
  contactPhone: string
  summary: { notInformed: string; notInformedFemale: string }
  whatsappTeamTemplate: string
  whatsappBriefTemplate: string
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

const copyByLocale: Record<Locale, LocaleCopy> = {
  pt: {
    tabs: [
      { id: 'email', label: 'Email', icon: Mail },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
    quickBriefs: [
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
    ],
    badges: ['Retorno inicial em ate 1 dia util', 'Atendimento tecnico dedicado'],
    quickBriefingTitle: 'Atalhos de briefing',
    quickBriefingDesc: 'Clique para preencher rapido o contexto da sua demanda.',
    readiness: 'Briefing pronto',
    labels: { name: 'Nome', company: 'Empresa', email: 'Email', phone: 'Telefone', message: 'Necessidade' },
    placeholders: {
      name: 'Seu nome',
      company: 'Nome da empresa',
      email: 'contato@empresa.com',
      message: 'Conte o contexto do projeto, prazo e objetivo esperado.',
    },
    errors: {
      name: 'Informe seu nome.',
      emailRequired: 'Informe seu email.',
      emailInvalid: 'Informe um email valido.',
      phone: 'Telefone incompleto.',
      message: 'Descreva a necessidade com ao menos 20 caracteres.',
    },
    feedbackValidation: 'Revise os campos destacados e tente novamente.',
    feedbackSuccess: 'Solicitacao registrada com sucesso. Nossa equipe retornara em breve.',
    feedbackError: 'Nao foi possivel concluir o envio agora. Tente novamente em instantes.',
    submitIdle: 'Solicitar proposta via email',
    submitSending: 'Enviando por email...',
    sendBriefing: 'Solicitar proposta via WhatsApp',
    whatsappTitle: 'Atendimento direto no WhatsApp',
    whatsappDesc: 'Canal direto para triagem da demanda e orientacao dos proximos passos.',
    whatsappStart: 'Iniciar conversa no WhatsApp',
    contactPhone: 'Telefone de contato',
    summary: { notInformed: 'Nao informado', notInformedFemale: 'Nao informada' },
    whatsappTeamTemplate: 'Ola, gostaria de falar com a equipe da {brand}.',
    whatsappBriefTemplate:
      'Ola! Gostaria de solicitar uma proposta. Segue um resumo da minha necessidade:\n\n{briefing}',
  },
  en: {
    tabs: [
      { id: 'email', label: 'Email', icon: Mail },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
    quickBriefs: [
      {
        label: 'Unplanned downtime',
        text: 'We have unplanned downtime on the line and need an urgent technical diagnosis.',
      },
      {
        label: 'Part localization',
        text: 'We need to localize imported components to reduce replacement lead time.',
      },
      {
        label: 'Project start-up',
        text: 'We are starting an industrial project and need technical support for implementation and commissioning.',
      },
    ],
    badges: ['Initial response within 1 business day', 'Dedicated technical service'],
    quickBriefingTitle: 'Briefing shortcuts',
    quickBriefingDesc: 'Click to quickly fill in your demand context.',
    readiness: 'Briefing readiness',
    labels: { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', message: 'Describe your need' },
    placeholders: {
      name: 'Your name',
      company: 'Company name',
      email: 'contact@company.com',
      message: 'Describe project context, timeline and expected result.',
    },
    errors: {
      name: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please enter a valid email.',
      phone: 'Incomplete phone number.',
      message: 'Please describe the need with at least 20 characters.',
    },
    feedbackValidation: 'Please review highlighted fields and try again.',
    feedbackSuccess: 'Request submitted successfully. Our team will get back to you shortly.',
    feedbackError: 'Could not submit right now. Please try again in a moment.',
    submitIdle: 'Request quote via email',
    submitSending: 'Sending via email...',
    sendBriefing: 'Request quote via WhatsApp',
    whatsappTitle: 'Direct WhatsApp support',
    whatsappDesc: 'Direct channel for demand triage and next-step guidance.',
    whatsappStart: 'Start conversation on WhatsApp',
    contactPhone: 'Contact phone',
    summary: { notInformed: 'Not informed', notInformedFemale: 'Not informed' },
    whatsappTeamTemplate: 'Hello, I would like to speak with the {brand} team.',
    whatsappBriefTemplate: 'Hello, I would like to request a quote with this briefing:\n\n{briefing}',
  },
  es: {
    tabs: [
      { id: 'email', label: 'Correo', icon: Mail },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
    quickBriefs: [
      {
        label: 'Parada no planificada',
        text: 'Tenemos una parada no planificada en la linea y necesitamos un diagnostico tecnico urgente.',
      },
      {
        label: 'Nacionalizacion de pieza',
        text: 'Necesitamos nacionalizar componentes importados para reducir el lead time de reposicion.',
      },
      {
        label: 'Inicio de proyecto',
        text: 'Estamos iniciando un proyecto industrial y buscamos soporte tecnico para implantacion y puesta en marcha.',
      },
    ],
    badges: ['Respuesta inicial en hasta 1 dia habil', 'Atencion tecnica dedicada'],
    quickBriefingTitle: 'Atajos de briefing',
    quickBriefingDesc: 'Haga clic para completar rapidamente el contexto de su demanda.',
    readiness: 'Briefing listo',
    labels: { name: 'Nombre', company: 'Empresa', email: 'Correo', phone: 'Telefono', message: 'Describa su necesidad' },
    placeholders: {
      name: 'Su nombre',
      company: 'Nombre de la empresa',
      email: 'contacto@empresa.com',
      message: 'Cuente el contexto del proyecto, plazo y objetivo esperado.',
    },
    errors: {
      name: 'Informe su nombre.',
      emailRequired: 'Informe su correo.',
      emailInvalid: 'Informe un correo valido.',
      phone: 'Telefono incompleto.',
      message: 'Describa la necesidad con al menos 20 caracteres.',
    },
    feedbackValidation: 'Revise los campos destacados e intente nuevamente.',
    feedbackSuccess: 'Solicitud registrada con exito. Nuestro equipo respondera pronto.',
    feedbackError: 'No fue posible enviar ahora. Intente nuevamente en unos instantes.',
    submitIdle: 'Solicitar propuesta por correo',
    submitSending: 'Enviando por correo...',
    sendBriefing: 'Solicitar propuesta por WhatsApp',
    whatsappTitle: 'Atencion directa por WhatsApp',
    whatsappDesc: 'Canal directo para triage de la demanda y orientacion de proximos pasos.',
    whatsappStart: 'Iniciar conversacion en WhatsApp',
    contactPhone: 'Telefono de contacto',
    summary: { notInformed: 'No informado', notInformedFemale: 'No informada' },
    whatsappTeamTemplate: 'Hola, me gustaria hablar con el equipo de {brand}.',
    whatsappBriefTemplate: 'Hola, me gustaria solicitar una propuesta con este briefing:\n\n{briefing}',
  },
  fr: {
    tabs: [
      { id: 'email', label: 'E-mail', icon: Mail },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
    quickBriefs: [
      {
        label: 'Arret non planifie',
        text: 'Nous avons un arret non planifie sur la ligne et avons besoin d un diagnostic technique urgent.',
      },
      {
        label: 'Localisation de piece',
        text: 'Nous devons localiser des composants importes pour reduire le delai de remplacement.',
      },
      {
        label: 'Demarrage de projet',
        text: 'Nous demarrons un projet industriel et recherchons un support technique pour implantation et mise en service.',
      },
    ],
    badges: ['Premier retour sous 1 jour ouvre', 'Support technique dedie'],
    quickBriefingTitle: 'Raccourcis de briefing',
    quickBriefingDesc: 'Cliquez pour remplir rapidement le contexte de votre demande.',
    readiness: 'Briefing pret',
    labels: { name: 'Nom', company: 'Entreprise', email: 'E-mail', phone: 'Telephone', message: 'Decrivez votre besoin' },
    placeholders: {
      name: 'Votre nom',
      company: 'Nom de l entreprise',
      email: 'contact@entreprise.com',
      message: 'Decrivez le contexte du projet, le delai et l objectif attendu.',
    },
    errors: {
      name: 'Veuillez saisir votre nom.',
      emailRequired: 'Veuillez saisir votre e-mail.',
      emailInvalid: 'Veuillez saisir un e-mail valide.',
      phone: 'Telephone incomplet.',
      message: 'Decrivez le besoin avec au moins 20 caracteres.',
    },
    feedbackValidation: 'Veuillez revoir les champs signales et reessayer.',
    feedbackSuccess: 'Demande enregistree avec succes. Notre equipe reviendra vers vous bientot.',
    feedbackError: 'Envoi indisponible pour le moment. Veuillez reessayer dans un instant.',
    submitIdle: 'Demander un devis par e-mail',
    submitSending: 'Envoi par e-mail...',
    sendBriefing: 'Demander un devis via WhatsApp',
    whatsappTitle: 'Support direct sur WhatsApp',
    whatsappDesc: 'Canal direct pour qualifier la demande et orienter les prochaines etapes.',
    whatsappStart: 'Demarrer la conversation sur WhatsApp',
    contactPhone: 'Telephone de contact',
    summary: { notInformed: 'Non informe', notInformedFemale: 'Non informee' },
    whatsappTeamTemplate: 'Bonjour, je souhaite parler avec l equipe de {brand}.',
    whatsappBriefTemplate: 'Bonjour, je souhaite demander un devis avec ce briefing :\n\n{briefing}',
  },
  it: {
    tabs: [
      { id: 'email', label: 'Email', icon: Mail },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
    quickBriefs: [
      {
        label: 'Fermo non pianificato',
        text: 'Abbiamo un fermo non pianificato sulla linea e abbiamo bisogno di una diagnosi tecnica urgente.',
      },
      {
        label: 'Localizzazione ricambio',
        text: 'Dobbiamo localizzare componenti importati per ridurre il lead time di sostituzione.',
      },
      {
        label: 'Avvio progetto',
        text: 'Stiamo avviando un progetto industriale e cerchiamo supporto tecnico per implementazione e messa in servizio.',
      },
    ],
    badges: ['Primo riscontro entro 1 giorno lavorativo', 'Supporto tecnico dedicato'],
    quickBriefingTitle: 'Scorciatoie briefing',
    quickBriefingDesc: 'Clicca per compilare rapidamente il contesto della tua richiesta.',
    readiness: 'Briefing pronto',
    labels: { name: 'Nome', company: 'Azienda', email: 'Email', phone: 'Telefono', message: 'Descrivi la tua esigenza' },
    placeholders: {
      name: 'Il tuo nome',
      company: "Nome dell'azienda",
      email: 'contatto@azienda.com',
      message: 'Descrivi il contesto del progetto, i tempi e il risultato atteso.',
    },
    errors: {
      name: 'Inserisci il tuo nome.',
      emailRequired: 'Inserisci la tua email.',
      emailInvalid: 'Inserisci una email valida.',
      phone: 'Numero di telefono incompleto.',
      message: 'Descrivi la richiesta con almeno 20 caratteri.',
    },
    feedbackValidation: 'Controlla i campi evidenziati e riprova.',
    feedbackSuccess: 'Richiesta inviata con successo. Il nostro team ti rispondera a breve.',
    feedbackError: 'Invio non disponibile al momento. Riprova tra qualche istante.',
    submitIdle: 'Richiedi preventivo via email',
    submitSending: 'Invio via email...',
    sendBriefing: 'Richiedi preventivo via WhatsApp',
    whatsappTitle: 'Supporto diretto su WhatsApp',
    whatsappDesc: 'Canale diretto per la triage della richiesta e l orientamento dei prossimi passi.',
    whatsappStart: 'Avvia conversazione su WhatsApp',
    contactPhone: 'Telefono di contatto',
    summary: { notInformed: 'Non indicato', notInformedFemale: 'Non indicata' },
    whatsappTeamTemplate: 'Ciao, vorrei parlare con il team di {brand}.',
    whatsappBriefTemplate: 'Ciao, vorrei richiedere un preventivo con questo briefing:\n\n{briefing}',
  },
}

type TabsIndustrialProps = {
  locale?: Locale
  className?: string
}

export default function TabsIndustrial({ locale = 'pt', className = 'mt-10' }: TabsIndustrialProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.pt

  const [activeTab, setActiveTab] = useState<TabId>('email')
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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
      `${copy.labels.name}: ${form.name || copy.summary.notInformed}`,
      `${copy.labels.company}: ${form.company || copy.summary.notInformed}`,
      `${copy.labels.email}: ${form.email || copy.summary.notInformed}`,
      `${copy.labels.phone}: ${form.phone || copy.summary.notInformed}`,
      `${copy.labels.message}: ${form.message || copy.summary.notInformedFemale}`,
    ]

    return lines.join('\n')
  }, [
    copy.labels.company,
    copy.labels.email,
    copy.labels.message,
    copy.labels.name,
    copy.labels.phone,
    copy.summary.notInformed,
    copy.summary.notInformedFemale,
    form.company,
    form.email,
    form.message,
    form.name,
    form.phone,
  ])

  const whatsappBriefingLink = useMemo(
    () => buildWhatsappLink(interpolate(copy.whatsappBriefTemplate, { briefing: briefingSummary })),
    [briefingSummary, copy.whatsappBriefTemplate],
  )

  const whatsappTeamLink = useMemo(
    () => buildWhatsappLink(interpolate(copy.whatsappTeamTemplate, { brand: companyProfile.brandName })),
    [copy.whatsappTeamTemplate],
  )

  const validateForm = () => {
    const nextErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = form.phone.replace(/\D/g, '')

    if (!form.name.trim()) {
      nextErrors.name = copy.errors.name
    }

    if (!form.email.trim()) {
      nextErrors.email = copy.errors.emailRequired
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = copy.errors.emailInvalid
    }

    if (form.phone.trim() && phoneDigits.length < 10) {
      nextErrors.phone = copy.errors.phone
    }

    if (messageLength < 20) {
      nextErrors.message = copy.errors.message
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      setFeedback({ type: 'error', text: copy.feedbackValidation })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; errors?: FormErrors }
        | null

      if (!response.ok) {
        if (payload?.errors) {
          setErrors((prev) => ({ ...prev, ...payload.errors }))
        }

        setFeedback({
          type: 'error',
          text: payload?.message ?? copy.feedbackError,
        })
        return
      }

      setFeedback({ type: 'success', text: copy.feedbackSuccess })
      setForm(initialForm)
      setErrors({})
    } catch {
      setFeedback({ type: 'error', text: copy.feedbackError })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`mx-auto w-full max-w-4xl ${className}`.trim()}>
      <div className="surface-panel rounded-2xl p-4 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-2">
          {copy.tabs.map((tab) => {
            const Icon = tab.icon
            const selected = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={selected}
                className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selected
                    ? 'border-amber-300/45 bg-amber-400/10 text-amber-200'
                    : 'border-white/20 bg-white/5 text-slate-100 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {copy.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200"
            >
              {badge}
            </span>
          ))}
        </div>

        {activeTab === 'email' ? (
          <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="vf-panel-soft p-3 sm:col-span-2">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-300">{copy.readiness}</span>
                <span className="text-slate-300">{briefingReadiness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${briefingReadiness}%` }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                {copy.quickBriefingTitle}
              </p>
              <p className="mt-1 text-sm text-slate-300">{copy.quickBriefingDesc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {copy.quickBriefs.map((brief) => (
                  <button
                    key={brief.label}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, message: brief.text }))
                      setErrors((prev) => ({ ...prev, message: undefined }))
                      setFeedback(null)
                    }}
                    className="focus-ring inline-flex rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-300/35 hover:text-amber-200"
                  >
                    {brief.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                {copy.labels.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                  setErrors((prev) => ({ ...prev, name: undefined }))
                  setFeedback(null)
                }}
                className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder={copy.placeholders.name}
              />
              {errors.name ? <p className="mt-1 text-xs text-amber-300">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-200">
                {copy.labels.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, company: event.target.value }))
                  setFeedback(null)
                }}
                className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder={copy.placeholders.company}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                {copy.labels.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                  setErrors((prev) => ({ ...prev, email: undefined }))
                  setFeedback(null)
                }}
                className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder={copy.placeholders.email}
              />
              {errors.email ? <p className="mt-1 text-xs text-amber-300">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
                {copy.labels.phone}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, phone: event.target.value }))
                  setErrors((prev) => ({ ...prev, phone: undefined }))
                  setFeedback(null)
                }}
                className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder={companyProfile.phoneDisplay}
              />
              {errors.phone ? <p className="mt-1 text-xs text-amber-300">{errors.phone}</p> : null}
            </div>

            <div className="sm:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="message" className="block text-sm font-medium text-slate-200">
                  {copy.labels.message}
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
                  setFeedback(null)
                }}
                className="focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder={copy.placeholders.message}
              />
              {errors.message ? <p className="mt-1 text-xs text-amber-300">{errors.message}</p> : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {copy.submitSending}
                  </>
                ) : (
                  <>
                    {copy.submitIdle}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <Link
                href={whatsappBriefingLink}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
              >
                {copy.sendBriefing}
                <MessageCircle className="h-4 w-4" />
              </Link>

              {feedback ? (
                <p
                  aria-live="polite"
                  className={`inline-flex items-center gap-2 text-sm ${
                    feedback.type === 'success' ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {feedback.text}
                </p>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="vf-panel-soft rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">{copy.whatsappTitle}</p>
              <p className="mt-2 text-sm text-slate-300">{copy.whatsappDesc}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-200">
                <Phone className="h-4 w-4 text-amber-300" />
                <span className="font-semibold">{copy.contactPhone}:</span>
                {companyProfile.phoneDisplay}
              </p>
            </div>

            <div className="vf-panel-soft rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">{copy.quickBriefingTitle}</p>
              <p className="mt-2 text-sm text-slate-300">{copy.quickBriefingDesc}</p>
              <pre className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-6 text-slate-200">
                {briefingSummary}
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={whatsappTeamLink}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 sm:w-auto"
              >
                {copy.whatsappStart}
                <MessageCircle className="h-4 w-4" />
              </Link>

              <Link
                href={whatsappBriefingLink}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
              >
                {copy.sendBriefing}
                <Send className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
