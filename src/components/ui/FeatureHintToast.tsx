import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Globe, Moon, Sparkles, Sun, X } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import type { Theme } from '../../lib/useTheme'

const STORAGE_KEY = 'dabh_feature_hint_seen'

interface FeatureHintToastProps {
  theme: Theme
  onToggleTheme: () => void
}

export function FeatureHintToast({ theme, onToggleTheme }: FeatureHintToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (seen) return

      // Delay display slightly so visitor sees the hero first
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1600)

      return () => clearTimeout(timer)
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  // Auto-dismiss after 14 seconds if left untouched
  useEffect(() => {
    if (!isVisible) return
    const autoDismiss = setTimeout(() => {
      dismiss()
    }, 14000)

    return () => clearTimeout(autoDismiss)
  }, [isVisible])

  const dismiss = () => {
    setIsVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // LocalStorage unavailable
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          role="status"
          aria-live="polite"
          className="fixed top-20 right-3 sm:right-6 lg:right-8 z-40 w-[calc(100%-24px)] max-w-sm sm:w-96 rounded-2xl border border-primary-400/40 bg-white/95 p-4 shadow-2xl backdrop-blur-xl transition-colors dark:border-primary-400/30 dark:bg-navy-900/95 dark:shadow-glow"
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-2.5 py-0.5 text-[11px] font-bold text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
              <Sparkles className="size-3 text-primary-600 dark:text-primary-400" />
              {t('hint.badge')}
            </span>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={t('hint.close')}
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Title & Description */}
          <h3 className="mt-2 text-sm font-bold text-navy-950 dark:text-white">
            {t('hint.title')}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {t('hint.description')}
          </p>

          {/* Quick interactive actions */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary-400/40 dark:hover:bg-primary-500/10 dark:hover:text-primary-300"
            >
              <Globe className="size-3.5 text-primary-600 dark:text-primary-400" />
              <span>{lang === 'bg' ? 'English (EN)' : 'Български (БГ)'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary-400/40 dark:hover:bg-primary-500/10 dark:hover:text-primary-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="size-3.5 text-amber-400" />
                  <span>{t('hint.switchThemeLight')}</span>
                </>
              ) : (
                <>
                  <Moon className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{t('hint.switchThemeDark')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={dismiss}
              className="ml-auto inline-flex items-center gap-1 rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-navy-800 dark:bg-primary-500 dark:text-navy-950 dark:hover:bg-primary-400"
            >
              <Check className="size-3.5" />
              <span>{t('hint.dismiss')}</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

