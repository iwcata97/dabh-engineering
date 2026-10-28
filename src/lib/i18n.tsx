/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type Language = 'bg' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'dabh-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'bg') return stored
    } catch {
      // LocalStorage unavailable
    }
    return 'bg'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // LocalStorage unavailable
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'bg' ? 'en' : 'bg'))
  }, [])

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang]
      return dict[key] ?? key
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

// ─── Translation dictionary ──────────────────────────────────────────────────

const translations: Record<Language, Record<string, string>> = {
  bg: {
    // Navigation
    'nav.home': 'Начало',
    'nav.services': 'Услуги',
    'nav.process': 'Процес',
    'nav.products': 'Артикули',
    'nav.about': 'За нас',
    'nav.contact': 'Контакт',
    'nav.gallery': 'Галерия',
    'nav.catalog': 'Каталог',
    'nav.consultation': 'Консултация',
    'nav.requestConsultation': 'Заявете консултация',

    // Header
    'header.openMenu': 'Отвори менюто',
    'header.closeMenu': 'Затвори менюто',
    'header.mainNav': 'Основна навигация',
    'header.mobileNav': 'Мобилна навигация',
    'header.galleryObjects': 'Галерия обекти',
    'header.catalogProducts': 'Каталог продукти',
    'header.subtitle': 'ДАБХ Инженеринг',
    'header.homeLabel': 'DABH Engineering начало',

    // Hero
    'hero.badge': 'Слаботокови системи за реални обекти',
    'hero.title': 'Сигурност, автоматизация и слаботокови системи за модерни пространства.',
    'hero.description': 'Проектиране, изграждане и поддръжка на видеонаблюдение, контрол на достъпа, сградна автоматизация и структурни кабелни системи за домове и бизнес обекти.',
    'hero.ctaConsultation': 'Заявете консултация',
    'hero.ctaServices': 'Вижте услугите',
    'hero.ctaCatalog': 'Разгледайте каталога',
    'hero.trust1': 'Комплексни решения',
    'hero.trust2': 'Индивидуален подход',
    'hero.trust3': 'Поддръжка след изграждане',
    'hero.trust4': 'За домове и бизнеси',

    // Services
    'services.eyebrow': 'Услуги',
    'services.title': 'Комплексни решения за сигурност, контрол и свързаност',
    'services.description': 'ДАБХ Инженеринг изгражда слаботокови инсталации, които работят като една ясна система, от първоначалния проект до настройката и последващата поддръжка.',
    'services.s1.title': 'Системи за сигурност и видеонаблюдение',
    'services.s1.description': 'Цялостно проектиране, изграждане и поддръжка на системи за видеонаблюдение и охрана на сгради с търговско, жилищно, обществено или индустриално предназначение.',
    'services.s1.b1': 'IP и аналогово видеонаблюдение',
    'services.s1.b2': 'Камери, записващи устройства и мониторинг',
    'services.s1.b3': 'Повишена сигурност и контрол',
    'services.s1.b4': 'Поддръжка и настройка',
    'services.s2.title': 'Контрол на достъпа, видеофони и аудиодомофони',
    'services.s2.description': 'Системи за контрол на достъпа с карти, чипове, кодове, биометрични данни и модерни домофонни решения.',
    'services.s2.b1': 'Контролирани входни зони',
    'services.s2.b2': 'Видеодомофонни системи',
    'services.s2.b3': 'Аудиодомофонни системи',
    'services.s2.b4': 'Решения за жилища, офиси и складови бази',
    'services.s3.title': 'Сградна автоматизация и умен дом',
    'services.s3.description': 'Интегрирани технологии за управление на дома или офиса през мобилни приложения и интелигентни интерфейси.',
    'services.s3.b1': 'Управление на осветление',
    'services.s3.b2': 'Управление на отопление и климатизация',
    'services.s3.b3': 'Енергийна ефективност',
    'services.s3.b4': 'Комфорт, сигурност и дистанционен контрол',
    'services.s4.title': 'Структурни кабелни системи',
    'services.s4.description': 'Изграждане на надеждна вътрешна мрежа чрез медни и оптични трасета, комуникационни шкафове и професионално аранжиране.',
    'services.s4.b1': 'LAN инфраструктура',
    'services.s4.b2': 'Медни и оптични мрежи',
    'services.s4.b3': 'Комуникационни шкафове',
    'services.s4.b4': 'Интернет, телевизия и телефония',
    'services.s5.title': 'Пожароизвестителни системи',
    'services.s5.description': 'Проектиране, изграждане и поддръжка на надеждни пожароизвестителни системи за ранно откриване на пожари и осигуряване на безопасност.',
    'services.s5.b1': 'Конвенционални и адресируеми системи',
    'services.s5.b2': 'Детектори за дим, топлина и въглероден оксид',
    'services.s5.b3': 'Оповестителни и евакуационни системи',
    'services.s5.b4': 'Профилактика и абонаментна поддръжка',

    // Process
    'process.eyebrow': 'Процес',
    'process.title': 'От първия разговор до надеждна работеща система',
    'process.description': 'Процесът е структуриран, но гъвкав. Целта е техническото решение да пасне на обекта, хората, които го използват, и бъдещото развитие на инсталацията.',
    'process.step1.title': 'Консултация',
    'process.step1.description': 'Изясняваме целите, рисковете, бюджета и очакванията за обекта.',
    'process.step2.title': 'Оглед и анализ',
    'process.step2.description': 'Проверяваме трасета, зони, точки за контрол и технически ограничения.',
    'process.step3.title': 'Проектиране на решение',
    'process.step3.description': 'Подготвяме балансирана конфигурация с правилните устройства и топология.',
    'process.step4.title': 'Изграждане и настройка',
    'process.step4.description': 'Монтираме, аранжираме, конфигурираме и тестваме системата в реални условия.',
    'process.step5.title': 'Поддръжка и оптимизация',
    'process.step5.description': 'Осигуряваме настройки, профилактика и развитие според нуждите на обекта.',

    // Projects Teaser
    'projects.badge': 'Реално изпълнени обекти',
    'projects.title1': 'Реализирани обекти',
    'projects.title2': 'Галерия от нашите монтажи',
    'projects.description': 'Разгледайте реални снимки от обекти, изпълнени от нашия екип – видеонаблюдение, кабелна инфраструктура и слаботокови системи за различни типове обекти.',
    'projects.check1': 'Видеонаблюдение и охранителни камери',
    'projects.check2': 'Кабелна инфраструктура и окабеляване',
    'projects.check3': 'Жилищни, офис и производствени обекти',
    'projects.check4': 'Галерията се допълва с нови обекти',
    'projects.cta': 'Галерия изпълнени обекти',
    'projects.previewTitle': 'Видеонаблюдение \u2013 Складова база',
    'projects.previewSubtitle': 'Щракнете, за да видите всички обекти',
    'projects.imgAlt': 'Монтаж на IP камери на складова база',

    // Products Teaser
    'productsTeaser.badge': 'Продукти и оборудване',
    'productsTeaser.title1': 'Артикули',
    'productsTeaser.title2': 'Продукти за сигурност и контрол',
    'productsTeaser.description': 'Разгледайте нашия каталог с охранителни камери, видеодомофонни комплекти и оборудване от водещи марки. Всички продукти са налични за поръчка с професионален монтаж.',
    'productsTeaser.check1': 'HD-TVI камери 2 мегапиксела (1080p)',
    'productsTeaser.check2': 'Еднопостови домофонни комплекти',
    'productsTeaser.check3': 'Hikvision оригинални продукти',
    'productsTeaser.check4': 'Каталогът се допълва с нови артикули',
    'productsTeaser.cta': 'Разгледай каталога',
    'productsTeaser.previewTitle': 'HD-TVI Камери & Домофонни системи',
    'productsTeaser.previewSubtitle': 'Щракнете, за да видите целия каталог',
    'productsTeaser.imgAlt': 'HD-TVI охранителни камери Hikvision',

    // Values / About
    'values.eyebrow': 'За нас',
    'values.title': 'Професионален партньор за слаботокови системи и автоматизация',
    'values.description': 'ДАБХ Инженеринг е компания, специализирана в изграждането и поддръжката на различни слаботокови инсталации. Подходът е индивидуален, иновативен и ориентиран към реалните нужди на клиента.',
    'values.v1.title': 'Професионализъм',
    'values.v1.description': 'Работим с ясна техническа логика, дисциплина при изпълнение и внимание към детайла.',
    'values.v2.title': 'Фокус върху клиента',
    'values.v2.description': 'Предлагаме решения според реалния обект, ежедневната употреба и приоритетите на клиента.',
    'values.v3.title': 'Иновативност',
    'values.v3.description': 'Използваме модерни технологии за по-добра свързаност, контрол и автоматизация.',
    'values.v4.title': 'Ефективност',
    'values.v4.description': 'Търсим правилния баланс между функционалност, бюджет, надеждност и бъдещо развитие.',
    'values.v5.title': 'Отговорност',
    'values.v5.description': 'Оставаме ангажирани след изграждането чрез поддръжка, профилактика и навременна реакция.',

    // Sectors
    'sectors.eyebrow': 'Приложение',
    'sectors.title': 'Решения за различни типове обекти',
    'sectors.description': 'Системите могат да бъдат планирани за ново строителство, обновяване на съществуващ обект или надграждане на вече работеща инфраструктура.',
    'sectors.s1': 'Домове и апартаменти',
    'sectors.s2': 'Офиси',
    'sectors.s3': 'Търговски обекти',
    'sectors.s4': 'Складови бази',
    'sectors.s5': 'Индустриални помещения',
    'sectors.s6': 'Обществени сгради',

    // CTA
    'cta.title': 'Имате обект, който се нуждае от сигурност, контрол или автоматизация?',
    'cta.description': 'Опишете нуждите си и ще подготвим подходящо решение според мащаба, бюджета и спецификата на обекта.',
    'cta.button': 'Свържете се с нас',

    // Contact
    'contact.eyebrow': 'Контакт',
    'contact.title': 'Заявете консултация за вашия обект',
    'contact.description': 'Попълнете кратката форма и опишете какъв тип система ви интересува. Ние ще се свържем с вас възможно най-скоро.',
    'contact.subtitle': 'Слаботокови системи, сигурност, автоматизация и мрежова инфраструктура.',
    'contact.location': 'Област Плевен, България',
    'contact.followUs': 'Последвайте ни',
    'contact.successMessage': 'Благодарим! Вашето запитване беше изпратено успешно. Ще се свържем с Вас скоро.',
    'contact.errorMessage': 'Възникна грешка при изпращането. Моля, опитайте отново по-късно или се свържете с нас по телефона.',
    'contact.labelName': 'Име',
    'contact.labelPhone': 'Телефон',
    'contact.labelEmail': 'Имейл',
    'contact.labelObjectType': 'Тип обект',
    'contact.labelService': 'Интересуваща услуга',
    'contact.labelMessage': 'Съобщение',
    'contact.placeholderName': 'Вашето име',
    'contact.placeholderPhone': '08... или +359...',
    'contact.placeholderMessage': 'Опишете обекта, нуждите и предпочитан срок.',
    'contact.selectDefault': 'Изберете',
    'contact.selectService': 'Изберете услуга',
    'contact.errorNameRequired': 'Моля, въведете име.',
    'contact.errorPhoneRequired': 'Моля, въведете телефон.',
    'contact.errorPhonePattern': 'Въведете валиден формат (напр. 08... или +359...).',
    'contact.errorEmailRequired': 'Моля, въведете имейл.',
    'contact.errorEmailPattern': 'Въведете валиден имейл.',
    'contact.errorObjectRequired': 'Изберете тип обект.',
    'contact.errorServiceRequired': 'Изберете услуга.',
    'contact.errorMessageRequired': 'Моля, добавете съобщение.',
    'contact.recaptchaLabel': 'Потвърдете, че не сте робот',
    'contact.recaptchaError': 'Моля, потвърдете, че не сте робот.',
    'contact.privacyText': 'Вашите данни са защитени. С изпращането на запитването се съгласявате с нашата',
    'contact.privacyLink': 'Политика за поверителност',
    'contact.submitLoading': 'Изпращане...',
    'contact.submitButton': 'Изпрати запитване',
    'contact.objectTypes.home': 'Дом',
    'contact.objectTypes.office': 'Офис',
    'contact.objectTypes.commercial': 'Търговски обект',
    'contact.objectTypes.warehouse': 'Склад',
    'contact.objectTypes.industrial': 'Индустриален обект',
    'contact.objectTypes.other': 'Друго',

    // Footer
    'footer.description': 'Проектиране, изграждане и поддръжка на слаботокови системи за домове, бизнеси и обществени обекти.',
    'footer.tagline': 'Слаботокови системи • Сигурност • Автоматизация',
    'footer.servicesTitle': 'Услуги',
    'footer.contactTitle': 'Контакт',
    'footer.privacy': 'Защита на личните данни',
    'footer.galleryObjects': 'Галерия обекти',
    'footer.catalogProducts': 'Каталог продукти',
    'footer.copyright': 'Всички права запазени.',

    // Cookie Consent
    'cookie.text': 'Използваме бисквитки, за да анализираме трафика на сайта и да подобрим вашето преживяване. Като кликнете върху „Приемам всички", вие се съгласявате с използването на бисквитки.',
    'cookie.decline': 'Отказвам',
    'cookie.accept': 'Приемам всички',

    // Theme Toggle
    'theme.light': 'Превключи на светла тема',
    'theme.dark': 'Превключи на тъмна тема',

    // Gallery Modal
    'gallery.title': 'Галерия изпълнени обекти',
    'gallery.subtitle': 'Реални снимки от монтажи на ДАБХ Инженеринг',
    'gallery.close': 'Затвори галерията',
    'gallery.allCategories': 'Всички',
    'gallery.photoSingular': 'снимка',
    'gallery.photoPlural': 'снимки',
    'gallery.footerText': 'Имате нужда от подобно решение? Свържете се с нас за безплатна консултация.',
    'gallery.closeBtn': 'Затвори',
    'gallery.requestVisit': 'Заявете оглед',
    'gallery.prevPhoto': 'Предишна снимка',
    'gallery.nextPhoto': 'Следваща снимка',
    'gallery.viewFull': 'Виж в пълен размер',

    // Catalog Modal
    'catalog.title': 'Каталог продукти',
    'catalog.subtitle': 'Артикули от ДАБХ Инженеринг — Hikvision',
    'catalog.close': 'Затвори каталога',
    'catalog.allCategories': 'Всички',
    'catalog.filters': 'Филтри',
    'catalog.clearFilters': 'Изчисти',
    'catalog.found': 'Намерени',
    'catalog.noProducts': 'Няма намерени продукти',
    'catalog.noProductsHint': 'Опитайте да промените филтрите или да изберете друга категория.',
    'catalog.clearAllFilters': 'Изчисти филтрите',
    'catalog.footerText': 'Имате въпроси за някой продукт? Свържете се с нас за повече информация.',
    'catalog.closeBtn': 'Затвори',
    'catalog.inquiry': 'Запитване',
    'catalog.showResults': 'Покажи',
    'catalog.results': 'резултата',
    'catalog.prevProduct': 'Предишен продукт',
    'catalog.nextProduct': 'Следващ продукт',
    'catalog.model': 'Модел',
    'catalog.mainSpecs': 'Основни характеристики',
    'catalog.viewDetails': 'Виж детайли',
    'catalog.comingSoon': 'Очаквайте скоро',

    // Privacy Policy
    'privacy.title': 'Политика за поверителност и бисквитки',
    'privacy.close': 'Затвори',
    'privacy.lastUpdate': 'Последна актуализация',
    'privacy.year': 'г.',
    'privacy.intro': 'Настоящата политика обяснява как',
    'privacy.introCompany': '"ДАБХ Инженеринг" ЕООД',
    'privacy.introEnd': 'събира, обработва и защитава вашите лични данни, както и как използваме "бисквитки" (cookies) на нашия уебсайт.',
    'privacy.section1.title': 'Кои сме ние?',
    'privacy.section1.text1': 'Администратор на лични данни е',
    'privacy.section1.text2': ', ЕИК',
    'privacy.section1.text3': ', със седалище и адрес на управление: гр. Плевен, ул. Асен Халачев 16. При въпроси можете да се свържете с нас на имейл:',
    'privacy.section1.text4': 'или на телефон:',
    'privacy.part1': 'ЧАСТ I: ЗАЩИТА НА ЛИЧНИТЕ ДАННИ',
    'privacy.section2.title': 'Какви данни събираме и защо?',
    'privacy.section2.text': 'Чрез контактната форма на нашия уебсайт ние събираме само данните, които вие доброволно ни предоставяте (имена, телефон, имейл и текст на запитването). Ние ги обработваме единствено с цел:',
    'privacy.section2.b1': 'Да отговорим на вашето запитване;',
    'privacy.section2.b2': 'Да изготвим оферта за изграждане и поддръжка на слаботокови системи;',
    'privacy.section2.b3': 'Да осъществим комуникация във връзка с изпълнение на услуги.',
    'privacy.section3.title': 'Споделяне и съхранение на данните',
    'privacy.section3.text': 'Вашите данни се пазят строго конфиденциално и не се продават или споделят с трети страни за маркетинг. Съхраняваме запитванията до приключване на комуникацията по тях или до изтичане на законовите срокове, ако отношенията ни прераснат в договорни.',
    'privacy.section4.title': 'Вашите права (GDPR)',
    'privacy.section4.text': 'Вие имате право по всяко време да поискате достъп, корекция или изтриване ("правото да бъдеш забравен") на вашите лични данни, както и да оттеглите съгласието си за тяхната обработка, като ни пишете на посочения имейл адрес.',
    'privacy.part2': 'ЧАСТ II: ПОЛИТИКА ЗА БИСКВИТКИ (COOKIES)',
    'privacy.section5.title': 'Какво представляват бисквитките?',
    'privacy.section5.text': 'Бисквитките са малки текстови файлове, които се запазват на вашето устройство при посещение на сайта. Те помагат за правилното му функциониране и запомнят вашите предпочитания.',
    'privacy.section6.title': 'Какви бисквитки използваме?',
    'privacy.section6.c1.title': 'Строго необходими бисквитки',
    'privacy.section6.c1.description': 'Задължителни за функционирането на сайта. Те не събират лична информация за маркетинг.',
    'privacy.section6.c2.title': 'Функционални бисквитки',
    'privacy.section6.c2.description': 'Запомнят вашите избори на сайта.',
    'privacy.section6.c3.title': 'Аналитични бисквитки',
    'privacy.section6.c3.description': 'Помагат ни да събираме анонимна статистика за посещаемостта, за да подобряваме потребителското изживяване.',
    'privacy.section7.title': 'Управление на бисквитките',
    'privacy.section7.text': 'Можете да контролирате, блокирате или изтривате бисквитките чрез настройките на вашия браузър (Chrome, Firefox, Safari, Edge и др.). Имайте предвид, че блокирането на някои бисквитки може да наруши нормалната работа на сайта.',

    // Language Toggle
    'langToggle.label': 'EN',
    'langToggle.ariaLabel': 'Switch to English',

    // Feature Hint Toast
    'hint.badge': 'Полезен съвет',
    'hint.title': 'Английска версия & Тъмна тема',
    'hint.description': 'Вече можете да сменяте езика (BG / EN) и да превключвате в тъмен режим от бутоните горе вдясно.',
    'hint.switchLang': 'Опитай English',
    'hint.switchThemeDark': 'Тъмен режим',
    'hint.switchThemeLight': 'Светъл режим',
    'hint.dismiss': 'Разбрах',
    'hint.close': 'Затвори известието',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.gallery': 'Gallery',
    'nav.catalog': 'Catalog',
    'nav.consultation': 'Consultation',
    'nav.requestConsultation': 'Request Consultation',

    // Header
    'header.openMenu': 'Open menu',
    'header.closeMenu': 'Close menu',
    'header.mainNav': 'Main navigation',
    'header.mobileNav': 'Mobile navigation',
    'header.galleryObjects': 'Project Gallery',
    'header.catalogProducts': 'Product Catalog',
    'header.subtitle': 'DABH Engineering',
    'header.homeLabel': 'DABH Engineering home',

    // Hero
    'hero.badge': 'Low-voltage systems for real projects',
    'hero.title': 'Security, automation and low-voltage systems for modern spaces.',
    'hero.description': 'Design, installation and maintenance of CCTV, access control, building automation and structured cabling systems for homes and businesses.',
    'hero.ctaConsultation': 'Request Consultation',
    'hero.ctaServices': 'View Services',
    'hero.ctaCatalog': 'Browse Catalog',
    'hero.trust1': 'Complete solutions',
    'hero.trust2': 'Individual approach',
    'hero.trust3': 'Post-installation support',
    'hero.trust4': 'For homes and businesses',

    // Services
    'services.eyebrow': 'Services',
    'services.title': 'Complete solutions for security, control and connectivity',
    'services.description': 'DABH Engineering builds low-voltage installations that work as one cohesive system — from initial design through configuration and ongoing maintenance.',
    'services.s1.title': 'Security & CCTV Systems',
    'services.s1.description': 'Complete design, installation and maintenance of CCTV and security systems for commercial, residential, public and industrial buildings.',
    'services.s1.b1': 'IP and analog CCTV',
    'services.s1.b2': 'Cameras, DVR/NVR and monitoring',
    'services.s1.b3': 'Enhanced security and control',
    'services.s1.b4': 'Maintenance and configuration',
    'services.s2.title': 'Access Control, Video & Audio Intercoms',
    'services.s2.description': 'Access control systems with cards, key fobs, codes, biometric data and modern intercom solutions.',
    'services.s2.b1': 'Controlled entry zones',
    'services.s2.b2': 'Video intercom systems',
    'services.s2.b3': 'Audio intercom systems',
    'services.s2.b4': 'Solutions for residences, offices and warehouses',
    'services.s3.title': 'Building Automation & Smart Home',
    'services.s3.description': 'Integrated technologies for home or office management through mobile apps and smart interfaces.',
    'services.s3.b1': 'Lighting control',
    'services.s3.b2': 'Heating and HVAC control',
    'services.s3.b3': 'Energy efficiency',
    'services.s3.b4': 'Comfort, security and remote control',
    'services.s4.title': 'Structured Cabling Systems',
    'services.s4.description': 'Building reliable internal networks using copper and fiber optic pathways, communication cabinets and professional cable management.',
    'services.s4.b1': 'LAN infrastructure',
    'services.s4.b2': 'Copper and fiber optic networks',
    'services.s4.b3': 'Communication cabinets',
    'services.s4.b4': 'Internet, TV and telephony',
    'services.s5.title': 'Fire Alarm Systems',
    'services.s5.description': 'Design, installation and maintenance of reliable fire alarm systems for early detection and safety assurance.',
    'services.s5.b1': 'Conventional and addressable systems',
    'services.s5.b2': 'Smoke, heat and carbon monoxide detectors',
    'services.s5.b3': 'Notification and evacuation systems',
    'services.s5.b4': 'Preventive and subscription maintenance',

    // Process
    'process.eyebrow': 'Process',
    'process.title': 'From the first conversation to a reliable working system',
    'process.description': 'The process is structured yet flexible. The goal is for the technical solution to match the site, the people using it, and the future development of the installation.',
    'process.step1.title': 'Consultation',
    'process.step1.description': 'We clarify goals, risks, budget and expectations for the site.',
    'process.step2.title': 'Site Survey & Analysis',
    'process.step2.description': 'We check routes, zones, control points and technical constraints.',
    'process.step3.title': 'Solution Design',
    'process.step3.description': 'We prepare a balanced configuration with the right devices and topology.',
    'process.step4.title': 'Installation & Setup',
    'process.step4.description': 'We mount, arrange, configure and test the system under real conditions.',
    'process.step5.title': 'Maintenance & Optimization',
    'process.step5.description': 'We provide tuning, preventive care and expansion based on site needs.',

    // Projects Teaser
    'projects.badge': 'Real completed projects',
    'projects.title1': 'Completed Projects',
    'projects.title2': 'Gallery of Our Installations',
    'projects.description': 'Browse real photos from projects completed by our team — CCTV, cable infrastructure and low-voltage systems for various types of sites.',
    'projects.check1': 'CCTV and security cameras',
    'projects.check2': 'Cable infrastructure and wiring',
    'projects.check3': 'Residential, office and production sites',
    'projects.check4': 'Gallery is updated with new projects',
    'projects.cta': 'Project Gallery',
    'projects.previewTitle': 'CCTV – Warehouse',
    'projects.previewSubtitle': 'Click to view all projects',
    'projects.imgAlt': 'IP camera installation on a warehouse',

    // Products Teaser
    'productsTeaser.badge': 'Products & Equipment',
    'productsTeaser.title1': 'Products',
    'productsTeaser.title2': 'Security & Control Products',
    'productsTeaser.description': 'Browse our catalog of security cameras, video intercom kits and equipment from leading brands. All products are available to order with professional installation.',
    'productsTeaser.check1': 'HD-TVI cameras 2 megapixels (1080p)',
    'productsTeaser.check2': 'Single-station intercom kits',
    'productsTeaser.check3': 'Hikvision original products',
    'productsTeaser.check4': 'Catalog is updated with new items',
    'productsTeaser.cta': 'Browse Catalog',
    'productsTeaser.previewTitle': 'HD-TVI Cameras & Intercom Systems',
    'productsTeaser.previewSubtitle': 'Click to view the full catalog',
    'productsTeaser.imgAlt': 'HD-TVI security cameras Hikvision',

    // Values / About
    'values.eyebrow': 'About Us',
    'values.title': 'Professional partner for low-voltage systems and automation',
    'values.description': 'DABH Engineering is a company specializing in the installation and maintenance of various low-voltage systems. Our approach is individual, innovative and oriented towards the real needs of the client.',
    'values.v1.title': 'Professionalism',
    'values.v1.description': 'We work with clear technical logic, execution discipline and attention to detail.',
    'values.v2.title': 'Client Focus',
    'values.v2.description': 'We offer solutions based on the real site, daily use and client priorities.',
    'values.v3.title': 'Innovation',
    'values.v3.description': 'We use modern technologies for better connectivity, control and automation.',
    'values.v4.title': 'Efficiency',
    'values.v4.description': 'We seek the right balance between functionality, budget, reliability and future growth.',
    'values.v5.title': 'Responsibility',
    'values.v5.description': 'We stay committed after installation through maintenance, preventive care and timely response.',

    // Sectors
    'sectors.eyebrow': 'Applications',
    'sectors.title': 'Solutions for different types of sites',
    'sectors.description': 'Systems can be planned for new construction, renovation of existing sites or upgrading already working infrastructure.',
    'sectors.s1': 'Homes & Apartments',
    'sectors.s2': 'Offices',
    'sectors.s3': 'Commercial Sites',
    'sectors.s4': 'Warehouses',
    'sectors.s5': 'Industrial Premises',
    'sectors.s6': 'Public Buildings',

    // CTA
    'cta.title': 'Have a site that needs security, control or automation?',
    'cta.description': 'Describe your needs and we will prepare a suitable solution based on the scale, budget and specifics of the site.',
    'cta.button': 'Contact Us',

    // Contact
    'contact.eyebrow': 'Contact',
    'contact.title': 'Request a consultation for your site',
    'contact.description': 'Fill in the short form and describe what type of system interests you. We will contact you as soon as possible.',
    'contact.subtitle': 'Low-voltage systems, security, automation and network infrastructure.',
    'contact.location': 'Pleven Region, Bulgaria',
    'contact.followUs': 'Follow us',
    'contact.successMessage': 'Thank you! Your inquiry was sent successfully. We will contact you soon.',
    'contact.errorMessage': 'An error occurred while sending. Please try again later or contact us by phone.',
    'contact.labelName': 'Name',
    'contact.labelPhone': 'Phone',
    'contact.labelEmail': 'Email',
    'contact.labelObjectType': 'Site Type',
    'contact.labelService': 'Service of Interest',
    'contact.labelMessage': 'Message',
    'contact.placeholderName': 'Your name',
    'contact.placeholderPhone': '08... or +359...',
    'contact.placeholderMessage': 'Describe the site, needs and preferred timeline.',
    'contact.selectDefault': 'Select',
    'contact.selectService': 'Select service',
    'contact.errorNameRequired': 'Please enter your name.',
    'contact.errorPhoneRequired': 'Please enter a phone number.',
    'contact.errorPhonePattern': 'Enter a valid format (e.g. 08... or +359...).',
    'contact.errorEmailRequired': 'Please enter an email.',
    'contact.errorEmailPattern': 'Enter a valid email.',
    'contact.errorObjectRequired': 'Select a site type.',
    'contact.errorServiceRequired': 'Select a service.',
    'contact.errorMessageRequired': 'Please add a message.',
    'contact.recaptchaLabel': 'Confirm you are not a robot',
    'contact.recaptchaError': 'Please confirm you are not a robot.',
    'contact.privacyText': 'Your data is protected. By submitting the inquiry you agree to our',
    'contact.privacyLink': 'Privacy Policy',
    'contact.submitLoading': 'Sending...',
    'contact.submitButton': 'Send Inquiry',
    'contact.objectTypes.home': 'Home',
    'contact.objectTypes.office': 'Office',
    'contact.objectTypes.commercial': 'Commercial Site',
    'contact.objectTypes.warehouse': 'Warehouse',
    'contact.objectTypes.industrial': 'Industrial Site',
    'contact.objectTypes.other': 'Other',

    // Footer
    'footer.description': 'Design, installation and maintenance of low-voltage systems for homes, businesses and public sites.',
    'footer.tagline': 'Low-Voltage Systems • Security • Automation',
    'footer.servicesTitle': 'Services',
    'footer.contactTitle': 'Contact',
    'footer.privacy': 'Data Protection',
    'footer.galleryObjects': 'Project Gallery',
    'footer.catalogProducts': 'Product Catalog',
    'footer.copyright': 'All rights reserved.',

    // Cookie Consent
    'cookie.text': 'We use cookies to analyze site traffic and improve your experience. By clicking "Accept All", you agree to the use of cookies.',
    'cookie.decline': 'Decline',
    'cookie.accept': 'Accept All',

    // Theme Toggle
    'theme.light': 'Switch to light theme',
    'theme.dark': 'Switch to dark theme',

    // Gallery Modal
    'gallery.title': 'Completed Projects Gallery',
    'gallery.subtitle': 'Real photos from DABH Engineering installations',
    'gallery.close': 'Close gallery',
    'gallery.allCategories': 'All',
    'gallery.photoSingular': 'photo',
    'gallery.photoPlural': 'photos',
    'gallery.footerText': 'Need a similar solution? Contact us for a free consultation.',
    'gallery.closeBtn': 'Close',
    'gallery.requestVisit': 'Request a Visit',
    'gallery.prevPhoto': 'Previous photo',
    'gallery.nextPhoto': 'Next photo',
    'gallery.viewFull': 'View full size',

    // Catalog Modal
    'catalog.title': 'Product Catalog',
    'catalog.subtitle': 'Products from DABH Engineering — Hikvision',
    'catalog.close': 'Close catalog',
    'catalog.allCategories': 'All',
    'catalog.filters': 'Filters',
    'catalog.clearFilters': 'Clear',
    'catalog.found': 'Found',
    'catalog.noProducts': 'No products found',
    'catalog.noProductsHint': 'Try changing the filters or selecting another category.',
    'catalog.clearAllFilters': 'Clear Filters',
    'catalog.footerText': 'Have questions about a product? Contact us for more information.',
    'catalog.closeBtn': 'Close',
    'catalog.inquiry': 'Inquiry',
    'catalog.showResults': 'Show',
    'catalog.results': 'results',
    'catalog.prevProduct': 'Previous product',
    'catalog.nextProduct': 'Next product',
    'catalog.model': 'Model',
    'catalog.mainSpecs': 'Key Specifications',
    'catalog.viewDetails': 'View details',
    'catalog.comingSoon': 'Coming soon',

    // Privacy Policy
    'privacy.title': 'Privacy & Cookie Policy',
    'privacy.close': 'Close',
    'privacy.lastUpdate': 'Last updated',
    'privacy.year': '',
    'privacy.intro': 'This policy explains how',
    'privacy.introCompany': '"DABH Engineering" Ltd',
    'privacy.introEnd': 'collects, processes and protects your personal data, as well as how we use cookies on our website.',
    'privacy.section1.title': 'Who are we?',
    'privacy.section1.text1': 'The personal data controller is',
    'privacy.section1.text2': ', UIC',
    'privacy.section1.text3': ', with registered office: Pleven, 16 Asen Halachev St. For questions you may contact us at email:',
    'privacy.section1.text4': 'or by phone:',
    'privacy.part1': 'PART I: PERSONAL DATA PROTECTION',
    'privacy.section2.title': 'What data do we collect and why?',
    'privacy.section2.text': 'Through the contact form on our website we collect only the data you voluntarily provide (names, phone, email and inquiry text). We process them solely for the purpose of:',
    'privacy.section2.b1': 'Responding to your inquiry;',
    'privacy.section2.b2': 'Preparing a quotation for low-voltage system installation and maintenance;',
    'privacy.section2.b3': 'Communication related to service execution.',
    'privacy.section3.title': 'Data Sharing & Storage',
    'privacy.section3.text': 'Your data is kept strictly confidential and is not sold or shared with third parties for marketing. We retain inquiries until the communication is concluded or until the expiry of legal deadlines if our relationship becomes contractual.',
    'privacy.section4.title': 'Your Rights (GDPR)',
    'privacy.section4.text': 'You have the right at any time to request access, correction or deletion ("the right to be forgotten") of your personal data, as well as to withdraw your consent for processing by writing to the specified email address.',
    'privacy.part2': 'PART II: COOKIE POLICY',
    'privacy.section5.title': 'What are cookies?',
    'privacy.section5.text': 'Cookies are small text files stored on your device when you visit a website. They help it function correctly and remember your preferences.',
    'privacy.section6.title': 'What cookies do we use?',
    'privacy.section6.c1.title': 'Strictly Necessary Cookies',
    'privacy.section6.c1.description': 'Required for the website to function. They do not collect personal information for marketing.',
    'privacy.section6.c2.title': 'Functional Cookies',
    'privacy.section6.c2.description': 'Remember your choices on the site.',
    'privacy.section6.c3.title': 'Analytical Cookies',
    'privacy.section6.c3.description': 'Help us collect anonymous traffic statistics to improve the user experience.',
    'privacy.section7.title': 'Managing Cookies',
    'privacy.section7.text': 'You can control, block or delete cookies through your browser settings (Chrome, Firefox, Safari, Edge, etc.). Please note that blocking some cookies may disrupt the normal operation of the website.',

    // Language Toggle
    'langToggle.label': 'БГ',
    'langToggle.ariaLabel': 'Превключи на български',

    // Feature Hint Toast
    'hint.badge': 'Quick Tip',
    'hint.title': 'English Version & Dark Mode',
    'hint.description': 'You can switch between English and Bulgarian, or toggle Dark mode anytime using the buttons in the top right.',
    'hint.switchLang': 'Опитай Български',
    'hint.switchThemeDark': 'Dark mode',
    'hint.switchThemeLight': 'Light mode',
    'hint.dismiss': 'Got it',
    'hint.close': 'Close notification',
  },
}
