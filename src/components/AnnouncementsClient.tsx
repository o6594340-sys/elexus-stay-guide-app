'use client';

import { useState, useEffect } from 'react';
import type { Announcement } from '@/lib/types';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

const ANNOUNCE_KEY = 'sg_announcements';

export default function AnnouncementsClient({ locale }: { locale: string }) {
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
    <div
      className="mx-4 mt-4 px-4 py-3 rounded-xl flex items-start gap-3"
      style={{
        background: 'rgba(201,169,110,0.08)',
        border: '1px solid rgba(201,169,110,0.3)',
        borderLeft: '3px solid #c9a96e',
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a96e', marginTop: 5, flexShrink: 0 }} />
      <p style={{ fontSize: 13, fontWeight: 500, color: '#1e2a35', lineHeight: 1.5 }}>
        {locale === 'ru' ? urgent[0].title_ru : urgent[0].title_en}
      </p>
    </div>
  );
}
