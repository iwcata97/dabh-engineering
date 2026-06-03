import { motion, useReducedMotion } from 'framer-motion'
import { values } from '../data/content'

export function Values() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 technical-grid opacity-70" aria-hidden="true" />
      <div className="container-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-primary-300">За нас</p>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Професионален партньор за слаботокови системи и автоматизация
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              ДАБХ Инженеринг е компания, специализирана в изграждането и поддръжката на
              различни слаботокови инсталации. Подходът е индивидуален, иновативен и
              ориентиран към реалните нужди на клиента.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <motion.article
                  key={value.title}
                  className="dark-panel rounded-lg p-5"
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-primary-300/10 text-primary-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{value.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}