import { ArrowRight, CheckCircle2, Package, Sparkles } from 'lucide-react'
import { useLanguage } from '../lib/i18n'

interface ProductsTeaserProps {
  onOpenCatalog: () => void
}

export function ProductsTeaser({ onOpenCatalog }: ProductsTeaserProps) {
  const { t } = useLanguage()

  return (
    <section
      id="products"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/60 dark:from-navy-950 dark:via-graphite-900 dark:to-navy-950 dark:border-white/5"
    >
      <div className="container-shell relative z-10">
        <div className="overflow-hidden rounded-3xl bg-navy-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/10 relative">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 to-transparent" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/20 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15">
                <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
                <span>{t('productsTeaser.badge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t('productsTeaser.title1')} &ndash;{' '}
                <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-primary-300 to-white">
                  {t('productsTeaser.title2')}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {t('productsTeaser.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>{t('productsTeaser.check1')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>{t('productsTeaser.check2')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>{t('productsTeaser.check3')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>{t('productsTeaser.check4')}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenCatalog}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-primary-400 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Package className="size-4 text-navy-950" />
                  <span>{t('productsTeaser.cta')}</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right visual preview column */}
            <div className="lg:col-span-5">
              <div
                onClick={onOpenCatalog}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-900 shadow-2xl transition-all hover:border-amber-400/50 hover:scale-[1.02]"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/products/hdtvi-cameras.jpg"
                    alt={t('productsTeaser.imgAlt')}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{t('productsTeaser.previewTitle')}</p>
                      <p className="text-[11px] text-slate-300">{t('productsTeaser.previewSubtitle')}</p>
                    </div>
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:bg-amber-400 group-hover:text-navy-950">
                      <Package className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
