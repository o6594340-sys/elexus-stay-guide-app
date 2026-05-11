'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GuestRequest, ScheduleItem, Announcement } from '@/lib/types';
import { DEMO_SCHEDULE, DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

const DEMO_PASSWORD = 'demo1234';
const ADMIN_KEY = 'sg_admin_auth';
const REQUESTS_KEY = 'sg_requests';
const SCHEDULE_KEY = 'sg_schedule';
const ANNOUNCE_KEY = 'sg_announcements';
const SCHEDULE_UPDATED_KEY = 'sg_schedule_updated';

type Tab = 'requests' | 'schedule' | 'announcements';

const REQUEST_LABELS: Record<string, string> = {
  towels: 'Полотенца / Хаускипинг',
  spa_booking: 'Запись в спа',
  reception: 'Вопрос на ресепшен',
  room_service: 'Рум-сервис',
};

const CATEGORY_LABELS: Record<string, string> = {
  animation: 'Анимация',
  show: 'Шоу',
  sports: 'Спорт',
  kids: 'Дети',
};

function statusStyle(status: string) {
  if (status === 'done') return 'bg-green-100 text-green-800';
  if (status === 'in_progress') return 'bg-amber-100 text-amber-800';
  return 'bg-blue-100 text-blue-800';
}

function statusLabel(status: string) {
  if (status === 'done') return 'Выполнено';
  if (status === 'in_progress') return 'В работе';
  return 'Новый';
}

function LoginScreen({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) setError('Неверный пароль');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏨</div>
          <h1 className="text-2xl font-bold text-white">StayGuide CMS</h1>
          <p className="text-slate-400 mt-1">Elexus Hotel & Resort</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Введите пароль"
              autoFocus
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
          >
            Войти
          </button>
          <p className="text-xs text-center text-gray-400">
            Демо-пароль: <span className="font-mono font-bold text-gray-600">{DEMO_PASSWORD}</span>
          </p>
        </form>
      </div>
    </div>
  );
}

function RequestsTab({
  requests,
  onStatusChange,
}: {
  requests: GuestRequest[];
  onStatusChange: (id: string, status: GuestRequest['status']) => void;
}) {
  const newCount = requests.filter((r) => r.status === 'new').length;

  return (
    <div className="p-4 space-y-3">
      {newCount > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 font-medium">
          🔔 {newCount} новых запрос{newCount === 1 ? '' : newCount < 5 ? 'а' : 'ов'} от гостей
        </div>
      )}
      {requests.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-sm">Запросов пока нет</p>
          <p className="text-xs mt-1 text-gray-300">Они появятся здесь когда гости начнут отправлять</p>
        </div>
      )}
      {requests.map((req) => (
        <div key={req.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="font-semibold text-gray-800 text-sm">
                {REQUEST_LABELS[req.request_type] ?? req.request_type}
              </span>
              <span className="ml-2 text-sm text-gray-400">· Номер {req.room_number}</span>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${statusStyle(req.status)}`}>
              {statusLabel(req.status)}
            </span>
          </div>
          {req.note && <p className="text-sm text-gray-600 mb-3 bg-gray-50 rounded-lg px-3 py-2">{req.note}</p>}
          <p className="text-xs text-gray-400 mb-3">
            {new Date(req.created_at).toLocaleString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              day: 'numeric',
              month: 'short',
            })}
          </p>
          {req.status !== 'done' && (
            <div className="flex gap-2">
              {req.status === 'new' && (
                <button
                  onClick={() => onStatusChange(req.id, 'in_progress')}
                  className="flex-1 py-2 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  В работе
                </button>
              )}
              <button
                onClick={() => onStatusChange(req.id, 'done')}
                className="flex-1 py-2 text-xs font-semibold bg-green-50 text-green-800 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
              >
                Выполнено ✓
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ScheduleTab({
  items,
  onSave,
}: {
  items: ScheduleItem[];
  onSave: (items: ScheduleItem[]) => void;
}) {
  const [time, setTime] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [locationRu, setLocationRu] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [category, setCategory] = useState('animation');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !titleRu) return;
    const newItem: ScheduleItem = {
      id: crypto.randomUUID(),
      date: 'today',
      time_start: time,
      title_ru: titleRu,
      title_en: titleEn || titleRu,
      location_ru: locationRu,
      location_en: locationEn || locationRu,
      category,
    };
    onSave([...items, newItem].sort((a, b) => a.time_start.localeCompare(b.time_start)));
    setTime('');
    setTitleRu('');
    setTitleEn('');
    setLocationRu('');
    setLocationEn('');
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={addItem} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-gray-700 text-sm">Добавить событие</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Время</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            >
              {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Название (RU) *</label>
          <input
            value={titleRu}
            onChange={(e) => setTitleRu(e.target.value)}
            required
            placeholder="Вечернее шоу «Средиземноморская ночь»"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Название (EN, если отличается)</label>
          <input
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Evening show «Mediterranean Night»"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Место (RU)</label>
            <input
              value={locationRu}
              onChange={(e) => setLocationRu(e.target.value)}
              placeholder="Амфитеатр"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Место (EN)</label>
            <input
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              placeholder="Amphitheatre"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-sm"
        >
          + Добавить в расписание
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 && (
          <p className="text-center py-8 text-gray-400 text-sm">Расписание пустое</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono font-bold text-blue-700 text-sm tabular-nums flex-shrink-0">
                {item.time_start}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.title_ru}</p>
                <p className="text-xs text-gray-400">
                  {item.location_ru} · {CATEGORY_LABELS[item.category] ?? item.category}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSave(items.filter((i) => i.id !== item.id))}
              className="text-gray-300 hover:text-red-400 transition-colors text-2xl leading-none flex-shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsTab({
  items,
  onSave,
}: {
  items: Announcement[];
  onSave: (items: Announcement[]) => void;
}) {
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [bodyRu, setBodyRu] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const addAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRu) return;
    const newItem: Announcement = {
      id: crypto.randomUUID(),
      title_ru: titleRu,
      title_en: titleEn || titleRu,
      body_ru: bodyRu || undefined,
      body_en: bodyRu || undefined,
      is_urgent: isUrgent,
    };
    onSave([newItem, ...items]);
    setTitleRu('');
    setTitleEn('');
    setBodyRu('');
    setIsUrgent(false);
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={addAnnouncement} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-gray-700 text-sm">Новое объявление</h3>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Заголовок (RU) *</label>
          <input
            value={titleRu}
            onChange={(e) => setTitleRu(e.target.value)}
            required
            placeholder="Бассейн закрыт до 15:00"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Заголовок (EN)</label>
          <input
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Pool closed until 15:00"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Текст (необязательно)</label>
          <textarea
            value={bodyRu}
            onChange={(e) => setBodyRu(e.target.value)}
            rows={2}
            placeholder="Дополнительные детали..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer" onClick={() => setIsUrgent(!isUrgent)}>
          <div className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${isUrgent ? 'bg-red-500' : 'bg-gray-200'}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isUrgent ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-gray-700">Срочное объявление 🚨 (показать на главной)</span>
        </label>
        <button
          type="submit"
          className={`w-full py-2.5 font-semibold rounded-xl transition-colors text-sm text-white ${isUrgent ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'}`}
        >
          Опубликовать
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 && (
          <p className="text-center py-8 text-gray-400 text-sm">Объявлений нет</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border p-3 shadow-sm flex items-start justify-between gap-2 ${item.is_urgent ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}
          >
            <div className="flex-1 min-w-0">
              {item.is_urgent && <span className="text-xs font-bold text-red-600 mr-1">🚨 СРОЧНО</span>}
              <span className="text-sm font-medium text-gray-800">{item.title_ru}</span>
              {item.body_ru && <p className="text-xs text-gray-500 mt-0.5">{item.body_ru}</p>}
            </div>
            <button
              onClick={() => onSave(items.filter((i) => i.id !== item.id))}
              className="text-gray-300 hover:text-red-400 transition-colors text-2xl leading-none flex-shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('requests');
  const [requests, setRequests] = useState<GuestRequest[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(DEMO_SCHEDULE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(DEMO_ANNOUNCEMENTS);
  const [lastScheduleUpdate, setLastScheduleUpdate] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(ADMIN_KEY) === 'true');

    const reqs = localStorage.getItem(REQUESTS_KEY);
    if (reqs) setRequests(JSON.parse(reqs));

    const sched = localStorage.getItem(SCHEDULE_KEY);
    if (sched) setSchedule(JSON.parse(sched));

    const ann = localStorage.getItem(ANNOUNCE_KEY);
    if (ann) setAnnouncements(JSON.parse(ann));

    setLastScheduleUpdate(localStorage.getItem(SCHEDULE_UPDATED_KEY));
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === REQUESTS_KEY) {
        const reqs = localStorage.getItem(REQUESTS_KEY);
        setRequests(reqs ? JSON.parse(reqs) : []);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = useCallback((pw: string) => {
    if (pw === DEMO_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, 'true');
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_KEY);
    setAuthed(false);
  }, []);

  const updateRequestStatus = useCallback((id: string, status: GuestRequest['status']) => {
    setRequests((prev) => {
      const updated = prev.map((r) =>
        r.id === id ? { ...r, status, updated_at: new Date().toISOString() } : r
      );
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveSchedule = useCallback((items: ScheduleItem[]) => {
    const now = new Date().toISOString();
    setSchedule(items);
    setLastScheduleUpdate(now);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(items));
    localStorage.setItem(SCHEDULE_UPDATED_KEY, now);
  }, []);

  const saveAnnouncements = useCallback((items: Announcement[]) => {
    setAnnouncements(items);
    localStorage.setItem(ANNOUNCE_KEY, JSON.stringify(items));
  }, []);

  const isStale =
    lastScheduleUpdate
      ? Date.now() - new Date(lastScheduleUpdate).getTime() > 24 * 60 * 60 * 1000
      : false;

  if (!authed) return <LoginScreen onLogin={login} />;

  const newRequestCount = requests.filter((r) => r.status === 'new').length;

  const tabs: { key: Tab; label: string; badge: number }[] = [
    { key: 'requests', label: 'Запросы', badge: newRequestCount },
    { key: 'schedule', label: 'Расписание', badge: 0 },
    { key: 'announcements', label: 'Объявления', badge: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400">StayGuide CMS</div>
          <div className="font-bold text-sm">Elexus Hotel & Resort</div>
        </div>
        <button
          onClick={logout}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Выйти
        </button>
      </div>

      {isStale && (
        <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
          ⚠️ Расписание не обновлялось более 24 часов. Обновите программу на сегодня.
        </div>
      )}

      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
        {tabs.map(({ key, label, badge }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              tab === key
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            {badge > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'requests' && (
        <RequestsTab requests={requests} onStatusChange={updateRequestStatus} />
      )}
      {tab === 'schedule' && (
        <ScheduleTab items={schedule} onSave={saveSchedule} />
      )}
      {tab === 'announcements' && (
        <AnnouncementsTab items={announcements} onSave={saveAnnouncements} />
      )}
    </div>
  );
}
