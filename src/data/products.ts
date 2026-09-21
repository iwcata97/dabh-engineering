// ─── Product Catalog Data ─────────────────────────────────────────────────────
// За да добавите нов продукт: добавете нов обект в масива по-долу.
// Поставете снимката в /public/products/ и попълнете полетата.

export interface Product {
  id: string
  model: string
  brand: string
  image: string              // път до снимката в /public/products/
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  price: string              // 'Очаквайте скоро' за всички продукти
  specs?: string[]           // технически характеристики
  tags?: string[]
  filters?: Record<string, string> // филтри за каталога
}

export const productCategories = [
  'HD-TVI Камери 2MP (1080p)',
  'Еднопостови комплекти',
] as const

export type ProductCategory = (typeof productCategories)[number]

export const products: Product[] = [
  // ─── HD-TVI Камери 2 Мегапиксела (1080p) 4-in-1 ────────────────────────────
  {
    id: 'cam-01',
    model: 'DS-2CE56D0T-IT3F(C)',
    brand: 'Hikvision',
    image: '/products/cam-01.jpg',
    title: 'Куполна камера 2MP – EXIR 40м',
    shortDescription:
      'HD-TVI куполна камера (4 in 1), 2 мегапиксела, фиксиран обектив 2.8 мм, EXIR до 40 м, IP66.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS куполна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F1.2 (0 Lux IR on); фиксиран обектив 2.8 мм (хоризонтален ъгъл 103°); EXIR технология с обхват до 40 м (Smart IR); механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; DNR шумов филтър; за външен монтаж (IP66) -40~60C; 12Vdc/4W; опция за монт. основа: DS-1280ZJ-S.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 2.8 мм',
      'EXIR до 40 м',
      'IP66 защита',
      '4-in-1 (TVI/AHD/CVI/CVBS)',
    ],
    tags: ['Куполна', 'IP66', 'EXIR 40м'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Куполна',
      'Монтаж': 'Външен',
      'Аудио': 'Без аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-02',
    model: 'DS-2CE78D0T-IT3FS',
    brand: 'Hikvision',
    image: '/products/cam-02.jpg',
    title: 'Куполна камера 2MP – Вграден микрофон, CoAx Audio',
    shortDescription:
      'HD-TVI куполна камера (4 in 1), 2 мегапиксела, вграден микрофон, обектив 3.6 мм, EXIR до 40 м.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS куполна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F1.2 (0 Lux IR on); вграден микрофон с пренос на аудио по коаксиалния кабел; фиксиран обектив 3.6 мм (хоризонтален ъгъл 79.6°); EXIR технология с обхват до 40 м (Smart IR); механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; DNR шумов филтър; за външен монтаж (IP67) -40~60C; 12Vdc/3.7W; опция за монт. основа: DS-1280ZJ-S.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 3.6 мм',
      'EXIR до 40 м',
      'Вграден микрофон (CoAx Audio)',
      'IP67 защита',
    ],
    tags: ['Куполна', 'Микрофон', 'CoAx Audio'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Куполна',
      'Монтаж': 'Външен',
      'Аудио': 'С микрофон',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-03',
    model: 'DS-2CE76D0T-ITMF',
    brand: 'Hikvision',
    image: '/products/cam-03.jpg',
    title: 'Куполна камера 2MP – EXIR 30м, черен корпус',
    shortDescription:
      'HD-TVI куполна камера (4 in 1), 2 мегапиксела, обектив 2.8 мм, EXIR до 30 м, черен корпус.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS куполна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F1.2 (0 Lux IR on); фиксиран обектив 2.8 мм (хоризонтален ъгъл 101°); EXIR технология с обхват до 30 м (Smart IR); механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; 2D DNR шумов филтър; за външен монтаж (IP67) -40~60C; 12Vdc/3W; опция - корпус в черен цвят.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 2.8 мм',
      'EXIR до 30 м',
      'IP67 защита',
      'Черен корпус',
    ],
    tags: ['Куполна', 'Черен корпус', 'EXIR 30м'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Куполна',
      'Монтаж': 'Външен',
      'Аудио': 'Без аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-04',
    model: 'DS-2CE16D0T-ITF(C)',
    brand: 'Hikvision',
    image: '/products/cam-04.jpg',
    title: 'Булет камера 2MP – EXIR 30м, метален корпус',
    shortDescription:
      'HD-TVI булет камера (4 in 1), 2 мегапиксела, обектив 2.8 мм, EXIR до 30 м, метален корпус.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS корпусна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F2.0 (0 Lux IR on); фиксиран обектив 2.8 мм (хоризонтален ъгъл 101°); EXIR технология с обхват до 30 м (Smart IR); механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; метален корпус за външен монтаж (IP67) -40~60C; 12Vdc/3W; опция за монт. основа: DS-1280ZJ-XS.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 2.8 мм',
      'EXIR до 30 м',
      'IP67 защита',
      'Метален корпус',
    ],
    tags: ['Булет', 'Метален корпус', 'EXIR 30м'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Булет',
      'Монтаж': 'Външен',
      'Аудио': 'Без аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-05',
    model: 'DS-2CE16D0T-ITFS',
    brand: 'Hikvision',
    image: '/products/cam-05.jpg',
    title: 'Булет камера 2MP – Вграден микрофон, CoAx Audio',
    shortDescription:
      'HD-TVI булет камера (4 in 1), 2 мегапиксела, вграден микрофон, обектив 3.6 мм, Smart IR 30м.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS корпусна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F1.2 (0 Lux IR on); вграден микрофон с пренос на аудио по коаксиалния кабел; фиксиран обектив 3.6 мм (хоризонтален ъгъл 79.6°); EXIR технология с обхват до 30 м (Smart IR); механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; DNR; метален корпус за външен монтаж (IP67) -40~60C; 12Vdc/3.7W; опция за монт. основа: DS-1280ZJ-XS.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 3.6 мм',
      'Smart IR до 30 м',
      'Вграден микрофон (CoAx Audio)',
      'IP67 защита',
    ],
    tags: ['Булет', 'Микрофон', 'CoAx Audio'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Булет',
      'Монтаж': 'Външен',
      'Аудио': 'С микрофон',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-06',
    model: 'DS-2CE17D0T-IT5F(C)',
    brand: 'Hikvision',
    image: '/products/cam-06.jpg',
    title: 'Булет камера 2MP – EXIR 80м',
    shortDescription:
      'HD-TVI булет камера (4 in 1), 2 мегапиксела, обектив 3.6 мм, EXIR до 80 м, механичен IR филтър.',
    fullDescription:
      'HD-TVI/AHD/CVI/CVBS корпусна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.01 Lux@F1.2 (0 Lux IR on); фиксиран обектив 3.6 мм (хоризонтален ъгъл 79.6°); EXIR технология с обхват до 80 м; механичен IR филтър; избираем HD-TVI/AHD/CVI/CVBS режим на работа; DWDR; за външен монтаж (IP67) -40~60C; 12Vdc/4.7W; опция за монт. основа: DS-1280ZJ-XS.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Обектив: 3.6 мм',
      'EXIR до 80 м',
      'IP67 защита',
      'Механичен IR филтър',
    ],
    tags: ['Булет', 'EXIR 80м', 'Дълъг обхват'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Булет',
      'Монтаж': 'Външен',
      'Аудио': 'Без аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'cam-07',
    model: 'DS-2CE56D0T-IT3ZF',
    brand: 'Hikvision',
    image: '/products/cam-07.jpg',
    title: 'Куполна камера 2MP – Моторизиран обектив 2.7–13.5мм',
    shortDescription:
      'HD-TVI куполна камера (4 in 1), 2 мегапиксела, моторизиран варифокален обектив, EXIR до 70 м.',
    fullDescription:
      'HD-TVI корпусна камера (4 in 1); 2 Мегапиксела (FullHD 1080p@25 кад/сек); 2MP Progressive Scan CMOS сензор; 0.005 Lux (0 Lux IR on); моторизиран варифокален обектив 2.7~13.5 мм (хоризонтален ъгъл 102°~31°); EXIR технология с обхват до 70 м (Smart IR); механичен IR филтър; OSD меню и опция за управление по коаксиалния кабел; 3D DNR шумов филтър; BLC/HLC; избираем HD-TVI/AHD/CVI/CVBS режим на работа; за външен монтаж (IP67) -40~60C; 12Vdc/7.7W; опция за монт. основа: DS-1280ZJ-S.',
    category: 'HD-TVI Камери 2MP (1080p)',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD 1080p',
      'Моторизиран обектив: 2.7–13.5 мм',
      'EXIR до 70 м',
      'IP67 защита',
      '3D DNR, BLC/HLC',
    ],
    tags: ['Куполна', 'Моторизиран', 'Варифокален'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Куполна',
      'Монтаж': 'Външен',
      'Аудио': 'Без аудио',
      'Обектив': 'Варифокален'
    }
  },

  // ─── Еднопостови комплекти (Видеодомофони) ──────────────────────────────────
  {
    id: 'intercom-01',
    model: 'DS-KIS613-S',
    brand: 'Hikvision',
    image: '/products/intercom-01.jpg',
    title: 'IP видео-домофонен комплект – 4MP, 7" монитор, Wi-Fi 6',
    shortDescription:
      'IP видео-домофонен комплект с 4MP камера, 7" монитор, PoE, Wi-Fi 6, Bluetooth и 32GB карта.',
    fullDescription:
      'Hikvision DS-KIS613-S е IP видео-домофонен комплект, предназначен за жилищни и малки бизнес обекти. Системата включва 4MP външна станция с камера, вграден 7" монитор, PoE суич, захранване, 32GB карта и аксесоари. Поддържа множество методи за отключване, Wi-Fi 6, Bluetooth, запис и интелигентни функции за сигурност. Съдържание на комплекта: DS-KV6114-MWBE1 – външно тяло, DS-KH8380-WTE1 – монитор, DS-KABV6114-RS – козирка, 4 портов PoE суич, захранващ адаптор, 32GB TF карта, админ карта и RFID тагове – 5 бр.',
    category: 'Еднопостови комплекти',
    price: 'Очаквайте скоро',
    specs: [
      '4MP камера',
      '7" монитор',
      'PoE захранване',
      'Wi-Fi 6, Bluetooth',
      '32GB TF карта',
    ],
    tags: ['IP Домофон', 'Wi-Fi 6', '4MP'],
    filters: {
      'Резолюция': '4 MP',
      'Тип': 'Домофон',
      'Монтаж': 'Външен',
      'Аудио': 'Двупосочно аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'intercom-02',
    model: 'DS-KIS610-P',
    brand: 'Hikvision',
    image: '/products/intercom-02.jpg',
    title: 'IP видео-домофонен комплект – 4MP ултра-широк ъгъл',
    shortDescription:
      'IP видео-домофонен комплект с 4MP ултра-широк ъгъл, Wi-Fi монитор, PoE захранване.',
    fullDescription:
      'Hikvision DS-KIS610-P е IP видео-домофонен комплект, предназначен за жилищни и малки бизнес обекти. Системата включва 4MP външна станция с ултра-широк ъгъл, вграден Wi-Fi монитор, PoE захранване, 32GB карта и всички необходими аксесоари. Поддържа множество методи за отключване, Wi-Fi 6, Bluetooth, запис и интелигентни аудио-детекции. Съдържание на комплекта: DS-KV6114-WBE1 – външно тяло, DS-KH6350-WTE1 – монитор, DS-KABV6114-RS – козирка, 2 броя захранващи адаптори, 32GB TF карта, админ карта и RFID тагове – 5 бр.',
    category: 'Еднопостови комплекти',
    price: 'Очаквайте скоро',
    specs: [
      '4MP камера, ултра-широк ъгъл',
      'Wi-Fi монитор',
      'PoE захранване',
      'Wi-Fi 6, Bluetooth',
      'RFID тагове – 5 бр.',
    ],
    tags: ['IP Домофон', 'Ултра-широк ъгъл', '4MP'],
    filters: {
      'Резолюция': '4 MP',
      'Тип': 'Домофон',
      'Монтаж': 'Външен',
      'Аудио': 'Двупосочно аудио',
      'Обектив': 'Широкоъгълен'
    }
  },
  {
    id: 'intercom-03',
    model: 'DS-KIS602(B)',
    brand: 'Hikvision',
    image: '/products/intercom-03.jpg',
    title: 'Видео-домофонен комплект – 180° Fish Eye камера',
    shortDescription:
      'Комплект с DS-KD8003-IME1(B) 180° fish eye камера, 7" цветен дисплей, PoE.',
    fullDescription:
      'Еднопостов комплект включващ: Външен панел DS-KD8003-IME1(B), предлагащ 180° fish eye камера с FullHD резолюция, 2x сухо реле, 1 бутон за позвъняване. Рамка за повърхностен монтаж – DS-KD-ACW1. 7" Цветен дисплей DS-KH6320-WTE1, WiFi, Standard PoE. 4 портов PoE switch и 16GB TF карта за съхранение на видео и снимки от позвъняванията.',
    category: 'Еднопостови комплекти',
    price: 'Очаквайте скоро',
    specs: [
      '180° Fish Eye камера',
      'FullHD резолюция',
      '7" цветен дисплей',
      'WiFi, Standard PoE',
      '16GB TF карта',
    ],
    tags: ['Видеодомофон', 'Fish Eye', '180°'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Домофон',
      'Монтаж': 'Външен',
      'Аудио': 'Двупосочно аудио',
      'Обектив': 'Fish Eye'
    }
  },
  {
    id: 'intercom-04',
    model: 'DS-KIS603-P(C)',
    brand: 'Hikvision',
    image: '/products/intercom-04.jpg',
    title: 'Видео-домофонен комплект – FullHD WDR, Mifare четец',
    shortDescription:
      'Комплект с FullHD WDR камера, Mifare 13.56MHz четец, 7" дисплей, Standard PoE.',
    fullDescription:
      'Еднопостов комплект включващ: Външен панел DS-KV6113-WPE1(C) с FullHD WDR камера, 1x сухо реле, 1 бутон за позвъняване и вграден четец за Mifare 13.56MHz карти. 7" Цветен дисплей DS-KH6320-WTE1, WiFi, Standard PoE. Включено захранване.',
    category: 'Еднопостови комплекти',
    price: 'Очаквайте скоро',
    specs: [
      'FullHD WDR камера',
      'Mifare 13.56MHz четец',
      '7" цветен дисплей',
      'WiFi, Standard PoE',
      'Включено захранване',
    ],
    tags: ['Видеодомофон', 'Mifare', 'WDR'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Домофон',
      'Монтаж': 'Външен',
      'Аудио': 'Двупосочно аудио',
      'Обектив': 'Фиксиран'
    }
  },
  {
    id: 'intercom-05',
    model: 'DS-KIS604-S(C)',
    brand: 'Hikvision',
    image: '/products/intercom-05.jpg',
    title: 'Видео-домофонен комплект – 129° 2MP камера, WiFi дисплей',
    shortDescription:
      'Комплект с 129° 2MP камера, варифокален обектив, 7" WiFi дисплей, PoE switch и 16GB карта.',
    fullDescription:
      'Еднопостов комплект включващ: Външен панел DS-KV8113-WME1(C), предлагащ 129° 2MP FullHD камера с варифокален обектив 2.2~5.5мм. Резолюция 2x сухо реле, 1 бутон за позвъняване, вграден Mifare четец за карти. 7" Цветен дисплей DS-KH6320-WTE1, WiFi, Standard PoE. 4 портов PoE switch и 16GB TF карта за съхранение на видео и снимки от позвъняванията.',
    category: 'Еднопостови комплекти',
    price: 'Очаквайте скоро',
    specs: [
      '2MP FullHD камера, 129°',
      'Варифокален обектив 2.2–5.5 мм',
      '7" WiFi дисплей',
      'PoE switch, 16GB TF карта',
      'Mifare четец за карти',
    ],
    tags: ['Видеодомофон', 'Варифокален', '2MP'],
    filters: {
      'Резолюция': '2 MP',
      'Тип': 'Домофон',
      'Монтаж': 'Външен',
      'Аудио': 'Двупосочно аудио',
      'Обектив': 'Варифокален'
    }
  },
]
