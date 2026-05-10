import type { Restaurant, PackageItem, ScheduleItem, SpaService, Announcement } from './types';

export const DEMO_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name_ru: 'Главный ресторан',
    name_en: 'Main Restaurant',
    description_ru: 'Шведский стол — завтрак, обед и ужин',
    description_en: 'Buffet — breakfast, lunch and dinner',
    opening_hours_ru: '07:00–10:00 · 12:30–14:30 · 18:30–22:00',
    opening_hours_en: '07:00–10:00 · 12:30–14:30 · 18:30–22:00',
    dress_code: 'Casual',
    is_reservation_required: false,
    is_included: true,
    sort_order: 1,
  },
  {
    id: '2',
    name_ru: 'Orient A la Carte',
    name_en: 'Orient A la Carte',
    description_ru: 'Средиземноморская кухня — ужин по резервации',
    description_en: 'Mediterranean cuisine — dinner by reservation',
    opening_hours_ru: '19:00–22:30',
    opening_hours_en: '19:00–22:30',
    dress_code: 'Smart casual',
    is_reservation_required: true,
    is_included: true,
    sort_order: 2,
  },
  {
    id: '3',
    name_ru: 'Aqua Bar',
    name_en: 'Aqua Bar',
    description_ru: 'Бар у бассейна — напитки и лёгкие закуски',
    description_en: 'Pool bar — drinks and light snacks',
    opening_hours_ru: '10:00–19:00',
    opening_hours_en: '10:00–19:00',
    is_reservation_required: false,
    is_included: true,
    sort_order: 3,
  },
  {
    id: '4',
    name_ru: 'Beach Bar',
    name_en: 'Beach Bar',
    description_ru: 'Бар на пляже — освежающие напитки',
    description_en: 'Beach bar — refreshing drinks',
    opening_hours_ru: '10:00–17:00',
    opening_hours_en: '10:00–17:00',
    is_reservation_required: false,
    is_included: true,
    sort_order: 4,
  },
  {
    id: '5',
    name_ru: 'Sky Bar',
    name_en: 'Sky Bar',
    description_ru: 'Бар на крыше с видом на море — вечерняя атмосфера',
    description_en: 'Rooftop bar with sea view — evening atmosphere',
    opening_hours_ru: '20:00–02:00',
    opening_hours_en: '20:00–02:00',
    is_reservation_required: false,
    is_included: true,
    sort_order: 5,
  },
];

export const DEMO_PACKAGE: PackageItem[] = [
  { id: '1', category: 'food', name_ru: 'Завтрак (шведский стол)', name_en: 'Breakfast (buffet)', is_included: true, sort_order: 1 },
  { id: '2', category: 'food', name_ru: 'Обед (шведский стол)', name_en: 'Lunch (buffet)', is_included: true, sort_order: 2 },
  { id: '3', category: 'food', name_ru: 'Ужин (шведский стол + Orient по резервации)', name_en: 'Dinner (buffet + Orient by reservation)', is_included: true, sort_order: 3 },
  { id: '4', category: 'drinks', name_ru: 'Местные напитки (алко + безалко)', name_en: 'Local drinks (alcoholic + non-alcoholic)', is_included: true, sort_order: 4 },
  { id: '5', category: 'drinks', name_ru: 'Импортные напитки', name_en: 'Imported drinks', is_included: false, sort_order: 5 },
  { id: '6', category: 'beach', name_ru: 'Пляж и лежаки', name_en: 'Beach & sunbeds', is_included: true, sort_order: 6 },
  { id: '7', category: 'beach', name_ru: 'Водные виды спорта', name_en: 'Water sports', is_included: false, sort_order: 7 },
  { id: '8', category: 'services', name_ru: 'Сейф в номере', name_en: 'In-room safe', is_included: true, sort_order: 8 },
  { id: '9', category: 'services', name_ru: 'Мини-бар', name_en: 'Mini bar', is_included: false, sort_order: 9 },
  { id: '10', category: 'services', name_ru: 'Спа-процедуры', name_en: 'Spa treatments', is_included: false, sort_order: 10 },
  { id: '11', category: 'services', name_ru: 'Экскурсии', name_en: 'Excursions', is_included: false, sort_order: 11 },
];

export const DEMO_SCHEDULE: ScheduleItem[] = [
  { id: '1', date: 'today', time_start: '09:00', title_ru: 'Йога на пляже', title_en: 'Yoga on the beach', location_ru: 'Пляж', location_en: 'Beach', category: 'sports' },
  { id: '2', date: 'today', time_start: '10:30', title_ru: 'Аквааэробика', title_en: 'Aqua aerobics', location_ru: 'Бассейн', location_en: 'Pool', category: 'animation' },
  { id: '3', date: 'today', time_start: '15:00', title_ru: 'Детский клуб', title_en: "Kids' club", location_ru: 'Детский центр', location_en: 'Kids center', category: 'kids' },
  { id: '4', date: 'today', time_start: '17:00', title_ru: 'Дартс — турнир', title_en: 'Darts tournament', location_ru: 'Анимация', location_en: 'Animation area', category: 'sports' },
  { id: '5', date: 'today', time_start: '21:00', title_ru: 'Вечернее шоу «Средиземноморская ночь»', title_en: 'Evening show «Mediterranean Night»', location_ru: 'Амфитеатр', location_en: 'Amphitheatre', category: 'show' },
  { id: '6', date: 'today', time_start: '23:00', title_ru: 'DJ Night', title_en: 'DJ Night', location_ru: 'Sky Bar', location_en: 'Sky Bar', category: 'show' },
];

export const DEMO_SPA: SpaService[] = [
  { id: '1', name_ru: 'Шведский массаж', name_en: 'Swedish Massage', description_ru: 'Расслабляющий массаж всего тела', description_en: 'Full body relaxation massage', price_usd: 80, duration_minutes: 60, sort_order: 1 },
  { id: '2', name_ru: 'Глубокий массаж тканей', name_en: 'Deep Tissue Massage', description_ru: 'Интенсивная работа с глубокими мышцами', description_en: 'Intensive work with deep muscle layers', price_usd: 90, duration_minutes: 60, sort_order: 2 },
  { id: '3', name_ru: 'Турецкий хаммам', name_en: 'Turkish Hammam', description_ru: 'Традиционная парная с пилингом', description_en: 'Traditional steam bath with scrub', price_usd: 60, duration_minutes: 45, sort_order: 3 },
  { id: '4', name_ru: 'Хаммам + массаж', name_en: 'Hammam + Massage', description_ru: 'Комплекс: парная + расслабляющий массаж', description_en: 'Package: steam bath + relaxing massage', price_usd: 120, duration_minutes: 90, sort_order: 4 },
  { id: '5', name_ru: 'Уход за лицом', name_en: 'Facial Treatment', description_ru: 'Очищение и увлажнение кожи лица', description_en: 'Cleansing and hydrating facial', price_usd: 70, duration_minutes: 60, sort_order: 5 },
  { id: '6', name_ru: 'Маникюр + педикюр', name_en: 'Manicure + Pedicure', description_ru: 'Классический уход за ногтями', description_en: 'Classic nail care', price_usd: 45, duration_minutes: 60, sort_order: 6 },
];

export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title_ru: 'Добро пожаловать в Elexus Hotel & Resort!',
    title_en: 'Welcome to Elexus Hotel & Resort!',
    body_ru: 'Наша команда готова сделать ваш отдых незабываемым. Если нужна помощь — ресепшен работает 24/7.',
    body_en: 'Our team is here to make your stay unforgettable. Reception is open 24/7.',
    is_urgent: false,
  },
];
