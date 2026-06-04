import { useState } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { Mail, MapPin, Phone } from 'lucide-react'
import { objectTypes, services } from '../data/content'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
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
    } catch (error) {
      console.error('Submission failed:', error)
      setSubmitStatus('error')
    }
  }

  return (
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
                  placeholder="+359..."
                  {...register('phone', { required: 'Моля, въведете телефон.' })}
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-500">
                Вашите данни са защитени и се изпращат сигурно.
              </p>
              <Button type="submit" disabled={submitStatus === 'loading'}>
                {submitStatus === 'loading' ? 'Изпращане...' : 'Изпрати запитване'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-medium text-red-600">{error}</span> : null}
    </label>
  )
}