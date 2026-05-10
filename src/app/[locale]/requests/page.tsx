import { getTranslations } from 'next-intl/server';
import RequestsClient from './RequestsClient';

export default async function RequestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; service?: string }>;
}) {
  const { locale } = await params;
  const { type, service } = await searchParams;
  const t = await getTranslations('requests');

  const requestTypes = [
    { value: 'towels', label: t('types.towels') },
    { value: 'spa_booking', label: t('types.spa_booking') },
    { value: 'reception', label: t('types.reception') },
    { value: 'room_service', label: t('types.room_service') },
  ];

  return (
    <div>
      <div
        className="px-4 pt-12 pb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      <RequestsClient
        locale={locale}
        preselectedType={type ?? ''}
        prefilledNote={service ? (locale === 'ru' ? `Услуга: ${service}` : `Service: ${service}`) : ''}
        requestTypes={requestTypes}
        labels={{
          new: t('new'),
          roomLabel: t('roomLabel'),
          roomPlaceholder: t('roomPlaceholder'),
          typeLabel: t('typeLabel'),
          noteLabel: t('noteLabel'),
          notePlaceholder: t('notePlaceholder'),
          submit: t('submit'),
          submitting: t('submitting'),
          sent: t('sent'),
          history: t('history'),
          empty: t('empty'),
          statusNew: t('status.new'),
          statusInProgress: t('status.in_progress'),
          statusDone: t('status.done'),
        }}
      />
    </div>
  );
}
