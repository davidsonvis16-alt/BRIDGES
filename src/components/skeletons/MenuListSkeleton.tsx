import React from 'react';

export const MenuListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none"
      aria-label="Loading menu items..."
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-950/60 animate-pulse"
        >
          <div className="flex gap-3 mb-3">
            {/* Food Thumbnail Skeleton */}
            <div className="w-[72px] h-[72px] rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
            </div>

            <div className="flex-1 space-y-2">
              {/* Badge placeholder */}
              <div className="h-3.5 w-16 bg-amber-100/80 dark:bg-amber-950/80 rounded-md" />

              {/* Item Title placeholder */}
              <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
              </div>

              {/* Item Description placeholder */}
              <div className="space-y-1 pt-0.5">
                <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-2.5 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          </div>

          {/* Bottom Price & Button row */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
            <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
            <div className="h-7 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
