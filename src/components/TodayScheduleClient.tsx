'use client';

import { useState, useEffect } from 'react';
import type { ScheduleItem } from '@/lib/types';
import { DEMO_SCHEDULE } from '@/lib/demo-data';

const SCHEDULE_KEY = 'sg_schedule';

const categoryColors: Record<string, string> = {
  animation: '#c9a96e',
  show:      '#7c9cbf',
  sports:    '#6bab8a',
  kids:      '#c9856e',
};

const categoryLabel: Record<string, string> = {
  animation: 'ANIMATION',
  show:      'SHOW',
  sports:    'SPORT',
  kids:      'KIDS',
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
    <div className="px-4 pb-6 pt-5">
      <p
        className="text-xs uppercase mb-4"
        style={{
          color: '#8a9099',
          fontWeight: 600,
          letterSpacing: '0.15em',
        }}
      >
        {todayLabel}
      </p>

      {items.length === 0 ? (
        <p style={{ color: '#8a9099', fontSize: 14 }}>{noScheduleLabel}</p>
      ) : (
        <div className="flex flex-col">
          {items.map((item, idx) => {
            const dotColor = categoryColors[item.category] ?? '#c9a96e';
            const tag = categoryLabel[item.category] ?? item.category.toUpperCase();

            return (
              <div
                key={item.id}
                className="flex gap-4"
                style={{
                  paddingBottom: idx < items.length - 1 ? 0 : 0,
                }}
              >
                {/* Time column */}
                <div className="flex flex-col items-center" style={{ width: 48, flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#0c1824',
                      letterSpacing: '0.05em',
                      lineHeight: 1.4,
                      paddingTop: 2,
                    }}
                  >
                    {item.time_start}
                  </span>
                  {idx < items.length - 1 && (
                    <div
                      className="mt-1 flex-1"
                      style={{
                        width: 1,
                        minHeight: 32,
                        background: 'rgba(12,24,36,0.1)',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className="flex-1 pb-5"
                  style={{
                    borderBottom: idx < items.length - 1 ? '1px solid rgba(12,24,36,0.06)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: dotColor,
                        background: `${dotColor}18`,
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0c1824', lineHeight: 1.3 }}>
                    {locale === 'ru' ? item.title_ru : item.title_en}
                  </p>
                  <p style={{ fontSize: 12, color: '#8a9099', marginTop: 2 }}>
                    {locale === 'ru' ? item.location_ru : item.location_en}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
