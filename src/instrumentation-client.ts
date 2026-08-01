import posthog from 'posthog-js'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim()
const ingestionHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim()

if (!projectToken || !ingestionHost) {
  if (process.env.NODE_ENV !== 'production') {
    const missing = !projectToken ? 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN' : 'NEXT_PUBLIC_POSTHOG_HOST'
    console.error(
      `${missing} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missing} is configured`,
    )
  }
} else {
  posthog.init(projectToken, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30',
    autocapture: false,
    capture_pageview: 'history_change',
    capture_exceptions: true,
    cookieless_mode: 'always',
    disable_session_recording: true,
    disable_surveys: true,
    person_profiles: 'identified_only',
    before_send: event => {
      if (!event) return null

      const countryCode = document.documentElement.dataset.country
      const siteLocale = document.documentElement.lang

      if (countryCode) event.properties.country_code = countryCode
      if (siteLocale) event.properties.site_locale = siteLocale

      return event
    },
    debug: process.env.NODE_ENV === 'development',
  })
}
