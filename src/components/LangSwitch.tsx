'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'ru' ? 'en' : 'ru';
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <button
      onClick={toggle}
      className="text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-full transition-colors"
    >
      {locale === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
