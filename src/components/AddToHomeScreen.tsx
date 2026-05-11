'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function AddToHomeScreen() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('sg_pwa_dismissed');
    if (dismissed) return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);
    if (isStandalone) return;

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    if (ios) {
      setTimeout(() => setShow(true), 3000);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('sg_pwa_dismissed', '1');
  };

  const install = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0">🏨</div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm">Добавить на экран</p>
            {isIOS ? (
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Нажмите <span className="font-semibold">Поделиться</span> → «На экран Домой» — приложение всегда будет под рукой
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Установите приложение для быстрого доступа без браузера
              </p>
            )}
          </div>
          <button onClick={dismiss} className="text-gray-300 hover:text-gray-500 text-xl leading-none flex-shrink-0">
            ×
          </button>
        </div>

        {!isIOS && deferredPrompt && (
          <button
            onClick={install}
            className="mt-3 w-full py-2.5 bg-blue-700 text-white font-semibold rounded-xl text-sm"
          >
            Установить
          </button>
        )}

        {isIOS && (
          <div className="mt-3 flex items-center justify-center gap-2 bg-gray-50 rounded-xl p-2.5">
            <span className="text-lg">⬆️</span>
            <span className="text-xs text-gray-600 font-medium">Поделиться → На экран «Домой»</span>
          </div>
        )}
      </div>
    </div>
  );
}
