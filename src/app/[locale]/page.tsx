import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { DEMO_SCHEDULE, DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';
import LangSwitch from '@/components/LangSwitch';

const categoryEmoji: Record<string, string> = {
  animation: '🎭',
  show: '🎪',
  sports: '⚽',
  kids: '🧸',
};

function ActionButtons({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const actions = [
    { key: 'towels', emoji: '🛁', href: `/${locale}/requests?type=towels`, bg: 'bg-amber-50 border-amber-200 text-amber-900' },
    { key: 'spa', emoji: '💆', href: `/${locale}/spa`, bg: 'bg-teal-50 border-teal-200 text-teal-900' },
    { key: 'wifi', emoji: '📶', href: '#wifi', bg: 'bg-sky-50 border-sky-200 text-sky-900', modal: true },
    { key: 'reception', emoji: '📞', href: 'tel:+0', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {actions.map((action) => (
        <Link
          key={action.key}
          href={action.href}
          className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 ${action.bg} active:scale-95 transition-transform min-h-[100px]`}
        >
          <span className="text-4xl">{action.emoji}</span>
          <span className="font-semibold text-sm text-center leading-tight">
            {t(`actions.${action.key}`)}
          </span>
        </Link>
      ))}
    </div>
  );
}

function TodaySchedule({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const tCat = useTranslations('schedule.category');

  return (
    <div className="px-4 pb-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {t('today')}
      </h2>
      {DEMO_SCHEDULE.length === 0 ? (
        <p className="text-gray-400 text-sm">{t('noSchedule')}</p>
      ) : (
        <div className="space-y-2">
          {DEMO_SCHEDULE.map((item) => (
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  const urgent = DEMO_ANNOUNCEMENTS.filter((a) => a.is_urgent);

  return (
    <div>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-blue-200">{t('welcome')}</p>
            <h1 className="text-xl font-bold leading-tight">{t('hotel')}</h1>
          </div>
          <LangSwitch />
        </div>
      </div>

      {/* Urgent announcement */}
      {urgent.length > 0 && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
          🚨 {locale === 'ru' ? urgent[0].title_ru : urgent[0].title_en}
        </div>
      )}

      {/* Action buttons */}
      <ActionButtons locale={locale} />

      {/* Today's schedule */}
      <TodaySchedule locale={locale} />
    </div>
  );
}
