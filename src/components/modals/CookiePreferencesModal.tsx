import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  Lock,
  BarChart2,
  Tag,
  Settings,
  Database,
  RefreshCw,
  Trash2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CookiePreferences, BrowserCookieEntry } from '../../types';
import {
  getLiveBrowserCookies,
  KNOWN_COOKIES_SCHEMA,
  eraseCookie
} from '../../utils/cookieManager';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  currentPreferences,
  onSavePreferences,
  onAcceptAll,
  onRejectNonEssential,
}) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(currentPreferences);
  const [activeTab, setActiveTab] = useState<'categories' | 'inspector'>('categories');
  const [liveCookies, setLiveCookies] = useState<BrowserCookieEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPreferences(currentPreferences);
      setLiveCookies(getLiveBrowserCookies());
    }
  }, [isOpen, currentPreferences]);

  const handleRefreshInspector = () => {
    setLiveCookies(getLiveBrowserCookies());
  };

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // strictly locked
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    onSavePreferences(preferences);
    onClose();
  };

  const handleDeleteSingleCookie = (cookieName: string) => {
    eraseCookie(cookieName);
    setLiveCookies(getLiveBrowserCookies());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="cookie-preferences-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          id="cookie-preferences-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-[#FFC244]/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC244] text-zinc-950 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-950 tracking-tight flex items-center gap-2">
                  Bridges Cookie Privacy Manager
                  <span className="text-[10px] font-bold uppercase bg-amber-200/90 text-amber-900 px-2 py-0.5 rounded-full">
                    Kenya DPA 2019
                  </span>
                </h3>
                <p className="text-xs text-zinc-600">
                  Control how Bridges collects & stores cookies on your device
                </p>
              </div>
            </div>

            <button
              id="cookie-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-100 bg-zinc-50 px-6 pt-3 gap-2">
            <button
              id="cookie-tab-categories-btn"
              onClick={() => setActiveTab('categories')}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'categories'
                  ? 'border-zinc-950 text-zinc-950 font-black'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Cookie Categories</span>
            </button>
            <button
              id="cookie-tab-inspector-btn"
              onClick={() => {
                setActiveTab('inspector');
                handleRefreshInspector();
              }}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'inspector'
                  ? 'border-zinc-950 text-zinc-950 font-black'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Active Cookie Inspector ({liveCookies.length})</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 text-zinc-800">
            {activeTab === 'categories' ? (
              <>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  We use cookies and local storage tokens to deliver speedy ordering across Nairobi,
                  secure Safaricom M-Pesa payments, remember your food preferences, and calculate
                  accurate courier ETAs. Select your allowed categories below.
                </p>

                {/* 1. Strictly Necessary / Essential */}
                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-950 flex items-center gap-2">
                          Strictly Necessary & Security
                          <span className="text-[10px] font-extrabold bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded">
                            Always Active
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          Session token, M-Pesa gateway verification, CSRF defense
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-6 bg-zinc-300 rounded-full flex items-center px-1 cursor-not-allowed opacity-80">
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm translate-x-6" />
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-10">
                    Includes: <code className="text-zinc-700 font-mono">bridges_sess_id</code>,{' '}
                    <code className="text-zinc-700 font-mono">bridges_mpesa_secure</code>
                  </div>
                </div>

                {/* 2. Functional & Location Cookies */}
                <div className="p-4 rounded-2xl border border-zinc-200 bg-white flex flex-col gap-2 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                        <Settings className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-950">Functional & Regional Preferences</div>
                        <div className="text-xs text-zinc-500">
                          Language (EN/SW), recent delivery estates, search filters
                        </div>
                      </div>
                    </div>

                    <button
                      id="toggle-cookie-functional-btn"
                      type="button"
                      onClick={() => handleToggle('functional')}
                      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                        preferences.functional ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                      aria-label="Toggle functional cookies"
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          preferences.functional ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-10">
                    Includes: <code className="text-zinc-700 font-mono">bridges_lang_pref</code>,{' '}
                    <code className="text-zinc-700 font-mono">bridges_loc_history</code>
                  </div>
                </div>

                {/* 3. Performance & Analytics */}
                <div className="p-4 rounded-2xl border border-zinc-200 bg-white flex flex-col gap-2 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                        <BarChart2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-950">Performance & Courier Telemetry</div>
                        <div className="text-xs text-zinc-500">
                          App speed metrics, dispatch latency and route optimization data
                        </div>
                      </div>
                    </div>

                    <button
                      id="toggle-cookie-analytics-btn"
                      type="button"
                      onClick={() => handleToggle('analytics')}
                      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                        preferences.analytics ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                      aria-label="Toggle analytics cookies"
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-10">
                    Includes: <code className="text-zinc-700 font-mono">bridges_analytics_id</code>
                  </div>
                </div>

                {/* 4. Marketing & Targeted Vouchers */}
                <div className="p-4 rounded-2xl border border-zinc-200 bg-white flex flex-col gap-2 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-green-100 text-green-900 flex items-center justify-center">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-950">Promotions & Kenyan Food Deals</div>
                        <div className="text-xs text-zinc-500">
                          Discount voucher reminders and customized restaurant offers
                        </div>
                      </div>
                    </div>

                    <button
                      id="toggle-cookie-marketing-btn"
                      type="button"
                      onClick={() => handleToggle('marketing')}
                      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                        preferences.marketing ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                      aria-label="Toggle marketing cookies"
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-10">
                    Includes: <code className="text-zinc-700 font-mono">bridges_promo_tracker</code>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
                  <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    Your consent choice is stored locally on this device. You can update or revoke
                    it anytime using the <strong>Cookies Policy</strong> link in the footer.
                  </span>
                </div>
              </>
            ) : (
              /* ACTIVE COOKIE INSPECTOR TAB */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-zinc-700">
                    Live browser cookies found in <code className="text-zinc-900">document.cookie</code>:
                  </div>
                  <button
                    id="refresh-cookie-inspector-btn"
                    onClick={handleRefreshInspector}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-black bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {liveCookies.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400 text-xs bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    No active cookies currently detected in this browsing session.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {liveCookies.map((cookie, idx) => (
                      <div
                        key={idx}
                        id={`browser-cookie-row-${idx}`}
                        className="p-3 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono font-bold text-zinc-950">{cookie.name}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 uppercase">
                              {cookie.category}
                            </span>
                            <span className="text-[10px] text-zinc-400">Expires: {cookie.expires}</span>
                          </div>
                          <div className="text-zinc-500 text-[11px] truncate mb-1">
                            {cookie.description}
                          </div>
                          <div className="font-mono text-[10px] text-zinc-400 truncate bg-white px-2 py-1 rounded border border-zinc-200">
                            Value: {cookie.value}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteSingleCookie(cookie.name)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                          title={`Delete ${cookie.name} cookie`}
                          aria-label={`Delete ${cookie.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              id="cookie-modal-reject-btn"
              type="button"
              onClick={() => {
                onRejectNonEssential();
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl text-xs font-bold text-zinc-700 hover:text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer text-center"
            >
              Reject Non-Essential
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                id="cookie-modal-save-custom-btn"
                type="button"
                onClick={handleSave}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl text-xs font-bold text-zinc-900 bg-zinc-200 hover:bg-zinc-300 transition-colors cursor-pointer text-center"
              >
                Save Preferences
              </button>
              <button
                id="cookie-modal-accept-all-btn"
                type="button"
                onClick={() => {
                  onAcceptAll();
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl text-xs font-black text-zinc-950 bg-[#FFC244] hover:bg-[#e5ad3a] shadow-sm transition-all cursor-pointer text-center"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
