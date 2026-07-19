'use client'

import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'
import TurnstileWidget from '@/components/features/TurnstileWidget'
import { siteContact, siteLinks, siteSocialLinks } from '@/lib/data/SiteData'
import { type ContactFields, createContactFieldsSchema } from '@/lib/validation/ContactSchema'
import type { ContactResponse } from '@/types/ContactTypes'

type FormStatus = 'idle' | 'success' | 'error'
type TurnstileStatus = 'verifying' | 'verified' | 'error' | 'unavailable'

const contactMesh = [
  { color: '#0e7490', x: 0, y: 92, spread: 44, opacity: 0.12 },
  { color: '#581c87', x: 98, y: 8, spread: 42, opacity: 0.11 },
]

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()

export default function ContactSection() {
  const t = useTranslations('pages.home.contact')
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>(
    turnstileSiteKey ? 'verifying' : 'unavailable',
  )
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const [requestId, setRequestId] = useState('')

  const contactSchema = useMemo(
    () =>
      createContactFieldsSchema({
        name: t('validation.name'),
        nameMax: t('validation.nameMax'),
        email: t('validation.email'),
        message: t('validation.message'),
        messageMax: t('validation.messageMax'),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '', website: '' },
  })

  const markEditing = useCallback(() => {
    setFormStatus('idle')
    setRequestId('')
  }, [])

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('')
    setTurnstileStatus(turnstileSiteKey ? 'verifying' : 'unavailable')
    setTurnstileResetKey(current => current + 1)
  }, [])

  const verifyTurnstile = useCallback((token: string) => {
    setTurnstileToken(token)
    setTurnstileStatus('verified')
  }, [])

  const expireTurnstile = useCallback(() => {
    setTurnstileToken('')
    setTurnstileStatus('verifying')
  }, [])

  const failTurnstile = useCallback(() => {
    setTurnstileToken('')
    setTurnstileStatus('error')
  }, [])

  async function copyEmail() {
    if (!siteContact.email) return

    try {
      await navigator.clipboard.writeText(siteContact.email)
      toast.success(t('toast.emailCopied'), { toastId: 'contact-email-copied' })
    } catch {
      toast.error(t('toast.copyError'), { toastId: 'contact-email-copy-error' })
    }
  }

  async function sendMessage(fields: ContactFields) {
    if (!turnstileToken) {
      setFormStatus('error')
      toast.error(t('toast.verificationError'), { toastId: 'contact-verification-error' })
      return
    }

    const currentRequestId = requestId || crypto.randomUUID()
    if (!requestId) setRequestId(currentRequestId)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          requestId: currentRequestId,
          turnstileToken,
        }),
      })

      const result = (await response.json()) as ContactResponse

      if (!response.ok || !result.ok) {
        setFormStatus('error')
        resetTurnstile()

        const isVerificationFailure = !result.ok && result.code === 'verification_failed'
        const isUnavailable = !result.ok && result.code === 'service_unavailable'

        toast.error(
          isVerificationFailure
            ? t('toast.verificationError')
            : isUnavailable
              ? t('toast.serviceUnavailable')
              : t('toast.sendError'),
          { toastId: 'contact-send-error' },
        )
        return
      }

      reset()
      setRequestId('')
      setFormStatus('success')
      resetTurnstile()
      toast.success(t('toast.sent'), { toastId: 'contact-message-sent' })
    } catch {
      setFormStatus('error')
      resetTurnstile()
      toast.error(t('toast.serviceUnavailable'), { toastId: 'contact-service-unavailable' })
    }
  }

  function showValidationError() {
    setFormStatus('error')
    toast.error(t('toast.validationError'), { toastId: 'contact-validation-error' })
  }

  const statusLabel = isSubmitting
    ? t('form.statusSending')
    : formStatus === 'success'
      ? t('form.statusSuccess')
      : formStatus === 'error'
        ? t('form.statusError')
        : isDirty
          ? t('form.statusEditing')
          : t('form.statusInitial')

  const securityMessage =
    turnstileStatus === 'verified'
      ? t('security.verified')
      : turnstileStatus === 'error'
        ? t('security.error')
        : turnstileStatus === 'unavailable'
          ? t('security.unavailable')
          : t('security.verifying')

  const fieldClass =
    'font-outfit focus:border-cyan-bright/45 focus:ring-cyan-bright/10 w-full border border-white/10 bg-[#030814]/85 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:ring-2 disabled:cursor-wait disabled:opacity-60'

  return (
    <section
      id='contato'
      aria-label={t('accessibility.sectionLabel')}
      className='relative z-10 w-full scroll-mt-20 py-12 md:py-16'
    >
      <Container className='relative overflow-hidden border border-white/10 bg-[#040914]/90 p-6 shadow-[0_36px_90px_-48px_rgba(0,0,0,0.96)] backdrop-blur-xl sm:p-8 md:p-12'>
        <MeshBackground points={contactMesh} background='transparent' className='opacity-80' />
        <div className='bg-cyan-bright/35 absolute top-0 left-0 h-px w-24' />
        <div className='bg-plasma-purple/30 absolute right-0 bottom-0 h-px w-24' />

        <div className='relative z-10'>
          <header className='mb-10 max-w-3xl space-y-3'>
            <div className='font-syne-mono text-tech-teal flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:send' className='h-4 w-4' aria-hidden='true' />
              {t('eyebrow')}
            </div>
            <h2 className='font-space-grotesk text-2xl font-bold tracking-tight text-slate-50 md:text-3xl'>
              {t('title')}
            </h2>
            <p className='font-outfit max-w-2xl text-sm leading-6 font-light text-slate-300/75 md:text-base md:leading-7'>
              {t('description')}
            </p>
          </header>

          <div className='grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch'>
            <aside className='flex flex-col border border-white/9 bg-[#07101e]/82 p-5 md:p-6'>
              <div className='mb-8'>
                <Icon icon='lucide:messages-square' className='text-cyan-bright mb-4 h-7 w-7' aria-hidden='true' />
                <h3 className='font-space-grotesk text-xl font-semibold text-slate-100'>{t('direct.title')}</h3>
                <p className='font-outfit mt-3 text-sm leading-6 font-light text-slate-400'>
                  {t('direct.description')}
                </p>
              </div>

              <div className='mt-auto space-y-3'>
                {siteContact.email && siteLinks.email && (
                  <div className='border border-white/8 bg-black/15 p-4'>
                    <span className='font-syne-mono mb-2 block text-[9px] tracking-[0.16em] text-slate-500 uppercase'>
                      {t('direct.emailLabel')}
                    </span>
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:items-start xl:items-center'>
                      <a
                        href={siteLinks.email}
                        className='font-outfit hover:text-cyan-bright text-sm break-all text-slate-200 transition-colors'
                      >
                        {siteContact.email}
                      </a>
                      <button
                        type='button'
                        onClick={copyEmail}
                        className='font-syne-mono hover:border-cyan-bright/35 hover:text-cyan-bright focus-visible:ring-cyan-bright/60 inline-flex shrink-0 items-center justify-center gap-2 border border-white/10 bg-white/3 px-3 py-2 text-[9px] tracking-[0.12em] text-slate-400 uppercase transition outline-none focus-visible:ring-2'
                        aria-label={t('accessibility.copyEmail')}
                      >
                        <Icon icon='lucide:copy' className='h-3.5 w-3.5' aria-hidden='true' />
                        {t('direct.copy')}
                      </button>
                    </div>
                  </div>
                )}

                <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                  {siteSocialLinks.map(link => (
                    <a
                      key={link.key}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-space-grotesk hover:border-plasma-purple/35 hover:bg-plasma-purple/6 focus-visible:ring-plasma-purple/60 flex items-center justify-between border border-white/9 bg-white/3 px-4 py-3 text-xs font-semibold tracking-[0.06em] text-slate-300 uppercase transition outline-none hover:text-purple-200 focus-visible:ring-2'
                      aria-label={t(`accessibility.${link.key}`)}
                    >
                      <span className='flex items-center gap-2'>
                        <Icon icon={link.icon} className='h-4 w-4' aria-hidden='true' />
                        {t(`direct.socialLabels.${link.key}`)}
                      </span>
                      <Icon icon='lucide:arrow-up-right' className='h-4 w-4' aria-hidden='true' />
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <form
              onSubmit={handleSubmit(sendMessage, showValidationError)}
              noValidate
              className='relative border border-white/9 bg-[#060c19]/88 p-5 md:p-6'
            >
              <div className='mb-6 flex items-start justify-between gap-4 border-b border-white/8 pb-5'>
                <div>
                  <h3 className='font-space-grotesk text-lg font-semibold text-slate-100'>{t('form.title')}</h3>
                  <p className='font-outfit mt-1 text-xs leading-5 text-slate-500'>{t('form.integrationNotice')}</p>
                </div>
                <span className='font-syne-mono border border-white/8 bg-white/3 px-2 py-1 text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                  {statusLabel}
                </span>
              </div>

              <div
                aria-hidden='true'
                className='pointer-events-none absolute top-0 -left-250 h-px w-px overflow-hidden'
              >
                <label htmlFor='contact-website'>Website</label>
                <input id='contact-website' type='text' tabIndex={-1} autoComplete='off' {...register('website')} />
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='contact-name'
                    className='font-space-grotesk mb-2 block text-xs font-medium text-slate-300'
                  >
                    {t('form.nameLabel')}
                  </label>
                  <input
                    id='contact-name'
                    type='text'
                    autoComplete='name'
                    maxLength={80}
                    placeholder={t('form.namePlaceholder')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    disabled={isSubmitting}
                    className={fieldClass}
                    {...register('name', { onChange: markEditing })}
                  />
                  <p id='contact-name-error' className='font-outfit mt-1.5 min-h-5 text-xs text-rose-300' role='alert'>
                    {errors.name?.message}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='contact-email'
                    className='font-space-grotesk mb-2 block text-xs font-medium text-slate-300'
                  >
                    {t('form.emailLabel')}
                  </label>
                  <input
                    id='contact-email'
                    type='email'
                    autoComplete='email'
                    inputMode='email'
                    maxLength={254}
                    placeholder={t('form.emailPlaceholder')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    disabled={isSubmitting}
                    className={fieldClass}
                    {...register('email', { onChange: markEditing })}
                  />
                  <p id='contact-email-error' className='font-outfit mt-1.5 min-h-5 text-xs text-rose-300' role='alert'>
                    {errors.email?.message}
                  </p>
                </div>
              </div>

              <div className='mt-1'>
                <label
                  htmlFor='contact-message'
                  className='font-space-grotesk mb-2 block text-xs font-medium text-slate-300'
                >
                  {t('form.messageLabel')}
                </label>
                <textarea
                  id='contact-message'
                  rows={6}
                  maxLength={3000}
                  placeholder={t('form.messagePlaceholder')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  disabled={isSubmitting}
                  className={`${fieldClass} resize-y`}
                  {...register('message', { onChange: markEditing })}
                />
                <p id='contact-message-error' className='font-outfit mt-1.5 min-h-5 text-xs text-rose-300' role='alert'>
                  {errors.message?.message}
                </p>
              </div>

              <div className='mt-3 border border-white/8 bg-black/15 px-4 py-3'>
                {turnstileSiteKey && (
                  <TurnstileWidget
                    siteKey={turnstileSiteKey}
                    resetKey={turnstileResetKey}
                    label={t('accessibility.securityVerification')}
                    onVerify={verifyTurnstile}
                    onExpire={expireTurnstile}
                    onError={failTurnstile}
                  />
                )}
                <div className='flex items-center justify-between gap-3'>
                  <p
                    className={`font-outfit flex items-center gap-2 text-xs ${
                      turnstileStatus === 'verified'
                        ? 'text-emerald-300'
                        : turnstileStatus === 'error' || turnstileStatus === 'unavailable'
                          ? 'text-amber-300'
                          : 'text-slate-500'
                    }`}
                    role='status'
                    aria-live='polite'
                  >
                    <Icon
                      icon={
                        turnstileStatus === 'verified'
                          ? 'lucide:shield-check'
                          : turnstileStatus === 'error' || turnstileStatus === 'unavailable'
                            ? 'lucide:shield-alert'
                            : 'lucide:shield-ellipsis'
                      }
                      className='h-4 w-4 shrink-0'
                      aria-hidden='true'
                    />
                    {securityMessage}
                  </p>
                  {turnstileStatus === 'error' && (
                    <button
                      type='button'
                      onClick={resetTurnstile}
                      className='font-syne-mono hover:text-cyan-bright focus-visible:ring-cyan-bright/60 shrink-0 text-[9px] tracking-[0.1em] text-slate-400 uppercase outline-none focus-visible:ring-2'
                    >
                      {t('security.retry')}
                    </button>
                  )}
                </div>
              </div>

              <div className='mt-4 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between'>
                <p className='font-outfit max-w-md text-xs leading-5 text-slate-500' role='status' aria-live='polite'>
                  {formStatus === 'success'
                    ? t('form.successMessage')
                    : formStatus === 'error'
                      ? t('form.errorMessage')
                      : t('form.privacyNote')}
                </p>
                <button
                  type='submit'
                  disabled={isSubmitting || turnstileStatus !== 'verified'}
                  className='font-space-grotesk border-cyan-bright/25 bg-cyan-bright/6 hover:border-cyan-bright/50 hover:bg-cyan-bright/10 focus-visible:ring-cyan-bright/60 inline-flex min-w-44 items-center justify-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase transition outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {isSubmitting || turnstileStatus === 'verifying' ? (
                    <ThreeDots
                      height={14}
                      width={24}
                      radius={3}
                      color='#a5f3fc'
                      ariaLabel={isSubmitting ? t('accessibility.sending') : t('accessibility.checking')}
                    />
                  ) : (
                    <Icon icon='lucide:send' className='h-4 w-4' aria-hidden='true' />
                  )}
                  {isSubmitting
                    ? t('form.sending')
                    : turnstileStatus === 'verifying'
                      ? t('form.verifying')
                      : t('form.send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
