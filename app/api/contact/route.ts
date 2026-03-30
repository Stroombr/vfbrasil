import { NextRequest, NextResponse } from 'next/server'

import { normalizeLocale, type Locale } from '@/data/i18n'

type ContactPayload = {
  name: string
  company: string
  email: string
  phone: string
  message: string
  locale: Locale
}

type ContactErrors = Partial<Record<keyof Omit<ContactPayload, 'locale'>, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function toCleanString(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function validatePayload(payload: ContactPayload) {
  const errors: ContactErrors = {}
  const phoneDigits = payload.phone.replace(/\D/g, '')

  if (!payload.name) {
    errors.name = 'Name is required.'
  }

  if (!payload.email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(payload.email)) {
    errors.email = 'Email format is invalid.'
  }

  if (payload.phone && phoneDigits.length < 10) {
    errors.phone = 'Phone format is invalid.'
  }

  if (!payload.message || payload.message.length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  }

  return errors
}

function getRequestIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')

  if (!forwarded) {
    return ''
  }

  return forwarded.split(',')[0]?.trim() ?? ''
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>

    const payload: ContactPayload = {
      name: toCleanString(body?.name, 120),
      company: toCleanString(body?.company, 140),
      email: toCleanString(body?.email, 180).toLowerCase(),
      phone: toCleanString(body?.phone, 40),
      message: toCleanString(body?.message, 1500),
      locale: normalizeLocale(body?.locale),
    }

    const errors = validatePayload(payload)

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Please review the highlighted fields.',
          errors,
        },
        { status: 400 },
      )
    }

    const contactRecord = {
      ...payload,
      phoneDigits: payload.phone.replace(/\D/g, ''),
      receivedAt: new Date().toISOString(),
      source: 'website-contact-form',
      ip: getRequestIp(request),
      userAgent: request.headers.get('user-agent') ?? '',
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim()

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactRecord),
        cache: 'no-store',
      })

      if (!webhookResponse.ok) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Could not deliver your request at this moment.',
          },
          { status: 502 },
        )
      }
    } else {
      // Fallback for environments without external integration.
      console.info('[contact] New request received', {
        name: contactRecord.name,
        company: contactRecord.company,
        email: contactRecord.email,
        locale: contactRecord.locale,
        receivedAt: contactRecord.receivedAt,
      })
    }

    return NextResponse.json({
      ok: true,
      message: 'Request received successfully.',
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Unexpected error while processing your request.',
      },
      { status: 500 },
    )
  }
}
