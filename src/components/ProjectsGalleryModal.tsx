import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

// ─── Gallery Data ─────────────────────────────────────────────────────────────
// За да добавите нова снимка: добавете нов обект в масива по-долу.
// Поставете файла в папка /public/gallery/ и попълнете полетата.

export interface GalleryItem {
  id: string
  image: string           // път до файла в /public/gallery/
  title: string
  description: string
  category: string        // категория за показване на бадж
  tags?: string[]         // допълнителни тагове (незадължително)
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'project-01',
    image: '/gallery/project-01.jpg',
    title: 'Bullet камера на складова база',
    description:
      'Монтаж на IP bullet камера на ъгъла на метална склад сграда с пълно покритие на периметъра. Професионална инсталация с осигурен кабелен маршрут по конструкцията.',
    category: 'Видеонаблюдение',
    tags: ['IP камера', 'Складова база', 'Периметърна охрана'],
  },
  {
    id: 'project-02',
    image: '/gallery/project-02.jpg',
    title: 'PTZ dome камера – производствена сграда',
    description:
      'Монтаж на PTZ dome камера под бетонен надвес с чисто скрито кабелно трасе. Покрива широк ъгъл от производствената зона с 360° ротация.',
    category: 'Видеонаблюдение',
    tags: ['PTZ камера', 'Производствена сграда', 'Dome монтаж'],
  },
  {
    id: 'project-03',
    image: '/gallery/project-03.jpg',
    title: 'Кабелна инфраструктура – строителен етап',
    description:
      'Прокарване и организиране на слаботокови кабели в строителен обект по време на ремонт. Кабелите са оразмерени, наредени и закрепени преди измазване на стените.',
    category: 'Кабелни системи',
    tags: ['Структурно окабеляване', 'Жилищен обект', 'Строителен етап'],
  },
  {
    id: 'project-04',
    image: '/gallery/project-04.jpg',
    title: 'Вградена разклонителна кутия – окабеляване на коридор',
    description:
      'Вграждане на разклонителна кутия в тухлена стена с точно маршрутизирани кабели по коридор. Изпълнено на строителен етап за безупречно крайно покритие.',
    category: 'Кабелни системи',
    tags: ['Разклонителна кутия', 'Вграждане', 'Жилищен обект'],
  },
  {
    id: 'project-05',
    image: '/gallery/project-05.jpg',
    title: 'Две камери – периметърна охрана на склад',
    description:
      'Двойна инсталация на IP камери на ъгъла на метална склад сграда за максимално покритие. Кабелите са водени по конструкцията с метална тръба за защита от атмосферни влияния.',
    category: 'Видеонаблюдение',
    tags: ['IP камери', 'Склад', 'Двоен монтаж', 'Периметърна охрана'],
  },
  {
    id: 'project-06',
    image: '/gallery/project-06.jpg',
    title: 'Hikvision видеодомофонен монитор',
    description:
      'Монтаж на 7" Hikvision видеодомофонен монитор с цветен дисплей и функция за отключване. Свързан към входна станция с камера за пълен визуален контрол на входа.',
    category: 'Домофони & Контрол на достъп',
    tags: ['Видеодомофон', 'Hikvision', 'Контрол на достъп'],
  },
  {
    id: 'project-07',
    image: '/gallery/project-07.jpg',
    title: 'Комуникационен шкаф XCOM с рутер – монтаж',
    description:
      'Монтаж на стенен комуникационен шкаф XCOM с двойна вентилация и TP-Link рутер. Всички кабелни трасета са изведени организирано в горната част на шкафа.',
    category: 'Структурни мрежи',
    tags: ['Комуникационен шкаф', 'XCOM', 'TP-Link', 'Рутер'],
  },
  {
    id: 'project-08',
    image: '/gallery/project-08.jpg',
    title: 'Hikvision входна станция с клавиатура и четец',
    description:
      'Вграждане на Hikvision входна станция с fisheye камера, четец за карти/чипове и PIN клавиатура. Монтирана на строителен етап преди завършване на фасадата.',
    category: 'Домофони & Контрол на достъп',
    tags: ['Входна станция', 'Hikvision', 'Четец карти', 'PIN клавиатура'],
  },
  {
    id: 'project-09',
    image: '/gallery/project-09.jpg',
    title: 'Вграждане на кутия за входна станция',
    description:
      'Прецизно вграждане на монтажна кутия за Hikvision входна домофонна станция в стена. Кабелите са наредени и подготвени за свързване към входната платка.',
    category: 'Домофони & Контрол на достъп',
    tags: ['Монтажна кутия', 'Вграждане', 'Домофонна система'],
  },
  {
    id: 'project-10',
    image: '/gallery/project-10.jpg',
    title: 'Комуникационен шкаф XCOM – вътрешен изглед',
    description:
      'Вътрешен изглед на монтиран комуникационен шкаф XCOM с организирани кабелни трасета и TP-Link рутер. Структурираното полагане осигурява лесна поддръжка и разширяване.',
    category: 'Структурни мрежи',
    tags: ['Комуникационен шкаф', 'XCOM', 'Структурно окабеляване'],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

interface ProjectsGalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

const ALL_CATEGORIES = 'Всички'

export function ProjectsGalleryModal({ isOpen, onClose }: ProjectsGalleryModalProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  // Respect system preference for reduced motion + treat software rendering as reduced motion
  const prefersReduced = useReducedMotion()

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(galleryItems.map((i) => i.category)))]

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape to close lightbox or modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null)
        else onClose()
      }
      if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null))
      }
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null))
      }
    }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, lightboxIndex, filtered.length])

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay: solid colour instead of backdrop-blur (no GPU needed)
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReduced ? { duration: 0.1 } : { duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 px-3 py-6 sm:px-6"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          {/* Panel: no scale transform (costly without GPU) */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={prefersReduced ? { duration: 0.12 } : { duration: 0.22, ease: 'easeOut' }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-3xl bg-slate-50 shadow-2xl overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex shrink-0 items-center justify-between gap-4 bg-navy-950 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400">
                  <Camera className="size-5 text-navy-950" />
                </span>
                <div className="min-w-0">
                  <h1
                    id="gallery-modal-title"
                    className="text-base font-bold text-white sm:text-lg truncate"
                  >
                    Галерия изпълнени обекти
                  </h1>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    Реални снимки от монтажи на ДАБХ Инженеринг
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Затвори галерията"
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
                      ({galleryItems.filter((i) => i.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
              <span className="ml-auto shrink-0 text-xs text-slate-400">
                {filtered.length} снимк{filtered.length === 1 ? 'а' : 'и'}
              </span>
            </div>

            {/* ── Gallery Grid (scrollable) ── */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              {/* Simple CSS opacity transition instead of AnimatePresence on the grid */}
              <div
                key={activeCategory}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((item, idx) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onOpen={() => openLightbox(idx)}
                  />
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500 text-center sm:text-left">
                Имате нужда от подобно решение? Свържете се с нас за безплатна консултация.
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
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }, 200)
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800"
                >
                  Заявете оглед
                  <ArrowRight className="size-3.5 text-primary-300" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Lightbox ── */}
          <AnimatePresence>
            {lightboxItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/92 px-4 py-8"
                onClick={closeLightbox}
              >
                {/* No scale animation on lightbox panel — just fade */}
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
                      src={lightboxItem.image}
                      alt={lightboxItem.title}
                      className="h-full max-h-[65vh] w-full object-contain"
                    />

                    {/* Prev / Next arrows — solid bg instead of backdrop-blur */}
                    <button
                      onClick={() =>
                        setLightboxIndex((p) =>
                          p !== null ? (p - 1 + filtered.length) % filtered.length : null
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Предишна снимка"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={() =>
                        setLightboxIndex((p) =>
                          p !== null ? (p + 1) % filtered.length : null
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Следваща снимка"
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    {/* Close lightbox */}
                    <button
                      onClick={closeLightbox}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-xl bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label="Затвори"
                    >
                      <X className="size-4" />
                    </button>

                    {/* Counter — solid bg instead of backdrop-blur */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                      {(lightboxIndex ?? 0) + 1} / {filtered.length}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="shrink-0 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="mb-2 inline-block rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-bold text-primary-300">
                          {lightboxItem.category}
                        </span>
                        <h3 className="text-base font-bold text-white sm:text-lg">
                          {lightboxItem.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                          {lightboxItem.description}
                        </p>
                      </div>
                    </div>
                    {lightboxItem.tags && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {lightboxItem.tags.map((tag) => (
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

// ─── Gallery Card ─────────────────────────────────────────────────────────────
// Pure CSS hover effects — no Framer Motion JS on each card (much lighter)

function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-soft border border-slate-200/80 transition-shadow duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Hover overlay — CSS only, no JS */}
        <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-200 group-hover:bg-navy-950/25 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-navy-950 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            <Camera className="size-5" />
          </span>
        </div>
        {/* Category badge — solid bg, no backdrop-blur */}
        <span className="absolute top-3 left-3 rounded-lg bg-navy-950/80 px-2.5 py-1 text-[11px] font-bold text-primary-300">
          {item.category}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-navy-950 leading-snug transition-colors group-hover:text-primary-600">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        )}
        <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span>Виж в пълен размер</span>
          <ChevronRight className="size-3.5" />
        </div>
      </div>
    </button>
  )
}
