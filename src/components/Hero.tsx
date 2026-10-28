import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cpu, LockKeyhole, Package } from 'lucide-react'
import { heroNodes } from '../data/content'
import { useLanguage } from '../lib/i18n'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

const nodePositions = [
  'left-[8%] top-[18%]',
  'right-[10%] top-[20%]',
  'bottom-[14%] left-[14%]',
  'bottom-[18%] right-[12%]',
]

const trustKeys = ['hero.trust1', 'hero.trust2', 'hero.trust3', 'hero.trust4']

interface HeroProps {
  onOpenCatalog?: () => void
}

export function Hero({ onOpenCatalog }: HeroProps) {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-950 pb-12 pt-28 text-white sm:pt-32 lg:pb-16 lg:pt-36"
    >
      <div className="absolute inset-0 technical-grid opacity-90" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-mist to-transparent dark:from-navy-950" aria-hidden="true" />

      <div className="container-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="mb-4 inline-flex rounded-full border border-primary-300/30 bg-primary-300/10 px-4 py-2 text-sm font-semibold text-primary-100">
              {t('hero.badge')}
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {t('hero.description')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row flex-wrap">
              <Button href="#contact" size="lg" icon={ArrowRight}>
                {t('hero.ctaConsultation')}
              </Button>
              <Button href="#services" size="lg" variant="dark">
                {t('hero.ctaServices')}
              </Button>
              <Button 
                onClick={onOpenCatalog} 
                size="lg" 
                variant="dark"
                icon={Package}
                className="border-amber-400/40 bg-amber-400/10 text-amber-300 hover:border-amber-400/70 hover:bg-amber-400/20 hover:text-white transition-all shadow-sm"
              >
                {t('hero.ctaCatalog')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto aspect-square w-full max-w-[540px]"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <div className="absolute inset-8 rounded-full border border-primary-300/20 bg-white/[0.03] shadow-glow backdrop-blur-sm" />
            <div className="absolute inset-16 rounded-full border border-dashed border-primary-300/25" />
            <svg className="absolute inset-0 size-full" viewBox="0 0 500 500" role="presentation">
              <line className="signal-line" x1="250" y1="250" x2="92" y2="116" stroke="#67e8f9" strokeWidth="1.6" />
              <line className="signal-line" x1="250" y1="250" x2="402" y2="126" stroke="#67e8f9" strokeWidth="1.6" />
              <line className="signal-line" x1="250" y1="250" x2="104" y2="382" stroke="#67e8f9" strokeWidth="1.6" />
              <line className="signal-line" x1="250" y1="250" x2="394" y2="374" stroke="#67e8f9" strokeWidth="1.6" />
              <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(103, 232, 249, 0.22)" strokeWidth="1" />
              <circle cx="250" cy="250" r="188" fill="none" stroke="rgba(103, 232, 249, 0.13)" strokeWidth="1" />
            </svg>

            <motion.div
              className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-primary-200/30 bg-navy-900/90 shadow-glow backdrop-blur-xl sm:size-44"
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-3 rounded-md border border-white/10" />
              <img src="/logo.jpg" alt="DABH Engineering Logo" className="size-16 rounded-md object-contain sm:size-20" />
              <Cpu className="absolute bottom-5 right-5 size-6 text-primary-100/80" />
              <LockKeyhole className="absolute left-5 top-5 size-6 text-primary-100/80" />
            </motion.div>

            {heroNodes.map((Icon, index) => (
              <motion.div
                key={Icon.displayName ?? index}
                className={cn(
                  'absolute flex size-16 items-center justify-center rounded-md border border-primary-200/25 bg-white/10 text-primary-100 shadow-glow backdrop-blur-xl sm:size-20',
                  nodePositions[index],
                )}
                animate={reducedMotion ? undefined : { y: [0, index % 2 === 0 ? -10 : 10, 0] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon className="size-7 sm:size-8" strokeWidth={1.8} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 grid gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-3 shadow-glow backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {trustKeys.map((key) => (
            <div key={key} className="flex items-center gap-3 rounded-md bg-white/[0.05] px-4 py-4">
              <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-primary-300" />
              <span className="text-sm font-semibold text-white">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}