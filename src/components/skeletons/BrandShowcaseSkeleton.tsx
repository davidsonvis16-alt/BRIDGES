import React from 'react';

export const BrandShowcaseSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div
      className="flex items-stretch gap-6 overflow-x-hidden pb-6 pt-2 select-none"
      aria-label="Loading restaurants..."
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex-shrink-0 w-44 sm:w-52 flex flex-col items-center text-center animate-pulse"
        >
          {/* Circular Frame Skeleton */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-4 rounded-full p-1.5 bg-zinc-200/80 dark:bg-zinc-800">
            <div className="w-full h-full rounded-full bg-zinc-300 dark:bg-zinc-700 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent" />
            </div>

            {/* Simulated Delivery Time Pill Skeleton */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/90 dark:bg-zinc-900 rounded-full shadow-sm" />

            {/* Simulated Rating Badge Skeleton */}
            <div className="absolute top-1 right-1 w-10 h-5 bg-zinc-400 dark:bg-zinc-600 rounded-full shadow-md" />
          </div>

          {/* Title Bar Skeleton */}
          <div className="h-5 w-28 sm:w-36 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
          </div>

          {/* Subtitle / Category Bar Skeleton */}
          <div className="h-3.5 w-20 sm:w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded-md mb-2" />

          {/* Tag Pill Skeleton */}
          <div className="h-4 w-16 bg-amber-100/70 dark:bg-amber-950/50 rounded-md mt-0.5" />
        </div>
      ))}
    </div>
  );
};
