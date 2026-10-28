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
        <div className="flex min-h-16 items-center justify-between rounded-lg border border-white/30 bg-white/80 px-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/80 sm:px-4 xl:px-5">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 rounded-md py-2 pr-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            onClick={closeMenu}
            aria-label={t('header.homeLabel')}
          >
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-navy-950 shadow-glow shrink-0">
              <img src="/logo.jpg" alt="DABH Engineering Logo" className="size-full object-cover" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-navy-950 dark:text-white sm:text-base whitespace-nowrap">
                DABH Engineering
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {t('header.subtitle')}
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-0.5 xl:gap-1 lg:flex shrink min-w-0"
            aria-label={t('header.mainNav')}
          >
            {navHrefs.map((href, idx) => {
              const isActive = activeSection === href

              return (
                <a
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-md px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
                className="flex items-center gap-1.5 rounded-md px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold text-slate-700 whitespace-nowrap transition hover:bg-primary-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:text-slate-300 dark:hover:bg-primary-300/10 dark:hover:text-white"
              >
                <Camera className="size-3.5 xl:size-4 text-primary-600 dark:text-primary-300 shrink-0" />
                <span>{t('nav.gallery')}</span>
              </button>
            )}
            {onOpenCatalog && (
              <button
                type="button"
                onClick={onOpenCatalog}
                className="flex items-center gap-1.5 rounded-md px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold text-slate-700 whitespace-nowrap transition hover:bg-amber-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:text-slate-300 dark:hover:bg-amber-300/10 dark:hover:text-white"
              >
                <Package className="size-3.5 xl:size-4 text-amber-600 dark:text-amber-300 shrink-0" />
                <span>{t('nav.catalog')}</span>
              </button>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2 xl:gap-2.5 shrink-0 lg:flex">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={onToggleTheme} />
            <Button href="#contact" size="sm" icon={ArrowRight} className="whitespace-nowrap text-xs xl:text-sm">
              {t('nav.consultation')}
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={onToggleTheme} />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md border border-slate-200 bg-white text-navy-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              aria-label={isOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((currentState) => !currentState)}
            >
              {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
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
                          : 'text-slate-700 hover:bg-slate-100 hover:text-navy-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
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
                    className="flex items-center gap-2 rounded-md px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:text-slate-300 dark:hover:bg-primary-300/10 dark:hover:text-white"
                  >
                    <Camera className="size-4 text-primary-600 dark:text-primary-300" />
                    <span>{t('nav.gallery')}</span>
                  </button>
                )}
                {onOpenCatalog && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onOpenCatalog()
                    }}
                    className="flex items-center gap-2 rounded-md px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:text-slate-300 dark:hover:bg-amber-300/10 dark:hover:text-white"
                  >
                    <Package className="size-4 text-amber-600 dark:text-amber-300" />
                    <span>{t('nav.catalog')}</span>
                  </button>
                )}
                <div className="mt-2 border-t border-slate-200 pt-3 dark:border-white/10">
                  <Button href="#contact" className="w-full justify-center" icon={ArrowRight} onClick={closeMenu}>
                    {t('nav.requestConsultation')}
                  </Button>
                </div>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
