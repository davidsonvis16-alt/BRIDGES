import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Utensils,
  ShoppingBag,
  Pill,
  Coffee,
  Package,
  LayoutGrid,
  Check,
  Bike,
  Clock,
  History,
  X,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { POPULAR_LOCATIONS_SUGGESTIONS } from '../data/mockData';
import { FloatingBurger } from './FloatingBurger';

interface HeroSectionProps {
  onSearchLocation: (location: string) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export interface RecentLocation {
  address: string;
  timestamp: number;
  tag?: string;
}

const RECENT_LOCATIONS_STORAGE_KEY = 'bridges_recent_locations';

const INITIAL_DEFAULT_RECENTS: RecentLocation[] = [
  {
    address: 'Westlands, Nairobi (Near Sarit Centre)',
    timestamp: Date.now() - 1000 * 60 * 45,
    tag: 'Nairobi'
  },
  {
    address: 'Kilimani, Nairobi (Near Yaya Centre)',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    tag: 'Nairobi'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchLocation,
  onSelectCategory,
  selectedCategory,
}) => {
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);
  
  // Recent Locations State initialized from localStorage
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_LOCATIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      // If never set before, initialize with default suggestions and store
      localStorage.setItem(RECENT_LOCATIONS_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_RECENTS));
      return INITIAL_DEFAULT_RECENTS;
    } catch {
      return INITIAL_DEFAULT_RECENTS;
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const saveRecentLocation = (newAddress: string, areaTag: string = 'Recent') => {
    if (!newAddress || !newAddress.trim()) return;
    const trimmed = newAddress.trim();

    setRecentLocations((prev) => {
      const filtered = prev.filter(
        (item) => item.address.toLowerCase() !== trimmed.toLowerCase()
      );
      const updated: RecentLocation[] = [
        {
          address: trimmed,
          timestamp: Date.now(),
          tag: areaTag
        },
        ...filtered
      ].slice(0, 5); // Keep up to 5 most recent

      try {
        localStorage.setItem(RECENT_LOCATIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save recent location to localStorage', err);
      }
      return updated;
    });
  };

  const handleRemoveRecent = (e: React.MouseEvent, addressToRemove: string) => {
    e.stopPropagation();
    setRecentLocations((prev) => {
      const updated = prev.filter((item) => item.address !== addressToRemove);
      try {
        localStorage.setItem(RECENT_LOCATIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to update recent locations in localStorage', err);
      }
      return updated;
    });
  };

  const handleClearAllRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentLocations([]);
    try {
      localStorage.setItem(RECENT_LOCATIONS_STORAGE_KEY, JSON.stringify([]));
    } catch (err) {
      console.warn('Failed to clear recent locations from localStorage', err);
    }
  };

  const categories = [
    { id: 'all', label: 'All Categories', icon: LayoutGrid },
    { id: 'food', label: 'Food & Meals', icon: Utensils },
    { id: 'groceries', label: 'Bridges Mart Groceries', icon: ShoppingBag },
    { id: 'pharmacy', label: 'Pharmacy & Health', icon: Pill },
    { id: 'coffee', label: 'Coffee & Bakeries', icon: Coffee },
    { id: 'courier', label: 'Send Package', icon: Package },
  ];

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocationSuccessMsg(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Simulated fast Kenyan GPS resolution
          setTimeout(() => {
            const detectedArea = 'Westlands, Nairobi (Near Sarit Centre)';
            setAddress(detectedArea);
            setIsLocating(false);
            setLocationSuccessMsg('Location detected: Westlands, Nairobi');
            saveRecentLocation(detectedArea, 'Current GPS');
            onSearchLocation(detectedArea);
            setTimeout(() => setLocationSuccessMsg(null), 3500);
          }, 800);
        },
        () => {
          // Fallback simulation for Nairobi
          setTimeout(() => {
            const defaultNairobi = 'Kilimani, Nairobi (Near Yaya Centre)';
            setAddress(defaultNairobi);
            setIsLocating(false);
            setLocationSuccessMsg('Estimated location: Kilimani, Nairobi');
            saveRecentLocation(defaultNairobi, 'Estimated GPS');
            onSearchLocation(defaultNairobi);
            setTimeout(() => setLocationSuccessMsg(null), 3500);
          }, 900);
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        const defaultLoc = 'Nairobi CBD & Upper Hill';
        setAddress(defaultLoc);
        setIsLocating(false);
        setLocationSuccessMsg('Location set to Nairobi CBD');
        saveRecentLocation(defaultLoc, 'Nairobi');
        onSearchLocation(defaultLoc);
        setTimeout(() => setLocationSuccessMsg(null), 3000);
      }, 600);
    }
  };

  const handleSelectRecent = (loc: RecentLocation) => {
    setAddress(loc.address);
    saveRecentLocation(loc.address, loc.tag || 'Recent');
    setShowSuggestions(false);
    onSearchLocation(loc.address);
    setLocationSuccessMsg(`Selected: ${loc.address.split('(')[0].trim()}`);
    setTimeout(() => setLocationSuccessMsg(null), 3000);
  };

  const handleSelectSuggestion = (loc: string, areaTag: string) => {
    setAddress(loc);
    saveRecentLocation(loc, areaTag);
    setShowSuggestions(false);
    onSearchLocation(loc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAddress = address.trim() || 'Westlands, Nairobi';
    setAddress(finalAddress);
    saveRecentLocation(finalAddress, 'Search');
    onSearchLocation(finalAddress);
    setShowSuggestions(false);
  };

  return (
    <section className="relative bg-[#FFC244] pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#febb24]/50 pointer-events-none blur-2xl" />
      <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 rounded-full bg-[#ffd06e]/40 pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Exploded Levitating Gourmet Burger directly drawn on main yellow page */}
          <div className="lg:col-span-5 flex justify-center items-center relative order-1 lg:order-1">
            <FloatingBurger className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]" />
          </div>

          {/* Right Column: Hero Copy & Location Search Bar */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-2">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 text-zinc-900 text-xs font-bold mb-4 sm:mb-6 tracking-wide backdrop-blur-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-950 flex-shrink-0" />
              <span>Fast Delivery in Nairobi, Mombasa, Kisumu & Beyond</span>
            </motion.div>

            {/* Large Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black tracking-tight text-zinc-950 leading-[1.08]"
            >
              Food delivery and more
            </motion.h1>

            {/* Short Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-zinc-900 font-semibold max-w-xl mx-auto lg:mx-0 leading-snug"
            >
              Groceries, shops, pharmacies, anything!
            </motion.p>

            {/* Prominent Address / Location Search Bar */}
            <motion.div
              ref={searchContainerRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-8 relative max-w-2xl mx-auto lg:mx-0"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-2.5 sm:p-3 shadow-2xl border border-black/5 flex flex-col sm:flex-row items-center gap-2 relative z-20"
              >
                {/* Address Input */}
                <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 sm:py-1">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-900">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    id="hero-address-search-input"
                    ref={inputRef}
                    type="text"
                    value={address}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="What's your address?"
                    className="w-full text-zinc-900 placeholder:text-zinc-400 text-sm sm:text-base font-semibold focus:outline-none bg-transparent"
                  />
                </div>

                {/* Action Buttons: Use current location + Search */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    id="use-current-location-btn"
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="px-3.5 py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0 cursor-pointer"
                    title="Detect your current location automatically"
                  >
                    <Navigation
                      className={`w-3.5 h-3.5 text-zinc-700 ${
                        isLocating ? 'animate-spin text-amber-600' : ''
                      }`}
                    />
                    <span className="hidden sm:inline">
                      {isLocating ? 'Locating...' : 'Use current location'}
                    </span>
                    <span className="sm:hidden">{isLocating ? 'Locating...' : 'Current location'}</span>
                  </button>

                  <button
                    id="hero-search-submit-btn"
                    type="submit"
                    className="py-3 px-6 rounded-2xl bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-1.5 flex-shrink-0 shadow-[0_3px_0_0_#000000] active:translate-y-0.5 active:shadow-[0_1px_0_0_#000000] cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find Food</span>
                  </button>
                </div>
              </form>

              {/* Location Success Toast */}
              {locationSuccessMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-30"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locationSuccessMsg}</span>
                </motion.div>
              )}

              {/* Location Autocomplete Suggestions & Recent Locations dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    id="hero-locations-dropdown"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-zinc-200 z-30 text-left overflow-hidden max-h-[480px] overflow-y-auto"
                  >
                    {/* SECTION 1: RECENT LOCATIONS (SAVED IN LOCALSTORAGE) */}
                    {recentLocations.length > 0 && (
                      <div className="mb-4 pb-3 border-b border-zinc-100">
                        <div className="flex items-center justify-between px-2 py-1 mb-2">
                          <div className="flex items-center gap-2 text-xs font-black text-zinc-900 uppercase tracking-wider">
                            <History className="w-3.5 h-3.5 text-amber-600" />
                            <span>Recent Delivery Locations</span>
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                              {recentLocations.length}
                            </span>
                          </div>

                          <button
                            id="clear-all-recent-locations-btn"
                            type="button"
                            onClick={handleClearAllRecents}
                            className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-red-600 transition-colors cursor-pointer px-2 py-0.5 rounded-lg hover:bg-red-50"
                            title="Clear all saved recent locations"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Clear all</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          {recentLocations.map((item, idx) => (
                            <div
                              key={`recent-${idx}`}
                              id={`recent-location-item-${idx}`}
                              onClick={() => handleSelectRecent(item)}
                              className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50/90 transition-all cursor-pointer border border-transparent hover:border-amber-200/80"
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC244] group-hover:scale-105 transition-all">
                                  <Clock className="w-3.5 h-3.5 text-amber-900" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-zinc-900 truncate group-hover:text-amber-950">
                                    {item.address}
                                  </div>
                                  <div className="text-[10px] text-zinc-400 font-medium flex items-center gap-1.5">
                                    <span>Last used delivery address</span>
                                    {item.tag && (
                                      <>
                                        <span>•</span>
                                        <span className="text-amber-700 font-semibold">{item.tag}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                  Select <ChevronRight className="w-3 h-3" />
                                </span>
                                <button
                                  id={`delete-recent-location-btn-${idx}`}
                                  type="button"
                                  onClick={(e) => handleRemoveRecent(e, item.address)}
                                  className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Remove this address from history"
                                  aria-label={`Remove ${item.address} from recents`}
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: POPULAR KENYAN DELIVERY HUBS */}
                    <div>
                      <div className="flex items-center justify-between px-2 py-1 mb-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        <span>Popular Delivery Hubs in Kenya</span>
                        <button
                          type="button"
                          onClick={() => setShowSuggestions(false)}
                          className="text-zinc-400 hover:text-zinc-700 cursor-pointer text-xs font-bold"
                        >
                          Close
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {POPULAR_LOCATIONS_SUGGESTIONS.map((sug, idx) => (
                          <button
                            key={idx}
                            id={`location-sug-${idx}`}
                            type="button"
                            onClick={() => handleSelectSuggestion(sug.label, sug.area)}
                            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50/80 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <MapPin className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-zinc-900 leading-tight truncate">
                                  {sug.label}
                                </div>
                                <div className="text-[10px] text-zinc-400">{sug.area}</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 group-hover:bg-amber-200 group-hover:text-amber-900 px-2 py-0.5 rounded-md flex-shrink-0">
                              {sug.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Recent Location Chips beneath search bar */}
              {recentLocations.length > 0 && !showSuggestions && (
                <div className="mt-3 flex items-center justify-center lg:justify-start gap-1.5 flex-wrap px-1 text-xs">
                  <span className="text-xs font-extrabold text-zinc-900/80 flex items-center gap-1 mr-1">
                    <History className="w-3 h-3 text-zinc-900" />
                    <span>Recent:</span>
                  </span>
                  {recentLocations.slice(0, 3).map((item, idx) => (
                    <button
                      key={`quick-recent-${idx}`}
                      id={`quick-recent-chip-${idx}`}
                      type="button"
                      onClick={() => handleSelectRecent(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 hover:bg-white text-zinc-900 font-bold text-[11px] sm:text-xs shadow-xs border border-black/5 hover:border-black/20 hover:scale-102 transition-all cursor-pointer"
                      title={`Re-select: ${item.address}`}
                    >
                      <Clock className="w-2.5 h-2.5 text-amber-700" />
                      <span className="max-w-[160px] sm:max-w-[200px] truncate">
                        {item.address.split(',')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`hero-category-${cat.id}`}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-950 text-[#FFC244] shadow-[0_3px_0_0_#000000] scale-105'
                        : 'bg-white/90 hover:bg-white text-zinc-900 border border-black/10 shadow-sm hover:shadow hover:scale-102'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FFC244]' : 'text-zinc-700'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Live Order Micro-ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5 text-xs text-zinc-900 font-semibold"
            >
              <Bike className="w-4 h-4 text-zinc-950 flex-shrink-0" />
              <span>
                <strong>1,840+ orders</strong> currently on their way across Nairobi & Mombasa
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Iconic Curved Bottom Edge Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-16 md:h-20 text-[#FAFAFA] fill-current transition-colors duration-200"
        >
          <path d="M0,40 C320,110 460,0 720,45 C980,90 1100,15 1200,65 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
