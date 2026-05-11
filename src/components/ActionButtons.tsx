'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ActionButtons({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const [wifiOpen, setWifiOpen] = useState(false);

  const actions = [
    { key: 'towels', emoji: '🛁', href: `/${locale}/requests?type=towels`, bg: 'bg-amber-50 border-amber-200 text-amber-900' },
    { key: 'spa', emoji: '💆', href: `/${locale}/spa`, bg: 'bg-teal-50 border-teal-200 text-teal-900' },
    { key: 'wifi', emoji: '📶', href: null, bg: 'bg-sky-50 border-sky-200 text-sky-900' },
    { key: 'reception', emoji: '📞', href: 'tel:+90000000000', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
  ] as const;

  const baseClass =
    'flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 active:scale-95 transition-transform min-h-[100px]';

  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-4">
        {actions.map((action) =>
          action.key === 'wifi' ? (
            <button
              key="wifi"
              onClick={() => setWifiOpen(true)}
              className={`${baseClass} ${action.bg} w-full`}
            >
              <span className="text-4xl">{action.emoji}</span>
              <span className="font-semibold text-sm text-center leading-tight">
                {t('actions.wifi')}
              </span>
            </button>
          ) : (
            <Link
              key={action.key}
              href={action.href!}
              className={`${baseClass} ${action.bg}`}
            >
              <span className="text-4xl">{action.emoji}</span>
              <span className="font-semibold text-sm text-center leading-tight">
                {t(`actions.${action.key}`)}
              </span>
            </Link>
          )
        )}
      </div>

      {/* Wi-Fi modal */}
      {wifiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
          onClick={() => setWifiOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-3">📶</div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t('wifi.title')}</h2>
            <p className="text-sm text-gray-500 mb-4">{t('wifi.network')}</p>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl px-4 py-3 mb-4">
              <p className="text-xs text-sky-600 font-medium mb-1">{t('wifi.passwordLabel')}</p>
              <p className="text-xl font-bold text-sky-900 tracking-widest">
                {t('wifi.password')}
              </p>
            </div>
            <button
              onClick={() => setWifiOpen(false)}
              className="w-full py-3 bg-blue-700 text-white font-semibold rounded-2xl"
            >
              {t('wifi.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
