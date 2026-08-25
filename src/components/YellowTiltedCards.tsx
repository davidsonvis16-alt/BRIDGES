import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Flame, Heart } from 'lucide-react';
import friedChickenImg from '../assets/images/cheesy_fried_chicken_1787668490131.jpg';
import cobbSaladImg from '../assets/images/cobb_salad_platter_1787668507356.jpg';
import beefTacosImg from '../assets/images/beef_tacos_platter_1787668525260.jpg';

interface FoodCardItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  rating: string;
  image: string;
  initialRotate: number;
  hoverRotate: number;
  yOffset: number;
  badgeBg: string;
}

const TILTED_CARDS: FoodCardItem[] = [
  {
    id: 'card-fried-chicken',
    title: 'Cheesy Golden Crunch',
    subtitle: 'Crispy Fillets with Cheddar Drizzle',
    tag: 'Trending Now',
    rating: '4.9',
    image: friedChickenImg,
    initialRotate: -7,
    hoverRotate: -2,
    yOffset: 6,
    badgeBg: 'bg-amber-400 text-zinc-950',
  },
  {
    id: 'card-cobb-salad',
    title: 'Signature Cobb Platter',
    subtitle: 'Fresh Avocado, Bacon & Farm Eggs',
    tag: 'Chef’s Favorite',
    rating: '5.0',
    image: cobbSaladImg,
    initialRotate: 2,
    hoverRotate: 0,
    yOffset: -12,
    badgeBg: 'bg-emerald-500 text-white',
  },
  {
    id: 'card-beef-tacos',
    title: 'Braised Nyama & Tacos',
    subtitle: 'Slow-Cooked Beef with Spiced Rice',
    tag: 'Hot & Savory',
    rating: '4.8',
    image: beefTacosImg,
    initialRotate: 8,
    hoverRotate: 3,
    yOffset: 8,
    badgeBg: 'bg-red-500 text-white',
  },
];

export const YellowTiltedCards: React.FC = () => {
  return (
    <div
      id="yellow-tilted-cards-showcase"
      className="relative w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center select-none"
    >
      {/* Background ambient glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[320px] sm:w-[540px] md:w-[720px] h-64 sm:h-80 bg-[#FFC244]/25 blur-3xl rounded-full" />
      </div>

      {/* Tilted Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 w-full max-w-5xl items-center justify-center pt-2 pb-6">
        {TILTED_CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            id={card.id}
            initial={{ opacity: 0, y: 30, rotate: card.initialRotate }}
            whileInView={{
              opacity: 1,
              y: card.yOffset,
              rotate: card.initialRotate,
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: card.hoverRotate,
              y: card.yOffset - 14,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative cursor-pointer"
          >
            {/* Yellow Card Frame Container */}
            <div className="bg-[#FFC244] p-3.5 sm:p-4 rounded-[32px] shadow-[0_16px_36px_rgba(255,194,68,0.35)] hover:shadow-[0_24px_48px_rgba(255,194,68,0.5)] border-2 border-[#E6AA2B] transition-all duration-300">
              
              {/* Image Window */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-zinc-900 shadow-inner">
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Rating Badge Overlay */}
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{card.rating}</span>
                </div>

                {/* Tag Pill Overlay */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-md ${card.badgeBg}`}>
                  {card.tag}
                </div>

                {/* Heart hover reaction */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </div>
              </div>

              {/* Card Label & Details */}
              <div className="mt-3.5 px-1.5 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-black text-zinc-950 tracking-tight line-clamp-1 group-hover:text-black">
                    {card.title}
                  </h4>
                  <Sparkles className="w-4 h-4 text-zinc-900 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-xs font-semibold text-zinc-800/90 mt-0.5 line-clamp-1">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
