import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Package,
  Tag,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { products, type Product } from '../data/products'

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductsCatalogModalProps {
  isOpen: boolean
  onClose: () => void
}

const ALL_CATEGORIES = 'Всички'

export function ProductsCatalogModal({ isOpen, onClose }: ProductsCatalogModalProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const prefersReduced = useReducedMotion()

  const categories = [
    ALL_CATEGORIES,
    ...Array.from(new Set(products.map((p) => p.category))),
  ]

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? products
      : products.filter((p) => p.category === activeCategory)

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
        else onClose()
      }
    }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, detailProduct])

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
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-3xl bg-slate-50 shadow-2xl overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex shrink-0 items-center justify-between gap-4 bg-navy-950 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-primary-400">
                  <Package className="size-5 text-navy-950" />
                </span>
                <div className="min-w-0">
                  <h1
                    id="catalog-modal-title"
                    className="text-base font-bold text-white sm:text-lg truncate"
                  >
                    Каталог продукти
                  </h1>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    Артикули от ДАБХ Инженеринг — Hikvision
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Затвори каталога"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Category Filter ── */}
            <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-3 sm:px-8 flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-navy-950 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-950'
                  }`}
                >
                  {cat}
                  {cat !== ALL_CATEGORIES && (
                    <span className="ml-1.5 text-[10px] opacity-60">
                      ({products.filter((p) => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
              <span className="ml-auto shrink-0 text-xs text-slate-400">
                {filtered.length} артикул{filtered.length === 1 ? '' : 'а'}
              </span>
            </div>

            {/* ── Products Grid (scrollable) ── */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              <div
                key={activeCategory}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={() => openDetail(product)}
                  />
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500 text-center sm:text-left">
                Имате въпроси за някой продукт? Свържете се с нас за повече информация.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Затвори
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
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800"
                >
                  Запитване
                  <ArrowRight className="size-3.5 text-primary-300" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Product Detail View ── */}
          <AnimatePresence>
            {detailProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/92 px-4 py-8"
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
                      alt={detailProduct.title}
                      className="h-full max-h-[50vh] w-full object-contain"
                    />

                    {/* Prev / Next arrows */}
                    <button
                      onClick={() => navigateDetail('prev')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Предишен продукт"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={() => navigateDetail('next')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Следващ продукт"
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    {/* Close detail */}
                    <button
                      onClick={closeDetail}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-xl bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Затвори"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Info panel */}
                  <div className="shrink-0 p-5 sm:p-6 overflow-y-auto max-h-[40vh]">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-bold text-primary-300">
                        {detailProduct.category}
                      </span>
                      <span className="inline-block rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                        {detailProduct.brand}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                        <Clock className="size-3" />
                        {detailProduct.price}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {detailProduct.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-slate-400">
                      Модел: {detailProduct.model}
                    </p>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {detailProduct.fullDescription}
                    </p>

                    {/* Specs */}
                    {detailProduct.specs && detailProduct.specs.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                          Основни характеристики
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
                    {detailProduct.tags && detailProduct.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {detailProduct.tags.map((tag) => (
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
  onOpen,
}: {
  product: Product
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-soft border border-slate-200/80 transition-shadow duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-200 group-hover:bg-navy-950/25 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-navy-950 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            <Package className="size-5" />
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 max-w-[calc(100%-24px)] truncate rounded-lg bg-navy-950/80 px-2.5 py-1 text-[11px] font-bold text-primary-300">
          {product.category}
        </span>
        {/* Price badge */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold text-navy-950">
          <Clock className="size-3 shrink-0" />
          <span className="truncate">{product.price}</span>
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">
            {product.brand}
          </span>
          <span className="text-[10px] text-slate-300">•</span>
          <span className="text-[10px] font-mono text-slate-400">{product.model}</span>
        </div>
        <h3 className="text-sm font-bold text-navy-950 leading-snug transition-colors group-hover:text-primary-600">
          {product.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
              >
                <Tag className="size-2.5" />
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                +{product.tags.length - 2}
              </span>
            )}
          </div>
        )}
        <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span>Виж детайли</span>
          <ChevronRight className="size-3.5" />
        </div>
      </div>
    </button>
  )
}
