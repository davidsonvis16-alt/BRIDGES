import React from 'react';
import {
  Globe,
  Bike,
  Store,
  ShieldCheck,
  ChevronDown,
  ArrowUp,
  Banknote
} from 'lucide-react';
import { AppleLogo, GooglePlayLogo, MPesaLogo, VisaLogo, MastercardLogo } from './icons/BrandIcons';

interface FooterProps {
  onOpenPartner: (type: 'courier' | 'restaurant') => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenCookies?: () => void;
  currentLang: string;
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPartner,
  onOpenAuth,
  onOpenCookies,
  currentLang,
  onToggleLang,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand header & Back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC244] text-black flex items-center justify-center font-black text-xl shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M3 17h2v-4c0-3.86 3.14-7 7-7s7 3.14 7 7v4h2v-4c0-4.97-4.03-9-9-9s-9 4.03-9 9v4zm5 0h8v-3c0-2.21-1.79-4-4-4s-4 1.79-4 4v3zm-4 2h16v2H4z" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
                bridges
                <span className="inline-block w-2 h-2 rounded-full bg-[#FFC244] mb-1"></span>
              </span>
              <p className="text-xs text-zinc-400">Kenya's Favorite On-Demand Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector in Footer */}
            <button
              id="footer-language-btn"
              onClick={onToggleLang}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFC244]" />
              <span>{currentLang === 'en' ? 'English (Kenya 🇰🇪)' : 'Kiswahili (Kenya 🇰🇪)'}</span>
            </button>

            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Multi-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-zinc-800 text-sm">
          {/* Col 1: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    Hiring
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Press & Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Bridges Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Bridges Prime Pass
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Business & Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Business
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <button
                  onClick={() => onOpenPartner('restaurant')}
                  className="hover:text-[#FFC244] transition-colors text-left cursor-pointer"
                >
                  Partner Restaurant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPartner('courier')}
                  className="hover:text-[#FFC244] transition-colors text-left cursor-pointer"
                >
                  Deliver as a Courier
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Corporate Catering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  B2B Logistics API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Merchant Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Cuisines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Popular in Kenya
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="#restaurants-section" className="hover:text-[#FFC244] transition-colors">
                  Nyama Choma & Grills
                </a>
              </li>
              <li>
                <a href="#restaurants-section" className="hover:text-[#FFC244] transition-colors">
                  Swahili Biryani & Pilau
                </a>
              </li>
              <li>
                <a href="#restaurants-section" className="hover:text-[#FFC244] transition-colors">
                  Burgers & BBQ Ribs
                </a>
              </li>
              <li>
                <a href="#restaurants-section" className="hover:text-[#FFC244] transition-colors">
                  Artisan Coffee & Pastries
                </a>
              </li>
              <li>
                <a href="#restaurants-section" className="hover:text-[#FFC244] transition-colors">
                  Fresh Farm Groceries
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <button
                  id="footer-cookies-policy-btn"
                  type="button"
                  onClick={onOpenCookies}
                  className="hover:text-[#FFC244] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Cookies Policy & Settings</span>
                  <span className="text-[9px] bg-amber-400/20 text-[#FFC244] px-1.5 py-0.2 rounded font-extrabold">
                    Manage
                  </span>
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Food Safety Standards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC244] transition-colors">
                  Kenya Data Protection Act
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: App Badges & Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Download App
            </h4>
            <div className="space-y-2">
              <button
                id="footer-appstore-btn"
                onClick={() => alert('Opening Apple App Store for Bridges Kenya...')}
                className="w-full flex items-center justify-start gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold border border-zinc-800 transition-colors cursor-pointer group"
              >
                <AppleLogo className="w-5 h-5 text-white group-hover:scale-105 transition-transform flex-shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase font-semibold text-zinc-400">Download on</div>
                  <div className="text-xs font-bold text-white">Apple App Store</div>
                </div>
              </button>
              <button
                id="footer-playstore-btn"
                onClick={() => alert('Opening Google Play Store for Bridges Kenya...')}
                className="w-full flex items-center justify-start gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold border border-zinc-800 transition-colors cursor-pointer group"
              >
                <GooglePlayLogo className="w-5 h-5 group-hover:scale-105 transition-transform flex-shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase font-semibold text-zinc-400">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play Store</div>
                </div>
              </button>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-xs text-zinc-400 font-semibold mb-2">Connect with us</div>
              <div className="flex items-center gap-2 text-zinc-400">
                {/* X / Twitter */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#FFC244] hover:text-black flex items-center justify-center transition-colors"
                  aria-label="X Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#FFC244] hover:text-black flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#FFC244] hover:text-black flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#FFC244] hover:text-black flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>© 2026 Bridges Technologies (K) Ltd. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Registered in Nairobi, Kenya</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] text-zinc-400 font-semibold mr-1">Accepted Payments:</span>
            
            {/* Authentic M-Pesa Badge */}
            <div className="flex items-center gap-1 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              <MPesaLogo className="h-5" />
            </div>

            {/* Authentic Visa Badge */}
            <div className="flex items-center bg-white px-2 py-1 rounded-lg border border-zinc-700 h-7">
              <VisaLogo className="h-4" />
            </div>

            {/* Authentic Mastercard Badge */}
            <div className="flex items-center bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800 h-7">
              <MastercardLogo className="h-5" />
            </div>

            {/* Cash on Delivery Badge */}
            <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 text-[10px] font-bold text-zinc-300">
              <Banknote className="w-3.5 h-3.5 text-amber-400" />
              <span>CASH ON DELIVERY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
