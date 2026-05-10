import { getTranslations } from 'next-intl/server';
import { DEMO_RESTAURANTS } from '@/lib/demo-data';

export default async function RestaurantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('restaurants');

  return (
    <div>
      <div
        className="px-4 pt-12 pb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      <div className="divide-y divide-gray-100">
        {DEMO_RESTAURANTS.map((r) => (
          <div key={r.id} className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="font-bold text-gray-900 text-base">
                {locale === 'ru' ? r.name_ru : r.name_en}
              </h2>
              <span
                className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  r.is_included
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {r.is_included ? t('included') : t('paid')}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              {locale === 'ru' ? r.description_ru : r.description_en}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>🕐 {locale === 'ru' ? r.opening_hours_ru : r.opening_hours_en}</span>
              {r.dress_code && <span>👔 {r.dress_code}</span>}
              <span>
                {r.is_reservation_required ? `📞 ${t('reservation')}` : `✅ ${t('noReservation')}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
