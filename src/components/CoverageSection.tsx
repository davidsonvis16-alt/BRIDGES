import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CITIES_COVERAGE } from '../data/mockData';

interface CoverageSectionProps {
  onSelectEstate: (estateName: string, city: string) => void;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({ onSelectEstate }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('nairobi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const city = CITIES_COVERAGE.find((c) => c.id === selectedCityId) ?? CITIES_COVERAGE[0];
  const isLive = city.status === 'active';
  const estates = city.popularEstates.filter((e) =>
    e.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <section id="coverage-section" className="py-16 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink">
          Where we deliver
        </h2>
        <p className="mt-2 text-[15px] text-muted max-w-xl">
          Pick your city to see the neighbourhoods we cover. Not listed? Enter your address above and
          we will check.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* City list */}
          <ul className="md:col-span-4 rounded-md border border-line bg-white divide-y divide-line self-start">
            {CITIES_COVERAGE.map((c) => {
              const active = c.id === selectedCityId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCityId(c.id);
                      setSearchQuery('');
                    }}
                    aria-current={active}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-[15px] cursor-pointer ${
                      active ? 'bg-brand-tint text-brand-dark font-medium' : 'text-ink hover:bg-paper'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-muted">
                      {c.status === 'active' ? c.avgTime : 'Coming soon'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Selected city */}
          <div className="md:col-span-8 rounded-md border border-line bg-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-line">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{city.name}</h3>
              <p className="text-sm text-muted">
                {isLive ? `Average delivery ${city.avgTime} · ${city.riderCount}` : city.riderCount}
              </p>
            </div>

            <label className="mt-6 flex items-center gap-2 h-10 px-3 max-w-sm rounded-md border border-line focus-within:border-brand">
              <Search className="w-4 h-4 text-muted" />
              <span className="sr-only">Search neighbourhoods in {city.name}</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${city.name} neighbourhoods`}
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </label>

            {estates.length > 0 ? (
              <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-6">
                {estates.map((estate) => (
                  <li key={estate} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => onSelectEstate(estate, city.name)}
                      disabled={!isLive}
                      className="w-full py-2.5 text-left text-[15px] text-ink hover:text-brand disabled:text-muted disabled:hover:text-muted cursor-pointer disabled:cursor-default"
                    >
                      {estate}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-muted">
                No neighbourhood called “{searchQuery}” in our list, but we may still cover it. Enter
                your full address at the top of the page to check.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
