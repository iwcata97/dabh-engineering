import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardCheck, LifeBuoy, PenTool, Search, Wrench } from 'lucide-react'
import { useLanguage } from '../lib/i18n'

const steps = [
  { titleKey: 'process.step1.title', descKey: 'process.step1.description', icon: ClipboardCheck },
  { titleKey: 'process.step2.title', descKey: 'process.step2.description', icon: Search },
  { titleKey: 'process.step3.title', descKey: 'process.step3.description', icon: PenTool },
  { titleKey: 'process.step4.title', descKey: 'process.step4.description', icon: Wrench },
  { titleKey: 'process.step5.title', descKey: 'process.step5.description', icon: LifeBuoy },
]

export function Process() {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="process" className="section-padding bg-white dark:bg-graphite-900">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">{t('process.eyebrow')}</p>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-copy">
            {t('process.description')}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                key={step.titleKey}
                className="relative rounded-lg border border-slate-200 bg-mist p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glow"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.42, delay: index * 0.07 }}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-md bg-navy-950 text-primary-300">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-3xl font-semibold text-primary-600/25">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy-950 dark:text-white">{t(step.titleKey)}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t(step.descKey)}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}