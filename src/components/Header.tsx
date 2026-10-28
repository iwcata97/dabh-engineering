import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera, Menu, Package, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../lib/i18n'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'
import { LanguageToggle } from './ui/LanguageToggle'
import { ThemeToggle } from './ui/ThemeToggle'

interface HeaderProps {
  onOpenGallery?: () => void
  onOpenCatalog?: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const navHrefs = ['#home', '#services', '#process', '#products', '#about', '#contact']
const navLabelKeys = [
  'nav.home',
  'nav.services',
  'nav.process',
  'nav.products',
  'nav.about',
  'nav.contact',
]

export function Header({ onOpenGallery, onOpenCatalog, theme, onToggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    navHrefs.forEach((href) => {
      const id = href.substring(1)
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="container-shell">
        <div className="flex min-h-16 items-center justify-between rounded-lg border border-white/30 bg-white/80 px-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/80 sm:px-5">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-md py-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            onClick={closeMenu}
            aria-label={t('header.homeLabel')}
          >
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-navy-950 shadow-glow">
              <img src="/logo.jpg" alt="DABH Engineering Logo" className="size-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold text-navy-950 dark:text-white sm:text-base">DABH Engineering</span>
              <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{t('header.subtitle')}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={t('header.mainNav')}>
            {navHrefs.map((href, idx) => {
              const isActive = activeSection === href

              return (
                <a
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-300/10 dark:text-primary-300'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-navy-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  )}
                >
                  {t(navLabelKeys[idx])}
                </a>
              )
            })}
            {onOpenGallery && (
              <button
                type="button"
                onClick={onOpenGallery}
                className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:text-slate-300 dark:hover:bg-primary-300/10 dark:hover:text-white"
              >
                <Camera className="size-4 text-primary-600 dark:text-primary-300" />
                <span>{t('nav.gallery')}</span>
              </button>
            )}
            {onOpenCatalog && (
              <button
                type="button"
                onClick={onOpenCatalog}
                className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:text-slate-300 dark:hover:bg-amber-300/10 dark:hover:text-white"
              >
                <Package className="size-4 text-amber-600 dark:text-amber-300" />
                <span>{t('nav.catalog')}</span>
              </button>
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={onToggleTheme} />
            <Button href="#contact" size="sm" icon={ArrowRight}>
              {t('nav.consultation')}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={onToggleTheme} />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-slate-200 bg-white text-navy-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              aria-label={isOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((currentState) => !currentState)}
            >
              {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.nav
              aria-label={t('header.mobileNav')}
              className="mt-2 overflow-hidden rounded-lg border border-white/30 bg-white/95 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/95 lg:hidden"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid gap-1 p-3">
                {navHrefs.map((href, idx) => {
                  const isActive = activeSection === href

                  return (
                    <a
                      key={href}
                      href={href}
                      className={cn(
                        'rounded-md px-4 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                        isActive
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-300/10 dark:text-primary-300'
                          : 'text-slate-700 hover:bg-primary-50 hover:text-navy-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                      )}
                      onClick={closeMenu}
                    >
                      {t(navLabelKeys[idx])}
                    </a>
                  )
                })}
                {onOpenGallery && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onOpenGallery()
                    }}
                    className="flex items-center justify-between rounded-md px-4 py-3 text-base font-semibold text-slate-700 hover:bg-primary-50 hover:text-navy-950 transition text-left dark:text-slate-300 dark:hover:bg-primary-300/10 dark:hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Camera className="size-4 text-primary-600 dark:text-primary-300" />
                      <span>{t('header.galleryObjects')}</span>
                    </span>
                  </button>
                )}
                {onOpenCatalog && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onOpenCatalog()
                    }}
                    className="flex items-center justify-between rounded-md px-4 py-3 text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-navy-950 transition text-left dark:text-slate-300 dark:hover:bg-amber-300/10 dark:hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="size-4 text-amber-600 dark:text-amber-300" />
                      <span>{t('header.catalogProducts')}</span>
                    </span>
                  </button>
                )}
                <Button href="#contact" className="mt-2 w-full" icon={ArrowRight} onClick={closeMenu}>
                  {t('nav.requestConsultation')}
                </Button>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-white via-white/75 to-transparent dark:from-navy-950 dark:via-navy-950/75',
          isOpen && 'h-80',
        )}
        aria-hidden="true"
      />
    </header>
  )
}