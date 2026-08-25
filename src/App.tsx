import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandShowcase } from './components/BrandShowcase';
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
import { RestaurantBrand, MenuItem, CookiePreferences } from './types';
import { smoothScrollTo } from './utils/smoothScroll';
import {
  getSavedCookiePreferences,
  applyCookiePreferences,
  ACCEPT_ALL_PREFERENCES,
  STRICT_REJECT_PREFERENCES,
  DEFAULT_COOKIE_PREFERENCES,
} from './utils/cookieManager';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    try {
      localStorage.removeItem('bridges_user_theme');
    } catch {
      // ignore
    }
  }, []);

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [partnerType, setPartnerType] = useState<'courier' | 'restaurant'>('courier');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantBrand | null>(null);

  // Cookie collection & consent states
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    const saved = getSavedCookiePreferences();
    if (saved) {
      // Re-apply on load to ensure document.cookie is synchronized
      applyCookiePreferences(saved);
      return saved;
    }
    return DEFAULT_COOKIE_PREFERENCES;
  });
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(() => {
    const saved = getSavedCookiePreferences();
    return !saved || !saved.consentGiven;
  });

  // Loading states
  const [isBrandsLoading, setIsBrandsLoading] = useState<boolean>(false);

  // Category and location filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'sw'>('en');

  // Interactive feedback
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenPartner = (type: 'courier' | 'restaurant') => {
    setPartnerType(type);
    setPartnerModalOpen(true);
  };

  // Cookie Actions that actually write to document.cookie & localStorage
  const handleAcceptAllCookies = () => {
    const allPrefs = { ...ACCEPT_ALL_PREFERENCES };
    setCookiePreferences(allPrefs);
    applyCookiePreferences(allPrefs);
    setShowCookieBanner(false);
    triggerNotification('All cookies accepted! Session, location, analytics & promo tokens active.');
  };

  const handleRejectNonEssentialCookies = () => {
    const rejectPrefs = { ...STRICT_REJECT_PREFERENCES };
    setCookiePreferences(rejectPrefs);
    applyCookiePreferences(rejectPrefs);
    setShowCookieBanner(false);
    triggerNotification('Non-essential cookies declined. Only strictly necessary session cookies active.');
  };

  const handleSaveCustomCookiePreferences = (customPrefs: CookiePreferences) => {
    const updated = { ...customPrefs, consentGiven: true };
    setCookiePreferences(updated);
    applyCookiePreferences(updated);
    setShowCookieBanner(false);
    triggerNotification('Your custom cookie privacy settings have been saved!');
  };

  const handleSearchLocation = (location: string) => {
    setIsBrandsLoading(true);
    triggerNotification(`Set delivery address to: ${location}. Showing nearby spots.`);
    smoothScrollTo('restaurants-section', { duration: 750, highlightTarget: true });
    setTimeout(() => {
      setIsBrandsLoading(false);
    }, 400);
  };

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId !== selectedCategory) {
      setIsBrandsLoading(true);
      setSelectedCategory(categoryId);
      setTimeout(() => {
        setIsBrandsLoading(false);
      }, 350);
    }
    smoothScrollTo('restaurants-section', { duration: 750, highlightTarget: true });
  };

  const handleSelectEstate = (estate: string, city: string) => {
    triggerNotification(`Selected ${estate}, ${city}. Checking available couriers...`);
    const heroInput = document.getElementById('hero-address-search-input') as HTMLInputElement;
    if (heroInput) {
      heroInput.value = `${estate}, ${city}`;
    }
    smoothScrollTo(0, { duration: 700 });
  };

  const handleAddToCart = (item: MenuItem, restaurant: RestaurantBrand) => {
    triggerNotification(`Added "${item.name}" from ${restaurant.name} (KES ${item.price}) to your Bridges order!`);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'sw' : 'en';
    setCurrentLanguage(newLang);
    triggerNotification(
      newLang === 'en'
        ? 'Switched language to English (Kenya)'
        : 'Umebadilisha lugha kuwa Kiswahili'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-900 selection:bg-[#FFC244] selection:text-black transition-colors duration-200">
      {/* 1. Sticky Header */}
      <Header
        onOpenAuth={handleOpenAuth}
        onOpenPartner={handleOpenPartner}
        currentLang={currentLanguage}
        onToggleLang={toggleLanguage}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 2. Hero Section with bold warm background, location search, and curved divider */}
        <HeroSection
          onSearchLocation={handleSearchLocation}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* 3. Horizontal scroll row of top restaurant/brand logos in circular frames */}
        <BrandShowcase
          restaurants={RESTAURANT_BRANDS}
          onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
          isLoading={isBrandsLoading}
        />

        {/* 4. Three-column "value props" section with custom icons */}
        <ValueProps
          onOpenPartner={handleOpenPartner}
          onExploreFood={() => {
            smoothScrollTo('restaurants-section', { duration: 750, highlightTarget: true });
          }}
        />

        {/* 5. "Where we deliver" coverage section with city and estate badges */}
        <CoverageSection onSelectEstate={handleSelectEstate} />

        {/* 6. App download section with phone mockups and store badges */}
        <AppDownloadSection />
      </main>

      {/* 7. Multi-column Footer */}
      <Footer
        onOpenPartner={handleOpenPartner}
        onOpenAuth={handleOpenAuth}
        onOpenCookies={() => setCookieModalOpen(true)}
        currentLang={currentLanguage}
        onToggleLang={toggleLanguage}
      />

      {/* Real, Working Cookie Consent Banner */}
      <CookieConsentBanner
        isVisible={showCookieBanner}
        onAcceptAll={handleAcceptAllCookies}
        onRejectNonEssential={handleRejectNonEssentialCookies}
        onOpenPreferences={() => setCookieModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onAddToCart={handleAddToCart}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
        type={partnerType}
      />

      <CookiePreferencesModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
        currentPreferences={cookiePreferences}
        onSavePreferences={handleSaveCustomCookiePreferences}
        onAcceptAll={handleAcceptAllCookies}
        onRejectNonEssential={handleRejectNonEssentialCookies}
      />

      {/* Global Interactive Notification Pill */}
      {activeNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-zinc-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFC244]" />
          <span>{activeNotification}</span>
        </div>
      )}
    </div>
  );
}

