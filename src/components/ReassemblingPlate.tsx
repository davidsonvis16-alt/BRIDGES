import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import fullSaladImg from '../assets/images/cobb_salad_plate_1787666514329.jpg';
import dishImg from '../assets/images/turquoise_platter_1787666534505.jpg';

// Doctor Strange Mystic Dimension Food Layers
// Only the food ingredients (no plate attached) with distinct dimensional trajectories
const FOOD_SHARDS = [
  {
    id: 'shard-black-beans',
    name: 'Black Beans & Fresh Herb Greens',
    topPercent: 8,
    heightPercent: 13,
    start: { y: -280, x: -60, rotateZ: -18, rotateX: 35, scale: 1.25, opacity: 0 },
    mid: { y: -70, x: -20, rotateZ: -8, rotateX: 15, scale: 1.08, opacity: 0.9 },
    fallDelay: 0.1,
  },
  {
    id: 'shard-corn',
    name: 'Sweet Yellow Corn',
    topPercent: 19,
    heightPercent: 12,
    start: { y: -310, x: 70, rotateZ: 22, rotateX: -25, scale: 1.2, opacity: 0 },
    mid: { y: -90, x: 25, rotateZ: 10, rotateX: -10, scale: 1.06, opacity: 0.9 },
    fallDelay: 0.3,
  },
  {
    id: 'shard-eggs',
    name: 'Farm-Fresh Sliced Eggs',
    topPercent: 29,
    heightPercent: 14,
    start: { y: -340, x: -80, rotateZ: -25, rotateX: 40, scale: 1.3, opacity: 0 },
    mid: { y: -110, x: -30, rotateZ: -12, rotateX: 20, scale: 1.1, opacity: 0.95 },
    fallDelay: 0.5,
  },
  {
    id: 'shard-chicken',
    name: 'Spiced Flame-Grilled Chicken',
    topPercent: 41,
    heightPercent: 14,
    start: { y: -370, x: 90, rotateZ: 28, rotateX: -30, scale: 1.28, opacity: 0 },
    mid: { y: -130, x: 35, rotateZ: 14, rotateX: -15, scale: 1.08, opacity: 0.95 },
    fallDelay: 0.7,
  },
  {
    id: 'shard-tomatoes',
    name: 'Diced Ripe Tomatoes',
    topPercent: 53,
    heightPercent: 12,
    start: { y: -400, x: -65, rotateZ: -20, rotateX: 30, scale: 1.22, opacity: 0 },
    mid: { y: -140, x: -25, rotateZ: -10, rotateX: 12, scale: 1.06, opacity: 0.9 },
    fallDelay: 0.9,
  },
  {
    id: 'shard-avocado',
    name: 'Fresh Diced Avocado',
    topPercent: 63,
    heightPercent: 13,
    start: { y: -430, x: 75, rotateZ: 24, rotateX: -35, scale: 1.26, opacity: 0 },
    mid: { y: -150, x: 30, rotateZ: 12, rotateX: -15, scale: 1.08, opacity: 0.9 },
    fallDelay: 1.1,
  },
  {
    id: 'shard-cheese',
    name: 'Shredded Sharp Cheddar',
    topPercent: 74,
    heightPercent: 12,
    start: { y: -460, x: -85, rotateZ: -22, rotateX: 35, scale: 1.24, opacity: 0 },
    mid: { y: -160, x: -35, rotateZ: -10, rotateX: 18, scale: 1.07, opacity: 0.9 },
    fallDelay: 1.3,
  },
  {
    id: 'shard-bacon',
    name: 'Crispy Smoked Bacon Pieces',
    topPercent: 84,
    heightPercent: 12,
    start: { y: -490, x: 80, rotateZ: 26, rotateX: -40, scale: 1.3, opacity: 0 },
    mid: { y: -170, x: 30, rotateZ: 14, rotateX: -20, scale: 1.1, opacity: 0.95 },
    fallDelay: 1.5,
  },
];

export const ReassemblingPlate: React.FC = () => {
  const [cycle, setCycle] = useState(0);

  // Periodic Doctor Strange dimensional assembly & settling loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 9500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] h-[360px] sm:h-[420px] mx-auto flex items-end justify-center select-none pointer-events-none -mb-16 sm:-mb-22 z-0">
      
      {/* Doctor Strange Mystic Sparks / Geometric Ring in Background */}
      <motion.div
        key={`mystic-ring-${cycle}`}
        initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
        animate={{
          rotate: [0, 180, 360],
          scale: [0.6, 1.1, 1, 1.15, 0.5],
          opacity: [0, 0.45, 0.25, 0.35, 0],
        }}
        transition={{
          duration: 9,
          times: [0, 0.3, 0.6, 0.85, 1],
          ease: 'easeInOut',
        }}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-dashed border-amber-400/40 -z-10 pointer-events-none"
      >
        <div className="absolute inset-4 rounded-full border border-amber-500/20 rotate-45" />
        <div className="absolute inset-8 rounded-full border border-amber-300/30 -rotate-45" />
      </motion.div>

      {/* Main Oval Turquoise Platter (stays 100% complete and unbroken as the dish stage) */}
      <motion.div
        key={`plate-rotator-${cycle}`}
        initial={{ rotate: -22, scale: 0.92 }}
        animate={{
          // Rotates before food arrives (-22deg -> 0deg), stays locked while settling, then rotates smoothly after settling (0deg -> 18deg -> -22deg)
          rotate: [-22, 0, 0, 0, 18, -22],
          scale: [0.92, 1, 1, 1, 1.03, 0.92],
        }}
        transition={{
          duration: 9,
          times: [0, 0.22, 0.65, 0.72, 0.9, 1],
          ease: 'easeInOut',
        }}
        className="relative w-[250px] sm:w-[290px] md:w-[330px] aspect-[3/4] origin-center flex items-center justify-center"
      >
        {/* Platter drop shadow */}
        <div className="absolute inset-x-4 bottom-2 h-14 bg-black/15 blur-2xl rounded-full -z-10" />

        {/* 1. Complete, Unbroken Turquoise Dish Base Platter */}
        <div className="absolute inset-0 w-full h-full rounded-[52px] overflow-hidden drop-shadow-[0_22px_38px_rgba(0,0,0,0.16)]">
          <img
            src={dishImg}
            alt="Turquoise Ceramic Serving Platter"
            className="w-full h-full object-cover mix-blend-multiply opacity-95"
          />
        </div>

        {/* 2. Pure Food Area (Inner oval container masking out the plate rim from food slices) */}
        <div className="absolute inset-[6%] rounded-[46px] overflow-visible">
          {FOOD_SHARDS.map((shard) => {
            return (
              <motion.div
                key={`${shard.id}-${cycle}`}
                initial={{
                  y: shard.start.y,
                  x: shard.start.x,
                  rotateZ: shard.start.rotateZ,
                  rotateX: shard.start.rotateX,
                  scale: shard.start.scale,
                  opacity: shard.start.opacity,
                  filter: 'drop-shadow(0 15px 25px rgba(245,158,11,0.4))',
                }}
                animate={{
                  y: [shard.start.y, shard.mid.y, 0, 0, shard.start.y],
                  x: [shard.start.x, shard.mid.x, 0, 0, shard.start.x],
                  rotateZ: [shard.start.rotateZ, shard.mid.rotateZ, 0, 0, shard.start.rotateZ],
                  rotateX: [shard.start.rotateX, shard.mid.rotateX, 0, 0, shard.start.rotateX],
                  scale: [shard.start.scale, shard.mid.scale, 1, 1, shard.start.scale],
                  opacity: [0, 0.95, 1, 1, 0],
                  filter: [
                    'drop-shadow(0 20px 25px rgba(245,158,11,0.5))',
                    'drop-shadow(0 12px 15px rgba(245,158,11,0.3))',
                    'drop-shadow(0 0px 0px rgba(0,0,0,0))',
                    'drop-shadow(0 0px 0px rgba(0,0,0,0))',
                    'drop-shadow(0 20px 25px rgba(245,158,11,0.5))',
                  ],
                }}
                transition={{
                  duration: 9,
                  times: [
                    0,
                    0.15 + shard.fallDelay * 0.08,
                    0.38 + shard.fallDelay * 0.08,
                    0.72,
                    0.96,
                  ],
                  ease: 'easeOut',
                }}
                className="absolute inset-x-[4%] overflow-hidden rounded-2xl"
                style={{
                  top: `${shard.topPercent}%`,
                  height: `${shard.heightPercent}%`,
                }}
              >
                {/* Doctor Strange dimensional shimmer edge */}
                <motion.div
                  animate={{
                    opacity: [0.8, 0.2, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: shard.fallDelay,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 border border-amber-400/60 rounded-2xl z-20 pointer-events-none"
                />

                {/* Inner Food Content with precise offset positioning to reconstruct Cobb salad without plate borders */}
                <div
                  className="w-[118%] -ml-[9%] h-[800%] relative"
                  style={{
                    top: `-${(shard.topPercent / shard.heightPercent) * 100}%`,
                  }}
                >
                  <img
                    src={fullSaladImg}
                    alt={shard.name}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Golden Mystic Resonance Wave across the assembled food upon settling */}
        <motion.div
          key={`resonance-${cycle}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0, 0.4, 0],
            scale: [0.8, 0.8, 1.05, 1.15],
          }}
          transition={{
            duration: 9,
            times: [0, 0.48, 0.58, 0.72],
            ease: 'easeOut',
          }}
          className="absolute inset-4 rounded-[44px] border-2 border-amber-400/50 bg-gradient-to-t from-amber-400/10 via-amber-200/15 to-transparent pointer-events-none z-30"
        />
      </motion.div>
    </div>
  );
};
