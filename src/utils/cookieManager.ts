import { CookiePreferences, BrowserCookieEntry } from '../types';

export const COOKIE_STORAGE_KEY = 'bridges_cookie_consent';

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
  consentGiven: false,
};

export const STRICT_REJECT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  consentGiven: true,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
  consentGiven: true,
};

export const KNOWN_COOKIES_SCHEMA: {
  [key: string]: {
    category: 'essential' | 'functional' | 'analytics' | 'marketing';
    description: string;
    expires: string;
    sampleValue: () => string;
  };
} = {
  bridges_sess_id: {
    category: 'essential',
    description: 'Secures active ordering session, anti-CSRF token & checkout safety',
    expires: 'Session (Browser Close)',
    sampleValue: () => 'sess_' + Math.random().toString(36).substring(2, 12),
  },
  bridges_mpesa_secure: {
    category: 'essential',
    description: 'Safaricom M-Pesa Daraja payment gateway validation hash',
    expires: '24 Hours',
    sampleValue: () => 'daraja_v2_' + Math.random().toString(36).substring(2, 10),
  },
  bridges_lang_pref: {
    category: 'functional',
    description: 'Remembers your preferred language (English / Kiswahili)',
    expires: '180 Days',
    sampleValue: () => 'en-KE',
  },
  bridges_loc_history: {
    category: 'functional',
    description: 'Retains delivery estate & recent address coordinates in Kenya',
    expires: '90 Days',
    sampleValue: () => 'nairobi_westlands_auto',
  },
  bridges_analytics_id: {
    category: 'analytics',
    description: 'Measures courier routing speed & menu browsing load times',
    expires: '365 Days',
    sampleValue: () => 'brg_ga_' + Math.random().toString(36).substring(2, 12),
  },
  bridges_promo_tracker: {
    category: 'marketing',
    description: 'Customizes seasonal Kenyan food festival deals & restaurant vouchers',
    expires: '30 Days',
    sampleValue: () => 'voucher_kenya_nyama_2026',
  },
};

/**
 * Write a single cookie to document.cookie
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

/**
 * Read a cookie by name from document.cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Erase a cookie by name
 */
export function eraseCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
}

/**
 * Apply cookie preferences by writing allowed cookies and purging disallowed cookies
 */
export function applyCookiePreferences(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return;

  // 1. Essential cookies (always set)
  if (!getCookie('bridges_sess_id')) {
    setCookie('bridges_sess_id', KNOWN_COOKIES_SCHEMA.bridges_sess_id.sampleValue(), 1);
  }
  if (!getCookie('bridges_mpesa_secure')) {
    setCookie('bridges_mpesa_secure', KNOWN_COOKIES_SCHEMA.bridges_mpesa_secure.sampleValue(), 1);
  }

  // 2. Functional cookies
  if (prefs.functional) {
    if (!getCookie('bridges_lang_pref')) {
      setCookie('bridges_lang_pref', 'en-KE', 180);
    }
    if (!getCookie('bridges_loc_history')) {
      setCookie('bridges_loc_history', 'nairobi_cbd_cache', 90);
    }
  } else {
    eraseCookie('bridges_lang_pref');
    eraseCookie('bridges_loc_history');
  }

  // 3. Analytics cookies
  if (prefs.analytics) {
    if (!getCookie('bridges_analytics_id')) {
      setCookie('bridges_analytics_id', KNOWN_COOKIES_SCHEMA.bridges_analytics_id.sampleValue(), 365);
    }
  } else {
    eraseCookie('bridges_analytics_id');
  }

  // 4. Marketing cookies
  if (prefs.marketing) {
    if (!getCookie('bridges_promo_tracker')) {
      setCookie('bridges_promo_tracker', KNOWN_COOKIES_SCHEMA.bridges_promo_tracker.sampleValue(), 30);
    }
  } else {
    eraseCookie('bridges_promo_tracker');
  }

  // Save state to localStorage
  try {
    const toSave: CookiePreferences = {
      ...prefs,
      consentGiven: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Unable to write cookie preferences to localStorage', e);
  }
}

/**
 * Read current preferences from localStorage
 */
export function getSavedCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.essential === 'boolean') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cookie preferences from localStorage', e);
  }
  return null;
}

/**
 * Get a live list of all active browser cookies
 */
export function getLiveBrowserCookies(): BrowserCookieEntry[] {
  if (typeof document === 'undefined') return [];
  const rawCookies = document.cookie ? document.cookie.split(';') : [];
  const entries: BrowserCookieEntry[] = [];

  for (const c of rawCookies) {
    const parts = c.trim().split('=');
    const name = parts[0];
    const value = parts.slice(1).join('=');
    if (!name) continue;

    const schema = KNOWN_COOKIES_SCHEMA[name];
    if (schema) {
      entries.push({
        name,
        value: decodeURIComponent(value),
        category: schema.category,
        description: schema.description,
        expires: schema.expires,
      });
    } else {
      // General or user-defined cookie
      entries.push({
        name,
        value: decodeURIComponent(value),
        category: 'functional',
        description: 'Site setting or session key',
        expires: 'Active session',
      });
    }
  }

  return entries;
}
