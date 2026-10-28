import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  toggle: () => void
  className?: string
}

export function ThemeToggle({ theme, toggle, className }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Превключи на светла тема' : 'Превключи на тъмна тема'}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        isDark
          ? 'border-white/15 bg-white/10 text-primary-300 hover:bg-white/15'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-navy-950',
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          'absolute size-5 transition-all duration-300',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          'absolute size-5 transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  )
}
