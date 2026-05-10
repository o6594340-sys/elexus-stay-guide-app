import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { DEMO_SPA } from '@/lib/demo-data';

export default async function SpaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('spa');
  const tReq = await getTranslations('requests');

  return (
    <div>
      <div
        className="px-4 pt-12 pb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      <div className="p-4 space-y-3">
        {DEMO_SPA.map((service) => (
          <div key={service.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="font-bold text-gray-900">
                {locale === 'ru' ? service.name_ru : service.name_en}
              </h2>
              <span className="shrink-0 text-sm font-bold text-teal-700">
                {t('from')}{service.price_usd}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              {locale === 'ru' ? service.description_ru : service.description_en}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                ⏱ {service.duration_minutes} {t('duration')}
              </span>
              <Link
                href={`/${locale}/requests?type=spa_booking&service=${encodeURIComponent(
                  locale === 'ru' ? service.name_ru : service.name_en
                )}`}
                className="bg-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full active:scale-95 transition-transform"
              >
                {t('book')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
