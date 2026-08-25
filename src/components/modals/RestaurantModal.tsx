import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RestaurantBrand, MenuItem } from '../../types';
import { MenuListSkeleton } from '../skeletons/MenuListSkeleton';

interface RestaurantModalProps {
  restaurant: RestaurantBrand | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, restaurant: RestaurantBrand) => void;
  isLoading?: boolean;
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onAddToCart,
  isLoading: externalLoading = false,
}) => {
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});
  const [basketTotal, setBasketTotal] = useState<number>(0);
  const [basketCount, setBasketCount] = useState<number>(0);
  const [isInternalLoading, setIsInternalLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && restaurant) {
      setIsInternalLoading(true);
      const timer = setTimeout(() => {
        setIsInternalLoading(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen, restaurant?.id]);

  const isLoading = externalLoading || isInternalLoading;

  if (!isOpen || !restaurant) return null;

  const handleAddItem = (item: MenuItem) => {
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setBasketTotal((prev) => prev + item.price);
    setBasketCount((prev) => prev + 1);

    if (onAddToCart) {
      onAddToCart(item, restaurant);
    }

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Image banner */}
          <div className="relative h-48 sm:h-56 w-full bg-zinc-900 flex-shrink-0">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Close button */}
            <button
              id="restaurant-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on hero */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#FFC244] text-black text-xs font-bold rounded-lg mb-1.5 uppercase tracking-wider">
                  {restaurant.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {restaurant.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                  {restaurant.category} • {restaurant.priceRange}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border dark:border-zinc-700/60">
                <div className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  <Star className="w-3.5 h-3.5 fill-[#FFC244] text-[#FFC244]" />
                  <span>{restaurant.rating}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">({restaurant.ratingCount})</span>
                </div>
                <div className="w-px h-3.5 bg-zinc-300 dark:bg-zinc-700" />
                <div className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  <Clock className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Menu Items */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {restaurant.description}
            </p>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Popular & Signature Items
                </h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Prices in Kenyan Shillings (KES)
                </span>
              </div>

              {isLoading ? (
                <MenuListSkeleton count={4} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {restaurant.featuredItems.map((item) => {
                    const isJustAdded = addedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all bg-zinc-50/30 dark:bg-zinc-950/60 group"
                      >
                        <div className="flex gap-3 mb-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-18 h-18 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                          />
                          <div>
                            {item.isPopular && (
                              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded-md inline-block mb-1 border dark:border-amber-800/40">
                                Best Seller
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                              {item.name}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
                          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                            KES {item.price.toLocaleString()}
                          </span>
                          <button
                            id={`add-item-${item.id}`}
                            onClick={() => handleAddItem(item)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-zinc-900 dark:bg-zinc-800 hover:bg-[#FFC244] dark:hover:bg-[#FFC244] hover:text-black dark:hover:text-black text-white'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

          {/* Sticky bottom basket bar if items added */}
          {basketCount > 0 && (
            <div className="p-4 bg-zinc-900 dark:bg-black text-white flex items-center justify-between border-t border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFC244] text-black flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {basketCount} item{basketCount > 1 ? 's' : ''} in order
                  </div>
                  <div className="text-base font-extrabold text-white">
                    KES {basketTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                id="checkout-preview-btn"
                onClick={() => {
                  alert(`Order simulated! Total: KES ${basketTotal.toLocaleString()}. Delivery in ${restaurant.deliveryTime} via Bridges Courier.`);
                  onClose();
                }}
                className="py-2.5 px-5 rounded-xl bg-[#FFC244] hover:bg-[#ffb71a] text-zinc-950 font-bold text-xs tracking-wide flex items-center gap-1.5 shadow-[0_3px_0_0_#D49E00] active:translate-y-0.5 active:shadow-[0_1px_0_0_#D49E00] transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
