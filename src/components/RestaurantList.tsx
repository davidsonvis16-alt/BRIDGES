import React from 'react';
import { Star } from 'lucide-react';
import { RestaurantBrand } from '../types';
import { CATEGORIES } from '../data/categories';

interface RestaurantListProps {
  restaurants: RestaurantBrand[];
  onSelectRestaurant: (restaurant: RestaurantBrand) => void;
  selectedCategory: string;
  onFilterChange: (category: string) => void;
  deliveryArea?: string | null;
}

const PRICE_LABELS = ['', 'Budget', 'Mid-range', 'Premium'];

function priceLabel(priceRange: string): string {
  const level = priceRange.split(/\s+/).filter(Boolean).length;
  return PRICE_LABELS[Math.min(level, 3)] || priceRange;
}

const EMPTY_STATE: Record<string, string> = {
  courier: 'Package delivery is launching soon. You will be able to send parcels across town with a Bridges rider.',
};

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onSelectRestaurant,
  selectedCategory,
  onFilterChange,
  deliveryArea,
}) => {
  const filtered =
    selectedCategory === 'all'
      ? restaurants
      : restaurants.filter((r) => (r.kinds as string[]).includes(selectedCategory));

  return (
    <section id="restaurants-section" className="py-16 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink">
            Restaurants and shops
          </h2>
          <p className="text-sm text-muted">
            {deliveryArea ? `Delivering to ${deliveryArea}` : 'Enter your address to see delivery times'}
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-6 border-b border-line overflow-x-auto [scrollbar-width:none]">
          <div className="flex gap-6 min-w-max" role="tablist">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onFilterChange(cat.id)}
                  className={`pb-3 -mb-px border-b-2 text-[15px] cursor-pointer ${
                    active
                      ? 'border-brand text-ink font-medium'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-md border border-line bg-white px-6 py-10 text-center">
            <p className="text-ink font-medium">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted max-w-md mx-auto">
              {EMPTY_STATE[selectedCategory] ?? 'No places match this category right now.'}
            </p>
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className="mt-4 text-sm font-medium text-brand hover:underline cursor-pointer"
            >
              Show everything
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
            {filtered.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelectRestaurant(r)}
                className="group self-start text-left cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-md overflow-hidden bg-line">
                  <img
                    src={r.imageUrl}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium text-ink leading-snug group-hover:underline underline-offset-2">
                    {r.name}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-ink flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-ink" strokeWidth={0} />
                    {r.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{r.category}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {r.deliveryTime} · {priceLabel(r.priceRange)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
