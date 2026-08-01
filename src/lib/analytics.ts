import posthog from 'posthog-js'

type PortfolioEvent =
  | {
      name: 'contact_form_started'
      properties: { locale: string }
    }
  | {
      name: 'contact_form_submitted'
      properties: { locale: string }
    }
  | {
      name: 'contact_form_submission_failed'
      properties: {
        locale: string
        reason:
          | 'network_error'
          | 'send_failed'
          | 'service_unavailable'
          | 'validation_failed'
          | 'verification_failed'
          | 'verification_missing'
      }
    }
  | {
      name: 'cv_downloaded'
      properties: { locale: string; placement: 'hero' }
    }
  | {
      name: 'email_copied'
      properties: { locale: string }
    }
  | {
      name: 'social_link_clicked'
      properties: { locale: string; platform: string }
    }
  | {
      name: 'project_case_viewed'
      properties: { locale: string; slug: string; source: 'archive' | 'home' }
    }
  | {
      name: 'project_filter_applied'
      properties: { filter_type: 'nature' | 'scope'; filter_value: string }
    }
  | {
      name: 'project_live_demo_clicked'
      properties: { locale: string; slug: string; source: 'case' }
    }
  | {
      name: 'project_source_clicked'
      properties: { locale: string; slug: string; source: 'archive' | 'case' }
    }
  | {
      name: 'language_switched'
      properties: { from_locale: string; to_locale: string }
    }

const analyticsEnabled = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() && process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim(),
)

export function capturePortfolioEvent({ name, properties }: PortfolioEvent) {
  if (!analyticsEnabled) return

  posthog.capture(name, properties)
}

export function getPostHogCorrelationHeaders(): Record<string, string> {
  if (!analyticsEnabled || !posthog.__loaded) return {}

  const distinctId = posthog.get_distinct_id()
  const sessionId = posthog.get_session_id()

  return {
    ...(distinctId ? { 'X-POSTHOG-DISTINCT-ID': distinctId } : {}),
    ...(sessionId ? { 'X-POSTHOG-SESSION-ID': sessionId } : {}),
  }
}
