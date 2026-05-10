'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { GuestRequest } from '@/lib/types';

const ROOM_KEY = 'sg_room_number';
const REQUESTS_KEY = 'sg_requests';

interface Labels {
  new: string;
  roomLabel: string;
  roomPlaceholder: string;
  typeLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  submit: string;
  submitting: string;
  sent: string;
  history: string;
  empty: string;
  statusNew: string;
  statusInProgress: string;
  statusDone: string;
}

interface Props {
  locale: string;
  preselectedType: string;
  prefilledNote: string;
  requestTypes: { value: string; label: string }[];
  labels: Labels;
}

function statusStyle(status: string) {
  if (status === 'done') return 'bg-green-100 text-green-800';
  if (status === 'in_progress') return 'bg-amber-100 text-amber-800';
  return 'bg-blue-100 text-blue-800';
}

function statusLabel(status: string, labels: Labels) {
  if (status === 'done') return labels.statusDone;
  if (status === 'in_progress') return labels.statusInProgress;
  return labels.statusNew;
}

export default function RequestsClient({
  locale,
  preselectedType,
  prefilledNote,
  requestTypes,
  labels,
}: Props) {
  const [room, setRoom] = useState('');
  const [type, setType] = useState(preselectedType || requestTypes[0]?.value || '');
  const [note, setNote] = useState(prefilledNote);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [requests, setRequests] = useState<GuestRequest[]>([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(ROOM_KEY);
    if (saved) setRoom(saved);

    const savedReqs = localStorage.getItem(REQUESTS_KEY);
    if (savedReqs) {
      try { setRequests(JSON.parse(savedReqs)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (preselectedType) setType(preselectedType);
  }, [preselectedType]);

  useEffect(() => {
    if (prefilledNote) setNote(prefilledNote);
  }, [prefilledNote]);

  const saveRequests = useCallback((reqs: GuestRequest[]) => {
    setRequests(reqs);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(reqs));
  }, []);

  // Subscribe to Supabase realtime if available
  useEffect(() => {
    if (!supabase || !room) return;

    const channel = supabase
      .channel('guest_requests')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guest_requests', filter: `room_number=eq.${room}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            saveRequests([payload.new as GuestRequest, ...requests]);
          } else if (payload.eventType === 'UPDATE') {
            saveRequests(requests.map((r) => r.id === payload.new.id ? payload.new as GuestRequest : r));
          }
        }
      )
      .subscribe();

    return () => { supabase?.removeChannel(channel); };
  }, [supabase, room, requests, saveRequests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room.trim() || !type) return;

    setSubmitting(true);
    localStorage.setItem(ROOM_KEY, room.trim());

    const newRequest: GuestRequest = {
      id: crypto.randomUUID(),
      room_number: room.trim(),
      request_type: type,
      note: note.trim() || undefined,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('guest_requests')
        .insert({
          hotel_id: null,
          room_number: newRequest.room_number,
          request_type: newRequest.request_type,
          note: newRequest.note,
          status: 'new',
        })
        .select()
        .single();

      if (!error && data) {
        saveRequests([data as GuestRequest, ...requests]);
      } else {
        saveRequests([newRequest, ...requests]);
      }
    } else {
      saveRequests([newRequest, ...requests]);
    }

    setNote('');
    setSubmitting(false);
    setSent(true);
    setShowForm(false);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* New request button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 bg-blue-700 text-white font-semibold rounded-2xl active:scale-95 transition-transform"
        >
          + {labels.new}
        </button>
      )}

      {/* Success message */}
      {sent && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium text-center">
          ✅ {labels.sent}
        </div>
      )}

      {/* Request form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {labels.roomLabel}
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder={labels.roomPlaceholder}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {labels.typeLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {requestTypes.map((rt) => (
                <button
                  key={rt.value}
                  type="button"
                  onClick={() => setType(rt.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 text-left transition-colors ${
                    type === rt.value
                      ? 'border-blue-600 bg-blue-50 text-blue-800'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {labels.noteLabel}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={labels.notePlaceholder}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !room.trim()}
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-2xl disabled:opacity-50 active:scale-95 transition-transform"
          >
            {submitting ? labels.submitting : labels.submit}
          </button>
        </form>
      )}

      {/* Request history */}
      {requests.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            {labels.history}
          </h2>
          <div className="space-y-2">
            {requests.map((req) => (
              <div key={req.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {requestTypes.find((rt) => rt.value === req.request_type)?.label ?? req.request_type}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle(req.status)}`}>
                    {statusLabel(req.status, labels)}
                  </span>
                </div>
                {req.note && (
                  <p className="text-xs text-gray-500 mt-1">{req.note}</p>
                )}
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(req.created_at).toLocaleTimeString(locale === 'ru' ? 'ru-RU' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && !showForm && (
        <p className="text-center text-gray-400 text-sm py-8">{labels.empty}</p>
      )}
    </div>
  );
}
