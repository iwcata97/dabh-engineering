import {
  BadgeCheck,
  Briefcase,
  Building2,
  Cable,
  ClipboardCheck,
  Factory,
  Gauge,
  Home,
  KeyRound,
  LifeBuoy,
  Lightbulb,
  Network,
  PenTool,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  Target,
  Video,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavigationItem = {
  label: string
  href: string
}

export type ServiceItem = {
  title: string
  description: string
  bullets: string[]
  icon: LucideIcon
}

export type ProcessStep = {
  title: string
  description: string
  icon: LucideIcon
}

export type ValueItem = {
  title: string
  description: string
  icon: LucideIcon
}

export type SectorItem = {
  title: string
  icon: LucideIcon
}

export const navLinks: NavigationItem[] = [
  { label: 'Начало', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'Процес', href: '#process' },
  { label: 'За нас', href: '#about' },
  { label: 'Контакт', href: '#contact' },
]

export const trustItems = [
  'Комплексни решения',
  'Индивидуален подход',
  'Поддръжка след изграждане',
  'За домове и бизнеси',
]

export const services: ServiceItem[] = [
  {
    title: 'Системи за сигурност и видеонаблюдение',
    description:
      'Цялостно проектиране, изграждане и поддръжка на системи за видеонаблюдение и охрана на сгради с търговско, жилищно, обществено или индустриално предназначение.',
    bullets: [
      'IP и аналогово видеонаблюдение',
      'Камери, записващи устройства и мониторинг',
      'Повишена сигурност и контрол',
      'Поддръжка и настройка',
    ],
    icon: ShieldCheck,
  },
  {
    title: 'Контрол на достъпа, видеофони и аудиодомофони',
    description:
      'Системи за контрол на достъпа с карти, чипове, кодове, биометрични данни и модерни домофонни решения.',
    bullets: [
      'Контролирани входни зони',
      'Видеодомофонни системи',
      'Аудиодомофонни системи',
      'Решения за жилища, офиси и складови бази',
    ],
    icon: KeyRound,
  },
  {
    title: 'Сградна автоматизация и умен дом',
    description:
      'Интегрирани технологии за управление на дома или офиса през мобилни приложения и интелигентни интерфейси.',
    bullets: [
      'Управление на осветление',
      'Управление на отопление и климатизация',
      'Енергийна ефективност',
      'Комфорт, сигурност и дистанционен контрол',
    ],
    icon: Settings2,
  },
  {
    title: 'Структурни кабелни системи',
    description:
      'Изграждане на надеждна вътрешна мрежа чрез медни и оптични трасета, комуникационни шкафове и професионално аранжиране.',
    bullets: [
      'LAN инфраструктура',
      'Медни и оптични мрежи',
      'Комуникационни шкафове',
      'Интернет, телевизия и телефония',
    ],
    icon: Cable,
  },
]

export const processSteps: ProcessStep[] = [
  {
    title: 'Консултация',
    description: 'Изясняваме целите, рисковете, бюджета и очакванията за обекта.',
    icon: ClipboardCheck,
  },
  {
    title: 'Оглед и анализ',
    description: 'Проверяваме трасета, зони, точки за контрол и технически ограничения.',
    icon: Search,
  },
  {
    title: 'Проектиране на решение',
    description: 'Подготвяме балансирана конфигурация с правилните устройства и топология.',
    icon: PenTool,
  },
  {
    title: 'Изграждане и настройка',
    description: 'Монтираме, аранжираме, конфигурираме и тестваме системата в реални условия.',
    icon: Wrench,
  },
  {
    title: 'Поддръжка и оптимизация',
    description: 'Осигуряваме настройки, профилактика и развитие според нуждите на обекта.',
    icon: LifeBuoy,
  },
]

export const values: ValueItem[] = [
  {
    title: 'Професионализъм',
    description:
      'Работим с ясна техническа логика, дисциплина при изпълнение и внимание към детайла.',
    icon: BadgeCheck,
  },
  {
    title: 'Фокус върху клиента',
    description:
      'Предлагаме решения според реалния обект, ежедневната употреба и приоритетите на клиента.',
    icon: Target,
  },
  {
    title: 'Иновативност',
    description:
      'Използваме модерни технологии за по-добра свързаност, контрол и автоматизация.',
    icon: Lightbulb,
  },
  {
    title: 'Ефективност',
    description:
      'Търсим правилния баланс между функционалност, бюджет, надеждност и бъдещо развитие.',
    icon: Gauge,
  },
  {
    title: 'Отговорност',
    description:
      'Оставаме ангажирани след изграждането чрез поддръжка, профилактика и навременна реакция.',
    icon: Zap,
  },
]

export const sectors: SectorItem[] = [
  { title: 'Домове и апартаменти', icon: Home },
  { title: 'Офиси', icon: Briefcase },
  { title: 'Търговски обекти', icon: Store },
  { title: 'Складови бази', icon: Warehouse },
  { title: 'Индустриални помещения', icon: Factory },
  { title: 'Обществени сгради', icon: Building2 },
]

export const objectTypes = [
  'Дом',
  'Офис',
  'Търговски обект',
  'Склад',
  'Индустриален обект',
  'Друго',
]

export const heroNodes = [Video, KeyRound, Home, Network]