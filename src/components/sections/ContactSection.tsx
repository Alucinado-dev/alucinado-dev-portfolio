'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'
import { siteContact, siteLinks, siteSocialLinks } from '@/lib/data/SiteData'

type FormStatus = 'idle' | 'checking' | 'ready'

const contactMesh = [
  { color: '#0e7490', x: 0, y: 92, spread: 44, opacity: 0.12 },
  { color: '#581c87', x: 98, y: 8, spread: 42, opacity: 0.11 },
]

export default function ContactSection() {
  const t = useTranslations('pages.home.contact')
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  const contactSchema = z.object({
    name: z.string().trim().min(2, t('validation.name')),
    email: z.email(t('validation.email')),
    message: z.string().trim().min(20, t('validation.message')),
  })

  type ContactFields = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  })

  async function copyEmail() {
    if (!siteContact.email) return

    try {
      await navigator.clipboard.writeText(siteContact.email)
      toast.success(t('toast.emailCopied'), { toastId: 'contact-email-copied' })
    } catch {
      toast.error(t('toast.copyError'), { toastId: 'contact-email-copy-error' })
    }
  }

  async function reviewMessage() {
    setFormStatus('checking')
    await new Promise(resolve => window.setTimeout(resolve, 550))
    setFormStatus('ready')
    toast.info(t('toast.reviewReady'), { toastId: 'contact-message-reviewed' })
  }

  function showValidationError() {
    toast.error(t('toast.validationError'), { toastId: 'contact-validation-error' })
  }

  const fieldClass =
    'font-outfit focus:border-cyan-bright/45 focus:ring-cyan-bright/10 w-full border border-white/10 bg-[#030814]/85 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:ring-2'

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
              onSubmit={handleSubmit(reviewMessage, showValidationError)}
              noValidate
              className='border border-white/9 bg-[#060c19]/88 p-5 md:p-6'
            >
              <div className='mb-6 flex items-start justify-between gap-4 border-b border-white/8 pb-5'>
                <div>
                  <h3 className='font-space-grotesk text-lg font-semibold text-slate-100'>{t('form.title')}</h3>
                  <p className='font-outfit mt-1 text-xs leading-5 text-slate-500'>{t('form.integrationNotice')}</p>
                </div>
                <span className='font-syne-mono border border-white/8 bg-white/3 px-2 py-1 text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                  {isDirty ? t('form.statusEditing') : t('form.statusInitial')}
                </span>
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
                    placeholder={t('form.namePlaceholder')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    disabled={formStatus === 'checking'}
                    className={fieldClass}
                    {...register('name', { onChange: () => setFormStatus('idle') })}
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
                    placeholder={t('form.emailPlaceholder')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    disabled={formStatus === 'checking'}
                    className={fieldClass}
                    {...register('email', { onChange: () => setFormStatus('idle') })}
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
                  placeholder={t('form.messagePlaceholder')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  disabled={formStatus === 'checking'}
                  className={`${fieldClass} resize-y`}
                  {...register('message', { onChange: () => setFormStatus('idle') })}
                />
                <p id='contact-message-error' className='font-outfit mt-1.5 min-h-5 text-xs text-rose-300' role='alert'>
                  {errors.message?.message}
                </p>
              </div>

              <div className='mt-4 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between'>
                <p className='font-outfit max-w-md text-xs leading-5 text-slate-500' role='status' aria-live='polite'>
                  {formStatus === 'ready' ? t('form.readyMessage') : t('form.privacyNote')}
                </p>
                <button
                  type='submit'
                  disabled={formStatus === 'checking'}
                  className='font-space-grotesk border-cyan-bright/25 bg-cyan-bright/6 hover:border-cyan-bright/50 hover:bg-cyan-bright/10 focus-visible:ring-cyan-bright/60 inline-flex min-w-44 items-center justify-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase transition outline-none focus-visible:ring-2 disabled:cursor-wait disabled:opacity-60'
                >
                  {formStatus === 'checking' ? (
                    <ThreeDots
                      height={14}
                      width={24}
                      radius={3}
                      color='#a5f3fc'
                      ariaLabel={t('accessibility.checking')}
                    />
                  ) : (
                    <Icon icon='lucide:scan-check' className='h-4 w-4' aria-hidden='true' />
                  )}
                  {formStatus === 'checking' ? t('form.checking') : t('form.review')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
