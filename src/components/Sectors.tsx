import { motion, useReducedMotion } from 'framer-motion'
import { sectors } from '../data/content'

export function Sectors() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="section-padding bg-mist">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">Приложение</p>
          <h2 className="section-title">Решения за различни типове обекти</h2>
          <p className="section-copy">
            Системите могат да бъдат планирани за ново строителство, обновяване на съществуващ
            обект или надграждане на вече работеща инфраструктура.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon

            return (
              <motion.article
                key={sector.title}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-base font-semibold text-navy-950 sm:text-lg">{sector.title}</h3>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}