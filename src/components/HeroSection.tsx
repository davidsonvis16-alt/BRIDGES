import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Clock, X } from 'lucide-react';
import { POPULAR_LOCATIONS_SUGGESTIONS } from '../data/mockData';
import { CATEGORIES } from '../data/categories';

interface HeroSectionProps {
  onSearchLocation: (location: string) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  /** Address chosen elsewhere on the page (e.g. coverage list); mirrored into the input. */
  deliveryArea?: string | null;
}

export interface RecentLocation {
  address: string;
  timestamp: number;
  tag?: string;
}

const RECENT_LOCATIONS_STORAGE_KEY = 'bridges_recent_locations';
const MAX_RECENTS = 5;

function loadRecents(): RecentLocation[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_LOCATIONS_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function storeRecents(list: RecentLocation[]) {
  try {
    localStorage.setItem(RECENT_LOCATIONS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable (private mode or functional cookies declined)
  }
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchLocation,
  onSelectCategory,
  selectedCategory,
  deliveryArea,
}) => {
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>(loadRecents);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (deliveryArea) setAddress(deliveryArea);
  }, [deliveryArea]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateRecents = (updater: (prev: RecentLocation[]) => RecentLocation[]) => {
    setRecentLocations((prev) => {
      const next = updater(prev);
      storeRecents(next);
      return next;
    });
  };

  const commitAddress = (value: string, tag = 'Search') => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setAddress(trimmed);
    setShowSuggestions(false);
    updateRecents((prev) =>
      [
        { address: trimmed, timestamp: Date.now(), tag },
        ...prev.filter((r) => r.address.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_RECENTS)
    );
    onSearchLocation(trimmed);
  };

  const removeRecent = (addressToRemove: string) => {
    updateRecents((prev) => prev.filter((r) => r.address !== addressToRemove));
  };

  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      commitAddress('Nairobi CBD', 'Current location');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      // Demo: real reverse-geocoding is not wired up yet, so we use a fixed Nairobi area.
      () => {
        setIsLocating(false);
        commitAddress('Westlands, Nairobi', 'Current location');
      },
      () => {
        setIsLocating(false);
        commitAddress('Kilimani, Nairobi', 'Approximate location');
      },
      { timeout: 5000 }
    );
  };

  const query = address.trim().toLowerCase();
  const matchingSuggestions = POPULAR_LOCATIONS_SUGGESTIONS.filter(
    (s) => !query || s.label.toLowerCase().includes(query)
  );

  return (
    <section className="bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Copy + address search */}
        <div className="lg:col-span-7">
          <p className="text-sm font-medium text-brand">
            Nairobi · Mombasa · Kisumu · Nakuru · Eldoret
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-ink max-w-[16ch]">
            Meals, groceries and essentials, delivered.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl">
            Order from restaurants and shops near you. Pay with M-Pesa, card or cash on delivery.
          </p>

          <div ref={searchContainerRef} className="mt-8 relative max-w-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitAddress(address);
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <label className="sm:flex-1 flex items-center gap-2.5 h-12 flex-shrink-0 px-3.5 rounded-md border border-ink/25 bg-white focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
                <MapPin className="w-5 h-5 text-muted flex-shrink-0" />
                <span className="sr-only">Delivery address</span>
                <input
                  id="hero-address-search-input"
                  type="text"
                  value={address}
                  autoComplete="street-address"
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Enter your delivery address"
                  className="w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="h-12 px-6 rounded-md bg-brand text-white text-[15px] font-medium hover:bg-brand-dark cursor-pointer"
              >
                Find places
              </button>
            </form>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline disabled:text-muted disabled:no-underline cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              {isLocating ? 'Finding your location…' : 'Use my current location'}
            </button>

            {showSuggestions && (recentLocations.length > 0 || matchingSuggestions.length > 0) && (
              <div className="absolute left-0 right-0 top-[52px] z-30 bg-white border border-line rounded-md shadow-lg max-h-[420px] overflow-y-auto text-left">
                {recentLocations.length > 0 && (
                  <div className="py-2 border-b border-line">
                    <div className="flex items-center justify-between px-4 py-1.5">
                      <span className="text-xs font-medium text-muted uppercase tracking-wide">Recent</span>
                      <button
                        type="button"
                        onClick={() => updateRecents(() => [])}
                        className="text-xs text-muted hover:text-ink cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    {recentLocations.map((item) => (
                      <div key={item.address} className="flex items-center hover:bg-paper">
                        <button
                          type="button"
                          onClick={() => commitAddress(item.address, item.tag)}
                          className="flex-1 flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer"
                        >
                          <Clock className="w-4 h-4 text-muted flex-shrink-0" />
                          <span className="text-sm text-ink truncate">{item.address}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRecent(item.address)}
                          className="p-2 mr-2 text-muted hover:text-ink cursor-pointer"
                          aria-label={`Remove ${item.address} from recent addresses`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {matchingSuggestions.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1.5 text-xs font-medium text-muted uppercase tracking-wide">
                      Popular areas
                    </div>
                    {matchingSuggestions.map((sug) => (
                      <button
                        key={sug.label}
                        type="button"
                        onClick={() => commitAddress(sug.label, sug.area)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-paper cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-muted flex-shrink-0" />
                        <span className="text-sm text-ink truncate">{sug.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Category picker */}
        <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-line">
          <h2 className="text-sm font-medium text-muted">What do you need today?</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`h-20 px-4 flex flex-col justify-between items-start rounded-md border text-left cursor-pointer ${
                    isSelected
                      ? 'border-brand bg-brand-tint text-brand-dark'
                      : 'border-line bg-white text-ink hover:border-ink/40'
                  }`}
                >
                  <Icon className="w-5 h-5 mt-3" strokeWidth={1.75} />
                  <span className="text-sm font-medium mb-3">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
