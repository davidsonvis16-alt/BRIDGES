import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { RestaurantBrand } from '../types';
import { BrandShowcaseSkeleton } from './skeletons/BrandShowcaseSkeleton';

interface BrandShowcaseProps {
  restaurants: RestaurantBrand[];
  onSelectRestaurant: (restaurant: RestaurantBrand) => void;
  selectedCategory: string;
  onFilterChange: (category: string) => void;
  isLoading?: boolean;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  restaurants,
  onSelectRestaurant,
  selectedCategory,
  onFilterChange,
  isLoading = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredRestaurants = restaurants.filter((r) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'food') return true;
    if (selectedCategory === 'groceries') return r.id === 'bridges-mart';
    if (selectedCategory === 'coffee') return r.id === 'artcaffe' || r.id === 'java-house';
    return true;
  });

  return (
    <section id="restaurants-section" className="py-12 sm:py-16 bg-[#FAFAFA] dark:bg-zinc-950 transition-colors duration-200 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 dark:border dark:border-amber-800/40 px-3 py-1 rounded-full mb-2">
              <Award className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Top Rated in Kenya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-zinc-100 tracking-tight">
              Top brands & restaurants on Bridges
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
              Order from beloved local culinary institutions and fast daily essentials.
            </p>
          </div>

          {/* Navigation Scroll Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              id="scroll-brands-left-btn"
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="scroll-brands-right-btn"
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Row of Top Restaurant Brands or Skeleton Loader */}
        {isLoading ? (
          <BrandShowcaseSkeleton count={6} />
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory focus:outline-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredRestaurants.map((brand) => (
              <div
                key={brand.id}
                id={`brand-card-${brand.id}`}
                onClick={() => onSelectRestaurant(brand)}
                className="flex-shrink-0 w-44 sm:w-52 snap-start flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Circular Frame for Image with Real Food Imagery */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-4 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-[#FFC244] to-amber-200 shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 relative">
                    <img
                      src={brand.imageUrl}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Delivery time pill overlay on circle */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-bold text-zinc-900 dark:text-zinc-100 border dark:border-zinc-700/60 shadow-sm flex items-center gap-1 whitespace-nowrap">
                      <Clock className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                      <span>{brand.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Rating badge attached to circle frame */}
                  <div className="absolute top-1 right-1 bg-black text-[#FFC244] text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#FFC244]" />
                    <span>{brand.rating}</span>
                  </div>
                </div>

                {/* Brand Title & Category */}
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                  {brand.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 line-clamp-1">
                  {brand.category}
                </p>
                <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 dark:border dark:border-amber-800/40 px-2 py-0.5 rounded-md mt-1.5">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Scroll hint on mobile */}
        {!isLoading && (
          <div className="flex sm:hidden items-center justify-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            <span>Swipe to explore more restaurants →</span>
          </div>
        )}
      </motion.div>
    </section>
  );
};
