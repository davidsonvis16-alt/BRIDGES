import React from 'react';

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
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="flex-1 text-sm text-ink-soft">
          We use cookies to keep you signed in, remember your address and improve the service. You can
          choose which ones we use, in line with Kenya’s Data Protection Act, 2019.
        </p>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenPreferences}
            className="h-9 px-3 rounded-md text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="h-9 px-4 rounded-md border border-line text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="h-9 px-4 rounded-md bg-brand text-white text-sm font-medium hover:bg-brand-dark cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};
