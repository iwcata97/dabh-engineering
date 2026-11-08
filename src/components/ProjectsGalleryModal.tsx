import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useLanguage } from '../lib/i18n'

// ─── Gallery Data ─────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string
  image: string
  title: string
  description: string
  category: string
  tags?: string[]
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

const galleryItemTranslations: Record<
  string,
  {
    titleEn: string
    descriptionEn: string
    categoryEn: string
    tagsEn: string[]
  }
> = {
  'project-01': {
    titleEn: 'Bullet Camera on Warehouse',
    descriptionEn:
      'IP bullet camera installation at the corner of a metal warehouse building with complete perimeter coverage. Professional installation with secured cable pathway along the structure.',
    categoryEn: 'CCTV & Security',
    tagsEn: ['IP Camera', 'Warehouse', 'Perimeter Security'],
  },
  'project-02': {
    titleEn: 'PTZ Dome Camera – Industrial Facility',
    descriptionEn:
      'PTZ dome camera installation under a concrete overhang with cleanly concealed cabling. Covers wide-angle production area with 360° rotation.',
    categoryEn: 'CCTV & Security',
    tagsEn: ['PTZ Camera', 'Industrial Facility', 'Dome Mount'],
  },
  'project-03': {
    titleEn: 'Cable Infrastructure – Construction Stage',
    descriptionEn:
      'Routing and organizing low-voltage cables in a building under renovation. Cables sized, bundled and secured prior to plastering.',
    categoryEn: 'Cabling Systems',
    tagsEn: ['Structured Cabling', 'Residential Site', 'Construction Stage'],
  },
  'project-04': {
    titleEn: 'Recessed Junction Box – Corridor Wiring',
    descriptionEn:
      'Recessed junction box installation in brick wall with neatly routed corridor cables. Executed during construction for a seamless finish.',
    categoryEn: 'Cabling Systems',
    tagsEn: ['Junction Box', 'Recessed Mounting', 'Residential Site'],
  },
  'project-05': {
    titleEn: 'Dual Cameras – Warehouse Perimeter Security',
    descriptionEn:
      'Dual IP camera setup on metal warehouse corner for maximum angle coverage. Cables routed through metal conduit for weather protection.',
    categoryEn: 'CCTV & Security',
    tagsEn: ['IP Cameras', 'Warehouse', 'Dual Mount', 'Perimeter Security'],
  },
  'project-06': {
    titleEn: 'Hikvision Video Intercom Monitor',
    descriptionEn:
      'Installation of 7" Hikvision color video intercom monitor with door unlock capability. Connected to camera outdoor station for full visual entry control.',
    categoryEn: 'Intercoms & Access Control',
    tagsEn: ['Video Intercom', 'Hikvision', 'Access Control'],
  },
  'project-07': {
    titleEn: 'XCOM Rack Cabinet with Router – Installation',
    descriptionEn:
      'Wall-mounted XCOM rack cabinet installation with dual ventilation and TP-Link router. All cable runs neatly terminated at the top.',
    categoryEn: 'Structured Networks',
    tagsEn: ['Rack Cabinet', 'XCOM', 'TP-Link', 'Router'],
  },
  'project-08': {
    titleEn: 'Hikvision Door Station with Keypad & Card Reader',
    descriptionEn:
      'Flush-mount Hikvision outdoor station with fisheye camera, RFID card/tag reader and PIN keypad. Mounted during construction before facade completion.',
    categoryEn: 'Intercoms & Access Control',
    tagsEn: ['Door Station', 'Hikvision', 'Card Reader', 'PIN Keypad'],
  },
  'project-09': {
    titleEn: 'Flush-Mount Box for Door Station',
    descriptionEn:
      'Precise embedding of mounting enclosure for Hikvision video intercom outdoor station into masonry. Cables pre-routed and prepped for termination.',
    categoryEn: 'Intercoms & Access Control',
    tagsEn: ['Enclosure Box', 'Flush-Mount', 'Intercom System'],
  },
  'project-10': {
    titleEn: 'XCOM Rack Cabinet – Internal Layout',
    descriptionEn:
      'Internal view of installed XCOM communication cabinet with organized cabling and TP-Link router. Structured layout ensures easy maintenance and expansion.',
    categoryEn: 'Structured Networks',
    tagsEn: ['Rack Cabinet', 'XCOM', 'Structured Cabling'],
  },
}

const categoryTranslations: Record<string, { bg: string; en: string }> = {
  'Видеонаблюдение': { bg: 'Видеонаблюдение', en: 'CCTV & Security' },
  'Кабелни системи': { bg: 'Кабелни системи', en: 'Cabling Systems' },
  'Домофони & Контрол на достъп': { bg: 'Домофони & Контрол на достъп', en: 'Intercoms & Access Control' },
  'Структурни мрежи': { bg: 'Структурни мрежи', en: 'Structured Networks' },
}

interface ProjectsGalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

const ALL_CATEGORIES = 'ALL'

export function ProjectsGalleryModal({ isOpen, onClose }: ProjectsGalleryModalProps) {
  const { t, lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()

  const rawCategories = Array.from(new Set(galleryItems.map((i) => i.category)))
  const categories = [ALL_CATEGORIES, ...rawCategories]

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
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

  const getItemData = (item: GalleryItem) => {
    if (lang === 'en' && galleryItemTranslations[item.id]) {
      const trans = galleryItemTranslations[item.id]
      return {
        title: trans.titleEn,
        description: trans.descriptionEn,
        category: trans.categoryEn,
        tags: trans.tagsEn,
      }
    }
    return {
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags,
    }
  }

  const getCategoryLabel = (cat: string) => {
    if (cat === ALL_CATEGORIES) return t('gallery.allCategories')
    if (categoryTranslations[cat]) {
      return lang === 'en' ? categoryTranslations[cat].en : categoryTranslations[cat].bg
    }
    return cat
  }

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
          aria-labelledby="gallery-modal-title"
        >
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={prefersReduced ? { duration: 0.12 } : { duration: 0.22, ease: 'easeOut' }}
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col rounded-3xl bg-slate-50 shadow-2xl overflow-hidden dark:bg-navy-950 dark:border dark:border-white/10 dark:shadow-glow"
          >
            {/* ── Header ── */}
            <div className="flex shrink-0 items-center justify-between gap-4 bg-navy-950 px-6 py-5 sm:px-8 dark:border-b dark:border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-cyan-400">
                  <Camera className="size-5 text-navy-950" />
                </span>
                <div className="min-w-0">
                  <h1
                    id="gallery-modal-title"
                    className="text-base font-bold text-white sm:text-lg truncate"
                  >
                    {t('gallery.title')}
                  </h1>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    {t('gallery.subtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={t('gallery.close')}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Category Filter ── */}
            <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-3 sm:px-8 flex items-center gap-2 overflow-x-auto dark:bg-graphite-900 dark:border-white/10">
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
                  {cat !== ALL_CATEGORIES && (
                    <span className="ml-1.5 text-[10px] opacity-60">
                      ({galleryItems.filter((i) => i.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
              <span className="ml-auto shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {filtered.length} {filtered.length === 1 ? t('gallery.photoSingular') : t('gallery.photoPlural')}
              </span>
            </div>

            {/* ── Gallery Grid (scrollable) ── */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 dark:bg-navy-950/60">
              <div
                key={activeCategory}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((item, idx) => {
                  const data = getItemData(item)
                  return (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      displayData={data}
                      viewFullText={t('gallery.viewFull')}
                      onOpen={() => openLightbox(idx)}
                    />
                  )
                })}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 dark:bg-graphite-900 dark:border-white/10">
              <p className="text-xs text-slate-500 text-center sm:text-left dark:text-slate-400">
                {t('gallery.footerText')}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {t('gallery.closeBtn')}
                </button>
                <button
                  onClick={() => {
                    onClose()
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }, 200)
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800 dark:bg-primary-500 dark:text-navy-950 dark:hover:bg-primary-400"
                >
                  {t('gallery.requestVisit')}
                  <ArrowRight className="size-3.5 text-primary-300 dark:text-navy-950" />
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
                      alt={getItemData(lightboxItem).title}
                      className="h-full max-h-[65vh] w-full object-contain"
                    />

                    {/* Prev / Next arrows */}
                    <button
                      onClick={() =>
                        setLightboxIndex((p) =>
                          p !== null ? (p - 1 + filtered.length) % filtered.length : null
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label={t('gallery.prevPhoto')}
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
                      aria-label={t('gallery.nextPhoto')}
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    {/* Close lightbox */}
                    <button
                      onClick={closeLightbox}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-xl bg-black/70 text-white transition-colors hover:bg-black/90"
                      aria-label={t('gallery.closeBtn')}
                    >
                      <X className="size-4" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                      {(lightboxIndex ?? 0) + 1} / {filtered.length}
                    </div>
                  </div>

                  {/* Info panel */}
                  {(() => {
                    const data = getItemData(lightboxItem)
                    return (
                      <div className="shrink-0 p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="mb-2 inline-block rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-bold text-primary-300">
                              {data.category}
                            </span>
                            <h3 className="text-base font-bold text-white sm:text-lg">
                              {data.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                              {data.description}
                            </p>
                          </div>
                        </div>
                        {data.tags && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
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

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({
  item,
  displayData,
  viewFullText,
  onOpen,
}: {
  item: GalleryItem
  displayData: { title: string; description: string; category: string; tags?: string[] }
  viewFullText: string
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
          src={item.image}
          alt={displayData.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="eager"
          decoding="async"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-200 group-hover:bg-navy-950/25 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-navy-950 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-navy-950/90 dark:text-primary-300">
            <Camera className="size-5" />
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-lg bg-navy-950/80 px-2.5 py-1 text-[11px] font-bold text-primary-300 backdrop-blur-sm border border-white/10">
          {displayData.category}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-navy-950 leading-snug transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-300">
          {displayData.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 dark:text-slate-400">
          {displayData.description}
        </p>
        {displayData.tags && displayData.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {displayData.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-white/[0.06] dark:text-slate-300"
              >
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
          <span>{viewFullText}</span>
          <ChevronRight className="size-3.5" />
        </div>
      </div>
    </button>
  )
}
