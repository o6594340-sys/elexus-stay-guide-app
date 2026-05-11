import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import AddToHomeScreen from '@/components/AddToHomeScreen';

export const metadata: Metadata = {
  title: 'Elexus Hotel & Resort',
  description: 'Гид для гостей отеля',
  manifest: '/manifest.json',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative">
        <main className="pb-20">{children}</main>
        <Nav />
        <AddToHomeScreen />
      </div>
      <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))}` }} />
    </NextIntlClientProvider>
  );
}
