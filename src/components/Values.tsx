import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Gauge, Lightbulb, Target, Zap } from 'lucide-react'
import { useLanguage } from '../lib/i18n'

const valueItems = [
  { titleKey: 'values.v1.title', descKey: 'values.v1.description', icon: BadgeCheck },
  { titleKey: 'values.v2.title', descKey: 'values.v2.description', icon: Target },
  { titleKey: 'values.v3.title', descKey: 'values.v3.description', icon: Lightbulb },
  { titleKey: 'values.v4.title', descKey: 'values.v4.description', icon: Gauge },
  { titleKey: 'values.v5.title', descKey: 'values.v5.description', icon: Zap },
]

export function Values() {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 technical-grid opacity-70" aria-hidden="true" />
      <div className="container-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-primary-300">{t('values.eyebrow')}</p>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {t('values.title')}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {t('values.description')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {valueItems.map((value, index) => {
              const Icon = value.icon

              return (
                <motion.article
                  key={value.titleKey}
                  className="dark-panel rounded-lg p-5"
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-primary-300/10 text-primary-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t(value.titleKey)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{t(value.descKey)}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}