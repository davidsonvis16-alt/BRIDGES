import React, { useEffect, useState } from 'react';
import { Star, Plus, Minus, X } from 'lucide-react';
import { RestaurantBrand, MenuItem } from '../../types';
import { Modal } from '../ui/Modal';

interface RestaurantModalProps {
  restaurant: RestaurantBrand | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, restaurant: RestaurantBrand) => void;
  onCheckout?: (restaurant: RestaurantBrand, total: number, itemCount: number) => void;
}

const formatKES = (n: number) => `KES ${n.toLocaleString('en-KE')}`;

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onAddToCart,
  onCheckout,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Fresh basket for each restaurant opened.
  useEffect(() => {
    setQuantities({});
  }, [restaurant?.id]);

  if (!restaurant) return null;

  const change = (item: MenuItem, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[item.id] ?? 0) + delta);
      return { ...prev, [item.id]: next };
    });
    if (delta > 0) onAddToCart?.(item, restaurant);
  };

  const itemCount = Object.values<number>(quantities).reduce((a, b) => a + b, 0);
  const total = restaurant.featuredItems.reduce(
    (sum, item) => sum + (quantities[item.id] ?? 0) * item.price,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={restaurant.name} width="max-w-2xl" hideClose>
      <div className="relative h-44 sm:h-52 flex-shrink-0 bg-line">
        <img src={restaurant.imageUrl} alt="" className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-md bg-white text-ink flex items-center justify-center border border-line cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="px-6 pt-6 pb-4 border-b border-line">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{restaurant.name}</h2>
          <p className="mt-1 text-sm text-muted flex flex-wrap items-center gap-x-2">
            <span className="inline-flex items-center gap-1 text-ink">
              <Star className="w-3.5 h-3.5 fill-ink" strokeWidth={0} />
              {restaurant.rating.toFixed(1)}
            </span>
            <span>({restaurant.ratingCount} ratings)</span>
            <span>·</span>
            <span>{restaurant.category}</span>
            <span>·</span>
            <span>{restaurant.deliveryTime}</span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{restaurant.description}</p>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wide">Popular items</h3>
          <ul className="mt-2 divide-y divide-line">
            {restaurant.featuredItems.map((item) => {
              const qty = quantities[item.id] ?? 0;
              return (
                <li key={item.id} className="py-4 flex gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-medium text-ink">
                      {item.name}
                      {item.isPopular && (
                        <span className="ml-2 align-middle text-xs font-normal text-brand">Popular</span>
                      )}
                    </h4>
                    <p className="mt-1 text-sm text-muted line-clamp-2">{item.description}</p>
                    <p className="mt-2 text-sm text-ink">{formatKES(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <img src={item.imageUrl} alt="" className="w-24 h-20 rounded-md object-cover bg-line" />
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => change(item, 1)}
                        className="h-8 px-3 inline-flex items-center gap-1 rounded-md border border-line text-sm font-medium text-ink hover:border-ink/40 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    ) : (
                      <div className="h-8 inline-flex items-center rounded-md border border-line">
                        <button
                          type="button"
                          onClick={() => change(item, -1)}
                          className="w-8 h-full flex items-center justify-center text-ink cursor-pointer"
                          aria-label={`Remove one ${item.name}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{qty}</span>
                        <button
                          type="button"
                          onClick={() => change(item, 1)}
                          className="w-8 h-full flex items-center justify-center text-ink cursor-pointer"
                          aria-label={`Add one ${item.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {itemCount > 0 && (
        <div className="px-6 py-4 border-t border-line bg-white flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              {itemCount} item{itemCount > 1 ? 's' : ''}
            </p>
            <p className="text-base font-medium text-ink">{formatKES(total)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onCheckout?.(restaurant, total, itemCount);
              onClose();
            }}
            className="h-11 px-5 rounded-md bg-brand text-white text-[15px] font-medium hover:bg-brand-dark cursor-pointer"
          >
            Go to checkout
          </button>
        </div>
      )}
    </Modal>
  );
};
