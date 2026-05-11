'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const tabs = [
  { key: 'home', href: '/', icon: '🏠' },
  { key: 'restaurants', href: '/restaurants', icon: '🍽' },
  { key: 'included', href: '/included', icon: '✅' },
  { key: 'map', href: '/map', icon: '🗺️' },
  { key: 'requests', href: '/requests', icon: '📋' },
] as const;

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const localePath = `/${locale}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
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
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive ? 'text-blue-700' : 'text-gray-400'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="leading-tight">{t(tab.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
