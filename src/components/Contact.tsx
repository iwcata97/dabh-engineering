import { useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Mail, MapPin, Phone, ShieldCheck, Send, Loader2 } from 'lucide-react'
import { objectTypes, services } from '../data/content'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import { cn } from '../lib/utils'
import { PrivacyPolicy } from './PrivacyPolicy'
import ReCAPTCHA from 'react-google-recaptcha'

type ContactFormValues = {
  name: string
  phone: string
  email: string
  objectType: string
  service: string
  message: string
}

const fieldClass =
  'min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100'

const labelClass = 'mb-2 block text-sm font-semibold text-slate-800'

export function Contact() {
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
    // Проверка дали reCAPTCHA е потвърдена
    if (!recaptchaToken) {
      setRecaptchaError(true)
      return
    }
    setRecaptchaError(false)
    setSubmitStatus('loading')
    try {
      // 1. Записваме в Supabase
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

      // 2. Изпращаме имейли чрез EmailJS
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
      <section id="contact" className="section-padding bg-mist soft-grid">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="eyebrow">Контакт</p>
            <h2 className="section-title">Заявете консултация за вашия обект</h2>
            <p className="section-copy">
              Попълнете кратката форма и опишете какъв тип система ви интересува. Ние ще се свържем с вас възможно най-скоро.
            </p>

            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-navy-950">DABH Engineering</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Слаботокови системи, сигурност, автоматизация и мрежова инфраструктура.
              </p>
              <div className="mt-6 grid gap-4">
                <a
                  href="tel:+359876150800"
                  className="flex items-center gap-3 rounded-md text-slate-700 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  <Phone aria-hidden="true" className="size-5 text-primary-600" />
                  <span>+359 876 150 800</span>
                </a>
                <a
                  href="mailto:dabhengineering@gmail.com"
                  className="flex items-center gap-3 rounded-md text-slate-700 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  <Mail aria-hidden="true" className="size-5 text-primary-600" />
                  <span>dabhengineering@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin aria-hidden="true" className="size-5 text-primary-600" />
                  <span>Област Плевен, България</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-7"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {submitStatus === 'success' && (
              <div
                className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-900"
                role="status"
                aria-live="polite"
              >
                Благодарим! Вашето запитване беше изпратено успешно. Ще се свържем с Вас скоро.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div
                className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
                role="status"
                aria-live="polite"
              >
                Възникна грешка при изпращането. Моля, опитайте отново по-късно или се свържете с нас по телефона.
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Име" error={errors.name?.message}>
                <input
                  className={fieldClass}
                  type="text"
                  autoComplete="name"
                  placeholder="Вашето име"
                  {...register('name', { required: 'Моля, въведете име.' })}
                />
              </Field>

              <Field label="Телефон" error={errors.phone?.message}>
                <input
                  className={fieldClass}
                  type="tel"
                  autoComplete="tel"
                  placeholder="08... или +359..."
                  {...register('phone', {
                    required: 'Моля, въведете телефон.',
                    pattern: {
                      value: /^(?:\+359|0)\d{9}$/,
                      message: 'Въведете валиден формат (напр. 08... или +359...).',
                    },
                  })}
                />
              </Field>

              <Field label="Имейл" error={errors.email?.message}>
                <input
                  className={fieldClass}
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Моля, въведете имейл.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Въведете валиден имейл.',
                    },
                  })}
                />
              </Field>

              <Field label="Тип обект" error={errors.objectType?.message}>
                <select
                  className={cn(fieldClass, 'appearance-none')}
                  defaultValue=""
                  {...register('objectType', { required: 'Изберете тип обект.' })}
                >
                  <option value="" disabled>
                    Изберете
                  </option>
                  {objectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Интересуваща услуга" error={errors.service?.message}>
                <select
                  className={cn(fieldClass, 'appearance-none')}
                  defaultValue=""
                  {...register('service', { required: 'Изберете услуга.' })}
                >
                  <option value="" disabled>
                    Изберете услуга
                  </option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Съобщение" error={errors.message?.message}>
                <textarea
                  className={cn(fieldClass, 'min-h-36 resize-y')}
                  placeholder="Опишете обекта, нуждите и предпочитан срок."
                  {...register('message', { required: 'Моля, добавете съобщение.' })}
                />
              </Field>
            </div>

            {/* reCAPTCHA v2 */}
            <div className="mt-6">
              <div
                className={cn(
                  'flex flex-col gap-2 rounded-lg border p-4 transition-colors',
                  recaptchaError
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200 bg-slate-50'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <ShieldCheck aria-hidden="true" className="size-3.5 text-primary-500" />
                  <span>Потвърдете, че не сте робот</span>
                </div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''}
                  onChange={(token) => {
                    setRecaptchaToken(token)
                    if (token) setRecaptchaError(false)
                  }}
                  onExpired={() => setRecaptchaToken(null)}
                  hl="bg"
                />
                {recaptchaError && (
                  <span className="text-sm font-medium text-red-600">
                    Моля, потвърдете, че не сте робот.
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-500">
                Вашите данни са защитени. С изпращането на запитването се съгласявате с нашата{' '}
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="font-medium text-primary-600 underline underline-offset-2 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded"
                >
                  Политика за поверителност
                </button>.
              </p>
              <SubmitButton isReady={isFormReady} isLoading={submitStatus === 'loading'} />
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

function SubmitButton({ isReady, isLoading }: { isReady: boolean; isLoading: boolean }) {
  return (
    <button
      type="submit"
      disabled={!isReady || isLoading}
      className={cn(
        'relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-md px-6 text-sm font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 sm:text-base',
        isReady && !isLoading
          ? 'bg-primary-500 text-navy-950 shadow-glow hover:bg-primary-400 hover:-translate-y-0.5 active:scale-95 cursor-pointer'
          : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200',
      )}
    >
      {/* Pulse glow — видим само когато е готов */}
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
            Изпращане...
          </>
        ) : (
          <>
            Изпрати запитване
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