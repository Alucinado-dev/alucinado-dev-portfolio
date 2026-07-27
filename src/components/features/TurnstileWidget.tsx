'use client'

import { useCallback, useEffect, useRef } from 'react'

import Script from 'next/script'

type TurnstileWidgetId = string

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      action: string
      appearance: 'interaction-only'
      language: string
      size: 'flexible'
      theme: 'dark'
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    },
  ) => TurnstileWidgetId
  remove: (widgetId: TurnstileWidgetId) => void
  reset: (widgetId: TurnstileWidgetId) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface TurnstileWidgetProps {
  siteKey: string
  resetKey: number
  label: string
  onVerify: (token: string) => void
  onExpire: () => void
  onError: () => void
}

export default function TurnstileWidget({
  siteKey,
  resetKey,
  label,
  onVerify,
  onExpire,
  onError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null)

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: 'contact',
      appearance: 'interaction-only',
      language: 'pt-br',
      size: 'flexible',
      theme: 'dark',
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
    })
  }, [onError, onExpire, onVerify, siteKey])

  useEffect(() => {
    renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [resetKey])

  return (
    <>
      <Script
        id='cloudflare-turnstile-script'
        src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        strategy='afterInteractive'
        onLoad={renderWidget}
        onError={onError}
      />
      <div ref={containerRef} role='group' aria-label={label} className='min-h-0 w-full' />
    </>
  )
}
