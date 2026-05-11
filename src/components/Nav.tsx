'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.6} strokeLinecap="round" strokeLinejoin="round">
    {active ? (
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-1.72-1.72V5.25a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.81L13.06 3.53a2.25 2.25 0 00-3.18.06L2.47 11.47a.75.75 0 001.06 1.06l8.69-8.69zM12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    ) : (
      <>
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M5 10v11h14V10" />
      </>
    )}
  </svg>
);

const RestaurantIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
);

const CheckIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const MapIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
    <path d="M9 4v13" />
    <path d="M15 7v13" />
  </svg>
);

const RequestsIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </svg>
);

const tabs = [
  { key: 'home',        href: '/',           Icon: HomeIcon },
  { key: 'restaurants', href: '/restaurants', Icon: RestaurantIcon },
  { key: 'included',    href: '/included',    Icon: CheckIcon },
  { key: 'map',         href: '/map',         Icon: MapIcon },
  { key: 'requests',    href: '/requests',    Icon: RequestsIcon },
] as const;

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const localePath = `/${locale}`;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{
        background: '#fff',
        borderTop: '1px solid rgba(12,24,36,0.08)',
        boxShadow: '0 -4px 20px rgba(12,24,36,0.06)',
      }}
    >
      <div className="max-w-md mx-auto flex">
        {tabs.map((tab) => {
          const href = `${localePath}${tab.href}`;
          const isActive =
            tab.href === '/'
              ? pathname === localePath || pathname === `${localePath}/`
              : pathname.startsWith(`${localePath}${tab.href}`);

          return (
            <Link
              key={tab.key}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-2.5"
              style={{
                color: isActive ? '#c9a96e' : '#8a9099',
                transition: 'color 150ms ease',
              }}
            >
              <tab.Icon active={isActive} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {t(tab.key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
