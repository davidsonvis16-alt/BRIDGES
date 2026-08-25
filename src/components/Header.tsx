import React, { useState, useEffect } from 'react';
import { Menu, X, Bike, Store, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { smoothScrollTo } from '../utils/smoothScroll';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-sticky-header"
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100 py-3'
          : 'bg-[#FFC244] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo (Left) */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Bridges Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-black text-[#FFC244] flex items-center justify-center font-black text-xl shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                {/* Custom modern bridge arch logo mark */}
                <path d="M3 17h2v-4c0-3.86 3.14-7 7-7s7 3.14 7 7v4h2v-4c0-4.97-4.03-9-9-9s-9 4.03-9 9v4zm5 0h8v-3c0-2.21-1.79-4-4-4s-4 1.79-4 4v3zm-4 2h16v2H4z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-zinc-950 flex items-center gap-0.5">
                bridges
                <span className="inline-block w-2 h-2 rounded-full bg-black mb-1"></span>
              </span>
            </div>
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <button
              id="header-courier-link"
              onClick={() => onOpenPartner('courier')}
              className={`flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full cursor-pointer ${
                isScrolled
                  ? 'text-zinc-700 hover:text-black hover:bg-black/5'
                  : 'text-zinc-900 hover:text-black hover:bg-black/5'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Deliver with us</span>
            </button>

            <button
              id="header-store-link"
              onClick={() => onOpenPartner('restaurant')}
              className={`flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full cursor-pointer ${
                isScrolled
                  ? 'text-zinc-700 hover:text-black hover:bg-black/5'
                  : 'text-zinc-900 hover:text-black hover:bg-black/5'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Partner Stores</span>
            </button>

            <a
              href="#coverage-section"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('coverage-section', { duration: 750, highlightTarget: true });
              }}
              className={`transition-colors px-3 py-1.5 rounded-full cursor-pointer ${
                isScrolled
                  ? 'text-zinc-700 hover:text-black hover:bg-black/5'
                  : 'text-zinc-900 hover:text-black hover:bg-black/5'
              }`}
            >
              Coverage Areas
            </a>

            <a
              href="#download-app"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('download-app', { duration: 750, highlightTarget: true });
              }}
              className={`transition-colors px-3 py-1.5 rounded-full cursor-pointer ${
                isScrolled
                  ? 'text-zinc-700 hover:text-black hover:bg-black/5'
                  : 'text-zinc-900 hover:text-black hover:bg-black/5'
              }`}
            >
              Get the App
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector */}
            <button
              id="header-language-btn"
              onClick={onToggleLang}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isScrolled
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200/60'
                  : 'bg-black/10 hover:bg-black/15 text-zinc-900'
              }`}
              title="Toggle Language (English / Kiswahili)"
            >
              <span className="text-sm">🇰🇪</span>
              <span>{currentLang === 'en' ? 'EN' : 'SW'}</span>
            </button>

            {/* Pill-shaped Brand Color Login Button */}
            <button
              id="header-login-btn"
              onClick={() => onOpenAuth('login')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                isScrolled
                  ? 'bg-[#FFC244] hover:bg-[#ffb71a] text-zinc-950 shadow-[0_3px_0_0_#D49E00] active:translate-y-0.5 active:shadow-[0_1px_0_0_#D49E00]'
                  : 'bg-zinc-950 hover:bg-zinc-900 text-white shadow-[0_3px_0_0_#000000] active:translate-y-0.5 active:shadow-[0_1px_0_0_#000000]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Log in / Sign up</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-2xl transition-colors ${
                isScrolled
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'bg-black/10 hover:bg-black/15 text-zinc-900'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-zinc-200 px-6 py-5 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartner('courier');
                }}
                className="flex items-center gap-3 py-2.5 px-3 rounded-2xl hover:bg-zinc-50 text-left font-semibold text-zinc-800"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Deliver with Bridges</div>
                  <div className="text-xs text-zinc-500">Earn with your motorbike or bicycle</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartner('restaurant');
                }}
                className="flex items-center gap-3 py-2.5 px-3 rounded-2xl hover:bg-zinc-50 text-left font-semibold text-zinc-800"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Partner Restaurants & Stores</div>
                  <div className="text-xs text-zinc-500">Reach 100k+ active Kenyan customers</div>
                </div>
              </button>

              <a
                href="#coverage-section"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  smoothScrollTo('coverage-section', { duration: 750, highlightTarget: true });
                }}
                className="py-2.5 px-3 rounded-2xl hover:bg-zinc-50 text-sm font-semibold text-zinc-800 block cursor-pointer"
              >
                Coverage Areas (Nairobi, Mombasa, Kisumu...)
              </a>

              <a
                href="#download-app"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  smoothScrollTo('download-app', { duration: 750, highlightTarget: true });
                }}
                className="py-2.5 px-3 rounded-2xl hover:bg-zinc-50 text-sm font-semibold text-zinc-800 block cursor-pointer"
              >
                Download Mobile App
              </a>

              {/* Mobile Language Toolbar & Login */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <button
                  onClick={onToggleLang}
                  className="flex items-center gap-2 text-xs font-bold text-zinc-700 py-2 px-3 rounded-xl bg-zinc-100"
                >
                  <span>🇰🇪</span>
                  <span>{currentLang === 'en' ? 'English (KE)' : 'Kiswahili'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2 px-4 rounded-xl bg-[#FFC244] text-black font-bold text-xs shadow-xs"
                >
                  Log In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
