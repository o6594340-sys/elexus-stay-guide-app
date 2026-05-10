export interface Restaurant {
  id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  photo_url?: string;
  opening_hours_ru: string;
  opening_hours_en: string;
  dress_code?: string;
  is_reservation_required: boolean;
  is_included: boolean;
  sort_order: number;
}

export interface PackageItem {
  id: string;
  category: string;
  name_ru: string;
  name_en: string;
  is_included: boolean;
  note_ru?: string;
  note_en?: string;
  sort_order: number;
}

export interface ScheduleItem {
  id: string;
  date: string;
  time_start: string;
  title_ru: string;
  title_en: string;
  location_ru: string;
  location_en: string;
  category: string;
}

export interface SpaService {
  id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  price_usd: number;
  duration_minutes: number;
  sort_order: number;
}

export interface GuestRequest {
  id: string;
  room_number: string;
  request_type: string;
  note?: string;
  status: 'new' | 'in_progress' | 'done';
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title_ru: string;
  title_en: string;
  body_ru?: string;
  body_en?: string;
  is_urgent: boolean;
}
