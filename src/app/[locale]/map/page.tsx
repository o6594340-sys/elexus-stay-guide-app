import { getTranslations } from 'next-intl/server';

const ZONES = [
  { id: 'sea', emoji: '🌊', bg: 'bg-blue-100 border-blue-200', text: 'text-blue-800', span: 'col-span-2' },
  { id: 'beach', emoji: '🏖️', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', span: '' },
  { id: 'pool', emoji: '🏊', bg: 'bg-sky-100 border-sky-200', text: 'text-sky-800', span: '' },
  { id: 'spa', emoji: '💆', bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', span: '' },
  { id: 'restaurants', emoji: '🍽️', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-800', span: '' },
  { id: 'hotel', emoji: '🏨', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-800', span: 'col-span-2' },
  { id: 'amphitheatre', emoji: '🎭', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-800', span: '' },
  { id: 'kids', emoji: '🧸', bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', span: '' },
  { id: 'reception', emoji: '📞', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800', span: '' },
  { id: 'parking', emoji: '🚗', bg: 'bg-gray-100 border-gray-200', text: 'text-gray-700', span: '' },
];

const LANDMARKS = [
  { emoji: '📞', id: 'reception', floor: '1', open: '24/7' },
  { emoji: '🍽️', id: 'restaurants', floor: '1', open: '07:00–22:30' },
  { emoji: '🏊', id: 'pool', floor: '—', open: '08:00–20:00' },
  { emoji: '🏖️', id: 'beach', floor: '—', open: '08:00–19:00' },
  { emoji: '💆', id: 'spa', floor: '2', open: '09:00–21:00' },
  { emoji: '🎭', id: 'amphitheatre', floor: '—', open: '21:00–23:00' },
  { emoji: '🧸', id: 'kids', floor: '1', open: '09:00–18:00' },
  { emoji: '🚗', id: 'parking', floor: '—', open: '24/7' },
];

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations('map');

  return (
    <div>
      <div
        className="px-4 pt-12 pb-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563eb 100%)' }}
      >
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-blue-200 text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* Schematic map */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              className={`${zone.span} border-2 ${zone.bg} rounded-2xl p-3 flex flex-col items-center justify-center gap-1 min-h-[72px]`}
            >
              <span className="text-2xl">{zone.emoji}</span>
              <span className={`text-xs font-semibold text-center ${zone.text}`}>
                {t(`zones.${zone.id}`)}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-3 mb-5">
          ↑ {t('northIsUp')}
        </p>

        {/* Landmark list */}
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {t('landmarks')}
        </h2>
        <div className="space-y-2">
          {LANDMARKS.map((lm) => (
            <div
              key={lm.id}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lm.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{t(`zones.${lm.id}`)}</p>
                  {lm.floor !== '—' && (
                    <p className="text-xs text-gray-400">{t('floor')} {lm.floor}</p>
                  )}
                </div>
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                {lm.open}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
