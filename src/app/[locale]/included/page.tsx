import { getTranslations } from 'next-intl/server';
import { DEMO_PACKAGE } from '@/lib/demo-data';

const categoryLabel: Record<string, { ru: string; en: string }> = {
  food: { ru: 'Питание', en: 'Food & Dining' },
  drinks: { ru: 'Напитки', en: 'Drinks' },
  beach: { ru: 'Пляж и активности', en: 'Beach & Activities' },
  services: { ru: 'Услуги', en: 'Services' },
};

export default async function IncludedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('included');

  const categories = [...new Set(DEMO_PACKAGE.map((i) => i.category))];

  return (
    <div>
      <div
        className="px-4 pt-12 pb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-sm text-blue-200 mt-1">{t('subtitle')}</p>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              {locale === 'ru' ? categoryLabel[cat]?.ru : categoryLabel[cat]?.en}
            </h2>
            <div className="space-y-2">
              {DEMO_PACKAGE.filter((i) => i.category === cat).map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    item.is_included
                      ? 'bg-green-50 border-green-100'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <span className="text-lg shrink-0">
                    {item.is_included ? '✅' : '❌'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.is_included ? 'text-gray-900' : 'text-gray-400'}`}>
                      {locale === 'ru' ? item.name_ru : item.name_en}
                    </p>
                    {item.note_ru && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {locale === 'ru' ? item.note_ru : item.note_en}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
