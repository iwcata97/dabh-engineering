import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { services } from '../data/content'

export function Services() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="services" className="section-padding bg-mist soft-grid">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">Услуги</p>
          <h2 className="section-title">Комплексни решения за сигурност, контрол и свързаност</h2>
          <p className="section-copy">
            ДАБХ Инженеринг изгражда слаботокови инсталации, които работят като една ясна
            система, от първоначалния проект до настройката и последващата поддръжка.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:border-primary-200 sm:p-7"
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary-100/70 transition group-hover:bg-primary-200/80" />
                <div className="relative z-10 flex size-12 items-center justify-center rounded-md bg-navy-950 text-primary-300 shadow-glow">
                  <Icon aria-hidden="true" className="size-6" />
                </div>
                <h3 className="relative z-10 mt-5 text-xl font-semibold leading-snug text-navy-950 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-4 leading-7 text-slate-600">{service.description}</p>
                <ul className="relative z-10 mt-6 grid gap-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm font-medium text-slate-700 sm:text-base">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-600" />
                      <span>{bullet}</span>
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