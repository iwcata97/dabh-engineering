import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Package,
  Tag,
  X,
  Check,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { products, type Product } from '../data/products'
import { useLanguage } from '../lib/i18n'

// ─── Translations Map ─────────────────────────────────────────────────────────

const ALL_CATEGORIES = 'ALL'

const categoryTranslations: Record<string, { bg: string; en: string }> = {
  'HD-TVI Камери 2MP (1080p)': {
    bg: 'HD-TVI Камери 2MP (1080p)',
    en: 'HD-TVI Cameras 2MP (1080p)',
  },
  'Еднопостови комплекти': {
    bg: 'Еднопостови комплекти',
    en: 'Single-Station Kits',
  },
}

const filterKeyTranslations: Record<string, { bg: string; en: string }> = {
  'Резолюция': { bg: 'Резолюция', en: 'Resolution' },
  'Тип': { bg: 'Тип', en: 'Type' },
  'Монтаж': { bg: 'Монтаж', en: 'Mounting' },
  'Аудио': { bg: 'Аудио', en: 'Audio' },
  'Обектив': { bg: 'Обектив', en: 'Lens' },
}

const filterValueTranslations: Record<string, { bg: string; en: string }> = {
  'Куполна': { bg: 'Куполна', en: 'Dome' },
  'Цилиндрична': { bg: 'Цилиндрична', en: 'Bullet' },
  'Външен': { bg: 'Външен', en: 'Outdoor' },
  'Вътрешен': { bg: 'Вътрешен', en: 'Indoor' },
  'Без аудио': { bg: 'Без аудио', en: 'No Audio' },
  'С микрофон': { bg: 'С микрофон', en: 'With Microphone' },
  'Фиксиран': { bg: 'Фиксиран', en: 'Fixed' },
  'Моторизиран': { bg: 'Моторизиран', en: 'Motorized' },
}

const productTranslations: Record<
  string,
  {
    titleEn: string
    shortDescEn: string
    fullDescEn?: string
    categoryEn: string
    tagsEn: string[]
  }
> = {
  'hikvision-ds-2ce56d0t-it3fc': {
    titleEn: '2MP Dome Camera – EXIR 40m',
    shortDescEn: 'HD-TVI dome camera (4 in 1), 2 megapixels, fixed 2.8 mm lens, EXIR up to 40 m, IP66.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Dome', 'IP66', 'EXIR 40m'],
  },
  'hikvision-ds-2ce78d0t-it3fs': {
    titleEn: '2MP Dome Camera – Built-in Mic, CoAx Audio',
    shortDescEn: 'HD-TVI dome camera (4 in 1), 2 megapixels, built-in mic, 3.6 mm lens, EXIR up to 40 m.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Dome', 'Microphone', 'CoAx Audio'],
  },
  'hikvision-ds-2ce76d0t-itmf': {
    titleEn: '2MP Dome Camera – EXIR 30m, Black Housing',
    shortDescEn: 'HD-TVI dome camera (4 in 1), 2 megapixels, 2.8 mm lens, EXIR up to 30 m, black housing.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Dome', 'IP67', 'Black Housing'],
  },
  'hikvision-ds-2ce16d0t-itfc': {
    titleEn: '2MP Bullet Camera – EXIR 30m',
    shortDescEn: 'HD-TVI bullet camera (4 in 1), 2 megapixels, fixed 2.8 mm lens, EXIR up to 30 m, IP67.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Bullet', 'IP67', 'EXIR 30m'],
  },
  'hikvision-ds-2ce16d0t-itfs': {
    titleEn: '2MP Bullet Camera – Built-in Mic, CoAx Audio',
    shortDescEn: 'HD-TVI bullet camera (4 in 1), 2 megapixels, built-in mic, 2.8 mm lens, EXIR up to 30 m.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Bullet', 'Microphone', 'CoAx Audio'],
  },
  'hikvision-ds-2ce17d0t-it5fc': {
    titleEn: '2MP Bullet Camera – EXIR 80m Long Range',
    shortDescEn: 'HD-TVI bullet camera (4 in 1), 2 megapixels, 3.6 mm lens, EXIR up to 80 m, IP67.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Bullet', 'EXIR 80m', 'Long Range'],
  },
  'hikvision-ds-2ce56d0t-it3zf': {
    titleEn: '2MP Dome Camera – Motorized Varifocal 2.7-13.5mm',
    shortDescEn: 'HD-TVI dome camera (4 in 1), 2 megapixels, motorized zoom 2.7-13.5 mm, EXIR up to 70 m.',
    categoryEn: 'HD-TVI Cameras 2MP (1080p)',
    tagsEn: ['Dome', 'Motorized Zoom', 'EXIR 70m'],
  },
  'hikvision-ds-kis613-s': {
    titleEn: 'Villa IP Video Intercom Kit – Stainless Steel',
    shortDescEn: 'Complete IP video intercom kit: stainless steel door station with camera and RFID, 7" touch monitor, PoE switch.',
    categoryEn: 'Single-Station Kits',
    tagsEn: ['IP Intercom', 'Touch Screen', 'Stainless Steel'],
  },
  'hikvision-ds-kis610-p': {
    titleEn: 'Villa IP Video Intercom Kit – Standard',
    shortDescEn: 'IP video intercom kit with door station, 7" indoor station and standard PoE power supply.',
    categoryEn: 'Single-Station Kits',
    tagsEn: ['IP Intercom', '7" Monitor', 'PoE'],
  },
  'hikvision-ds-kis602b': {
    titleEn: 'Modular IP Video Intercom Kit',
    shortDescEn: 'Modular 2-wire / IP video intercom kit with 2MP fisheye camera, 7" indoor touch station, and distributor.',
    categoryEn: 'Single-Station Kits',
    tagsEn: ['Modular', 'Fisheye', '2-Wire/IP'],
  },
  'hikvision-ds-kis603-pc': {
    titleEn: 'Villa IP Video Intercom Kit – Surface Mount',
    shortDescEn: 'IP video intercom kit: plastic surface door station with RFID, 7" indoor touch monitor, PoE.',
    categoryEn: 'Single-Station Kits',
    tagsEn: ['IP Intercom', 'RFID', 'PoE'],
  },
  'hikvision-ds-kis604-sc': {
    titleEn: 'Villa IP Video Intercom Kit – Metal Door Station',
    shortDescEn: 'High-end IP video intercom kit with metal alloy outdoor station, 7" touch monitor, mobile app unlock.',
    categoryEn: 'Single-Station Kits',
    tagsEn: ['IP Intercom', 'Metal Station', 'Mobile App'],
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductsCatalogModalProps {
  isOpen: boolean
  onClose: () => void
  initialProductId?: string
}

export function ProductsCatalogModal({ isOpen, onClose, initialProductId }: ProductsCatalogModalProps) {
  const { t, lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const prefersReduced = useReducedMotion()

  // Initialize product if passed via props
  useEffect(() => {
    if (isOpen && initialProductId && !detailProduct) {
      const product = products.find((p) => p.id === initialProductId)
      if (product) {
        setDetailProduct(product)
        setActiveCategory(product.category)
      }
    }
  }, [isOpen, initialProductId, detailProduct])

  // Sync detailed product state to URL
  useEffect(() => {
    if (!isOpen) return
    const url = new URL(window.location.href)
    if (detailProduct) {
      url.searchParams.set('product', detailProduct.id)
    } else {
      url.searchParams.delete('product')
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, '', url)
    }
  }, [detailProduct, isOpen])

  const rawCategories = Array.from(new Set(products.map((p) => p.category)))
  const categories = [ALL_CATEGORIES, ...rawCategories]

  // Clear filters when category changes
  useEffect(() => {
    setSelectedFilters({})
  }, [activeCategory])

  // Collect available filter options based on the active category
  const availableFilters = useMemo(() => {
    const filtersObj: Record<string, Set<string>> = {}

    const baseProducts =
      activeCategory === ALL_CATEGORIES
        ? products
        : products.filter((p) => p.category === activeCategory)

    baseProducts.forEach((p) => {
      if (p.filters) {
        Object.entries(p.filters).forEach(([key, value]) => {
          if (!filtersObj[key]) filtersObj[key] = new Set()
          filtersObj[key].add(value)
        })
      }
    })

    const result: Record<string, string[]> = {}
    Object.keys(filtersObj).forEach((key) => {
      result[key] = Array.from(filtersObj[key]).sort()
    })
    return result
  }, [activeCategory])

  // Filter products by category and selected sub-filters
  const filtered = useMemo(() => {
    let result =
      activeCategory === ALL_CATEGORIES
        ? products
        : products.filter((p) => p.category === activeCategory)

    Object.entries(selectedFilters).forEach(([filterKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter(
          (p) => p.filters && selectedValues.includes(p.filters[filterKey])
        )
      }
    })

    return result
  }, [activeCategory, selectedFilters])

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (acc, val) => acc + val.length,
    0
  )

  const toggleFilter = (key: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || []
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) }
      }
      return { ...prev, [key]: [...current, value] }
    })
  }

  const clearAllFilters = () => setSelectedFilters({})

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape to close detail or modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (detailProduct) setDetailProduct(null)
        else if (showMobileFilters) setShowMobileFilters(false)
        else onClose()
      }
    }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, detailProduct, showMobileFilters])

  const openDetail = useCallback((product: Product) => setDetailProduct(product), [])
  const closeDetail = useCallback(() => setDetailProduct(null), [])

  // Navigate between products in detail view
  const navigateDetail = useCallback(
    (direction: 'prev' | 'next') => {
      if (!detailProduct) return
      const currentIndex = filtered.findIndex((p) => p.id === detailProduct.id)
      if (currentIndex === -1) return
      const newIndex =
        direction === 'next'
          ? (currentIndex + 1) % filtered.length
          : (currentIndex - 1 + filtered.length) % filtered.length
      setDetailProduct(filtered[newIndex])
    },
    [detailProduct, filtered]
  )

  // Arrow keys in detail view
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!detailProduct) return
      if (e.key === 'ArrowRight') navigateDetail('next')
      if (e.key === 'ArrowLeft') navigateDetail('prev')
    }
    if (isOpen && detailProduct) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, detailProduct, navigateDetail])

  const getProductData = (p: Product) => {
    if (lang === 'en' && productTranslations[p.id]) {
      const trans = productTranslations[p.id]
      return {
        title: trans.titleEn,
        shortDescription: trans.shortDescEn,
        fullDescription: trans.fullDescEn ?? p.fullDescription,
        category: trans.categoryEn,
        tags: trans.tagsEn,
        price: p.price === 'Очаквайте скоро' ? t('catalog.comingSoon') : p.price,
      }
    }
    return {
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      category: p.category,
      tags: p.tags,
      price: p.price === 'Очаквайте скоро' ? t('catalog.comingSoon') : p.price,
    }
  }

  const getCategoryLabel = (cat: string) => {
    if (cat === ALL_CATEGORIES) return t('catalog.allCategories')
    if (categoryTranslations[cat]) {
      return lang === 'en' ? categoryTranslations[cat].en : categoryTranslations[cat].bg
    }
    return cat
  }

  const getFilterKeyLabel = (key: string) => {
    if (filterKeyTranslations[key]) {
      return lang === 'en' ? filterKeyTranslations[key].en : filterKeyTranslations[key].bg
    }
    return key
  }

  const getFilterValueLabel = (value: string) => {
    if (filterValueTranslations[value]) {
      return lang === 'en' ? filterValueTranslations[value].en : filterValueTranslations[value].bg
    }
    return value
  }

  // Reusable Filter Content
  const renderFilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy-950 dark:text-white">{t('catalog.filters')}</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            {t('catalog.clearFilters')}
          </button>
        )}
      </div>

      <div className="space-y-5">
        {Object.entries(availableFilters).map(([key, values]) => {
          if (values.length <= 1) return null

          return (
            <div key={key}>
              <h4 className="mb-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                {getFilterKeyLabel(key)}
              </h4>
              <div className="space-y-2">
                {values.map((value) => {
                  const isSelected = (selectedFilters[key] || []).includes(value)
                  return (
                    <label
                      key={value}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFilter(key, value)
                      }}
                      className="flex cursor-pointer items-center gap-2.5 group"
                    >
                      <div
                        className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                          isSelected
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'bg-white border-slate-300 group-hover:border-primary-400 text-transparent dark:bg-white/10 dark:border-white/20 dark:group-hover:border-primary-400'
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-navy-950 dark:text-slate-300 dark:group-hover:text-white transition-colors leading-tight">
                        {getFilterValueLabel(value)}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReduced ? { duration: 0.1 } : { duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 px-3 py-6 sm:px-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalog-modal-title"
        >
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={
              prefersReduced
                ? { duration: 0.12 }
                : { duration: 0.22, ease: 'easeOut' }
            }
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col rounded-3xl bg-slate-50 shadow-2xl overflow-hidden dark:bg-navy-950 dark:border dark:border-white/10 dark:shadow-glow"
          >
            {/* ── Header ── */}
            <div className="flex shrink-0 items-center justify-between gap-4 bg-navy-950 px-6 py-5 sm:px-8 dark:border-b dark:border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-primary-400">
                  <Package className="size-5 text-navy-950" />
                </span>
                <div className="min-w-0">
                  <h1
                    id="catalog-modal-title"
                    className="text-base font-bold text-white sm:text-lg truncate"
                  >
                    {t('catalog.title')}
                  </h1>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    {t('catalog.subtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={t('catalog.close')}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Category Filter & Mobile Actions ── */}
            <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-3 sm:px-8 flex items-center justify-between gap-4 dark:bg-graphite-900 dark:border-white/10">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0 pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      activeCategory === cat
                        ? 'bg-navy-950 text-white shadow-sm dark:bg-primary-500 dark:text-navy-950'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-950 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.12] dark:hover:text-white'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
                >
                  <Filter className="size-3.5" />
                  {t('catalog.filters')}
                  {activeFiltersCount > 0 && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-primary-500 text-[9px] text-white">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <span className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t('catalog.found')}: <strong className="text-navy-950 dark:text-white">{filtered.length}</strong>
                </span>
              </div>
            </div>

            {/* ── Main Content Area ── */}
            <div className="flex flex-1 min-h-0 bg-slate-50/50 dark:bg-navy-950/60">
              {/* ── Desktop Filters Sidebar ── */}
              <div className="hidden lg:block w-64 shrink-0 border-r border-slate-200 bg-white p-6 overflow-y-auto dark:border-white/10 dark:bg-graphite-900">
                {renderFilterPanel()}
              </div>

              {/* ── Products Grid ── */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((product) => {
                      const data = getProductData(product)
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          displayData={data}
                          viewDetailsText={t('catalog.viewDetails')}
                          onOpen={() => openDetail(product)}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 mb-4">
                      <Filter className="size-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-950 dark:text-white">{t('catalog.noProducts')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                      {t('catalog.noProductsHint')}
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-6 rounded-xl bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                    >
                      {t('catalog.clearAllFilters')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 dark:bg-graphite-900 dark:border-white/10">
              <p className="text-xs text-slate-500 text-center sm:text-left dark:text-slate-400">
                {t('catalog.footerText')}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {t('catalog.closeBtn')}
                </button>
                <button
                  onClick={() => {
                    onClose()
                    setTimeout(() => {
                      document
                        .getElementById('contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }, 200)
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800 dark:bg-primary-500 dark:text-navy-950 dark:hover:bg-primary-400"
                >
                  {t('catalog.inquiry')}
                  <ArrowRight className="size-3.5 text-primary-300 dark:text-navy-950" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Mobile Filters Slide-over ── */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[120] flex justify-end bg-navy-950/40 dark:bg-black/60 lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full max-w-xs h-full bg-white dark:bg-graphite-900 shadow-2xl flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950">
                    <h3 className="font-bold text-navy-950 dark:text-white">{t('catalog.filters')}</h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label={t('catalog.close')}
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5">
                    {renderFilterPanel()}
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950">
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:text-navy-950 dark:hover:bg-primary-400"
                    >
                      {t('catalog.showResults')} {filtered.length} {t('catalog.results')}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Product Detail View ── */}
          <AnimatePresence>
            {detailProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[130] flex items-center justify-center bg-black/92 px-4 py-8"
                onClick={closeDetail}
              >
                <motion.div
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative flex max-h-[90vh] max-w-4xl w-full flex-col overflow-hidden rounded-2xl bg-navy-950 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image */}
                  <div className="relative flex-1 overflow-hidden bg-black min-h-0">
                    <img
                      src={detailProduct.image}
                      alt={getProductData(detailProduct).title}
                      className="h-full max-h-[50vh] w-full object-contain"
                    />

                    {/* Prev / Next arrows */}
                    <button
                      onClick={() => navigateDetail('prev')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label={t('catalog.prevProduct')}
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={() => navigateDetail('next')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label={t('catalog.nextProduct')}
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    {/* Close detail */}
                    <button
                      onClick={closeDetail}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-xl bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label={t('catalog.closeBtn')}
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Info panel */}
                  {(() => {
                    const data = getProductData(detailProduct)
                    return (
                      <div className="shrink-0 p-5 sm:p-6 overflow-y-auto max-h-[40vh]">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-block rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-bold text-primary-300">
                            {data.category}
                          </span>
                          <span className="inline-block rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                            {detailProduct.brand}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                            <Clock className="size-3" />
                            {data.price}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white sm:text-lg">
                          {data.title}
                        </h3>
                        <p className="mt-1 text-xs font-mono text-slate-400">
                          {t('catalog.model')}: {detailProduct.model}
                        </p>
                        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                          {data.fullDescription}
                        </p>

                        {/* Specs */}
                        {detailProduct.specs && detailProduct.specs.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                              {t('catalog.mainSpecs')}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {detailProduct.specs.map((spec) => (
                                <div
                                  key={spec}
                                  className="flex items-center gap-2 text-xs text-slate-200"
                                >
                                  <span className="size-1.5 rounded-full bg-primary-400 shrink-0" />
                                  {spec}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {data.tags && data.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {data.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  displayData,
  viewDetailsText,
  onOpen,
}: {
  product: Product
  displayData: {
    title: string
    shortDescription: string
    fullDescription: string
    category: string
    tags?: string[]
    price: string
  }
  viewDetailsText: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-soft border border-slate-200/80 transition-shadow duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:bg-graphite-900 dark:border-white/10 dark:hover:border-primary-400/50 dark:hover:shadow-glow"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={displayData.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="eager"
          decoding="async"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-200 group-hover:bg-navy-950/25 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-navy-950 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-navy-950/90 dark:text-primary-300">
            <Package className="size-5" />
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 max-w-[calc(100%-24px)] truncate rounded-lg bg-navy-950/80 px-2.5 py-1 text-[11px] font-bold text-primary-300 backdrop-blur-sm border border-white/10">
          {displayData.category}
        </span>
        {/* Price badge */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold text-navy-950">
          <Clock className="size-3 shrink-0" />
          <span className="truncate">{displayData.price}</span>
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase dark:text-slate-400">
            {product.brand}
          </span>
          <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">{product.model}</span>
        </div>
        <h3 className="text-sm font-bold text-navy-950 leading-snug transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-300">
          {displayData.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 dark:text-slate-400">
          {displayData.shortDescription}
        </p>
        {displayData.tags && displayData.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {displayData.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-white/[0.06] dark:text-slate-300"
              >
                <Tag className="size-2.5" />
                {tag}
              </span>
            ))}
            {displayData.tags.length > 2 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400 dark:bg-white/[0.06] dark:text-slate-400">
                +{displayData.tags.length - 2}
              </span>
            )}
          </div>
        )}
        <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-primary-300">
          <span>{viewDetailsText}</span>
          <ChevronRight className="size-3.5" />
        </div>
      </div>
    </button>
  )
}
