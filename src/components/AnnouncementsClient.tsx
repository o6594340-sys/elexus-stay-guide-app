'use client';

import { useState, useEffect } from 'react';
import type { Announcement } from '@/lib/types';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

const ANNOUNCE_KEY = 'sg_announcements';

interface Props {
  locale: string;
}

export default function AnnouncementsClient({ locale }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(DEMO_ANNOUNCEMENTS);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem(ANNOUNCE_KEY);
      setAnnouncements(stored ? JSON.parse(stored) : DEMO_ANNOUNCEMENTS);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const urgent = announcements.filter((a) => a.is_urgent);
  if (urgent.length === 0) return null;

  return (
    <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800 font-medium">
      🚨 {locale === 'ru' ? urgent[0].title_ru : urgent[0].title_en}
    </div>
  );
}
