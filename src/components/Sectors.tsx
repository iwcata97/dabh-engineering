import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Building2, Factory, Home, Store, Warehouse } from 'lucide-react'
import { useLanguage } from '../lib/i18n'

const sectorItems = [
  { titleKey: 'sectors.s1', icon: Home },
  { titleKey: 'sectors.s2', icon: Briefcase },
  { titleKey: 'sectors.s3', icon: Store },
  { titleKey: 'sectors.s4', icon: Warehouse },
  { titleKey: 'sectors.s5', icon: Factory },
  { titleKey: 'sectors.s6', icon: Building2 },
]

export function Sectors() {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section className="section-padding bg-mist dark:bg-navy-950">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">{t('sectors.eyebrow')}</p>
          <h2 className="section-title">{t('sectors.title')}</h2>
          <p className="section-copy">
            {t('sectors.description')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectorItems.map((sector, index) => {
            const Icon = sector.icon

            return (
              <motion.article
                key={sector.titleKey}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glow"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700 dark:bg-primary-300/10 dark:text-primary-300">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-base font-semibold text-navy-950 dark:text-white sm:text-lg">{t(sector.titleKey)}</h3>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}