import { ShieldCheck } from 'lucide-react'
import { services } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              aria-label="DABH Engineering начало"
            >
                <span className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-navy-950 shadow-glow">
                  <img src="/logo.jpg" alt="DABH Engineering Logo" className="size-full object-cover" />
                </span>
              <span className="font-semibold">DABH Engineering</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Проектиране, изграждане и поддръжка на слаботокови системи за домове,
              бизнеси и обществени обекти.
            </p>
            <p className="mt-5 text-sm font-semibold text-primary-200">
              Слаботокови системи • Сигурност • Автоматизация
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase text-primary-200">Услуги</h2>
              <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                {services.map((service) => (
                  <li key={service.title}>
                    <a className="transition hover:text-primary-200" href="#services">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase text-primary-200">Контакт</h2>
              <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                <li>+359 876 150 800</li>
                <li>dabhengineering@gmail.com</li>
                <li>Област Плевен, България</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          © {year} DABH Engineering / ДАБХ Инженеринг. Всички права запазени.
        </div>
      </div>
    </footer>
  )
}