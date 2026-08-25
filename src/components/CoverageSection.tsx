import React, { useState } from 'react';
import { MapPin, CheckCircle, Clock, Users, Search, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CITIES_COVERAGE } from '../data/mockData';
import { BrandedBeverageBackdrop } from './BrandedBeverageBackdrop';

interface CoverageSectionProps {
  onSelectEstate: (estateName: string, city: string) => void;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({
  onSelectEstate,
}) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('nairobi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCity = CITIES_COVERAGE.find((c) => c.id === selectedCityId) || CITIES_COVERAGE[0];

  const filteredEstates = currentCity.popularEstates.filter((estate) =>
    estate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="coverage-section" className="py-16 sm:py-24 bg-[#FAFAFA] dark:bg-zinc-950 relative overflow-hidden transition-colors duration-200 scroll-mt-20">
      {/* Background Beverage Splashes branded with Bridges Logo */}
      <BrandedBeverageBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 dark:border dark:border-amber-800/40 px-3 py-1 rounded-full mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Expanding Across East Africa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-100 tracking-tight">
            Where we deliver in Kenya
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
            From the bustling streets of Nairobi to the coastal breeze of Mombasa, check your neighborhood.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 max-w-4xl mx-auto">
          {CITIES_COVERAGE.map((city) => {
            const isSelected = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                id={`city-pill-${city.id}`}
                onClick={() => {
                  setSelectedCityId(city.id);
                  setSearchQuery('');
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 flex items-center gap-2 cursor-pointer backdrop-blur-xs ${
                  isSelected
                    ? 'bg-zinc-950 text-[#FFC244] shadow-[0_3px_0_0_#000000] scale-105'
                    : 'bg-white/95 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm'
                }`}
              >
                <span>{city.name}</span>
                {city.status === 'active' ? (
                  <span
                    className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#FFC244]/20 text-[#FFC244]'
                        : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    Live
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected City Coverage Card */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-zinc-200/80 dark:border-zinc-800 shadow-xl max-w-5xl mx-auto relative z-10">
          {/* Card Header with Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-zinc-100">
                  {currentCity.name}, Kenya
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Live 7 Days / Week
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Showing coverage zones & active delivery hubs in {currentCity.name}.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{currentCity.riderCount}</span>
              </div>
              {currentCity.avgTime !== '--' && (
                <>
                  <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Avg {currentCity.avgTime}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search Filter for Estates */}
          <div className="mt-6 mb-4">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="coverage-estate-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search neighborhood in ${currentCity.name} (e.g. Westlands)...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Neighborhood & Branch Badges Grid */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4">
            {filteredEstates.length > 0 ? (
              filteredEstates.map((estate, idx) => (
                <button
                  key={idx}
                  id={`estate-badge-${idx}`}
                  onClick={() => onSelectEstate(estate, currentCity.name)}
                  className="px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border border-transparent dark:border-zinc-800 hover:bg-[#FFC244] dark:hover:bg-[#FFC244] hover:text-black dark:hover:text-black hover:border-[#FFC244] dark:hover:border-[#FFC244] font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>{estate}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              ))
            ) : (
              <div className="py-6 text-center w-full text-zinc-400 dark:text-zinc-500 text-sm">
                No matching neighborhoods found for "{searchQuery}". But our couriers cover the entire {currentCity.name} metropolitan area!
              </div>
            )}
          </div>

          {/* Delivery Note footer */}
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Don't see your specific estate? Enter your exact pin in the search bar above.
            </span>
            <a
              href="#hero-address-search-input"
              className="font-bold text-zinc-900 dark:text-[#FFC244] hover:underline"
            >
              Order to my location →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
