import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/Button'

export function CTA() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-navy-950 p-6 text-white shadow-glow sm:p-8 lg:p-10"
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="absolute inset-0 technical-grid opacity-25" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              Имате обект, който се нуждае от сигурност, контрол или автоматизация?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Опишете нуждите си и ще подготвим подходящо решение според мащаба, бюджета и
              спецификата на обекта.
            </p>
          </div>
          <div className="relative z-10">
            <Button href="#contact" size="lg" icon={ArrowRight}>
              Свържете се с нас
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}