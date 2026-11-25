import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { CookiePreferences, BrowserCookieEntry } from '../../types';
import { getLiveBrowserCookies, eraseCookie } from '../../utils/cookieManager';
import { Modal } from '../ui/Modal';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
}

type ToggleKey = 'functional' | 'analytics' | 'marketing';

const CATEGORIES: { key: 'essential' | ToggleKey; title: string; description: string; cookies: string[] }[] = [
  {
    key: 'essential',
    title: 'Essential',
    description: 'Keep you signed in, secure checkout and M-Pesa payments. These are always on.',
    cookies: ['bridges_sess_id', 'bridges_mpesa_secure'],
  },
  {
    key: 'functional',
    title: 'Preferences',
    description: 'Remember your language and recent delivery addresses.',
    cookies: ['bridges_lang_pref', 'bridges_loc_history'],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    description: 'Help us measure app speed and improve delivery times.',
    cookies: ['bridges_analytics_id'],
  },
  {
    key: 'marketing',
    title: 'Offers',
    description: 'Show you relevant discounts and restaurant offers.',
    cookies: ['bridges_promo_tracker'],
  },
];

const Toggle: React.FC<{ on: boolean; disabled?: boolean; onClick?: () => void; label: string }> = ({
  on,
  disabled,
  onClick,
  label,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className={`relative w-10 h-6 rounded-full flex-shrink-0 ${on ? 'bg-brand' : 'bg-line'} ${
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
    }`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white ${on ? 'left-5' : 'left-1'}`} />
  </button>
);

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  currentPreferences,
  onSavePreferences,
  onAcceptAll,
  onRejectNonEssential,
}) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(currentPreferences);
  const [tab, setTab] = useState<'categories' | 'stored'>('categories');
  const [liveCookies, setLiveCookies] = useState<BrowserCookieEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPreferences(currentPreferences);
      setLiveCookies(getLiveBrowserCookies());
      setTab('categories');
    }
  }, [isOpen, currentPreferences]);

  const toggle = (key: ToggleKey) => setPreferences((p) => ({ ...p, [key]: !p[key] }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Cookie settings" width="max-w-xl">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Cookie settings</h2>
        <p className="mt-1 text-sm text-muted">Your choice is saved on this device. You can change it any time from the footer.</p>
        <div className="mt-5 flex gap-6 border-b border-line text-sm" role="tablist">
          {(['categories', 'stored'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => {
                setTab(t);
                if (t === 'stored') setLiveCookies(getLiveBrowserCookies());
              }}
              className={`pb-3 -mb-px border-b-2 cursor-pointer ${
                tab === t ? 'border-brand text-ink font-medium' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {t === 'categories' ? 'Categories' : `Stored cookies (${liveCookies.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 overflow-y-auto flex-1">
        {tab === 'categories' ? (
          <ul className="divide-y divide-line">
            {CATEGORIES.map((cat) => {
              const on = cat.key === 'essential' ? true : preferences[cat.key];
              return (
                <li key={cat.key} className="py-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-medium text-ink">{cat.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{cat.description}</p>
                    <p className="mt-1 text-xs text-muted font-mono">{cat.cookies.join(', ')}</p>
                  </div>
                  <Toggle
                    on={on}
                    disabled={cat.key === 'essential'}
                    onClick={cat.key === 'essential' ? undefined : () => toggle(cat.key as ToggleKey)}
                    label={`${cat.title} cookies`}
                  />
                </li>
              );
            })}
          </ul>
        ) : liveCookies.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No Bridges cookies are stored on this device.</p>
        ) : (
          <ul className="divide-y divide-line">
            {liveCookies.map((cookie) => (
              <li key={cookie.name} className="py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-mono text-ink">{cookie.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {cookie.category} · expires {cookie.expires}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{cookie.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    eraseCookie(cookie.name);
                    setLiveCookies(getLiveBrowserCookies());
                  }}
                  className="p-2 rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer"
                  aria-label={`Delete ${cookie.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-6 py-4 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            onRejectNonEssential();
            onClose();
          }}
          className="h-10 px-4 rounded-md border border-line text-sm font-medium text-ink hover:bg-paper cursor-pointer"
        >
          Essential only
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              onSavePreferences(preferences);
              onClose();
            }}
            className="flex-1 h-10 px-4 rounded-md border border-line text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            Save choices
          </button>
          <button
            type="button"
            onClick={() => {
              onAcceptAll();
              onClose();
            }}
            className="flex-1 h-10 px-4 rounded-md bg-brand text-white text-sm font-medium hover:bg-brand-dark cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </Modal>
  );
};
