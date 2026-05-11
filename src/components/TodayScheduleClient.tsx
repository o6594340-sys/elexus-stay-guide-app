'use client';

import { useState, useEffect } from 'react';
import type { ScheduleItem } from '@/lib/types';
import { DEMO_SCHEDULE } from '@/lib/demo-data';

const SCHEDULE_KEY = 'sg_schedule';

const categoryEmoji: Record<string, string> = {
  animation: '🎭',
  show: '🎪',
  sports: '⚽',
  kids: '🧸',
};

interface Props {
  locale: string;
  todayLabel: string;
  noScheduleLabel: string;
}

export default function TodayScheduleClient({ locale, todayLabel, noScheduleLabel }: Props) {
  const [items, setItems] = useState<ScheduleItem[]>(DEMO_SCHEDULE);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem(SCHEDULE_KEY);
      setItems(stored ? JSON.parse(stored) : DEMO_SCHEDULE);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  return (
    <div className="px-4 pb-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {todayLabel}
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">{noScheduleLabel}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
              <span className="text-xl mt-0.5">{categoryEmoji[item.category] ?? '📌'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-gray-700 tabular-nums">{item.time_start}</span>
                  <span className="text-sm text-gray-800 truncate">
                    {locale === 'ru' ? item.title_ru : item.title_en}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {locale === 'ru' ? item.location_ru : item.location_en}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
