import { AnimatePresence, motion } from 'framer-motion'
import { Shield, X } from 'lucide-react'
import { useEffect } from 'react'

interface PrivacyPolicyProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 px-4 py-8 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative flex w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]"
          >
            {/* Header – never scrolls */}
            <div className="flex shrink-0 items-center justify-between rounded-t-2xl bg-navy-950 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-500/20">
                  <Shield className="size-5 text-primary-300" />
                </span>
                <h1
                  id="privacy-policy-title"
                  className="text-base font-semibold text-white sm:text-lg"
                >
                  Политика за поверителност и бисквитки
                </h1>
              </div>
              <button
                onClick={onClose}
                aria-label="Затвори"
                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content – scrolls independently */}
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 text-slate-700 text-sm leading-7">

              <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-6">
                Последна актуализация: {new Date().getFullYear()} г.
              </p>

              <p className="mb-8 text-base text-slate-600 leading-relaxed">
                Настоящата политика обяснява как <strong className="text-navy-950">"ДАБХ Инженеринг" ЕООД</strong> събира,
                обработва и защитава вашите лични данни, както и как използваме "бисквитки" (cookies) на нашия уебсайт.
              </p>

              {/* Section 1 */}
              <Section number="1" title="Кои сме ние?">
                <p>
                  Администратор на лични данни е <strong className="text-navy-950">"ДАБХ Инженеринг" ЕООД</strong>,
                  ЕИК <strong className="text-navy-950">208163364</strong>, със седалище и адрес на управление:
                  гр. Плевен, ул. Асен Халачев 16. При въпроси можете да се свържете с нас на имейл:{' '}
                  <a href="mailto:dabhengineering.eu@gmail.com" className="text-primary-600 hover:underline font-medium">
                    dabhengineering.eu@gmail.com
                  </a>{' '}
                  или на телефон:{' '}
                  <a href="tel:+359876150800" className="text-primary-600 hover:underline font-medium">
                    +359 876 150 800
                  </a>.
                </p>
              </Section>

              {/* Divider */}
              <PartDivider label="ЧАСТ I: ЗАЩИТА НА ЛИЧНИТЕ ДАННИ" />

              {/* Section 2 */}
              <Section number="2" title="Какви данни събираме и защо?">
                <p className="mb-3">
                  Чрез контактната форма на нашия уебсайт ние събираме само данните, които вие доброволно ни
                  предоставяте (имена, телефон, имейл и текст на запитването). Ние ги обработваме единствено с цел:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    'Да отговорим на вашето запитване;',
                    'Да изготвим оферта за изграждане и поддръжка на слаботокови системи;',
                    'Да осъществим комуникация във връзка с изпълнение на услуги.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Section 3 */}
              <Section number="3" title="Споделяне и съхранение на данните">
                <p>
                  Вашите данни се пазят строго конфиденциално и не се продават или споделят с трети страни за
                  маркетинг. Съхраняваме запитванията до приключване на комуникацията по тях или до изтичане на
                  законовите срокове, ако отношенията ни прераснат в договорни.
                </p>
              </Section>

              {/* Section 4 */}
              <Section number="4" title="Вашите права (GDPR)">
                <p>
                  Вие имате право по всяко време да поискате достъп, корекция или изтриване ("правото да бъдеш
                  забравен") на вашите лични данни, както и да оттеглите съгласието си за тяхната обработка, като
                  ни пишете на посочения имейл адрес.
                </p>
              </Section>

              {/* Divider */}
              <PartDivider label="ЧАСТ II: ПОЛИТИКА ЗА БИСКВИТКИ (COOKIES)" />

              {/* Section 5 */}
              <Section number="5" title="Какво представляват бисквитките?">
                <p>
                  Бисквитките са малки текстови файлове, които се запазват на вашето устройство при посещение на
                  сайта. Те помагат за правилното му функциониране и запомнят вашите предпочитания.
                </p>
              </Section>

              {/* Section 6 */}
              <Section number="6" title="Какви бисквитки използваме?">
                <div className="space-y-4">
                  <CookieCard
                    title="Строго необходими бисквитки"
                    description="Задължителни за функционирането на сайта. Те не събират лична информация за маркетинг."
                    color="emerald"
                  />
                  <CookieCard
                    title="Функционални бисквитки"
                    description="Запомнят вашите избори на сайта."
                    color="blue"
                  />
                  <CookieCard
                    title="Аналитични бисквитки"
                    description="Помагат ни да събираме анонимна статистика за посещаемостта, за да подобряваме потребителското изживяване."
                    color="primary"
                  />
                </div>
              </Section>

              {/* Section 7 */}
              <Section number="7" title="Управление на бисквитките">
                <p>
                  Можете да контролирате, блокирате или изтривате бисквитките чрез настройките на вашия браузър
                  (Chrome, Firefox, Safari, Edge и др.). Имайте предвид, че блокирането на някои бисквитки може
                  да наруши нормалната работа на сайта.
                </p>
              </Section>
            </div>

            {/* Footer – never scrolls */}
            <div className="flex shrink-0 justify-end rounded-b-2xl border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-10">
              <button
                onClick={onClose}
                className="rounded-lg bg-navy-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Затвори
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Helper sub-components ────────────────────────────────────────────────────

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-navy-950">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
          {number}
        </span>
        {title}
      </h2>
      <div className="pl-8 text-slate-600">{children}</div>
    </div>
  )
}

function PartDivider({ label }: { label: string }) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-primary-600">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

function CookieCard({ title, description, color }: { title: string; description: string; color: 'emerald' | 'blue' | 'primary' }) {
  const colorMap = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    primary: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  }
  return (
    <div className={`rounded-lg border p-4 ${colorMap[color]}`}>
      <p className="font-semibold text-sm">{title}</p>
      <p className="mt-1 text-sm opacity-80">{description}</p>
    </div>
  )
}
