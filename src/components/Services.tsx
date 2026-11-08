import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import {
  Cable,
  Flame,
  KeyRound,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import { useLanguage } from '../lib/i18n'

const serviceKeys = [
  {
    titleKey: 'services.s1.title',
    descriptionKey: 'services.s1.description',
    bulletKeys: ['services.s1.b1', 'services.s1.b2', 'services.s1.b3', 'services.s1.b4'],
    icon: ShieldCheck,
  },
  {
    titleKey: 'services.s2.title',
    descriptionKey: 'services.s2.description',
    bulletKeys: ['services.s2.b1', 'services.s2.b2', 'services.s2.b3', 'services.s2.b4'],
    icon: KeyRound,
  },
  {
    titleKey: 'services.s3.title',
    descriptionKey: 'services.s3.description',
    bulletKeys: ['services.s3.b1', 'services.s3.b2', 'services.s3.b3', 'services.s3.b4'],
    icon: Settings2,
  },
  {
    titleKey: 'services.s4.title',
    descriptionKey: 'services.s4.description',
    bulletKeys: ['services.s4.b1', 'services.s4.b2', 'services.s4.b3', 'services.s4.b4'],
    icon: Cable,
  },
  {
    titleKey: 'services.s5.title',
    descriptionKey: 'services.s5.description',
    bulletKeys: ['services.s5.b1', 'services.s5.b2', 'services.s5.b3', 'services.s5.b4'],
    icon: Flame,
  },
]

export function Services() {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="services" className="section-padding bg-mist soft-grid dark:bg-navy-950">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">{t('services.eyebrow')}</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-copy">
            {t('services.description')}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceKeys.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.titleKey}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:border-primary-200 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glow dark:hover:border-primary-300/30 sm:p-7"
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary-100/70 transition group-hover:bg-primary-200/80 dark:bg-primary-300/5 dark:group-hover:bg-primary-300/10" />
                <div className="relative z-10 flex size-12 items-center justify-center rounded-md bg-navy-950 text-primary-300 shadow-glow">
                  <Icon aria-hidden="true" className="size-6" />
                </div>
                <h3 className="relative z-10 mt-5 text-xl font-semibold leading-snug text-navy-950 dark:text-white sm:text-2xl">
                  {t(service.titleKey)}
                </h3>
                <p className="relative z-10 mt-4 leading-7 text-slate-600 dark:text-slate-300">{t(service.descriptionKey)}</p>
                <ul className="relative z-10 mt-6 grid gap-3">
                  {service.bulletKeys.map((bulletKey) => (
                    <li key={bulletKey} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 sm:text-base">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-600" />
                      <span>{t(bulletKey)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}