import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LangSwitch from '@/components/LangSwitch';
import TodayScheduleClient from '@/components/TodayScheduleClient';
import AnnouncementsClient from '@/components/AnnouncementsClient';

function ActionButtons({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const actions = [
    { key: 'towels', emoji: '🛁', href: `/${locale}/requests?type=towels`, bg: 'bg-amber-50 border-amber-200 text-amber-900' },
    { key: 'spa', emoji: '💆', href: `/${locale}/spa`, bg: 'bg-teal-50 border-teal-200 text-teal-900' },
    { key: 'wifi', emoji: '📶', href: '#wifi', bg: 'bg-sky-50 border-sky-200 text-sky-900' },
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div>
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

      <AnnouncementsClient locale={locale} />
      <ActionButtons locale={locale} />
      <TodayScheduleClient
        locale={locale}
        todayLabel={t('today')}
        noScheduleLabel={t('noSchedule')}
      />
    </div>
  );
}
