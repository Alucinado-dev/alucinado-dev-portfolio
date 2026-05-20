import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale

  return {
    locale: currentLocale!,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
  }
})
