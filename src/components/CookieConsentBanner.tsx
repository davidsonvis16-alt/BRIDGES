import React from 'react';
import { ShieldCheck, Cookie, Settings2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieConsentBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onOpenPreferences: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  isVisible,
  onAcceptAll,
  onRejectNonEssential,
  onOpenPreferences,
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="cookie-consent-floating-banner"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.96 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg md:max-w-xl z-50 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-zinc-200/90 text-zinc-900"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#FFC244] text-zinc-950 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Cookie className="w-6 h-6 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                Cookie & Privacy Choices
              </h4>
              <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Kenya DPA 2019
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              Bridges uses cookies and browser storage to power smooth food delivery, secure Safaricom
              M-Pesa checkout, remember your favorite Nairobi delivery spots, and optimize courier routes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="cookie-banner-accept-all-btn"
                type="button"
                onClick={onAcceptAll}
                className="px-4 sm:px-5 py-2 rounded-2xl bg-[#FFC244] hover:bg-[#f0b53c] text-zinc-950 text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>

              <button
                id="cookie-banner-reject-btn"
                type="button"
                onClick={onRejectNonEssential}
                className="px-3.5 py-2 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all cursor-pointer"
              >
                Reject Non-Essential
              </button>

              <button
                id="cookie-banner-customize-btn"
                type="button"
                onClick={onOpenPreferences}
                className="px-3.5 py-2 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
