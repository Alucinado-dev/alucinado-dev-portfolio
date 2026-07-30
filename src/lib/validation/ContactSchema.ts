import { z } from 'zod'

export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 20, max: 3000 },
  turnstileToken: { max: 2048 },
  honeypot: { max: 200 },
} as const

type ContactValidationMessages = {
  name: string
  nameMax: string
  email: string
  message: string
  messageMax: string
}

export function createContactFieldsSchema(messages?: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(contactLimits.name.min, messages?.name).max(contactLimits.name.max, messages?.nameMax),
    email: z.string().trim().email(messages?.email).max(contactLimits.email.max, messages?.email),
    message: z
      .string()
      .trim()
      .min(contactLimits.message.min, messages?.message)
      .max(contactLimits.message.max, messages?.messageMax),
    website: z.string().max(contactLimits.honeypot.max),
  })
}

export const contactRequestSchema = createContactFieldsSchema().extend({
  requestId: z.uuid(),
  turnstileToken: z.string().min(1).max(contactLimits.turnstileToken.max),
})

export type ContactFields = z.infer<ReturnType<typeof createContactFieldsSchema>>
export type ContactRequest = z.infer<typeof contactRequestSchema>
