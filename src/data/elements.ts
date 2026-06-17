export type CollectionId =
  | "WOOD"
  | "SPECTRUM"
  | "COZY"
  | "WIND"
  | "GRASS"
  | "ROOTS";

export interface Collection {
  id: CollectionId;
  tagline: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface InteriorElement {
  id: string;
  ref: string;
  name: string;
  category: string;
  collection: CollectionId;
  description: string;
  ingredients: string;
  unit: string;
  specs: SpecRow[];
  note: string;
}

export const collections: Collection[] = [
  {
    id: "WOOD",
    tagline:
      "Дерево задаёт ритм, заигрывая с россыпью молочных текстур. Продуманный функционал и современная эстетика.",
  },
  {
    id: "SPECTRUM",
    tagline:
      "Чистая геометрия и спектр нейтральных тонов. Графичность, в которой каждая линия на своём месте.",
  },
  {
    id: "COZY",
    tagline:
      "Мягкие объёмы и тёплый свет для медленных вечеров. Интерьер, в который хочется вернуться.",
  },
  {
    id: "WIND",
    tagline:
      "Воздух, лёгкость и светлые полупрозрачные слои. Пространство дышит и наполняется светом.",
  },
  {
    id: "GRASS",
    tagline:
      "Природная палитра и живые фактуры зелени. Спокойствие натуральных материалов.",
  },
  {
    id: "ROOTS",
    tagline:
      "Глубокие тона, камень и характер. Основательность, проверенная временем.",
  },
];

const baseSpec = (extra: SpecRow[]): SpecRow[] => [
  ...extra,
  { label: "Эстетика", value: "94%" },
  { label: "Функция", value: "91%" },
  { label: "Скучные решения", value: "0%" },
];

export const elements: InteriorElement[] = [
  {
    id: "sofa-wood",
    ref: "PRO-0001",
    name: "Диван «Молоко»",
    category: "Мягкая мебель",
    collection: "WOOD",
    description:
      "Низкий трёхместный диван на деревянном основании из массива дуба. Молочная рогожка, съёмные чехлы, мягкая посадка без провалов.",
    ingredients: "Массив дуба, рогожка, ППУ переменной плотности, перо",
    unit: "1 шт · 232 см",
    specs: baseSpec([
      { label: "Комфорт", value: "96%" },
      { label: "Износостойкость", value: "88%" },
      { label: "Тепло фактуры", value: "92%" },
    ]),
    note: "* Чехлы снимаются и стираются.",
  },
  {
    id: "table-wood",
    ref: "PRO-0002",
    name: "Стол «Кольцо»",
    category: "Столовая группа",
    collection: "WOOD",
    description:
      "Круглый обеденный стол на центральной опоре. Шпон дуба с открытыми порами, матовое масло вместо лака.",
    ingredients: "Шпон дуба, МДФ, натуральное масло",
    unit: "1 шт · Ø120 см",
    specs: baseSpec([
      { label: "Вместимость", value: "4–6 чел" },
      { label: "Натуральность", value: "90%" },
    ]),
    note: "* Поверхность обновляется маслом раз в год.",
  },
  {
    id: "shelf-wood",
    ref: "PRO-0003",
    name: "Стеллаж «Решётка»",
    category: "Системы хранения",
    collection: "WOOD",
    description:
      "Открытый модульный стеллаж-перегородка. Тонкие рёбра делят пространство, не перекрывая свет.",
    ingredients: "Массив ясеня, сталь, морилка",
    unit: "1 модуль · 180 см",
    specs: baseSpec([
      { label: "Лёгкость", value: "85%" },
      { label: "Модульность", value: "100%" },
    ]),
    note: "* Модули комбинируются по высоте.",
  },

  {
    id: "lamp-spectrum",
    ref: "PRO-0011",
    name: "Светильник «Диск»",
    category: "Освещение",
    collection: "SPECTRUM",
    description:
      "Подвес-диск с тёплым рассеянным светом. Алюминий, окрашенный в графит, плоский профиль, диммирование.",
    ingredients: "Анодированный алюминий, LED 2700K, опаловый акрил",
    unit: "1 шт · Ø60 см",
    specs: baseSpec([
      { label: "Свет 2700K", value: "96%" },
      { label: "Графичность", value: "93%" },
    ]),
    note: "* Совместим с диммером.",
  },
  {
    id: "chair-spectrum",
    ref: "PRO-0012",
    name: "Кресло «Угол»",
    category: "Мягкая мебель",
    collection: "SPECTRUM",
    description:
      "Геометричное кресло с выраженной линией спинки. Плотный нейтральный текстиль, тонкий стальной каркас.",
    ingredients: "Сталь, формованный ППУ, обивочный текстиль",
    unit: "1 шт · 78 см",
    specs: baseSpec([
      { label: "Силуэт", value: "95%" },
      { label: "Комфорт", value: "84%" },
    ]),
    note: "* 6 нейтральных оттенков обивки.",
  },
  {
    id: "mirror-spectrum",
    ref: "PRO-0013",
    name: "Зеркало «Поле»",
    category: "Декор",
    collection: "SPECTRUM",
    description:
      "Большое напольное зеркало без рамы с фаской по периметру. Расширяет пространство и собирает свет.",
    ingredients: "Закалённое стекло, скрытое крепление",
    unit: "1 шт · 170 см",
    specs: baseSpec([
      { label: "Свет", value: "98%" },
      { label: "Минимализм", value: "97%" },
    ]),
    note: "* Крепится к стене скрыто.",
  },

  {
    id: "sofa-cozy",
    ref: "PRO-0021",
    name: "Диван «Облако»",
    category: "Мягкая мебель",
    collection: "COZY",
    description:
      "Глубокий модульный диван с пуховыми подушками. Обволакивающая посадка, тёплый песочный букле.",
    ingredients: "Букле, пух/холлофайбер, берёзовый каркас",
    unit: "1 шт · 280 см",
    specs: baseSpec([
      { label: "Мягкость", value: "99%" },
      { label: "Глубина", value: "95%" },
    ]),
    note: "* Модули можно переставлять.",
  },
  {
    id: "rug-cozy",
    ref: "PRO-0022",
    name: "Ковёр «Тёплый»",
    category: "Текстиль",
    collection: "COZY",
    description:
      "Высокий ворсовый ковёр ручной работы. Молочно-песочный градиент, приятный тактильный отклик.",
    ingredients: "Шерсть, вискоза, хлопковая основа",
    unit: "1 шт · 200×300 см",
    specs: baseSpec([
      { label: "Тепло", value: "97%" },
      { label: "Тактильность", value: "94%" },
    ]),
    note: "* Чистка только сухая.",
  },
  {
    id: "floorlamp-cozy",
    ref: "PRO-0023",
    name: "Торшер «Луна»",
    category: "Освещение",
    collection: "COZY",
    description:
      "Напольный торшер с тканевым абажуром и тёплым мягким светом. Создаёт камерный вечерний сценарий.",
    ingredients: "Сталь, лён, LED 2400K",
    unit: "1 шт · 165 см",
    specs: baseSpec([
      { label: "Уют", value: "98%" },
      { label: "Свет 2400K", value: "93%" },
    ]),
    note: "* Сенсорное включение на стойке.",
  },

  {
    id: "curtain-wind",
    ref: "PRO-0031",
    name: "Шторы «Парус»",
    category: "Текстиль",
    collection: "WIND",
    description:
      "Лёгкие полупрозрачные портьеры в пол. Рассеивают свет, придают воздуху объём и движение.",
    ingredients: "Лён-вуаль, скрытый карниз",
    unit: "1 комплект · до 320 см",
    specs: baseSpec([
      { label: "Светопропускание", value: "75%" },
      { label: "Лёгкость", value: "96%" },
    ]),
    note: "* Пошив по высоте потолка.",
  },
  {
    id: "table-wind",
    ref: "PRO-0032",
    name: "Стол «Стекло»",
    category: "Столовая группа",
    collection: "WIND",
    description:
      "Журнальный стол со стеклянной столешницей на тонких опорах. Визуально невесомый, прозрачный объём.",
    ingredients: "Закалённое стекло, окрашенная сталь",
    unit: "1 шт · 110 см",
    specs: baseSpec([
      { label: "Воздух", value: "97%" },
      { label: "Прозрачность", value: "92%" },
    ]),
    note: "* Кромка стекла отполирована.",
  },
  {
    id: "vase-wind",
    ref: "PRO-0033",
    name: "Ваза «Дюна»",
    category: "Декор",
    collection: "WIND",
    description:
      "Высокая матовая ваза светлого тона. Плавный силуэт, под сухоцветы или ветви.",
    ingredients: "Керамика, матовая глазурь",
    unit: "1 шт · 45 см",
    specs: baseSpec([
      { label: "Силуэт", value: "94%" },
      { label: "Светлота", value: "95%" },
    ]),
    note: "* Декор подбирается отдельно.",
  },

  {
    id: "armchair-grass",
    ref: "PRO-0041",
    name: "Кресло «Поляна»",
    category: "Мягкая мебель",
    collection: "GRASS",
    description:
      "Уютное кресло в приглушённом оливковом тоне. Натуральный текстиль и дубовые ножки.",
    ingredients: "Дуб, велюр-микрофибра, ППУ",
    unit: "1 шт · 82 см",
    specs: baseSpec([
      { label: "Природность", value: "96%" },
      { label: "Комфорт", value: "90%" },
    ]),
    note: "* Оттенок устойчив к выгоранию.",
  },
  {
    id: "planter-grass",
    ref: "PRO-0042",
    name: "Кашпо «Корень»",
    category: "Декор",
    collection: "GRASS",
    description:
      "Напольное кашпо из натуральной керамики с дренажём. Под крупные растения, держит влагу.",
    ingredients: "Шамотная керамика, дренажная вставка",
    unit: "1 шт · Ø38 см",
    specs: baseSpec([
      { label: "Фактура", value: "95%" },
      { label: "Натуральность", value: "97%" },
    ]),
    note: "* Растение подбирается под свет.",
  },
  {
    id: "console-grass",
    ref: "PRO-0043",
    name: "Консоль «Тропа»",
    category: "Системы хранения",
    collection: "GRASS",
    description:
      "Узкая консоль в прихожую или за диван. Тёплый шпон и матовая зелёная база.",
    ingredients: "Шпон ореха, МДФ, матовая эмаль",
    unit: "1 шт · 120 см",
    specs: baseSpec([
      { label: "Компактность", value: "93%" },
      { label: "Тепло фактуры", value: "89%" },
    ]),
    note: "* Один выдвижной ящик.",
  },

  {
    id: "bed-roots",
    ref: "PRO-0051",
    name: "Кровать «Опора»",
    category: "Спальня",
    collection: "ROOTS",
    description:
      "Кровать с высоким мягким изголовьем глубокого тона. Основательная геометрия, скрытое основание.",
    ingredients: "Массив, велюр, ортопедическое основание",
    unit: "1 шт · 160×200 см",
    specs: baseSpec([
      { label: "Основательность", value: "97%" },
      { label: "Комфорт", value: "93%" },
    ]),
    note: "* Матрас подбирается отдельно.",
  },
  {
    id: "stone-table-roots",
    ref: "PRO-0052",
    name: "Стол «Камень»",
    category: "Столовая группа",
    collection: "ROOTS",
    description:
      "Обеденный стол со столешницей из керамогранита под камень. Тяжёлый характер и долговечность.",
    ingredients: "Керамогранит, сталь, массив",
    unit: "1 шт · 220 см",
    specs: baseSpec([
      { label: "Долговечность", value: "98%" },
      { label: "Характер", value: "95%" },
    ]),
    note: "* Устойчив к влаге и теплу.",
  },
  {
    id: "cabinet-roots",
    ref: "PRO-0053",
    name: "Тумба «Грунт»",
    category: "Системы хранения",
    collection: "ROOTS",
    description:
      "ТВ-тумба в глубоком графитовом тоне с фактурными фасадами. Скрытые петли, удобный кабель-менеджмент.",
    ingredients: "МДФ, шпон, фактурная эмаль",
    unit: "1 шт · 180 см",
    specs: baseSpec([
      { label: "Вместимость", value: "92%" },
      { label: "Характер", value: "94%" },
    ]),
    note: "* Выход под кабели сзади.",
  },
];
