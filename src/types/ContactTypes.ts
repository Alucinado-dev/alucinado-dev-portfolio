export type ContactResponse =
  | { ok: true }
  | {
      ok: false
      code: 'invalid_input' | 'verification_failed' | 'send_failed' | 'service_unavailable'
    }
