import React from 'react';
import { Zap, UtensilsCrossed, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { VALUE_PROPS } from '../data/mockData';
import { PromoCards } from './PromoCards';

interface ValuePropsProps {
  onOpenPartner: (type: 'courier' | 'restaurant') => void;
  onExploreFood: () => void;
}

export const ValueProps: React.FC<ValuePropsProps> = ({
  onOpenPartner,
  onExploreFood,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-7 h-7 text-black" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-7 h-7 text-black" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-7 h-7 text-black" />;
      default:
        return <Zap className="w-7 h-7 text-black" />;
    }
  };

  return (
    <section id="value-props-section" className="py-16 sm:py-24 bg-white dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800 relative overflow-hidden transition-colors duration-200 scroll-mt-20">
      {/* Dynamic Yellow Tilted Food Cards Showcase */}
      <div className="relative z-10 -mt-4 sm:-mt-8 mb-6">
        <PromoCards />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 dark:border dark:border-amber-800/40 px-3 py-1 rounded-full mb-3 shadow-xs">
            <span>Why Millions Choose Bridges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-100 tracking-tight">
            Your city's favorites, delivered seamlessly
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 font-medium">
            We bridge the gap between Kenya's best kitchens, neighborhood supermarkets, and your doorstep.
          </p>
        </div>

        {/* Three-column Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.id}
              id={`value-prop-card-${prop.id}`}
              className="bg-zinc-50 dark:bg-zinc-950 rounded-3xl p-8 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Custom Icon in Brand Color Pill */}
                <div className="w-16 h-16 rounded-2xl bg-[#FFC244] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  {getIcon(prop.icon)}
                </div>

                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-100 tracking-tight mb-3">
                  {prop.title}
                </h3>

                {/* 1-sentence description */}
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {prop.description}
                </p>
              </div>

              {/* Stat highlight */}
              <div className="mt-8 pt-6 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-zinc-950 dark:text-zinc-100">
                    {prop.stat}
                  </div>
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {prop.statLabel}
                  </div>
                </div>

                <button
                  onClick={onExploreFood}
                  className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:bg-[#FFC244] group-hover:border-[#FFC244] group-hover:text-black transition-colors cursor-pointer"
                  aria-label="Learn more"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Kenyan rider dispatch highlights */}
        <div className="mt-14 bg-zinc-900 dark:bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border dark:border-zinc-800/80 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC244] text-black flex items-center justify-center font-bold flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Partner with Bridges in Nairobi, Mombasa & Kisumu
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Whether you own a restaurant or ride a boda boda, join Kenya’s fastest-growing on-demand network.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="value-prop-courier-btn"
              onClick={() => onOpenPartner('courier')}
              className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_3px_0_0_#000000] active:translate-y-0.5 active:shadow-[0_1px_0_0_#000000] cursor-pointer"
            >
              Become a Courier
            </button>
            <button
              id="value-prop-partner-btn"
              onClick={() => onOpenPartner('restaurant')}
              className="py-3 px-5 rounded-2xl bg-[#FFC244] hover:bg-[#ffb71a] text-black font-bold text-xs sm:text-sm transition-all shadow-[0_3px_0_0_#D49E00] active:translate-y-0.5 active:shadow-[0_1px_0_0_#D49E00] cursor-pointer"
            >
              Add Your Restaurant
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
