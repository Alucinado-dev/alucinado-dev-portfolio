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
const analyticsPreferenceKey = 'portfolio_analytics_disabled'

function hasDisabledAnalytics() {
  return typeof window !== 'undefined' && window.localStorage.getItem(analyticsPreferenceKey) === 'true'
}

export function capturePortfolioEvent({ name, properties }: PortfolioEvent) {
  if (!analyticsEnabled || hasDisabledAnalytics()) return

  posthog.capture(name, properties)
}

export function getPostHogCorrelationHeaders(): Record<string, string> {
  if (!analyticsEnabled || !posthog.__loaded || hasDisabledAnalytics()) return {}

  const distinctId = posthog.get_distinct_id()
  const sessionId = posthog.get_session_id()

  return {
    ...(distinctId ? { 'X-POSTHOG-DISTINCT-ID': distinctId } : {}),
    ...(sessionId ? { 'X-POSTHOG-SESSION-ID': sessionId } : {}),
  }
}

export function isAnalyticsEnabled() {
  return analyticsEnabled && posthog.__loaded && !hasDisabledAnalytics()
}

export function setAnalyticsEnabled(enabled: boolean) {
  if (!analyticsEnabled || !posthog.__loaded) return

  if (enabled) {
    window.localStorage.removeItem(analyticsPreferenceKey)
    posthog.set_config({
      autocapture: false,
      capture_exceptions: true,
      capture_pageview: 'history_change',
    })
    return
  }

  window.localStorage.setItem(analyticsPreferenceKey, 'true')
  posthog.set_config({
    autocapture: false,
    capture_exceptions: false,
    capture_pageview: false,
  })
}
