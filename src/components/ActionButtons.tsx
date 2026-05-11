'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const TowelIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7z" />
    <path d="M4 12V6a1 1 0 011-1h3v5H4z" />
    <path d="M8 5h5.5a2.5 2.5 0 010 5H8V5z" />
  </svg>
);

const SpaIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
    <path d="M12 22V11" />
    <path d="M12 11c-2-3-5-4-7-4" />
    <path d="M12 11c2-3 5-4 7-4" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114.08 0" />
    <path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const actions = [
  { key: 'towels', Icon: TowelIcon, href: (locale: string) => `/${locale}/requests?type=towels` },
  { key: 'spa',    Icon: SpaIcon,   href: (locale: string) => `/${locale}/spa` },
  { key: 'wifi',   Icon: WifiIcon,  href: null },
  { key: 'reception', Icon: BellIcon, href: () => 'tel:+90000000000' },
] as const;

export default function ActionButtons({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const [wifiOpen, setWifiOpen] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(12,24,36,0.09)',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '20px 12px',
    minHeight: 108,
    transition: 'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
    cursor: 'pointer',
    color: '#0c1824',
    textDecoration: 'none',
  };

  const iconWrap: React.CSSProperties = {
    color: '#0c1824',
    opacity: 0.85,
  };

  const label: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.03em',
    textAlign: 'center',
    lineHeight: 1.2,
    color: '#1e2a35',
  };

  return (
    <>
      <div className="px-4 pt-4 pb-1">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const { Icon } = action;

            if (action.key === 'wifi') {
              return (
                <button
                  key="wifi"
                  onClick={() => setWifiOpen(true)}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(12,24,36,0.1)';
                    (e.currentTarget as HTMLElement).style.borderColor = '#c9a96e';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(12,24,36,0.09)';
                  }}
                >
                  <span style={iconWrap}><Icon /></span>
                  <span style={label}>{t('actions.wifi')}</span>
                </button>
              );
            }

            return (
              <Link
                key={action.key}
                href={action.href(locale)}
                style={cardStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(12,24,36,0.1)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#c9a96e';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(12,24,36,0.09)';
                }}
              >
                <span style={iconWrap}><Icon /></span>
                <span style={label}>{t(`actions.${action.key}`)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Wi-Fi modal */}
      {wifiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: 'rgba(12,24,36,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setWifiOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-7"
            style={{ background: '#fff' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: '#e0e0e0' }} />

            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: '#f0ece0', color: '#0c1824' }}
              >
                <WifiIcon />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1824' }}>
                  {t('wifi.title')}
                </h2>
                <p className="text-xs" style={{ color: '#8a9099' }}>{t('wifi.network')}</p>
              </div>
            </div>

            <div
              className="rounded-2xl px-5 py-4 mb-5"
              style={{ background: '#faf9f6', border: '1px solid rgba(12,24,36,0.08)' }}
            >
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8a9099', fontWeight: 500 }}>
                {t('wifi.passwordLabel')}
              </p>
              <p
                className="text-2xl font-semibold tracking-[0.15em]"
                style={{ color: '#0c1824', fontFamily: 'monospace' }}
              >
                {t('wifi.password')}
              </p>
            </div>

            <button
              onClick={() => setWifiOpen(false)}
              className="w-full py-4 font-semibold text-sm tracking-wide rounded-2xl transition-opacity"
              style={{ background: '#0c1824', color: '#fff', letterSpacing: '0.05em' }}
            >
              {t('wifi.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
