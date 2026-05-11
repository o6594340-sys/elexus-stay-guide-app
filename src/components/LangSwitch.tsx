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
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.1em',
        color: '#c9a96e',
        background: 'rgba(201,169,110,0.15)',
        border: '1px solid rgba(201,169,110,0.3)',
        borderRadius: 20,
        padding: '4px 12px',
        transition: 'background 150ms ease',
        cursor: 'pointer',
      }}
    >
      {locale === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
