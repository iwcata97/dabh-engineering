import { motion, useReducedMotion } from 'framer-motion'
import { processSteps } from '../data/content'

export function Process() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">Процес</p>
          <h2 className="section-title">От първия разговор до надеждна работеща система</h2>
          <p className="section-copy">
            Процесът е структуриран, но гъвкав. Целта е техническото решение да пасне на
            обекта, хората, които го използват, и бъдещото развитие на инсталацията.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                key={step.title}
                className="relative rounded-lg border border-slate-200 bg-mist p-5 shadow-soft"
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
                <h3 className="text-lg font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}