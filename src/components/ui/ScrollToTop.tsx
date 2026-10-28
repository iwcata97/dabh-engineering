import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility() // Check on mount in case already scrolled

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={t('scroll.top')}
          title={t('scroll.top')}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-5 sm:right-6 z-40 flex size-11 sm:size-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-navy-950 shadow-lg backdrop-blur-md transition-colors hover:border-primary-400 hover:bg-white hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-white/15 dark:bg-navy-900/90 dark:text-white dark:shadow-glow dark:hover:border-primary-300/40 dark:hover:bg-navy-800 dark:hover:text-primary-300 cursor-pointer"
        >
          <ArrowUp className="size-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

