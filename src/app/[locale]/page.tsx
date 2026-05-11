import { getTranslations } from 'next-intl/server';
import LangSwitch from '@/components/LangSwitch';
import TodayScheduleClient from '@/components/TodayScheduleClient';
import AnnouncementsClient from '@/components/AnnouncementsClient';
import ActionButtons from '@/components/ActionButtons';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div>
      {/* Header */}
      <div
        className="px-6 pt-12 pb-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0c1824 0%, #162336 100%)' }}
      >
        {/* Top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }}
        />

        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-xs uppercase tracking-[0.2em] mb-2"
              style={{ color: '#c9a96e', fontWeight: 500 }}
            >
              {t('welcome')}
            </p>
            <h1
              className="font-display text-[1.6rem] font-semibold leading-[1.15]"
              style={{ color: '#fff', letterSpacing: '-0.01em' }}
            >
              {t('hotel')}
            </h1>
          </div>
          <LangSwitch />
        </div>

        {/* Gold accent line */}
        <div
          className="mt-5 h-px w-10"
          style={{ background: '#c9a96e', opacity: 0.7 }}
        />
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
