import { useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Mail, MapPin, Phone, ShieldCheck, Send, Loader2, ChevronDown } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../lib/i18n'
import { cn } from '../lib/utils'
import { PrivacyPolicy } from './PrivacyPolicy'
import ReCAPTCHA from 'react-google-recaptcha'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

type ContactFormValues = {
  name: string
  phone: string
  email: string
  objectType: string
  service: string
  message: string
}

const fieldClass =
  'min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary-400 dark:focus:ring-primary-300/20'

const labelClass = 'mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200'

const objectTypeKeys = [
  { value: 'home', key: 'contact.objectTypes.home' },
  { value: 'office', key: 'contact.objectTypes.office' },
  { value: 'commercial', key: 'contact.objectTypes.commercial' },
  { value: 'warehouse', key: 'contact.objectTypes.warehouse' },
  { value: 'industrial', key: 'contact.objectTypes.industrial' },
  { value: 'other', key: 'contact.objectTypes.other' },
]

const serviceKeys = [
  'services.s1.title',
  'services.s2.title',
  'services.s3.title',
  'services.s4.title',
  'services.s5.title',
]

export function Contact() {
  const { t, lang } = useLanguage()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const watchedValues = watch()
  const isFormReady =
    !!recaptchaToken &&
    !!watchedValues.name?.trim() &&
    !!watchedValues.phone?.trim() &&
    !!watchedValues.email?.trim() &&
    !!watchedValues.objectType &&
    !!watchedValues.service &&
    !!watchedValues.message?.trim()

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    if (!recaptchaToken) {
      setRecaptchaError(true)
      return
    }
    setRecaptchaError(false)
    setSubmitStatus('loading')
    try {
      // 1. Save to Supabase
      const { error } = await supabase
        .from('contact_requests')
        .insert([
          {
            name: data.name,
            phone: data.phone,
            email: data.email,
            object_type: data.objectType,
            service: data.service,
            message: data.message,
          },
        ])

      if (error) throw error

      // 2. Send emails via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS keys are missing')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          objectType: data.objectType,
          service: data.service,
          message: data.message,
        },
        publicKey
      )

      setSubmitStatus('success')
      reset()
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
    } catch (error) {
      console.error('Submission failed:', error)
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <section id="contact" className="section-padding bg-mist soft-grid dark:bg-navy-950">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="eyebrow">{t('contact.eyebrow')}</p>
              <h2 className="section-title">{t('contact.title')}</h2>
              <p className="section-copy">
                {t('contact.description')}
              </p>

              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.06] dark:shadow-glow">
                <h3 className="text-xl font-semibold text-navy-950 dark:text-white">DABH Engineering</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t('contact.subtitle')}
                </p>
                <div className="mt-6 grid gap-4">
                  <a
                    href="tel:+359876150800"
                    className="flex items-center gap-3 rounded-md text-slate-700 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:text-slate-300 dark:hover:text-primary-300"
                  >
                    <Phone aria-hidden="true" className="size-5 text-primary-600" />
                    <span>+359 876 150 800</span>
                  </a>
                  <a
                    href="mailto:dabhengineering.eu@gmail.com"
                    className="flex items-center gap-3 rounded-md text-slate-700 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:text-slate-300 dark:hover:text-primary-300"
                  >
                    <Mail aria-hidden="true" className="size-5 text-primary-600" />
                    <span>dabhengineering.eu@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <MapPin aria-hidden="true" className="size-5 text-primary-600" />
                    <span>{t('contact.location')}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">{t('contact.followUs')}</p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61572936225566"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-primary-300/30 dark:hover:bg-primary-300/10 dark:hover:text-primary-300"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="size-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/dabhengineering/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-primary-300/30 dark:hover:bg-primary-300/10 dark:hover:text-primary-300"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="size-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.06] dark:shadow-glow sm:p-7"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {submitStatus === 'success' && (
                <div
                  className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-900 dark:border-green-700/30 dark:bg-green-900/20 dark:text-green-300"
                  role="status"
                  aria-live="polite"
                >
                  {t('contact.successMessage')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div
                  className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-300"
                  role="status"
                  aria-live="polite"
                >
                  {t('contact.errorMessage')}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t('contact.labelName')} error={errors.name?.message}>
                  <input
                    className={fieldClass}
                    type="text"
                    autoComplete="name"
                    placeholder={t('contact.placeholderName')}
                    {...register('name', { required: t('contact.errorNameRequired') })}
                  />
                </Field>

                <Field label={t('contact.labelPhone')} error={errors.phone?.message}>
                  <input
                    className={fieldClass}
                    type="tel"
                    autoComplete="tel"
                    placeholder={t('contact.placeholderPhone')}
                    {...register('phone', {
                      required: t('contact.errorPhoneRequired'),
                      pattern: {
                        value: /^(?:\+359|0)\d{9}$/,
                        message: t('contact.errorPhonePattern'),
                      },
                    })}
                  />
                </Field>

                <Field label={t('contact.labelEmail')} error={errors.email?.message}>
                  <input
                    className={fieldClass}
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    {...register('email', {
                      required: t('contact.errorEmailRequired'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('contact.errorEmailPattern'),
                      },
                    })}
                  />
                </Field>

                <Field label={t('contact.labelObjectType')} error={errors.objectType?.message}>
                  <div className="relative">
                    <select
                      className={cn(
                        fieldClass,
                        'appearance-none pr-10 cursor-pointer dark:[color-scheme:dark] [&>option]:bg-white [&>option]:text-navy-950 dark:[&>option]:bg-navy-900 dark:[&>option]:text-white'
                      )}
                      defaultValue=""
                      {...register('objectType', { required: t('contact.errorObjectRequired') })}
                    >
                      <option value="" disabled className="text-slate-400 dark:text-slate-500">
                        {t('contact.selectDefault')}
                      </option>
                      {objectTypeKeys.map((item) => (
                        <option
                          key={item.value}
                          value={t(item.key)}
                          className="bg-white text-navy-950 dark:bg-navy-900 dark:text-white"
                        >
                          {t(item.key)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-400"
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label={t('contact.labelService')} error={errors.service?.message}>
                  <div className="relative">
                    <select
                      className={cn(
                        fieldClass,
                        'appearance-none pr-10 cursor-pointer dark:[color-scheme:dark] [&>option]:bg-white [&>option]:text-navy-950 dark:[&>option]:bg-navy-900 dark:[&>option]:text-white'
                      )}
                      defaultValue=""
                      {...register('service', { required: t('contact.errorServiceRequired') })}
                    >
                      <option value="" disabled className="text-slate-400 dark:text-slate-500">
                        {t('contact.selectService')}
                      </option>
                      {serviceKeys.map((key) => (
                        <option
                          key={key}
                          value={t(key)}
                          className="bg-white text-navy-950 dark:bg-navy-900 dark:text-white"
                        >
                          {t(key)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-400"
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label={t('contact.labelMessage')} error={errors.message?.message}>
                  <textarea
                    className={cn(fieldClass, 'min-h-36 resize-y')}
                    placeholder={t('contact.placeholderMessage')}
                    {...register('message', { required: t('contact.errorMessageRequired') })}
                  />
                </Field>
              </div>

              {/* reCAPTCHA v2 */}
              <div className="mt-6">
                <div
                  className={cn(
                    'flex flex-col gap-2 rounded-lg border p-4 transition-colors',
                    recaptchaError
                      ? 'border-red-300 bg-red-50 dark:border-red-700/30 dark:bg-red-900/20'
                      : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]'
                  )}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <ShieldCheck aria-hidden="true" className="size-3.5 text-primary-500" />
                    <span>{t('contact.recaptchaLabel')}</span>
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''}
                    onChange={(token) => {
                      setRecaptchaToken(token)
                      if (token) setRecaptchaError(false)
                    }}
                    onExpired={() => setRecaptchaToken(null)}
                    hl={lang}
                  />
                  {recaptchaError && (
                    <span className="text-sm font-medium text-red-600">
                      {t('contact.recaptchaError')}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t('contact.privacyText')}{' '}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(true)}
                    className="font-medium text-primary-600 underline underline-offset-2 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded"
                  >
                    {t('contact.privacyLink')}
                  </button>.
                </p>
                <SubmitButton
                  isReady={isFormReady}
                  isLoading={submitStatus === 'loading'}
                  loadingText={t('contact.submitLoading')}
                  submitText={t('contact.submitButton')}
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  )
}

function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label} <span className="text-red-500">*</span>
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm font-medium text-red-600">{error}</span> : null}
    </label>
  )
}

function SubmitButton({
  isReady,
  isLoading,
  loadingText,
  submitText,
}: {
  isReady: boolean
  isLoading: boolean
  loadingText: string
  submitText: string
}) {
  return (
    <button
      type="submit"
      disabled={!isReady || isLoading}
      className={cn(
        'relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-md px-6 text-sm font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 sm:text-base',
        isReady && !isLoading
          ? 'bg-primary-500 text-navy-950 shadow-glow hover:bg-primary-400 hover:-translate-y-0.5 active:scale-95 cursor-pointer'
          : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200 dark:bg-white/[0.04] dark:text-slate-500 dark:border-white/10',
      )}
    >
      {isReady && !isLoading && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md animate-pulse bg-primary-300/25"
        />
      )}
      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {loadingText}
          </>
        ) : (
          <>
            {submitText}
            <Send
              className={cn(
                'size-4 transition-all duration-300',
                isReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1',
              )}
              aria-hidden="true"
            />
          </>
        )}
      </span>
    </button>
  )
}
