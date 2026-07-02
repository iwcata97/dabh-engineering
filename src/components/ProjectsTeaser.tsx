import { ArrowRight, Camera, CheckCircle2, Sparkles } from 'lucide-react'

interface ProjectsTeaserProps {
  onOpenGallery: () => void
}

export function ProjectsTeaser({ onOpenGallery }: ProjectsTeaserProps) {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/60">
      <div className="container-shell relative z-10">
        <div className="overflow-hidden rounded-3xl bg-navy-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/10 relative">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-primary-300 backdrop-blur-md border border-white/15">
                <Sparkles className="size-3.5 text-primary-400 animate-pulse" />
                <span>Реално изпълнени обекти</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Реализирани обекти &ndash;{' '}
                <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-300 to-white">
                  Галерия от нашите монтажи
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Разгледайте реални снимки от обекти, изпълнени от нашия екип &ndash; видеонаблюдение,
                кабелна инфраструктура и слаботокови системи за различни типове обекти.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Видеонаблюдение и охранителни камери</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Кабелна инфраструктура и окабеляване</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Жилищни, офис и производствени обекти</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Галерията се допълва с нови обекти</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenGallery}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-primary-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  <Camera className="size-4 text-navy-950" />
                  <span>Галерия изпълнени обекти</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right visual preview column */}
            <div className="lg:col-span-5">
              <div
                onClick={onOpenGallery}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-900 shadow-2xl transition-all hover:border-primary-400/50 hover:scale-[1.02]"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/gallery/project-05.jpg"
                    alt="Монтаж на IP камери на складова база"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Видеонаблюдение &ndash; Складова база</p>
                      <p className="text-[11px] text-slate-300">Щракнете, за да видите всички обекти</p>
                    </div>
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition group-hover:bg-primary-500 group-hover:text-navy-950">
                      <Camera className="size-4" />
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
