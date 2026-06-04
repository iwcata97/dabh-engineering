import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks } from '../data/content'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="container-shell">
        <div className="flex min-h-16 items-center justify-between rounded-lg border border-white/30 bg-white/80 px-3 shadow-soft backdrop-blur-xl sm:px-5">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-md py-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            onClick={closeMenu}
            aria-label="DABH Engineering начало"
          >
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-navy-950 shadow-glow">
              <img src="/logo.jpg" alt="DABH Engineering Logo" className="size-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold text-navy-950 sm:text-base">DABH Engineering</span>
              <span className="mt-1 text-xs font-medium text-slate-500">ДАБХ Инженеринг</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основна навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="#contact" size="sm" icon={ArrowRight}>
              Консултация
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-slate-200 bg-white text-navy-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 lg:hidden"
            aria-label={isOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((currentState) => !currentState)}
          >
            {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.nav
              aria-label="Мобилна навигация"
              className="mt-2 overflow-hidden rounded-lg border border-white/30 bg-white/95 shadow-soft backdrop-blur-xl lg:hidden"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid gap-1 p-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                ))}
                <Button href="#contact" className="mt-2 w-full" icon={ArrowRight} onClick={closeMenu}>
                  Заявете консултация
                </Button>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-white via-white/75 to-transparent',
          isOpen && 'h-80',
        )}
        aria-hidden="true"
      />
    </header>
  )
}