import { useLanguage } from '../../lib/i18n'
import { cn } from '../../lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('langToggle.ariaLabel')}
      className={cn(
        'relative inline-flex h-10 items-center justify-center rounded-md border px-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        lang === 'bg'
          ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-navy-950 dark:border-white/15 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15 dark:hover:text-white'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-navy-950 dark:border-white/15 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15 dark:hover:text-white',
        className,
      )}
    >
      <span className="relative flex items-center gap-1">
        <span
          className={cn(
            'transition-all duration-300',
            lang === 'bg' ? 'opacity-100' : 'opacity-100',
          )}
        >
          {t('langToggle.label')}
        </span>
      </span>
    </button>
  )
}
