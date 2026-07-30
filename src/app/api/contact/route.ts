import type { NextRequest } from 'next/server'

import { Resend } from 'resend'
import { z } from 'zod'

import ContactNotificationEmail from '@/emails/ContactNotificationEmail'
import { getPostHogClient } from '@/lib/posthog-server'
import { contactRequestSchema } from '@/lib/validation/ContactSchema'
import type { ContactResponse } from '@/types/ContactTypes'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16 * 1024
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TURNSTILE_PASSING_TEST_SECRET = '1x0000000000000000000000000000000AA'

const turnstileResponseSchema = z.object({
  success: z.boolean(),
  action: z.string().optional(),
})

function json(body: ContactResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

function logFailure(requestId: string, category: string) {
  console.error('[contact-form]', { requestId, category })
}

function normalizedSubjectName(name: string) {
  return name
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function safePostHogHeader(value: string | null) {
  if (!value || value.length > 200 || !/^[a-zA-Z0-9._:-]+$/.test(value)) return undefined
  return value
}

function hasExpectedTurnstileAction(action: string | undefined, secret: string) {
  if (action === 'contact') return true

  return (
    process.env.NODE_ENV !== 'production' &&
    secret === TURNSTILE_PASSING_TEST_SECRET &&
    (action === undefined || action === 'test')
  )
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, code: 'invalid_input' }, 415)
  }

  const origin = request.headers.get('origin')
  if (!origin || origin !== request.nextUrl.origin) {
    return json({ ok: false, code: 'invalid_input' }, 403)
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: 'invalid_input' }, 413)
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return json({ ok: false, code: 'invalid_input' }, 400)
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: 'invalid_input' }, 413)
  }

  let parsedBody: unknown
  try {
    parsedBody = JSON.parse(rawBody)
  } catch {
    return json({ ok: false, code: 'invalid_input' }, 400)
  }

  const parsedRequest = contactRequestSchema.safeParse(parsedBody)
  if (!parsedRequest.success) {
    return json({ ok: false, code: 'invalid_input' }, 422)
  }

  const payload = parsedRequest.data

  // Bots receive a plausible response without learning that the trap was triggered.
  if (payload.website) {
    return json({ ok: true })
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim()
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim()
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim()

  if (!resendApiKey || !contactToEmail || !contactFromEmail || !turnstileSecret) {
    logFailure(payload.requestId, 'missing_server_configuration')
    return json({ ok: false, code: 'service_unavailable' }, 503)
  }

  let verification: z.infer<typeof turnstileResponseSchema>
  try {
    const turnstileForm = new FormData()
    turnstileForm.set('secret', turnstileSecret)
    turnstileForm.set('response', payload.turnstileToken)
    turnstileForm.set('idempotency_key', payload.requestId)

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: turnstileForm,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      logFailure(payload.requestId, 'turnstile_http_error')
      return json({ ok: false, code: 'verification_failed' }, 400)
    }

    const parsedVerification = turnstileResponseSchema.safeParse(await response.json())
    if (!parsedVerification.success) {
      logFailure(payload.requestId, 'turnstile_invalid_response')
      return json({ ok: false, code: 'verification_failed' }, 400)
    }

    verification = parsedVerification.data
  } catch {
    logFailure(payload.requestId, 'turnstile_unavailable')
    return json({ ok: false, code: 'service_unavailable' }, 503)
  }

  if (!verification.success || !hasExpectedTurnstileAction(verification.action, turnstileSecret)) {
    logFailure(payload.requestId, 'turnstile_rejected')
    return json({ ok: false, code: 'verification_failed' }, 400)
  }

  const receivedAt = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(new Date())

  try {
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send(
      {
        from: contactFromEmail,
        to: contactToEmail,
        replyTo: payload.email,
        subject: `[Portfólio] Novo contato de ${normalizedSubjectName(payload.name)}`,
        react: ContactNotificationEmail({
          name: payload.name,
          email: payload.email,
          message: payload.message,
          receivedAt,
        }),
      },
      { idempotencyKey: `portfolio-contact/${payload.requestId}` },
    )

    if (error) {
      logFailure(payload.requestId, 'resend_rejected')
      return json({ ok: false, code: 'send_failed' }, 502)
    }
  } catch {
    logFailure(payload.requestId, 'resend_unavailable')
    return json({ ok: false, code: 'send_failed' }, 502)
  }

  const posthog = getPostHogClient()
  if (posthog) {
    try {
      const distinctId = safePostHogHeader(request.headers.get('x-posthog-distinct-id')) ?? payload.requestId
      const sessionId = safePostHogHeader(request.headers.get('x-posthog-session-id'))

      posthog.capture({
        distinctId,
        event: 'contact_message_received',
        properties: {
          request_id: payload.requestId,
          ...(sessionId ? { $session_id: sessionId } : {}),
        },
      })
      await posthog.flush()
    } catch (error) {
      console.error('PostHog failed to capture contact_message_received', error)
    }
  }

  return json({ ok: true })
}
