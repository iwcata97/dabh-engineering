import { ShieldCheck } from 'lucide-react'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
import { useState } from 'react'
import { services } from '../data/content'
import { PrivacyPolicy } from './PrivacyPolicy'

export function Footer() {
  const year = new Date().getFullYear()
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <>
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
              <div className="mt-6 flex items-center gap-4">
                <a href="https://www.facebook.com/profile.php?id=61572936225566" target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-md" aria-label="Facebook">
                  <FacebookIcon className="size-5" />
                </a>
                <a href="https://www.instagram.com/dabhengineering/" target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-md" aria-label="Instagram">
                  <InstagramIcon className="size-5" />
                </a>
              </div>
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
                  <li>dabhengineering.eu@gmail.com</li>
                  <li>Област Плевен, България</li>
                  <li>
                    <button
                      onClick={() => setIsPrivacyOpen(true)}
                      className="flex items-center gap-1.5 text-primary-300 transition hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded"
                    >
                      <ShieldCheck className="size-3.5 shrink-0" />
                      Защита на личните данни
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
            <p>© {year} DABH Engineering Ltd. / ДАБХ Инженеринг ЕООД. Всички права запазени.</p>
          </div>
        </div>
      </footer>

      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  )
}