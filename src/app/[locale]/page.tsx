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
