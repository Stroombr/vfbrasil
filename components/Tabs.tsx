"use client"

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react'

import { interpolate, type Locale } from '@/data/i18n'
import { buildWhatsappLink, companyProfile } from '@/data/company'

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

type LocaleCopy = {
  labels: { name: string; company: string; email: string; phone: string; message: string }
  placeholders: { name: string; company: string; email: string; message: string }
  errors: { name: string; emailRequired: string; emailInvalid: string; phone: string; message: string }
  feedbackValidation: string
  feedbackSuccess: string
  feedbackError: string
  submitIdle: string
  submitSending: string
  whatsappCta: string
  whatsappTemplate: string
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const copyByLocale: Record<Locale, LocaleCopy> = {
  pt: {
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
    whatsappCta: 'Falar no WhatsApp',
    whatsappTemplate:
      'Ola, gostaria de falar com a equipe da {brand}. Resumo do contato: Nome: {name}; Empresa: {company}; Email: {email}; Telefone: {phone}; Necessidade: {message}',
  },
  en: {
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
    whatsappCta: 'Talk on WhatsApp',
    whatsappTemplate:
      'Hello, I would like to speak with the {brand} team. Contact summary: Name: {name}; Company: {company}; Email: {email}; Phone: {phone}; Need: {message}',
  },
  es: {
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
    whatsappCta: 'Hablar por WhatsApp',
    whatsappTemplate:
      'Hola, me gustaria hablar con el equipo de {brand}. Resumen del contacto: Nombre: {name}; Empresa: {company}; Correo: {email}; Telefono: {phone}; Necesidad: {message}',
  },
  fr: {
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
    whatsappCta: 'Parler sur WhatsApp',
    whatsappTemplate:
      'Bonjour, je souhaite parler avec l equipe de {brand}. Resume du contact : Nom: {name}; Entreprise: {company}; E-mail: {email}; Telephone: {phone}; Besoin: {message}',
  },
  it: {
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
    whatsappCta: 'Parla su WhatsApp',
    whatsappTemplate:
      'Ciao, vorrei parlare con il team di {brand}. Riepilogo contatto: Nome: {name}; Azienda: {company}; Email: {email}; Telefono: {phone}; Esigenza: {message}',
  },
}

type TabsIndustrialProps = {
  locale?: Locale
  className?: string
}

export default function TabsIndustrial({ locale = 'pt', className = 'mt-10' }: TabsIndustrialProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.pt

  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const messageLength = useMemo(() => form.message.trim().length, [form.message])
  const isFormComplete = useMemo(() => {
    const phoneDigits = form.phone.replace(/\D/g, '')

    return (
      form.name.trim().length > 0 &&
      form.company.trim().length > 0 &&
      emailRegex.test(form.email.trim()) &&
      phoneDigits.length >= 10 &&
      form.message.trim().length >= 20
    )
  }, [form.company, form.email, form.message, form.name, form.phone])
  const whatsappLink = useMemo(
    () =>
      buildWhatsappLink(
        interpolate(copy.whatsappTemplate, {
          brand: companyProfile.brandName,
          name: form.name || '-',
          company: form.company || '-',
          email: form.email || '-',
          phone: form.phone || '-',
          message: form.message || '-',
        }),
      ),
    [copy.whatsappTemplate, form.company, form.email, form.message, form.name, form.phone],
  )

  const validateForm = () => {
    const nextErrors: FormErrors = {}
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
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
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
              disabled={isSubmitting || !isFormComplete}
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
              href={isFormComplete ? whatsappLink : '#'}
              target={isFormComplete ? '_blank' : undefined}
              rel={isFormComplete ? 'noreferrer' : undefined}
              aria-disabled={!isFormComplete}
              tabIndex={isFormComplete ? 0 : -1}
              onClick={(event) => {
                if (!isFormComplete) {
                  event.preventDefault()
                }
              }}
              className={`focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition sm:w-auto ${
                isFormComplete
                  ? 'hover:bg-white/10'
                  : 'cursor-not-allowed opacity-50 pointer-events-none'
              }`}
            >
              {copy.whatsappCta}
              <MessageCircle className="h-4 w-4 text-amber-300" />
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
      </div>
    </div>
  )
}
