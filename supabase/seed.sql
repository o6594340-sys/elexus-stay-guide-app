-- Elexus Hotel seed data
-- Run AFTER schema.sql

INSERT INTO hotels (slug, name, primary_color)
VALUES ('elexus', 'Elexus Hotel & Resort', '#1a3a5c')
ON CONFLICT (slug) DO NOTHING;

-- Get hotel_id for subsequent inserts
DO $$
DECLARE hotel_uuid UUID;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE slug = 'elexus';

  -- Restaurants
  INSERT INTO restaurants (hotel_id, name_ru, name_en, description_ru, description_en, opening_hours_ru, opening_hours_en, dress_code, is_reservation_required, is_included, sort_order)
  VALUES
    (hotel_uuid, 'Главный ресторан', 'Main Restaurant', 'Шведский стол — завтрак, обед и ужин', 'Buffet — breakfast, lunch and dinner', '07:00–10:00 · 12:30–14:30 · 18:30–22:00', '07:00–10:00 · 12:30–14:30 · 18:30–22:00', 'Casual', false, true, 1),
    (hotel_uuid, 'Orient A la Carte', 'Orient A la Carte', 'Средиземноморская кухня — ужин по резервации', 'Mediterranean cuisine — dinner by reservation', '19:00–22:30', '19:00–22:30', 'Smart casual', true, true, 2),
    (hotel_uuid, 'Aqua Bar', 'Aqua Bar', 'Бар у бассейна — напитки и лёгкие закуски', 'Pool bar — drinks and light snacks', '10:00–19:00', '10:00–19:00', null, false, true, 3),
    (hotel_uuid, 'Beach Bar', 'Beach Bar', 'Бар на пляже — освежающие напитки', 'Beach bar — refreshing drinks', '10:00–17:00', '10:00–17:00', null, false, true, 4),
    (hotel_uuid, 'Sky Bar', 'Sky Bar', 'Бар на крыше с видом на море', 'Rooftop bar with sea view', '20:00–02:00', '20:00–02:00', null, false, true, 5);

  -- Package items
  INSERT INTO package_items (hotel_id, category, name_ru, name_en, is_included, sort_order)
  VALUES
    (hotel_uuid, 'food', 'Завтрак (шведский стол)', 'Breakfast (buffet)', true, 1),
    (hotel_uuid, 'food', 'Обед (шведский стол)', 'Lunch (buffet)', true, 2),
    (hotel_uuid, 'food', 'Ужин (шведский стол + Orient по резервации)', 'Dinner (buffet + Orient by reservation)', true, 3),
    (hotel_uuid, 'drinks', 'Местные напитки (алко + безалко)', 'Local drinks (alcoholic + non-alcoholic)', true, 4),
    (hotel_uuid, 'drinks', 'Импортные напитки', 'Imported drinks', false, 5),
    (hotel_uuid, 'beach', 'Пляж и лежаки', 'Beach & sunbeds', true, 6),
    (hotel_uuid, 'beach', 'Водные виды спорта', 'Water sports', false, 7),
    (hotel_uuid, 'services', 'Сейф в номере', 'In-room safe', true, 8),
    (hotel_uuid, 'services', 'Мини-бар', 'Mini bar', false, 9),
    (hotel_uuid, 'services', 'Спа-процедуры', 'Spa treatments', false, 10),
    (hotel_uuid, 'services', 'Экскурсии', 'Excursions', false, 11);

  -- Schedule (today's date)
  INSERT INTO schedule_items (hotel_id, date, time_start, title_ru, title_en, location_ru, location_en, category)
  VALUES
    (hotel_uuid, CURRENT_DATE, '09:00', 'Йога на пляже', 'Yoga on the beach', 'Пляж', 'Beach', 'sports'),
    (hotel_uuid, CURRENT_DATE, '10:30', 'Аквааэробика', 'Aqua aerobics', 'Бассейн', 'Pool', 'animation'),
    (hotel_uuid, CURRENT_DATE, '15:00', 'Детский клуб', 'Kids'' club', 'Детский центр', 'Kids center', 'kids'),
    (hotel_uuid, CURRENT_DATE, '17:00', 'Дартс — турнир', 'Darts tournament', 'Зона анимации', 'Animation area', 'sports'),
    (hotel_uuid, CURRENT_DATE, '21:00', 'Вечернее шоу «Средиземноморская ночь»', 'Evening show «Mediterranean Night»', 'Амфитеатр', 'Amphitheatre', 'show'),
    (hotel_uuid, CURRENT_DATE, '23:00', 'DJ Night', 'DJ Night', 'Sky Bar', 'Sky Bar', 'show');

  -- Spa services
  INSERT INTO spa_services (hotel_id, name_ru, name_en, description_ru, description_en, price_usd, duration_minutes, sort_order)
  VALUES
    (hotel_uuid, 'Шведский массаж', 'Swedish Massage', 'Расслабляющий массаж всего тела', 'Full body relaxation massage', 80, 60, 1),
    (hotel_uuid, 'Глубокий массаж тканей', 'Deep Tissue Massage', 'Интенсивная работа с глубокими мышцами', 'Intensive work with deep muscle layers', 90, 60, 2),
    (hotel_uuid, 'Турецкий хаммам', 'Turkish Hammam', 'Традиционная парная с пилингом', 'Traditional steam bath with scrub', 60, 45, 3),
    (hotel_uuid, 'Хаммам + массаж', 'Hammam + Massage', 'Комплекс: парная + расслабляющий массаж', 'Package: steam bath + relaxing massage', 120, 90, 4),
    (hotel_uuid, 'Уход за лицом', 'Facial Treatment', 'Очищение и увлажнение кожи лица', 'Cleansing and hydrating facial', 70, 60, 5),
    (hotel_uuid, 'Маникюр + педикюр', 'Manicure + Pedicure', 'Классический уход за ногтями', 'Classic nail care', 45, 60, 6);

  -- Welcome announcement
  INSERT INTO announcements (hotel_id, title_ru, title_en, body_ru, body_en, is_urgent)
  VALUES
    (hotel_uuid, 'Добро пожаловать в Elexus Hotel & Resort!', 'Welcome to Elexus Hotel & Resort!',
     'Наша команда готова сделать ваш отдых незабываемым. Ресепшен работает 24/7.',
     'Our team is here to make your stay unforgettable. Reception is open 24/7.', false);

END $$;
