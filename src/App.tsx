import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RestaurantList } from './components/RestaurantList';
import { ValueProps } from './components/ValueProps';
import { CoverageSection } from './components/CoverageSection';
import { AppDownloadSection } from './components/AppDownloadSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/modals/AuthModal';
import { RestaurantModal } from './components/modals/RestaurantModal';
import { PartnerModal } from './components/modals/PartnerModal';
import { CookiePreferencesModal } from './components/modals/CookiePreferencesModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { RESTAURANT_BRANDS } from './data/mockData';
import { RestaurantBrand, CookiePreferences } from './types';
import { scrollToId, scrollToTop } from './utils/scroll';
import {
  getSavedCookiePreferences,
  applyCookiePreferences,
  ACCEPT_ALL_PREFERENCES,
  STRICT_REJECT_PREFERENCES,
  DEFAULT_COOKIE_PREFERENCES,
} from './utils/cookieManager';

export default function App() {
  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<'courier' | 'restaurant'>('courier');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantBrand | null>(null);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  // Cookie consent
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    const saved = getSavedCookiePreferences();
    if (saved) {
      applyCookiePreferences(saved);
      return saved;
    }
    return DEFAULT_COOKIE_PREFERENCES;
  });
  const [showCookieBanner, setShowCookieBanner] = useState(() => !getSavedCookiePreferences()?.consentGiven);

  // Browsing state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deliveryArea, setDeliveryArea] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'sw'>('en');

  // Status message (plain toast)
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);
  const notify = (msg: string) => {
    setNotice(msg);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 4000);
  };

  const openAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const openPartner = (type: 'courier' | 'restaurant') => {
    setPartnerType(type);
    setPartnerModalOpen(true);
  };

  const saveCookies = (prefs: CookiePreferences, message: string) => {
    const withConsent = { ...prefs, consentGiven: true };
    setCookiePreferences(withConsent);
    applyCookiePreferences(withConsent);
    setShowCookieBanner(false);
    notify(message);
  };

  const handleSearchLocation = (location: string) => {
    setDeliveryArea(location);
    scrollToId('restaurants-section');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    scrollToId('restaurants-section');
  };

  const handleSelectEstate = (estate: string, city: string) => {
    const area = `${estate}, ${city}`;
    setDeliveryArea(area);
    notify(`Delivery address set to ${area}.`);
    scrollToTop();
  };

  const toggleLanguage = () => {
    const next = currentLanguage === 'en' ? 'sw' : 'en';
    setCurrentLanguage(next);
    // Full Kiswahili translations are not in place yet; this records the preference.
    notify(next === 'en' ? 'Language set to English.' : 'Lugha imewekwa kuwa Kiswahili.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onOpenAuth={openAuth}
        onOpenPartner={openPartner}
        currentLang={currentLanguage}
        onToggleLang={toggleLanguage}
      />

      <main className="flex-1">
        <HeroSection
          onSearchLocation={handleSearchLocation}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
          deliveryArea={deliveryArea}
        />
        <RestaurantList
          restaurants={RESTAURANT_BRANDS}
          onSelectRestaurant={setSelectedRestaurant}
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
          deliveryArea={deliveryArea}
        />
        <ValueProps onOpenPartner={openPartner} />
        <CoverageSection onSelectEstate={handleSelectEstate} />
        <AppDownloadSection />
      </main>

      <Footer
        onOpenPartner={openPartner}
        onOpenAuth={openAuth}
        onOpenCookies={() => setCookieModalOpen(true)}
        currentLang={currentLanguage}
        onToggleLang={toggleLanguage}
      />

      <CookieConsentBanner
        isVisible={showCookieBanner}
        onAcceptAll={() => saveCookies(ACCEPT_ALL_PREFERENCES, 'Cookie preferences saved.')}
        onRejectNonEssential={() => saveCookies(STRICT_REJECT_PREFERENCES, 'Only essential cookies will be used.')}
        onOpenPreferences={() => setCookieModalOpen(true)}
      />

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />

      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onCheckout={(r, total, count) =>
          notify(`${count} item${count > 1 ? 's' : ''} from ${r.name}, KES ${total.toLocaleString('en-KE')}. Checkout is coming soon.`)
        }
      />

      <PartnerModal isOpen={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} type={partnerType} />

      <CookiePreferencesModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
        currentPreferences={cookiePreferences}
        onSavePreferences={(p) => saveCookies(p, 'Cookie preferences saved.')}
        onAcceptAll={() => saveCookies(ACCEPT_ALL_PREFERENCES, 'Cookie preferences saved.')}
        onRejectNonEssential={() => saveCookies(STRICT_REJECT_PREFERENCES, 'Only essential cookies will be used.')}
      />

      {notice && (
        <div
          role="status"
          className={`fixed left-1/2 -translate-x-1/2 z-50 max-w-[calc(100%-2rem)] bg-ink text-white text-sm px-4 py-3 rounded-md shadow-lg ${
            showCookieBanner ? 'bottom-28 md:bottom-20' : 'bottom-6'
          }`}
        >
          {notice}
        </div>
      )}
    </div>
  );
}
