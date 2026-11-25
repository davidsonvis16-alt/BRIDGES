import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BridgesLogo } from './icons/BridgesLogo';
import { scrollToId, scrollToTop } from '../utils/scroll';

interface HeaderProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenPartner: (type: 'courier' | 'restaurant') => void;
  currentLang: string;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenPartner,
  currentLang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const go = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  const navItems: { label: string; onClick: () => void }[] = [
    { label: 'Restaurants & shops', onClick: () => scrollToId('restaurants-section') },
    { label: 'Where we deliver', onClick: () => scrollToId('coverage-section') },
    { label: 'Ride with us', onClick: () => onOpenPartner('courier') },
    { label: 'Sell on Bridges', onClick: () => onOpenPartner('restaurant') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Bridges home"
        >
          <BridgesLogo />
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] text-ink-soft">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="hover:text-ink cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            className="hidden sm:inline-flex h-9 items-center px-3 rounded-md text-sm text-ink-soft hover:bg-paper cursor-pointer"
            title="Switch language (English / Kiswahili)"
          >
            <span className={currentLang === 'en' ? 'font-semibold text-ink' : ''}>EN</span>
            <span className="mx-1.5 text-line">|</span>
            <span className={currentLang === 'sw' ? 'font-semibold text-ink' : ''}>SW</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="hidden sm:inline-flex h-9 items-center px-4 rounded-md text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => onOpenAuth('signup')}
            className="h-9 inline-flex items-center px-4 rounded-md text-sm font-medium bg-brand text-white hover:bg-brand-dark cursor-pointer"
          >
            Sign up
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-ink hover:bg-paper cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-white">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.onClick)}
                className="py-3 text-left text-[15px] text-ink border-b border-line last:border-b-0 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between py-3">
              <button
                type="button"
                onClick={onToggleLang}
                className="text-sm text-ink-soft cursor-pointer"
              >
                Language: {currentLang === 'en' ? 'English' : 'Kiswahili'}
              </button>
              <button
                type="button"
                onClick={() => go(() => onOpenAuth('login'))}
                className="text-sm font-medium text-brand cursor-pointer"
              >
                Log in
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
